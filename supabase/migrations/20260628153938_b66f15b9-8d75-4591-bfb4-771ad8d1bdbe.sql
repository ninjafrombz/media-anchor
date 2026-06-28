CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'blog' CHECK (type IN ('video','blog')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  category TEXT,
  excerpt TEXT,
  description TEXT,
  body TEXT,
  embed_code TEXT,
  thumbnail_url TEXT,
  publish_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT SELECT ON public.posts TO anon;
GRANT ALL ON public.posts TO service_role;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts" ON public.posts
  FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated can read all posts" ON public.posts
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert posts" ON public.posts
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update posts" ON public.posts
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete posts" ON public.posts
  FOR DELETE TO authenticated USING (true);

CREATE TABLE public.settings (
  id INT NOT NULL PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT NOT NULL DEFAULT 'Akụkọ N''asụsụ Igbo',
  about_text TEXT NOT NULL DEFAULT '',
  featured_post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.settings TO authenticated;
GRANT SELECT ON public.settings TO anon;
GRANT ALL ON public.settings TO service_role;

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings" ON public.settings
  FOR SELECT TO anon USING (true);
CREATE POLICY "Authenticated can read settings" ON public.settings
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert settings" ON public.settings
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update settings" ON public.settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.settings (id, site_name, about_text)
VALUES (1, 'Akụkọ N''asụsụ Igbo', 'Akụkọ N''asụsụ Igbo is an editorial home for stories told in the Igbo language — bringing together video reports and written features from our Facebook media page into one clean, focused reading experience.');

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();