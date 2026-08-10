import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { t as Route } from "./_public.blog-D_MGL0R8.mjs";
import { t as PostCard } from "./_ssr/post-card-_oXZ1qU9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.blog-BgtF2Vsx.js
var import_jsx_runtime = require_jsx_runtime();
function BlogPage() {
	const { posts } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8 md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-10 border-b border-line-strong pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl font-bold md:text-5xl",
				children: "Blog"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-ink-soft",
				children: "Written features and reporting, newest first."
			})]
		}), posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "No articles published yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
			children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
		})]
	});
}
//#endregion
export { BlogPage as component };
