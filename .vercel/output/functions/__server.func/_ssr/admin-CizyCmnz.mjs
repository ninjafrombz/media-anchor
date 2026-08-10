import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BHyCFfZI.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { R as useRouter, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as LoaderCircle, a as Settings, b as FileText, p as LogOut, w as SquarePlus, x as ExternalLink } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CizyCmnz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginForm() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) setError(error.message);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-ink px-5 text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-center font-serif text-3xl font-bold",
					children: ["Akụkọ N'asụsụ Igbo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-xs uppercase tracking-[0.2em] text-muted-soft",
					children: "Editorial Console"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mt-10 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/70",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value),
							autoComplete: "email",
							className: "w-full border border-paper/25 bg-transparent px-3 py-2.5 text-sm text-paper outline-none focus:border-accent"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/70",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							autoComplete: "current-password",
							className: "w-full border border-paper/25 bg-transparent px-3 py-2.5 text-sm text-paper outline-none focus:border-accent"
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-accent",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading,
							className: "flex w-full items-center justify-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-accent-dark disabled:opacity-60",
							children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Sign in"]
						})
					]
				})
			]
		})
	});
}
var ITEMS = [
	{
		label: "Posts",
		to: "/admin",
		icon: FileText,
		exact: true
	},
	{
		label: "New Post",
		to: "/admin/new",
		icon: SquarePlus,
		exact: false
	},
	{
		label: "Settings",
		to: "/admin/settings",
		icon: Settings,
		exact: false
	}
];
function AdminSidebar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const router = useRouter();
	const queryClient = useQueryClient();
	const signOut = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		router.invalidate();
	};
	const isActive = (to, exact) => exact ? pathname === to : pathname.startsWith(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "flex w-56 shrink-0 flex-col border-r border-line bg-ink text-paper md:min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-paper/15 px-5 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin",
					className: "font-serif text-lg font-bold",
					children: ["Akụkọ N'asụsụ Igbo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-soft",
					children: "Editorial Console"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-1 flex-col gap-1 p-3",
				children: ITEMS.map((item) => {
					const active = isActive(item.to, item.exact);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: `flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-accent text-paper" : "text-paper/80 hover:bg-paper/10"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4" }), item.label]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1 border-t border-paper/15 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					target: "_blank",
					rel: "noopener",
					className: "flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-paper/80 transition-colors hover:bg-paper/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), "View site"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: signOut,
					className: "flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-paper/80 transition-colors hover:bg-paper/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), "Sign out"]
				})]
			})
		]
	});
}
function AdminGate() {
	const [status, setStatus] = (0, import_react.useState)("loading");
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const resolve = async (hasSession) => {
			if (!hasSession) {
				if (mounted) setStatus("anon");
				return;
			}
			const { data, error } = await supabase.rpc("claim_admin");
			if (!mounted) return;
			setStatus(!error && data === true ? "ok" : "denied");
		};
		supabase.auth.getSession().then(({ data }) => {
			resolve(!!data.session);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
			setStatus("loading");
			resolve(!!session);
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	if (status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-ink text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-accent" })
	});
	if (status === "anon") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {});
	if (status === "denied") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-5 text-center text-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-2xl font-bold",
				children: "Access restricted"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted-soft",
				children: "This account is not authorised for the editorial console."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => supabase.auth.signOut(),
				className: "border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider",
				children: "Sign out"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-paper md:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 overflow-x-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		})]
	});
}
//#endregion
export { AdminGate as component };
