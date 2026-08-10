import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BHyCFfZI.mjs";
import { o as getPublishedPosts } from "./posts-YMfmUmqI.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { S as Check, T as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.settings-DdkyhAqr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery({
		queryKey: ["admin", "settings"],
		queryFn: async () => {
			const [{ data: settings }, posts] = await Promise.all([supabase.from("settings").select("*").eq("id", 1).maybeSingle(), getPublishedPosts()]);
			return {
				settings,
				posts
			};
		}
	});
	const [siteName, setSiteName] = (0, import_react.useState)("");
	const [aboutText, setAboutText] = (0, import_react.useState)("");
	const [featured, setFeatured] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (data?.settings) {
			setSiteName(data.settings.site_name ?? "");
			setAboutText(data.settings.about_text ?? "");
			setFeatured(data.settings.featured_post_id ?? "");
		}
	}, [data?.settings]);
	const onSave = async (e) => {
		e.preventDefault();
		setError(null);
		setSaved(false);
		setSaving(true);
		const { error } = await supabase.from("settings").update({
			site_name: siteName.trim() || "Akụkọ N'asụsụ Igbo",
			about_text: aboutText,
			featured_post_id: featured || null
		}).eq("id", 1);
		setSaving(false);
		if (error) {
			setError(error.message);
			return;
		}
		setSaved(true);
		queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
		setTimeout(() => setSaved(false), 2500);
	};
	const fieldClass = "w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent";
	const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted";
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-accent" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: onSave,
		className: "max-w-2xl px-5 py-8 md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl font-bold",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Update site identity, the About page, and the homepage feature."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelClass,
						children: "Site name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: siteName,
						onChange: (e) => setSiteName(e.target.value),
						className: fieldClass
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelClass,
						children: "About page text"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: aboutText,
						onChange: (e) => setAboutText(e.target.value),
						rows: 8,
						className: fieldClass,
						placeholder: "Separate paragraphs with a blank line."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelClass,
						children: "Featured post (homepage)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: featured,
						onChange: (e) => setFeatured(e.target.value),
						className: fieldClass,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Most recent published (automatic)"
						}), data?.posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: p.id,
							children: [p.type === "video" ? "▸ " : "", p.title]
						}, p.id))]
					})] }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-accent",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-t border-line pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: saving,
							className: "flex items-center gap-2 bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-accent-dark disabled:opacity-60",
							children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Save changes"]
						}), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-sm font-medium text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-accent" }), "Saved"]
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
