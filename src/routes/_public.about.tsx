import { createFileRoute } from "@tanstack/react-router";
import { getSettings } from "@/lib/posts";

export const Route = createFileRoute("/_public/about")({
  loader: async () => {
    const settings = await getSettings();
    return {
      siteName: settings?.site_name ?? "Akụkọ N'asụsụ Igbo",
      aboutText: settings?.about_text ?? "",
    };
  },
  staleTime: Infinity,
  head: ({ loaderData }) => ({
    meta: [
      { title: `About — ${loaderData?.siteName ?? "Akụkọ N'asụsụ Igbo"}` },
      {
        name: "description",
        content:
          loaderData?.aboutText?.slice(0, 155) ||
          "About Akụkọ N'asụsụ Igbo, an editorial home for Igbo language video and writing.",
      },
      { property: "og:title", content: `About — ${loaderData?.siteName}` },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { siteName, aboutText } = Route.useLoaderData();
  const paragraphs = aboutText.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-[760px] px-5 py-12 md:py-20">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
        About
      </span>
      <h1 className="mt-3 font-serif text-4xl font-bold leading-[1.1] md:text-5xl">
        {siteName}
      </h1>
      <div className="article-body mt-8">
        {paragraphs.length > 0 ? (
          paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)
        ) : (
          <p className="text-muted">No description has been added yet.</p>
        )}
      </div>
    </div>
  );
}