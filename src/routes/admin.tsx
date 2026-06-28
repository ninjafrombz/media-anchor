import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LoginForm } from "@/components/admin/login-form";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Editorial Console" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminGate,
});

type Status = "loading" | "anon" | "denied" | "ok";

function AdminGate() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let mounted = true;

    const resolve = async (hasSession: boolean) => {
      if (!hasSession) {
        if (mounted) setStatus("anon");
        return;
      }
      // First account to claim becomes admin; returns true if user is admin.
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

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-paper">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (status === "anon") return <LoginForm />;

  if (status === "denied") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-5 text-center text-paper">
        <h1 className="font-serif text-2xl font-bold">Access restricted</h1>
        <p className="max-w-sm text-sm text-muted-soft">
          This account is not authorised for the editorial console.
        </p>
        <button
          type="button"
          onClick={() => supabase.auth.signOut()}
          className="border-b-2 border-accent pb-1 text-sm font-semibold uppercase tracking-wider"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}