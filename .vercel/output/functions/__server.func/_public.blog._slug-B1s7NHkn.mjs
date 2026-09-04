import { n as formatDate, t as extractFacebookSrc } from "./_ssr/posts-fxqFZ-bx.mjs";
import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_public.blog._slug-DOmA6leY.mjs";
import { t as FacebookEmbed } from "./_ssr/facebook-embed-DEuD_qdr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.blog._slug-B1s7NHkn.js
var import_jsx_runtime = require_jsx_runtime();
function ArticlePage() {
	const { post } = Route.useLoaderData();
	const hasEmbed = extractFacebookSrc(post.embed_code);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto w-full max-w-[760px] px-5 py-12 md:py-16",
		children: [
			post.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/blog",
				className: "text-[11px] font-bold uppercase tracking-[0.14em] text-accent",
				children: post.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl font-bold leading-[1.1] md:text-5xl",
				children: post.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 border-b border-line pb-6 text-sm uppercase tracking-wider text-muted",
				children: formatDate(post.publish_date)
			}),
			post.thumbnail_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.thumbnail_url,
				alt: post.title,
				className: "mt-8 w-full object-cover"
			}),
			post.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "article-body mt-8",
				dangerouslySetInnerHTML: { __html: post.body }
			}),
			hasEmbed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookEmbed, { embed: post.embed_code })
			})
		]
	});
}
//#endregion
export { ArticlePage as component };
