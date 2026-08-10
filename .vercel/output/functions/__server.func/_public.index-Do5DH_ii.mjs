import { n as formatDate, t as extractFacebookSrc } from "./_ssr/posts-YMfmUmqI.mjs";
import { i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { u as Play } from "./_libs/lucide-react.mjs";
import { t as PostCard } from "./_ssr/post-card-_oXZ1qU9.mjs";
import { t as FacebookEmbed } from "./_ssr/facebook-embed-DpNyrmqw.mjs";
import { t as Route } from "./_public.index-BHpneXzx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.index-Do5DH_ii.js
var import_jsx_runtime = require_jsx_runtime();
function FeaturedHero({ post }) {
	const isVideo = post.type === "video";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-line-strong",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[60%_40%] lg:gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "order-2 lg:order-1",
				children: isVideo && extractFacebookSrc(post.embed_code) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacebookEmbed, { embed: post.embed_code }) : post.thumbnail_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: isVideo ? "/videos" : "/blog/$slug",
					params: isVideo ? void 0 : { slug: post.slug },
					className: "group block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-[16/9] w-full overflow-hidden bg-surface",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: post.thumbnail_url,
							alt: post.title,
							className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex aspect-[16/9] w-full items-center justify-center bg-surface-dark",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-5xl text-paper/30",
						children: post.title.slice(0, 1)
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-1 flex flex-col justify-center lg:order-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent",
						children: [isVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3 w-3" }), post.category || (isVideo ? "Featured Video" : "Featured Story")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-serif text-3xl font-bold leading-[1.08] md:text-4xl lg:text-5xl",
						children: isVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/videos",
							className: "transition-colors hover:text-accent",
							children: post.title
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blog/$slug",
							params: { slug: post.slug },
							className: "transition-colors hover:text-accent",
							children: post.title
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs uppercase tracking-wider text-muted",
						children: formatDate(post.publish_date)
					}),
					(post.excerpt || post.description) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg leading-relaxed text-ink-soft",
						children: post.excerpt || post.description
					}),
					!isVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog/$slug",
						params: { slug: post.slug },
						className: "mt-6 inline-block self-start border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:text-accent",
						children: "Read the story"
					})
				]
			})]
		})
	});
}
function HomePage() {
	const { featured, rest } = Route.useLoaderData();
	if (!featured) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[50vh] w-full max-w-[1280px] flex-col items-center justify-center px-5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-3xl font-bold",
			children: "No stories yet"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: "Published videos and articles will appear here."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedHero, { post: featured }), rest.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8 md:py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl font-bold",
				children: "Latest"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line-strong" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
			children: rest.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
		})]
	})] });
}
//#endregion
export { HomePage as component };
