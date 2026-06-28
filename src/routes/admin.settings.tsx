import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getPublishedPosts, type Post, type Settings } from "@/lib/posts";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const [{ data: settings }, posts] = await Promise.all([
        supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
        getPublishedPosts(),
      ]);
      return { settings: settings as Settings | null, posts };
    },
  });

  const [siteName, setSiteName] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [featured, setFeatured] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data?.settings) {
      setSiteName(data.settings.site_name ?? "");
      setAboutText(data.settings.about_text ?? "");
      setFeatured(data.settings.featured_post_id ?? "");
    }
  }, [data?.settings]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    const { error } = await supabase
      .from("settings")
      .update({
        site_name: siteName.trim() || "Akụkọ N'asụsụ Igbo",
        about_text: aboutText,
        featured_post_id: featured || null,
      })
      .eq("id", 1);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSaved(true);
    queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
    setTimeout(() => setSaved(false), 2500);
  };

  const fieldClass =
    "w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent";
  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted";

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <form onSubmit={onSave} className="max-w-2xl px-5 py-8 md:px-8">
      <h1 className="font-serif text-3xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Update site identity, the About page, and the homepage feature.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label className={labelClass}>Site name</label>
          <input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass}>About page text</label>
          <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            rows={8}
            className={fieldClass}
            placeholder="Separate paragraphs with a blank line."
          />
        </div>

        <div>
          <label className={labelClass}>Featured post (homepage)</label>
          <select
            value={featured}
            onChange={(e) => setFeatured(e.target.value)}
            className={fieldClass}
          >
            <option value="">Most recent published (automatic)</option>
            {data?.posts.map((p: Post) => (
              <option key={p.id} value={p.id}>
                {p.type === "video" ? "▸ " : ""}
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-accent">{error}</p>}

        <div className="flex items-center gap-3 border-t border-line pt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save changes
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-ink">
              <Check className="h-4 w-4 text-accent" />
              Saved
            </span>
          )}
        </div>
      </div>
    </form>
  );
}