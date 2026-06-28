import { Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { FileText, PlusSquare, Settings, LogOut, ExternalLink } from "lucide-react";

const ITEMS = [
  { label: "Posts", to: "/admin" as const, icon: FileText, exact: true },
  { label: "New Post", to: "/admin/new" as const, icon: PlusSquare, exact: false },
  { label: "Settings", to: "/admin/settings" as const, icon: Settings, exact: false },
];

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();
  const queryClient = useQueryClient();

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    router.invalidate();
  };

  const isActive = (to: string, exact: boolean) =>
    exact ? pathname === to : pathname.startsWith(to);

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-line bg-ink text-paper md:min-h-screen">
      <div className="border-b border-paper/15 px-5 py-5">
        <Link to="/admin" className="font-serif text-lg font-bold">
          Akụkọ N'asụsụ Igbo
          <span className="text-accent">.</span>
        </Link>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-soft">
          Editorial Console
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {ITEMS.map((item) => {
          const active = isActive(item.to, item.exact);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent text-paper"
                  : "text-paper/80 hover:bg-paper/10"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-paper/15 p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-paper/80 transition-colors hover:bg-paper/10"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </a>
        <button
          type="button"
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-paper/80 transition-colors hover:bg-paper/10"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}