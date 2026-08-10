import { s as getSettings } from "./_ssr/posts-YMfmUmqI.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.about-BB4x0yr1.js
var $$splitComponentImporter = () => import("./_public.about-BRPK5tl7.mjs");
var Route = createFileRoute("/_public/about")({
	loader: async () => {
		const settings = await getSettings();
		return {
			siteName: settings?.site_name ?? "Akụkọ N'asụsụ Igbo",
			aboutText: settings?.about_text ?? ""
		};
	},
	staleTime: Infinity,
	head: ({ loaderData }) => ({
		meta: [
			{ title: `About — ${loaderData?.siteName ?? "Akụkọ N'asụsụ Igbo"}` },
			{
				name: "description",
				content: loaderData?.aboutText?.slice(0, 155) || "About Akụkọ N'asụsụ Igbo, an editorial home for Igbo language video and writing."
			},
			{
				property: "og:title",
				content: `About — ${loaderData?.siteName}`
			},
			{
				property: "og:url",
				content: "/about"
			}
		],
		links: [{
			rel: "canonical",
			href: "/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
