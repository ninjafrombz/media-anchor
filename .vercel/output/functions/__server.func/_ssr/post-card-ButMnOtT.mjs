import { n as formatDate, t as extractFacebookSrc } from "./posts-fxqFZ-bx.mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Play } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-card-ButMnOtT.js
var import_jsx_runtime = require_jsx_runtime();
function PostCard({ post }) {
	const isVideo = post.type === "video";
	const href = isVideo ? "/videos" : "/blog/$slug";
	const Thumb = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[16/10] w-full overflow-hidden bg-surface",
		children: [post.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: post.thumbnail_url,
			alt: post.title,
			loading: "lazy",
			className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
		}) : isVideo && extractFacebookSrc(post.embed_code) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full w-full items-center justify-center bg-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-10 w-10 text-paper/70" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full w-full items-center justify-center bg-surface-dark",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-serif text-2xl text-paper/40",
				children: post.title.slice(0, 1)
			})
		}), isVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "absolute left-0 top-0 flex items-center gap-1.5 bg-ink/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3 w-3" }), " Video"]
		})]
	});
	const Body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			post.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-bold uppercase tracking-[0.12em] text-accent",
				children: post.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1.5 font-serif text-xl font-bold leading-snug transition-colors group-hover:text-accent",
				children: post.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs uppercase tracking-wider text-muted",
				children: formatDate(post.publish_date)
			}),
			post.excerpt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft",
				children: post.excerpt
			})
		]
	});
	if (isVideo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/videos",
		className: "group block",
		children: [Thumb, Body]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: href,
		params: { slug: post.slug },
		className: "group block",
		children: [Thumb, Body]
	});
}
//#endregion
export { PostCard as t };
