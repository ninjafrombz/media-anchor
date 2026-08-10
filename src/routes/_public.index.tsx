import { createFileRoute, Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import {
  getPublishedPosts,
  getPostById,
  getSettings,
  formatDate,
  extractFacebookSrc,
  type Post,
} from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { FacebookEmbed } from "@/components/facebook-embed";

export const Route = createFileRoute("/_public/")({
  loader: async () => {
    const [settings, posts] = await Promise.all([
      getSettings(),
      getPublishedPosts(),
    ]);
    let featured: Post | null = null;
    if (settings?.featured_post_id) {
      const f = await getPostById(settings.featured_post_id);
      if (f && f.status === "published") featured = f;
    }
    if (!featured) featured = posts[0] ?? null;
    const rest = posts.filter((p) => p.id !== featured?.id).slice(0, 9);
    return { featured, rest };
  },
  staleTime: 5 * 60 * 1000,
  head: () => ({
    meta: [
      { title: "Akụkọ N'asụsụ Igbo — Igbo Language Video & Editorial" },
      {
        name: "description",
        content:
          "The central hub for Akụkọ N'asụsụ Igbo: Facebook video reports and written features in the Igbo language, in one clean editorial home.",
      },
      { property: "og:title", content: "Akụkọ N'asụsụ Igbo" },
      {
        property: "og:description",
        content:
          "Igbo language video reports and written features in one clean editorial home.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function FeaturedHero({ post }: { post: Post }) {
  const isVideo = post.type === "video";
  const hasEmbed = isVideo && extractFacebookSrc(post.embed_code);

  return (
    <section className="border-b border-line-strong">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[60%_40%] lg:gap-12">
        <div className="order-2 lg:order-1">
          {hasEmbed ? (
            <FacebookEmbed embed={post.embed_code} />
          ) : post.thumbnail_url ? (
            <Link
              to={isVideo ? "/videos" : "/blog/$slug"}
              params={isVideo ? undefined : { slug: post.slug }}
              className="group block"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface">
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </Link>
          ) : (
            <div className="flex aspect-[16/9] w-full items-center justify-center bg-surface-dark">
              <span className="font-serif text-5xl text-paper/30">
                {post.title.slice(0, 1)}
              </span>
            </div>
          )}
        </div>

        <div className="order-1 flex flex-col justify-center lg:order-2">
          <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
            {isVideo && <Play className="h-3 w-3" />}
            {post.category || (isVideo ? "Featured Video" : "Featured Story")}
          </span>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-[1.08] md:text-4xl lg:text-5xl">
            {isVideo ? (
              <Link to="/videos" className="transition-colors hover:text-accent">
                {post.title}
              </Link>
            ) : (
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="transition-colors hover:text-accent"
              >
                {post.title}
              </Link>
            )}
          </h1>
          <p className="mt-3 text-xs uppercase tracking-wider text-muted">
            {formatDate(post.publish_date)}
          </p>
          {(post.excerpt || post.description) && (
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {post.excerpt || post.description}
            </p>
          )}
          {!isVideo && (
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="mt-6 inline-block self-start border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent"
            >
              Read the story
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const { featured, rest } = Route.useLoaderData();

  if (!featured) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-[1280px] flex-col items-center justify-center px-5 text-center">
        <h1 className="font-serif text-3xl font-bold">No stories yet</h1>
        <p className="mt-3 text-muted">
          Published videos and articles will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <FeaturedHero post={featured} />
      {rest.length > 0 && (
        <section className="mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
          <div className="mb-8 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-bold">Latest</h2>
            <span className="h-px flex-1 bg-line-strong" />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}