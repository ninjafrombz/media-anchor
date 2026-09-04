import { t as extractFacebookSrc } from "./posts-fxqFZ-bx.mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/facebook-embed-DEuD_qdr.js
var import_jsx_runtime = require_jsx_runtime();
function FacebookEmbed({ embed, className }) {
	const src = extractFacebookSrc(embed);
	if (!src) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `relative w-full overflow-hidden bg-ink ${className ?? ""}`,
		style: { aspectRatio: "16 / 9" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			src,
			title: "Facebook video",
			className: "absolute inset-0 h-full w-full",
			style: {
				border: "none",
				overflow: "hidden"
			},
			scrolling: "no",
			frameBorder: "0",
			allowFullScreen: true,
			allow: "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
		})
	});
}
//#endregion
export { FacebookEmbed as t };
