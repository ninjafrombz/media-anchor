import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Post = Tables<"posts">;
export type Settings = Tables<"settings">;

export const TEN_YEARS_SECONDS = 60 * 60 * 24 * 365 * 10;

export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base || "post";
}

export async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
  const root = slugify(title);
  let candidate = root;
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let query = supabase.from("posts").select("id").eq("slug", candidate).limit(1);
    if (ignoreId) query = query.neq("id", ignoreId);
    const { data } = await query;
    if (!data || data.length === 0) return candidate;
    n += 1;
    candidate = `${root}-${n}`;
  }
}

/** Extract a safe Facebook plugin URL from a pasted iframe / share URL. */
export function extractFacebookSrc(embed: string | null | undefined): string | null {
  if (!embed) return null;
  const raw = embed.trim();
  const srcMatch = raw.match(/src=["']([^"']+)["']/i);
  let src = srcMatch ? srcMatch[1] : raw;
  try {
    src = src.replace(/&amp;/g, "&");
  } catch {
    /* noop */
  }
  if (!src.includes("facebook.com")) return null;
  if (src.includes("/plugins/")) return src;
  // Bare watch / video share URL -> wrap in the official video plugin.
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    src,
  )}&show_text=false&width=560`;
}

export async function uploadThumbnail(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("thumbnails").upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from("thumbnails")
    .createSignedUrl(path, TEN_YEARS_SECONDS);
  if (signErr) throw signErr;
  return data.signedUrl;
}

/* ---- Public reads (anon, published only) ---- */

export async function getSettings(): Promise<Settings | null> {
  const { data } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();
  return data;
}

export async function getPublishedPosts(filter?: "video" | "blog"): Promise<Post[]> {
  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("publish_date", { ascending: false });
  if (filter) query = query.eq("type", filter);
  const { data } = await query;
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data;
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  return data;
}

export async function searchPosts(params: {
  q?: string;
  type?: "blog" | "video";
  category?: string;
}): Promise<Post[]> {
  const { q, type, category } = params;
  let query = supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("publish_date", { ascending: false });

  if (type) query = query.eq("type", type);
  if (category) query = query.eq("category", category);
  if (q && q.trim()) {
    const term = `%${q.trim()}%`;
    query = query.or(
      `title.ilike.${term},excerpt.ilike.${term},description.ilike.${term}`,
    );
  }

  const { data } = await query;
  return data ?? [];
}

export async function getAllCategories(): Promise<string[]> {
  const { data } = await supabase
    .from("posts")
    .select("category")
    .eq("status", "published")
    .not("category", "is", null);

  if (!data) return [];
  const seen = new Set<string>();
  const cats: string[] = [];
  for (const row of data) {
    if (row.category && !seen.has(row.category)) {
      seen.add(row.category);
      cats.push(row.category);
    }
  }
  return cats.sort();
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}