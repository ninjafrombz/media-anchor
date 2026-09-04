import { s as getSettings } from "./_ssr/posts-fxqFZ-bx.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public-HbT22W50.js
var $$splitComponentImporter = () => import("./_public-DQeUHA0B.mjs");
var Route = createFileRoute("/_public")({
	loader: async () => {
		return { siteName: (await getSettings())?.site_name ?? "Akụkọ N'asụsụ Igbo" };
	},
	staleTime: Infinity,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
