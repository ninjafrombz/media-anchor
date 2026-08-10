import { o as getPublishedPosts } from "./_ssr/posts-YMfmUmqI.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.videos-CSRfd-Ui.js
var $$splitComponentImporter = () => import("./_public.videos-B7o6iJp_.mjs");
var Route = createFileRoute("/_public/videos")({
	loader: async () => ({ videos: await getPublishedPosts("video") }),
	staleTime: 300 * 1e3,
	head: () => ({
		meta: [
			{ title: "Videos — Akụkọ N'asụsụ Igbo" },
			{
				name: "description",
				content: "Watch the latest Facebook video reports from Akụkọ N'asụsụ Igbo, sorted by most recent."
			},
			{
				property: "og:title",
				content: "Videos — Akụkọ N'asụsụ Igbo"
			},
			{
				property: "og:description",
				content: "The latest video reports in the Igbo language."
			},
			{
				property: "og:url",
				content: "/videos"
			}
		],
		links: [{
			rel: "canonical",
			href: "/videos"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
