import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    // On success, the auth listener in the admin layout takes over.
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 text-paper">
      <div className="w-full max-w-sm">
        <h1 className="text-center font-serif text-3xl font-bold">
          Akụkọ N'asụsụ Igbo
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-2 text-center text-xs uppercase tracking-[0.2em] text-muted-soft">
          Editorial Console
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/70">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full border border-paper/25 bg-transparent px-3 py-2.5 text-sm text-paper outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-paper/70">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full border border-paper/25 bg-transparent px-3 py-2.5 text-sm text-paper outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-sm text-accent">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}