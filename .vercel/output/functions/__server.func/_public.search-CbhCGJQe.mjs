import { r as __toESM } from "./_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { L as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as Search, t as X } from "./_libs/lucide-react.mjs";
import { t as PostCard } from "./_ssr/post-card-ButMnOtT.mjs";
import { n as objectType, r as stringType, t as enumType } from "./_libs/zod.mjs";
import { t as Route } from "./_public.search-DTrXR0cc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_public.search-CbhCGJQe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
objectType({
	q: stringType().optional().catch(""),
	type: enumType([
		"all",
		"blog",
		"video"
	]).optional().catch("all"),
	category: stringType().optional().catch("")
});
function SearchPage() {
	const { posts, categories } = Route.useLoaderData();
	const search = Route.useSearch();
	const navigate = useNavigate();
	const q = search.q ?? "";
	const type = search.type ?? "all";
	const category = search.category ?? "";
	const [inputValue, setInputValue] = (0, import_react.useState)(q);
	(0, import_react.useEffect)(() => {
		setInputValue(q);
	}, [q]);
	const setSearch = (updates) => {
		navigate({
			to: "/search",
			search: (prev) => ({
				...prev,
				...updates
			})
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setSearch({ q: inputValue.trim() });
	};
	const clearSearch = () => {
		setInputValue("");
		setSearch({ q: "" });
	};
	const hasFilters = !!q || type !== "all" || !!category;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8 border-b border-line-strong pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-4xl font-bold md:text-5xl",
					children: "Search"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-ink-soft",
					children: "Find articles and videos across all content."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "flex border border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: inputValue,
						onChange: (e) => setInputValue(e.target.value),
						placeholder: "Search articles and videos…",
						autoFocus: true,
						className: "flex-1 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
					}),
					inputValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: clearSearch,
						"aria-label": "Clear search",
						className: "px-3 text-muted transition-colors hover:text-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						"aria-label": "Submit search",
						className: "bg-accent px-4 py-3 text-paper transition-colors hover:bg-accent-dark",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-start gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex",
					children: [
						"all",
						"blog",
						"video"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSearch({ type: t }),
						className: `px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${type === t ? "bg-ink text-paper" : "border border-line text-muted hover:bg-surface"}`,
						children: t
					}, t))
				}), categories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSearch({ category: "" }),
						className: `px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${!category ? "bg-accent text-paper" : "border border-line text-muted hover:border-accent hover:text-accent"}`,
						children: "All"
					}), categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSearch({ category: category === cat ? "" : cat }),
						className: `px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${category === cat ? "bg-accent text-paper" : "border border-line text-muted hover:border-accent hover:text-accent"}`,
						children: cat
					}, cat))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-6 text-sm text-muted",
					children: hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						posts.length,
						" result",
						posts.length !== 1 ? "s" : "",
						q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							" for “",
							q,
							"”"
						] }) : null,
						type !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" in ", type] }) : null,
						category ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", category] }) : null
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						posts.length,
						" item",
						posts.length !== 1 ? "s" : "",
						" — all content"
					] })
				}), posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-line bg-surface px-6 py-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-serif text-xl font-bold",
						children: "No results found"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Try different keywords or clear the active filters."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
					children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
				})]
			})
		]
	});
}
//#endregion
export { SearchPage as component };
