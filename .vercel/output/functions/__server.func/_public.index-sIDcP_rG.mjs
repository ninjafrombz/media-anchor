import { i as getPostById, o as getPublishedPosts, s as getSettings } from "./_ssr/posts-fxqFZ-bx.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.index-sIDcP_rG.js
var $$splitComponentImporter = () => import("./_public.index-DqPKUH6s.mjs");
var Route = createFileRoute("/_public/")({
	loader: async () => {
		const [settings, posts] = await Promise.all([getSettings(), getPublishedPosts()]);
		let featured = null;
		if (settings?.featured_post_id) {
			const f = await getPostById(settings.featured_post_id);
			if (f && f.status === "published") featured = f;
		}
		if (!featured) featured = posts[0] ?? null;
		const rest = posts.filter((p) => p.id !== featured?.id).slice(0, 9);
		return {
			featured,
			rest
		};
	},
	staleTime: 300 * 1e3,
	head: () => ({
		meta: [
			{ title: "Akụkọ N'asụsụ Igbo — Igbo Language Video & Editorial" },
			{
				name: "description",
				content: "The central hub for Akụkọ N'asụsụ Igbo: Facebook video reports and written features in the Igbo language, in one clean editorial home."
			},
			{
				property: "og:title",
				content: "Akụkọ N'asụsụ Igbo"
			},
			{
				property: "og:description",
				content: "Igbo language video reports and written features in one clean editorial home."
			},
			{
				property: "og:url",
				content: "/"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
