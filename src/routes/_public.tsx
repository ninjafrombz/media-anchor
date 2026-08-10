import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSettings } from "@/lib/posts";

export const Route = createFileRoute("/_public")({
  loader: async () => {
    const settings = await getSettings();
    return { siteName: settings?.site_name ?? "Akụkọ N'asụsụ Igbo" };
  },
  staleTime: Infinity,
  component: PublicLayout,
});

function PublicLayout() {
  const { siteName } = Route.useLoaderData();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader siteName={siteName} />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <SiteFooter siteName={siteName} />
    </div>
  );
}