import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BHyCFfZI.mjs";
import { n as formatDate } from "./posts-YMfmUmqI.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as LoaderCircle, d as Pencil, i as Trash2, l as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DwG_9tNS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function fetchAllPosts() {
	const { data, error } = await supabase.from("posts").select("*").order("publish_date", { ascending: false });
	if (error) throw error;
	return data ?? [];
}
function PostsTable() {
	const queryClient = useQueryClient();
	const { data: posts, isLoading } = useQuery({
		queryKey: ["admin", "posts"],
		queryFn: fetchAllPosts
	});
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const onDelete = async (post) => {
		if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
		setDeletingId(post.id);
		const { error } = await supabase.from("posts").delete().eq("id", post.id);
		setDeletingId(null);
		if (error) {
			window.alert(error.message);
			return;
		}
		queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-8 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl font-bold",
				children: "Posts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "All videos and articles."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/admin/new",
				className: "flex items-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-accent-dark",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "New Post"]
			})]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-center py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-accent" })
		}) : !posts || posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border border-line bg-surface px-6 py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "No posts yet."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/new",
				className: "mt-4 inline-block border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider",
				children: "Create your first post"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto border border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] border-collapse text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line bg-surface text-left text-xs uppercase tracking-wider text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: "Title"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: "Type"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: "Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-semibold",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Actions"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: post.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 capitalize text-ink-soft",
							children: post.type
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-ink-soft",
							children: formatDate(post.publish_date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `inline-block px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${post.status === "published" ? "bg-ink text-paper" : "border border-line text-muted"}`,
								children: post.status
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/edit/$id",
									params: { id: post.id },
									"aria-label": "Edit",
									className: "flex h-8 w-8 items-center justify-center border border-line transition-colors hover:bg-surface",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Delete",
									disabled: deletingId === post.id,
									onClick: () => onDelete(post),
									className: "flex h-8 w-8 items-center justify-center border border-line text-accent transition-colors hover:bg-accent hover:text-paper disabled:opacity-50",
									children: deletingId === post.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})
						})
					]
				}, post.id)) })]
			})
		})]
	});
}
//#endregion
export { PostsTable as component };
