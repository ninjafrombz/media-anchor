import { r as __toESM } from "./_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { f as Outlet, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_public-HbT22W50.mjs";
import { f as Menu, o as Search, t as X } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public-DQeUHA0B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		label: "Home",
		to: "/"
	},
	{
		label: "Videos",
		to: "/videos"
	},
	{
		label: "Blog",
		to: "/blog"
	},
	{
		label: "About",
		to: "/about"
	},
	{
		label: "Search",
		to: "/search"
	}
];
function SiteHeader({ siteName }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed inset-x-0 top-0 z-50 bg-ink text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "font-serif text-xl font-bold tracking-tight text-paper md:text-2xl",
					onClick: () => setOpen(false),
					children: [siteName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: [NAV.filter((item) => item.to !== "/search").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						activeOptions: { exact: item.to === "/" },
						className: "text-sm font-medium uppercase tracking-wider text-paper/85 transition-colors hover:text-accent",
						activeProps: { className: "!text-accent" },
						children: item.label
					}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						"aria-label": "Search",
						activeProps: { className: "!text-accent" },
						className: "flex items-center text-paper/85 transition-colors hover:text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-[18px] w-[18px]" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": open ? "Close menu" : "Open menu",
					className: "md:hidden",
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-6 w-6" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "border-t border-paper/15 bg-ink md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex w-full max-w-[1280px] flex-col px-5",
				children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					activeOptions: { exact: item.to === "/" },
					onClick: () => setOpen(false),
					className: "border-b border-paper/10 py-4 text-sm font-medium uppercase tracking-wider text-paper/85",
					activeProps: { className: "!text-accent" },
					children: item.label
				}, item.to))
			})
		})]
	});
}
function SiteFooter({ siteName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t border-line-strong bg-ink text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "font-serif text-2xl font-bold tracking-tight text-paper",
					children: [siteName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-md text-sm leading-relaxed text-muted-soft",
					children: "An editorial home for video reports and written features in the Igbo language."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-wrap gap-x-8 gap-y-2 text-sm uppercase tracking-wider",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-paper/80 transition-colors hover:text-accent",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/videos",
							className: "text-paper/80 transition-colors hover:text-accent",
							children: "Videos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog",
							className: "text-paper/80 transition-colors hover:text-accent",
							children: "Blog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "text-paper/80 transition-colors hover:text-accent",
							children: "About"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 border-t border-paper/15 pt-6 text-xs uppercase tracking-wider text-muted-soft",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					siteName,
					". All rights reserved."
				]
			})]
		})
	});
}
function PublicLayout() {
	const { siteName } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { siteName }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 pt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { siteName })
		]
	});
}
//#endregion
export { PublicLayout as component };
