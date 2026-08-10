import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { t as Route } from "./_public.about-BB4x0yr1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.about-BRPK5tl7.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const { siteName, aboutText } = Route.useLoaderData();
	const paragraphs = aboutText.split(/\n{2,}/).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-[760px] px-5 py-12 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-bold uppercase tracking-[0.14em] text-accent",
				children: "About"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl font-bold leading-[1.1] md:text-5xl",
				children: siteName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "article-body mt-8",
				children: paragraphs.length > 0 ? paragraphs.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "No description has been added yet."
				})
			})
		]
	});
}
//#endregion
export { AboutPage as component };
