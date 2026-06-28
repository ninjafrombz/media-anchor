import { createFileRoute } from "@tanstack/react-router";
import { getPublishedPosts, formatDate, type Post } from "@/lib/posts";
import { FacebookEmbed } from "@/components/facebook-embed";

export const Route = createFileRoute("/_public/videos")({
  loader: async () => ({ videos: await getPublishedPosts("video") }),
  head: () => ({
    meta: [
      { title: "Videos — Akụkọ N'asụsụ Igbo" },
      {
        name: "description",
        content:
          "Watch the latest Facebook video reports from Akụkọ N'asụsụ Igbo, sorted by most recent.",
      },
      { property: "og:title", content: "Videos — Akụkọ N'asụsụ Igbo" },
      {
        property: "og:description",
        content: "The latest video reports in the Igbo language.",
      },
      { property: "og:url", content: "/videos" },
    ],
    links: [{ rel: "canonical", href: "/videos" }],
  }),
  component: VideosPage,
});

function VideosPage() {
  const { videos } = Route.useLoaderData();
  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
      <header className="mb-10 border-b border-line-strong pb-6">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Videos</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Video reports from our Facebook media page, newest first.
        </p>
      </header>

      {videos.length === 0 ? (
        <p className="text-muted">No videos published yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video: Post) => (
            <article key={video.id}>
              <FacebookEmbed embed={video.embed_code} />
              <div className="mt-4">
                {video.category && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
                    {video.category}
                  </span>
                )}
                <h2 className="mt-1.5 font-serif text-xl font-bold leading-snug">
                  {video.title}
                </h2>
                <p className="mt-1.5 text-xs uppercase tracking-wider text-muted">
                  {formatDate(video.publish_date)}
                </p>
                {video.description && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {video.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}