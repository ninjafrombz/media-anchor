import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Post } from "@/lib/posts";
import { PostForm } from "@/components/admin/post-form";

export const Route = createFileRoute("/admin/edit/$id")({
  component: EditPost,
});

function EditPost() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "post", id],
    queryFn: async (): Promise<Post | null> => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="px-5 py-20 text-center md:px-8">
        <h1 className="font-serif text-2xl font-bold">Post not found</h1>
        <Link
          to="/admin"
          className="mt-4 inline-block border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider"
        >
          Back to posts
        </Link>
      </div>
    );
  }

  return <PostForm initial={data} />;
}