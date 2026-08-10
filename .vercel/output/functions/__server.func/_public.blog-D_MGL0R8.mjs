import { o as getPublishedPosts } from "./_ssr/posts-YMfmUmqI.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.blog-D_MGL0R8.js
var $$splitComponentImporter = () => import("./_public.blog-BgtF2Vsx.mjs");
var Route = createFileRoute("/_public/blog")({
	loader: async () => ({ posts: await getPublishedPosts("blog") }),
	staleTime: 300 * 1e3,
	head: () => ({
		meta: [
			{ title: "Blog — Akụkọ N'asụsụ Igbo" },
			{
				name: "description",
				content: "Written features and reporting from Akụkọ N'asụsụ Igbo, sorted by most recent."
			},
			{
				property: "og:title",
				content: "Blog — Akụkọ N'asụsụ Igbo"
			},
			{
				property: "og:description",
				content: "Written features and reporting in the Igbo language."
			},
			{
				property: "og:url",
				content: "/blog"
			}
		],
		links: [{
			rel: "canonical",
			href: "/blog"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
