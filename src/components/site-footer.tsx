import { Link } from "@tanstack/react-router";

export function SiteFooter({ siteName }: { siteName: string }) {
  return (
    <footer className="mt-24 border-t border-line-strong bg-ink text-paper">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              to="/"
              className="font-serif text-2xl font-bold tracking-tight text-paper"
            >
              {siteName}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-soft">
              An editorial home for video reports and written features in the
              Igbo language.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm uppercase tracking-wider">
            <Link to="/" className="text-paper/80 transition-colors hover:text-accent">
              Home
            </Link>
            <Link
              to="/videos"
              className="text-paper/80 transition-colors hover:text-accent"
            >
              Videos
            </Link>
            <Link
              to="/blog"
              className="text-paper/80 transition-colors hover:text-accent"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-paper/80 transition-colors hover:text-accent"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="mt-10 border-t border-paper/15 pt-6 text-xs uppercase tracking-wider text-muted-soft">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}