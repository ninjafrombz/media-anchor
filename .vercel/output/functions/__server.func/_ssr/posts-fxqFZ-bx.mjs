import { t as supabase } from "./client-DJs9vf2Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/posts-fxqFZ-bx.js
var TEN_YEARS_SECONDS = 3600 * 24 * 365 * 10;
function slugify(input) {
	return input.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-") || "post";
}
async function uniqueSlug(title, ignoreId) {
	const root = slugify(title);
	let candidate = root;
	let n = 1;
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
function extractFacebookSrc(embed) {
	if (!embed) return null;
	const raw = embed.trim();
	const srcMatch = raw.match(/src=["']([^"']+)["']/i);
	let src = srcMatch ? srcMatch[1] : raw;
	try {
		src = src.replace(/&amp;/g, "&");
	} catch {}
	if (!src.includes("facebook.com")) return null;
	if (src.includes("/plugins/")) return src;
	return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(src)}&show_text=false&width=560`;
}
async function uploadThumbnail(file) {
	const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
	const path = `${crypto.randomUUID()}.${ext}`;
	const { error } = await supabase.storage.from("thumbnails").upload(path, file, {
		cacheControl: "31536000",
		upsert: false
	});
	if (error) throw error;
	const { data, error: signErr } = await supabase.storage.from("thumbnails").createSignedUrl(path, TEN_YEARS_SECONDS);
	if (signErr) throw signErr;
	return data.signedUrl;
}
async function getSettings() {
	const { data } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();
	return data;
}
async function getPublishedPosts(filter) {
	let query = supabase.from("posts").select("*").eq("status", "published").order("publish_date", { ascending: false });
	if (filter) query = query.eq("type", filter);
	const { data } = await query;
	return data ?? [];
}
async function getPostBySlug(slug) {
	const { data } = await supabase.from("posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
	return data;
}
async function getPostById(id) {
	const { data } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
	return data;
}
async function searchPosts(params) {
	const { q, type, category } = params;
	let query = supabase.from("posts").select("*").eq("status", "published").order("publish_date", { ascending: false });
	if (type) query = query.eq("type", type);
	if (category) query = query.eq("category", category);
	if (q && q.trim()) {
		const term = `%${q.trim()}%`;
		query = query.or(`title.ilike.${term},excerpt.ilike.${term},description.ilike.${term}`);
	}
	const { data } = await query;
	return data ?? [];
}
async function getAllCategories() {
	const { data } = await supabase.from("posts").select("category").eq("status", "published").not("category", "is", null);
	if (!data) return [];
	const seen = /* @__PURE__ */ new Set();
	const cats = [];
	for (const row of data) if (row.category && !seen.has(row.category)) {
		seen.add(row.category);
		cats.push(row.category);
	}
	return cats.sort();
}
function formatDate(value) {
	return new Date(value).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}
//#endregion
export { getPostBySlug as a, searchPosts as c, getPostById as i, uniqueSlug as l, formatDate as n, getPublishedPosts as o, getAllCategories as r, getSettings as s, extractFacebookSrc as t, uploadThumbnail as u };
