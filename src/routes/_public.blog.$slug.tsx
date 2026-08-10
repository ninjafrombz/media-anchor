import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPostBySlug, formatDate, extractFacebookSrc } from "@/lib/posts";
import { FacebookEmbed } from "@/components/facebook-embed";

export const Route = createFileRoute("/_public/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  staleTime: 5 * 60 * 1000,
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const desc = post.excerpt || post.description || `${post.title} — Akụkọ N'asụsụ Igbo`;
    return {
      meta: [
        { title: `${post.title} — Akụkọ N'asụsụ Igbo` },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post.slug}` },
        ...(post.thumbnail_url
          ? [
              { property: "og:image", content: post.thumbnail_url },
              { name: "twitter:image", content: post.thumbnail_url },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.publish_date,
            ...(post.thumbnail_url ? { image: post.thumbnail_url } : {}),
          }),
        },
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ErrorView,
  component: ArticlePage,
});

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-[760px] flex-col items-center justify-center px-5 text-center">
      <h1 className="font-serif text-3xl font-bold">Article not found</h1>
      <p className="mt-3 text-muted">This story may have been moved or unpublished.</p>
      <Link
        to="/blog"
        className="mt-6 border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider hover:text-accent"
      >
        Back to the blog
      </Link>
    </div>
  );
}

function ErrorView() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-[760px] flex-col items-center justify-center px-5 text-center">
      <h1 className="font-serif text-3xl font-bold">This article didn't load</h1>
      <Link
        to="/blog"
        className="mt-6 border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider hover:text-accent"
      >
        Back to the blog
      </Link>
    </div>
  );
}

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const hasEmbed = extractFacebookSrc(post.embed_code);

  return (
    <article className="mx-auto w-full max-w-[760px] px-5 py-12 md:py-16">
      {post.category && (
        <Link
          to="/blog"
          className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent"
        >
          {post.category}
        </Link>
      )}
      <h1 className="mt-3 font-serif text-4xl font-bold leading-[1.1] md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 border-b border-line pb-6 text-sm uppercase tracking-wider text-muted">
        {formatDate(post.publish_date)}
      </p>

      {post.thumbnail_url && (
        <img
          src={post.thumbnail_url}
          alt={post.title}
          className="mt-8 w-full object-cover"
        />
      )}

      {post.body && (
        <div
          className="article-body mt-8"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      )}

      {hasEmbed && (
        <div className="mt-10">
          <FacebookEmbed embed={post.embed_code} />
        </div>
      )}
    </article>
  );
}