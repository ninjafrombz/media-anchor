import { c as searchPosts, r as getAllCategories } from "./_ssr/posts-YMfmUmqI.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, r as stringType, t as enumType } from "./_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.search-IUakfNYY.js
var $$splitComponentImporter = () => import("./_public.search-C8qA0RrV.mjs");
var searchSchema = objectType({
	q: stringType().optional().catch(""),
	type: enumType([
		"all",
		"blog",
		"video"
	]).optional().catch("all"),
	category: stringType().optional().catch("")
});
var Route = createFileRoute("/_public/search")({
	validateSearch: (search) => searchSchema.parse(search),
	loaderDeps: ({ search }) => ({
		q: search.q ?? "",
		type: search.type ?? "all",
		category: search.category ?? ""
	}),
	loader: async ({ deps: { q, type, category } }) => {
		const [posts, categories] = await Promise.all([searchPosts({
			q: q || void 0,
			type: type === "all" || !type ? void 0 : type,
			category: category || void 0
		}), getAllCategories()]);
		return {
			posts,
			categories
		};
	},
	staleTime: 120 * 1e3,
	head: () => ({ meta: [{ title: "Search — Akụkọ N'asụsụ Igbo" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
