import { n as formatDate } from "./_ssr/posts-fxqFZ-bx.mjs";
import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { t as FacebookEmbed } from "./_ssr/facebook-embed-DEuD_qdr.mjs";
import { t as Route } from "./_public.videos-BOzSHOxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.videos-DKPLeV45.js
var import_jsx_runtime = require_jsx_runtime();
function VideosPage() {
	const { videos } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8 md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-10 border-b border-line-strong pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl font-bold md:text-5xl",
				children: "Videos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-ink-soft",
				children: "Video reports from our Facebook media page, newest first."
			})]
		}), videos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "No videos published yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3",
			children: videos.map((video) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookEmbed, { embed: video.embed_code }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					video.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-bold uppercase tracking-[0.12em] text-accent",
						children: video.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1.5 font-serif text-xl font-bold leading-snug",
						children: video.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs uppercase tracking-wider text-muted",
						children: formatDate(video.publish_date)
					}),
					video.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-ink-soft",
						children: video.description
					})
				]
			})] }, video.id))
		})]
	});
}
//#endregion
export { VideosPage as component };
