import { extractFacebookSrc } from "@/lib/posts";

export function FacebookEmbed({
  embed,
  className,
}: {
  embed: string | null | undefined;
  className?: string;
}) {
  const src = extractFacebookSrc(embed);
  if (!src) return null;
  return (
    <div
      className={`relative w-full overflow-hidden bg-ink ${className ?? ""}`}
      style={{ aspectRatio: "16 / 9" }}
    >
      <iframe
        src={src}
        title="Facebook video"
        className="absolute inset-0 h-full w-full"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  );
}