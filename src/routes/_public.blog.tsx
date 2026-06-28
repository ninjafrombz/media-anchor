import { createFileRoute } from "@tanstack/react-router";
import { getPublishedPosts, type Post } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export const Route = createFileRoute("/_public/blog")({
  loader: async () => ({ posts: await getPublishedPosts("blog") }),
  head: () => ({
    meta: [
      { title: "Blog — Akụkọ N'asụsụ Igbo" },
      {
        name: "description",
        content:
          "Written features and reporting from Akụkọ N'asụsụ Igbo, sorted by most recent.",
      },
      { property: "og:title", content: "Blog — Akụkọ N'asụsụ Igbo" },
      {
        property: "og:description",
        content: "Written features and reporting in the Igbo language.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { posts } = Route.useLoaderData();
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
      <header className="mb-10 border-b border-line-strong pb-6">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Written features and reporting, newest first.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">No articles published yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}