import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import type { Post } from "@/lib/posts";
import { extractFacebookSrc, formatDate } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  const isVideo = post.type === "video";
  const href = isVideo ? "/videos" : "/blog/$slug";

  const Thumb = (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
      {post.thumbnail_url ? (
        <img
          src={post.thumbnail_url}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : isVideo && extractFacebookSrc(post.embed_code) ? (
        <div className="flex h-full w-full items-center justify-center bg-ink">
          <Play className="h-10 w-10 text-paper/70" />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface-dark">
          <span className="font-serif text-2xl text-paper/40">
            {post.title.slice(0, 1)}
          </span>
        </div>
      )}
      {isVideo && (
        <span className="absolute left-0 top-0 flex items-center gap-1.5 bg-ink/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper">
          <Play className="h-3 w-3" /> Video
        </span>
      )}
    </div>
  );

  const Body = (
    <div className="mt-4">
      {post.category && (
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
          {post.category}
        </span>
      )}
      <h3 className="mt-1.5 font-serif text-xl font-bold leading-snug transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-1.5 text-xs uppercase tracking-wider text-muted">
        {formatDate(post.publish_date)}
      </p>
      {post.excerpt && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
      )}
    </div>
  );

  if (isVideo) {
    return (
      <Link to="/videos" className="group block">
        {Thumb}
        {Body}
      </Link>
    );
  }

  return (
    <Link to={href} params={{ slug: post.slug }} className="group block">
      {Thumb}
      {Body}
    </Link>
  );
}