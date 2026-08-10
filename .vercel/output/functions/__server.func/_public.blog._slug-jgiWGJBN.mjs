import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.blog._slug-jgiWGJBN.js
var import_jsx_runtime = require_jsx_runtime();
function ErrorView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[50vh] max-w-[760px] flex-col items-center justify-center px-5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-3xl font-bold",
			children: "This article didn't load"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/blog",
			className: "mt-6 border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider hover:text-accent",
			children: "Back to the blog"
		})]
	});
}
//#endregion
export { ErrorView as errorComponent };
