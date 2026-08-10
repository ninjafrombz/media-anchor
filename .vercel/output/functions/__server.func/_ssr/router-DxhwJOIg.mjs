import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BHyCFfZI.mjs";
import { a as require_react, i as require_jsx_runtime, n as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { R as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$5 } from "../_public-B_FQWtSy.mjs";
import { t as Route$6 } from "../_public.about-BB4x0yr1.mjs";
import { t as Route$7 } from "../_public.blog-D_MGL0R8.mjs";
import { t as Route$8 } from "../_public.blog._slug-DEEmhjzf.mjs";
import { t as Route$9 } from "../_public.index-BHpneXzx.mjs";
import { t as Route$10 } from "../_public.search-IUakfNYY.mjs";
import { t as Route$11 } from "../_public.videos-CSRfd-Ui.mjs";
import { n as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$12 } from "./admin.edit._id-C7ppyPEY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DxhwJOIg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-870KIBzl.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Akụkọ N'asụsụ Igbo" },
			{
				name: "description",
				content: "Akụkọ N'asụsụ Igbo — editorial video reports and written features in the Igbo language."
			},
			{
				property: "og:site_name",
				content: "Akụkọ N'asụsụ Igbo"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => data.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$3 = () => import("./admin-CizyCmnz.mjs");
var Route$3 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Editorial Console" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.index-DwG_9tNS.mjs");
var Route$2 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.settings-DdkyhAqr.mjs");
var Route$1 = createFileRoute("/admin/settings")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.new-BM3D8cIb.mjs");
var Route = createFileRoute("/admin/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var AdminRoute = Route$3.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$4
});
var PublicRoute = Route$5.update({
	id: "/_public",
	getParentRoute: () => Route$4
});
var AdminIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var PublicIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => PublicRoute
});
var AdminSettingsRoute = Route$1.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AdminRoute
});
var AdminNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminRoute
});
var PublicVideosRoute = Route$11.update({
	id: "/videos",
	path: "/videos",
	getParentRoute: () => PublicRoute
});
var PublicSearchRoute = Route$10.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => PublicRoute
});
var PublicBlogRoute = Route$7.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => PublicRoute
});
var PublicAboutRoute = Route$6.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => PublicRoute
});
var AdminEditIdRoute = Route$12.update({
	id: "/edit/$id",
	path: "/edit/$id",
	getParentRoute: () => AdminRoute
});
var PublicBlogRouteChildren = { PublicBlogSlugRoute: Route$8.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => PublicBlogRoute
}) };
var PublicRouteChildren = {
	PublicAboutRoute,
	PublicBlogRoute: PublicBlogRoute._addFileChildren(PublicBlogRouteChildren),
	PublicSearchRoute,
	PublicVideosRoute,
	PublicIndexRoute
};
var PublicRouteWithChildren = PublicRoute._addFileChildren(PublicRouteChildren);
var AdminRouteChildren = {
	AdminNewRoute,
	AdminSettingsRoute,
	AdminIndexRoute,
	AdminEditIdRoute
};
var rootRouteChildren = {
	PublicRoute: PublicRouteWithChildren,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren)
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadDelay: 100,
		defaultPreloadStaleTime: 3e4
	});
};
//#endregion
export { getRouter };
