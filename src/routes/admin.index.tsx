import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDate, type Post } from "@/lib/posts";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: PostsTable,
});

async function fetchAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("publish_date", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

function PostsTable() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin", "posts"],
    queryFn: fetchAllPosts,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onDelete = async (post: Post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeletingId(post.id);
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    setDeletingId(null);
    if (error) {
      window.alert(error.message);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
  };

  return (
    <div className="px-5 py-8 md:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Posts</h1>
          <p className="mt-1 text-sm text-muted">All videos and articles.</p>
        </div>
        <Link
          to="/admin/new"
          className="flex items-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-accent-dark"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : !posts || posts.length === 0 ? (
        <div className="border border-line bg-surface px-6 py-16 text-center">
          <p className="text-muted">No posts yet.</p>
          <Link
            to="/admin/new"
            className="mt-4 inline-block border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-surface text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 font-medium">{post.title}</td>
                  <td className="px-4 py-3 capitalize text-ink-soft">{post.type}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {formatDate(post.publish_date)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                        post.status === "published"
                          ? "bg-ink text-paper"
                          : "border border-line text-muted"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to="/admin/edit/$id"
                        params={{ id: post.id }}
                        aria-label="Edit"
                        className="flex h-8 w-8 items-center justify-center border border-line transition-colors hover:bg-surface"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        aria-label="Delete"
                        disabled={deletingId === post.id}
                        onClick={() => onDelete(post)}
                        className="flex h-8 w-8 items-center justify-center border border-line text-accent transition-colors hover:bg-accent hover:text-paper disabled:opacity-50"
                      >
                        {deletingId === post.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}