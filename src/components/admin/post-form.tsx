import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  uniqueSlug,
  uploadThumbnail,
  extractFacebookSrc,
  type Post,
} from "@/lib/posts";
import { RichTextEditor } from "@/components/rich-text-editor";

type PostType = "video" | "blog";
type Status = "draft" | "published";

function toDateInput(value?: string | null): string {
  const d = value ? new Date(value) : new Date();
  return Number.isNaN(d.getTime())
    ? new Date().toISOString().slice(0, 10)
    : d.toISOString().slice(0, 10);
}

export function PostForm({ initial }: { initial?: Post }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [type, setType] = useState<PostType>(
    (initial?.type as PostType) ?? "blog",
  );
  const [category, setCategory] = useState(initial?.category ?? "");
  const [publishDate, setPublishDate] = useState(toDateInput(initial?.publish_date));
  const [status, setStatus] = useState<Status>(
    (initial?.status as Status) ?? "draft",
  );
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [embedCode, setEmbedCode] = useState(initial?.embed_code ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(initial?.thumbnail_url ?? "");
  const [file, setFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const embedValid = !embedCode.trim() || !!extractFacebookSrc(embedCode);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setThumbnailUrl(URL.createObjectURL(f));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("A title is required.");
      return;
    }
    if (type === "video" && !embedCode.trim()) {
      setError("Paste the Facebook embed code for a video post.");
      return;
    }
    if (embedCode.trim() && !embedValid) {
      setError("That embed code doesn't look like a Facebook video embed.");
      return;
    }

    setSaving(true);
    try {
      let finalThumb = initial?.thumbnail_url ?? null;
      if (file) finalThumb = await uploadThumbnail(file);

      const slug = await uniqueSlug(title, initial?.id);
      const payload = {
        title: title.trim(),
        slug,
        type,
        status,
        category: category.trim() || null,
        publish_date: new Date(publishDate).toISOString(),
        excerpt: excerpt.trim() || null,
        description: description.trim() || null,
        body: type === "blog" ? body : null,
        embed_code: embedCode.trim() || null,
        thumbnail_url: finalThumb,
      };

      if (initial) {
        const { error } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", initial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("posts").insert(payload);
        if (error) throw error;
      }

      queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save the post.");
      setSaving(false);
    }
  };

  const fieldClass =
    "w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted";

  return (
    <form onSubmit={onSubmit} className="max-w-3xl px-5 py-8 md:px-8">
      <h1 className="font-serif text-3xl font-bold">
        {initial ? "Edit Post" : "New Post"}
      </h1>

      <div className="mt-8 space-y-6">
        <div>
          <label className={labelClass}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClass}
            placeholder="Headline"
          />
        </div>

        <div>
          <label className={labelClass}>Type</label>
          <div className="flex gap-2">
            {(["blog", "video"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  type === t
                    ? "bg-ink text-paper"
                    : "border border-line text-muted hover:bg-surface"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {type === "video" && (
          <div>
            <label className={labelClass}>Facebook embed code</label>
            <textarea
              value={embedCode}
              onChange={(e) => setEmbedCode(e.target.value)}
              rows={4}
              className={`${fieldClass} font-mono text-xs`}
              placeholder='Paste the <iframe ...> embed code or video URL'
            />
            {!embedValid && (
              <p className="mt-1 text-xs text-accent">
                Not recognised as a Facebook video embed.
              </p>
            )}
            <div className="mt-4">
              <label className={labelClass}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={fieldClass}
                placeholder="Shown beneath the video"
              />
            </div>
          </div>
        )}

        {type === "blog" && (
          <>
            <div>
              <label className={labelClass}>Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className={fieldClass}
                placeholder="Short summary shown on cards"
              />
            </div>
            <div>
              <label className={labelClass}>Body</label>
              <RichTextEditor value={body} onChange={setBody} />
            </div>
            <div>
              <label className={labelClass}>
                Embed a Facebook video (optional)
              </label>
              <textarea
                value={embedCode}
                onChange={(e) => setEmbedCode(e.target.value)}
                rows={3}
                className={`${fieldClass} font-mono text-xs`}
                placeholder="Paste an <iframe ...> embed to render inside the article"
              />
              {!embedValid && (
                <p className="mt-1 text-xs text-accent">
                  Not recognised as a Facebook video embed.
                </p>
              )}
            </div>
          </>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Category tag</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={fieldClass}
              placeholder="e.g. Culture"
            />
          </div>
          <div>
            <label className={labelClass}>Publish date</label>
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Thumbnail image</label>
          {thumbnailUrl ? (
            <div className="relative inline-block">
              <img
                src={thumbnailUrl}
                alt="Thumbnail preview"
                className="h-40 w-72 max-w-full border border-line object-cover"
              />
              <button
                type="button"
                aria-label="Remove thumbnail"
                onClick={() => {
                  setThumbnailUrl("");
                  setFile(null);
                }}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-ink text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex h-32 w-72 max-w-full cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-line bg-surface text-muted transition-colors hover:border-accent">
              <Upload className="h-5 w-5" />
              <span className="text-xs uppercase tracking-wider">Upload image</span>
              <input type="file" accept="image/*" onChange={onFile} className="hidden" />
            </label>
          )}
        </div>

        <div>
          <label className={labelClass}>Status</label>
          <div className="flex gap-2">
            {(["draft", "published"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  status === s
                    ? s === "published"
                      ? "bg-accent text-paper"
                      : "bg-ink text-paper"
                    : "border border-line text-muted hover:bg-surface"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-accent">{error}</p>}

        <div className="flex gap-3 border-t border-line pt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            className="px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}