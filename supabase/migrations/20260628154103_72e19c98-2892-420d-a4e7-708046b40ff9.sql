-- Roles infrastructure
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- First-owner bootstrap: claim admin only while no admin exists.
CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_exists BOOLEAN;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') INTO admin_exists;
  IF admin_exists THEN
    RETURN public.has_role(auth.uid(), 'admin');
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  RETURN TRUE;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;

-- Replace permissive post policies with admin-gated ones
DROP POLICY "Authenticated can read all posts" ON public.posts;
DROP POLICY "Authenticated can insert posts" ON public.posts;
DROP POLICY "Authenticated can update posts" ON public.posts;
DROP POLICY "Authenticated can delete posts" ON public.posts;

CREATE POLICY "Admins can read all posts" ON public.posts
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert posts" ON public.posts
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update posts" ON public.posts
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete posts" ON public.posts
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Replace permissive settings policies with admin-gated ones
DROP POLICY "Authenticated can read settings" ON public.settings;
DROP POLICY "Authenticated can insert settings" ON public.settings;
DROP POLICY "Authenticated can update settings" ON public.settings;

CREATE POLICY "Admins can insert settings" ON public.settings
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update settings" ON public.settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage policies for thumbnails bucket
CREATE POLICY "Public can view thumbnails" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'thumbnails');
CREATE POLICY "Admins can upload thumbnails" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'thumbnails' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update thumbnails" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'thumbnails' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete thumbnails" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'thumbnails' AND public.has_role(auth.uid(), 'admin'));