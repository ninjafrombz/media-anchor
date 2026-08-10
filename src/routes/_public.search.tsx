import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Search, X } from "lucide-react";
import { searchPosts, getAllCategories, type Post } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

const searchSchema = z.object({
  q: z.string().optional().catch(""),
  type: z.enum(["all", "blog", "video"]).optional().catch("all"),
  category: z.string().optional().catch(""),
});

type SearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute("/_public/search")({
  validateSearch: (search) => searchSchema.parse(search),
  loaderDeps: ({ search }) => ({
    q: search.q ?? "",
    type: search.type ?? "all",
    category: search.category ?? "",
  }),
  loader: async ({ deps: { q, type, category } }) => {
    const [posts, categories] = await Promise.all([
      searchPosts({
        q: q || undefined,
        type: type === "all" || !type ? undefined : (type as "blog" | "video"),
        category: category || undefined,
      }),
      getAllCategories(),
    ]);
    return { posts, categories };
  },
  staleTime: 2 * 60 * 1000,
  head: () => ({
    meta: [
      { title: "Search — Akụkọ N'asụsụ Igbo" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { posts, categories } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const q = search.q ?? "";
  const type = search.type ?? "all";
  const category = search.category ?? "";

  const [inputValue, setInputValue] = useState(q);

  // Keep the input in sync when the URL changes (e.g. browser back/forward)
  useEffect(() => {
    setInputValue(q);
  }, [q]);

  const setSearch = (updates: Partial<SearchParams>) => {
    navigate({
      to: "/search",
      search: (prev) => ({ ...prev, ...updates }),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch({ q: inputValue.trim() });
  };

  const clearSearch = () => {
    setInputValue("");
    setSearch({ q: "" });
  };

  const hasFilters = !!q || type !== "all" || !!category;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
      <header className="mb-8 border-b border-line-strong pb-6">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Search</h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Find articles and videos across all content.
        </p>
      </header>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="flex border border-line">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search articles and videos…"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          className="flex-1 bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted"
        />
        {inputValue && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="px-3 text-muted transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          aria-label="Submit search"
          className="bg-accent px-4 py-3 text-paper transition-colors hover:bg-accent-dark"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {/* Filters row */}
      <div className="mt-4 flex flex-wrap items-start gap-4">
        {/* Content type toggle */}
        <div className="flex">
          {(["all", "blog", "video"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSearch({ type: t })}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                type === t
                  ? "bg-ink text-paper"
                  : "border border-line text-muted hover:bg-surface"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Category pills */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSearch({ category: "" })}
              className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                !category
                  ? "bg-accent text-paper"
                  : "border border-line text-muted hover:border-accent hover:text-accent"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSearch({ category: category === cat ? "" : cat })}
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  category === cat
                    ? "bg-accent text-paper"
                    : "border border-line text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-10">
        <p className="mb-6 text-sm text-muted">
          {hasFilters ? (
            <>
              {posts.length} result{posts.length !== 1 ? "s" : ""}
              {q ? <> for &ldquo;{q}&rdquo;</> : null}
              {type !== "all" ? <> in {type}</> : null}
              {category ? <> &middot; {category}</> : null}
            </>
          ) : (
            <>
              {posts.length} item{posts.length !== 1 ? "s" : ""} — all content
            </>
          )}
        </p>

        {posts.length === 0 ? (
          <div className="border border-line bg-surface px-6 py-16 text-center">
            <p className="font-serif text-xl font-bold">No results found</p>
            <p className="mt-2 text-sm text-muted">
              Try different keywords or clear the active filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
