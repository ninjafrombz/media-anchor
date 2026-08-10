import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BHyCFfZI.mjs";
import { l as uniqueSlug, t as extractFacebookSrc, u as uploadThumbnail } from "./posts-YMfmUmqI.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { L as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Bold, T as LoaderCircle, _ as Italic, c as Quote, g as Link, h as ListOrdered, m as List, n as Upload, r as Undo, s as Redo, t as X, v as Heading3, y as Heading2 } from "../_libs/lucide-react.mjs";
import { n as useEditor, t as EditorContent } from "../_libs/fast-equals+tiptap__react.mjs";
import { n as index_default } from "../_libs/@tiptap/extension-link+[...].mjs";
import { t as index_default$1 } from "../_libs/@tiptap/extension-placeholder+[...].mjs";
import { t as index_default$2 } from "../_libs/tiptap__starter-kit.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-form-CtvHDIDp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ToolbarButton({ active, onClick, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick,
		className: `flex h-8 w-8 items-center justify-center border border-line transition-colors hover:bg-surface ${active ? "bg-ink text-paper hover:bg-ink" : "bg-paper text-ink"}`,
		children
	});
}
function RichTextEditor({ value, onChange }) {
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			index_default$2.configure({ heading: { levels: [2, 3] } }),
			index_default.configure({
				openOnClick: false,
				HTMLAttributes: { rel: "noopener" }
			}),
			index_default$1.configure({ placeholder: "Write the article…" })
		],
		content: value || "",
		onUpdate: ({ editor }) => onChange(editor.getHTML()),
		editorProps: { attributes: { class: "tiptap article-body min-h-[300px] px-4 py-3" } }
	});
	(0, import_react.useEffect)(() => {
		if (editor && value && editor.getHTML() !== value) editor.commands.setContent(value, { emitUpdate: false });
	}, [editor, value]);
	if (!editor) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[340px] border border-line bg-surface",
		"aria-hidden": true
	});
	const setLink = () => {
		const prev = editor.getAttributes("link").href;
		const url = window.prompt("Link URL", prev || "https://");
		if (url === null) return;
		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}
		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-1 border-b border-line bg-surface p-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Bold",
					active: editor.isActive("bold"),
					onClick: () => editor.chain().focus().toggleBold().run(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bold, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Italic",
					active: editor.isActive("italic"),
					onClick: () => editor.chain().focus().toggleItalic().run(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Italic, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Heading 2",
					active: editor.isActive("heading", { level: 2 }),
					onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading2, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Heading 3",
					active: editor.isActive("heading", { level: 3 }),
					onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading3, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Bullet list",
					active: editor.isActive("bulletList"),
					onClick: () => editor.chain().focus().toggleBulletList().run(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Numbered list",
					active: editor.isActive("orderedList"),
					onClick: () => editor.chain().focus().toggleOrderedList().run(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListOrdered, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Quote",
					active: editor.isActive("blockquote"),
					onClick: () => editor.chain().focus().toggleBlockquote().run(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Link",
					active: editor.isActive("link"),
					onClick: setLink,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Undo",
					onClick: () => editor.chain().focus().undo().run(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarButton, {
					label: "Redo",
					onClick: () => editor.chain().focus().redo().run(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo, { className: "h-4 w-4" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditorContent, { editor })]
	});
}
function toDateInput(value) {
	const d = value ? new Date(value) : /* @__PURE__ */ new Date();
	return Number.isNaN(d.getTime()) ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}
function PostForm({ initial }) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [title, setTitle] = (0, import_react.useState)(initial?.title ?? "");
	const [type, setType] = (0, import_react.useState)(initial?.type ?? "blog");
	const [category, setCategory] = (0, import_react.useState)(initial?.category ?? "");
	const [publishDate, setPublishDate] = (0, import_react.useState)(toDateInput(initial?.publish_date));
	const [status, setStatus] = (0, import_react.useState)(initial?.status ?? "draft");
	const [excerpt, setExcerpt] = (0, import_react.useState)(initial?.excerpt ?? "");
	const [description, setDescription] = (0, import_react.useState)(initial?.description ?? "");
	const [body, setBody] = (0, import_react.useState)(initial?.body ?? "");
	const [embedCode, setEmbedCode] = (0, import_react.useState)(initial?.embed_code ?? "");
	const [thumbnailUrl, setThumbnailUrl] = (0, import_react.useState)(initial?.thumbnail_url ?? "");
	const [file, setFile] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const embedValid = !embedCode.trim() || !!extractFacebookSrc(embedCode);
	const onFile = (e) => {
		const f = e.target.files?.[0];
		if (f) {
			setFile(f);
			setThumbnailUrl(URL.createObjectURL(f));
		}
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		if (!title.trim()) {
			setError("A title is required.");
			return;
		}
		if (type === "video" && !embedCode.trim()) {
			setError("Paste the Facebook embed code for a video post.");
			return;
		}
		if (embedCode.trim() && !embedValid) {
			setError("That embed code doesn't look like a Facebook video embed.");
			return;
		}
		setSaving(true);
		try {
			let finalThumb = initial?.thumbnail_url ?? null;
			if (file) finalThumb = await uploadThumbnail(file);
			const slug = await uniqueSlug(title, initial?.id);
			const payload = {
				title: title.trim(),
				slug,
				type,
				status,
				category: category.trim() || null,
				publish_date: new Date(publishDate).toISOString(),
				excerpt: excerpt.trim() || null,
				description: description.trim() || null,
				body: type === "blog" ? body : null,
				embed_code: embedCode.trim() || null,
				thumbnail_url: finalThumb
			};
			if (initial) {
				const { error } = await supabase.from("posts").update(payload).eq("id", initial.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("posts").insert(payload);
				if (error) throw error;
			}
			queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
			navigate({ to: "/admin" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save the post.");
			setSaving(false);
		}
	};
	const fieldClass = "w-full border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-accent";
	const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "max-w-3xl px-5 py-8 md:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-3xl font-bold",
			children: initial ? "Edit Post" : "New Post"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelClass,
					children: "Title"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					className: fieldClass,
					placeholder: "Headline"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelClass,
					children: "Type"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: ["blog", "video"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setType(t),
						className: `px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${type === t ? "bg-ink text-paper" : "border border-line text-muted hover:bg-surface"}`,
						children: t
					}, t))
				})] }),
				type === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelClass,
						children: "Facebook embed code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: embedCode,
						onChange: (e) => setEmbedCode(e.target.value),
						rows: 4,
						className: `${fieldClass} font-mono text-xs`,
						placeholder: "Paste the <iframe ...> embed code or video URL"
					}),
					!embedValid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-accent",
						children: "Not recognised as a Facebook video embed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: description,
							onChange: (e) => setDescription(e.target.value),
							rows: 3,
							className: fieldClass,
							placeholder: "Shown beneath the video"
						})]
					})
				] }),
				type === "blog" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelClass,
						children: "Excerpt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: excerpt,
						onChange: (e) => setExcerpt(e.target.value),
						rows: 2,
						className: fieldClass,
						placeholder: "Short summary shown on cards"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelClass,
						children: "Body"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichTextEditor, {
						value: body,
						onChange: setBody
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: labelClass,
							children: "Embed a Facebook video (optional)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: embedCode,
							onChange: (e) => setEmbedCode(e.target.value),
							rows: 3,
							className: `${fieldClass} font-mono text-xs`,
							placeholder: "Paste an <iframe ...> embed to render inside the article"
						}),
						!embedValid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-accent",
							children: "Not recognised as a Facebook video embed."
						})
					] })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-6 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelClass,
						children: "Category tag"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: category,
						onChange: (e) => setCategory(e.target.value),
						className: fieldClass,
						placeholder: "e.g. Culture"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: labelClass,
						children: "Publish date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: publishDate,
						onChange: (e) => setPublishDate(e.target.value),
						className: fieldClass
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelClass,
					children: "Thumbnail image"
				}), thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative inline-block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: thumbnailUrl,
						alt: "Thumbnail preview",
						className: "h-40 w-72 max-w-full border border-line object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Remove thumbnail",
						onClick: () => {
							setThumbnailUrl("");
							setFile(null);
						},
						className: "absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-ink text-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex h-32 w-72 max-w-full cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-line bg-surface text-muted transition-colors hover:border-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wider",
							children: "Upload image"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							onChange: onFile,
							className: "hidden"
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: labelClass,
					children: "Status"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: ["draft", "published"].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStatus(s),
						className: `px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${status === s ? s === "published" ? "bg-accent text-paper" : "bg-ink text-paper" : "border border-line text-muted hover:bg-surface"}`,
						children: s
					}, s))
				})] }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-accent",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 border-t border-line pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: saving,
						className: "flex items-center gap-2 bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-accent-dark disabled:opacity-60",
						children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Save"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate({ to: "/admin" }),
						className: "px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-muted transition-colors hover:text-ink",
						children: "Cancel"
					})]
				})
			]
		})]
	});
}
//#endregion
export { PostForm as t };
