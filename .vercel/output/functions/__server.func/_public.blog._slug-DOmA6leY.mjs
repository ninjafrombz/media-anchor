import { a as getPostBySlug } from "./_ssr/posts-fxqFZ-bx.mjs";
import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.blog._slug-DOmA6leY.js
var $$splitComponentImporter = () => import("./_public.blog._slug-B1s7NHkn.mjs");
var $$splitErrorComponentImporter = () => import("./_public.blog._slug-jgiWGJBN.mjs");
var $$splitNotFoundComponentImporter = () => import("./_public.blog._slug-Pwkz27Xx.mjs");
var Route = createFileRoute("/_public/blog/$slug")({
	loader: async ({ params }) => {
		const post = await getPostBySlug(params.slug);
		if (!post) throw notFound();
		return { post };
	},
	staleTime: 300 * 1e3,
	head: ({ loaderData }) => {
		const post = loaderData?.post;
		if (!post) return {};
		const desc = post.excerpt || post.description || `${post.title} — Akụkọ N'asụsụ Igbo`;
		return {
			meta: [
				{ title: `${post.title} — Akụkọ N'asụsụ Igbo` },
				{
					name: "description",
					content: desc
				},
				{
					property: "og:title",
					content: post.title
				},
				{
					property: "og:description",
					content: desc
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:url",
					content: `/blog/${post.slug}`
				},
				...post.thumbnail_url ? [{
					property: "og:image",
					content: post.thumbnail_url
				}, {
					name: "twitter:image",
					content: post.thumbnail_url
				}] : []
			],
			links: [{
				rel: "canonical",
				href: `/blog/${post.slug}`
			}],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Article",
					headline: post.title,
					datePublished: post.publish_date,
					...post.thumbnail_url ? { image: post.thumbnail_url } : {}
				})
			}]
		};
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
