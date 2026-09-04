import { t as supabase } from "./client-DJs9vf2Q.mjs";
import { i as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as Route } from "./admin.edit._id-BPzU7gCC.mjs";
import { t as PostForm } from "./post-form-DAW7vH4-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.edit._id-DGa5dALJ.js
var import_jsx_runtime = require_jsx_runtime();
function EditPost() {
	const { id } = Route.useParams();
	const { data, isLoading, error } = useQuery({
		queryKey: [
			"admin",
			"post",
			id
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-accent" })
	});
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 py-20 text-center md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-2xl font-bold",
			children: "Post not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin",
			className: "mt-4 inline-block border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider",
			children: "Back to posts"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostForm, { initial: data });
}
//#endregion
export { EditPost as component };
