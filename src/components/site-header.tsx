import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Videos", to: "/videos" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "About", to: "/about" as const },
  { label: "Search", to: "/search" as const },
];

export function SiteHeader({ siteName }: { siteName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink text-paper">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-5 md:px-8">
        <Link
          to="/"
          className="font-serif text-xl font-bold tracking-tight text-paper md:text-2xl"
          onClick={() => setOpen(false)}
        >
          {siteName}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.filter((item) => item.to !== "/search").map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm font-medium uppercase tracking-wider text-paper/85 transition-colors hover:text-accent"
              activeProps={{ className: "!text-accent" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/search"
            aria-label="Search"
            activeProps={{ className: "!text-accent" }}
            className="flex items-center text-paper/85 transition-colors hover:text-accent"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-paper/15 bg-ink md:hidden">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col px-5">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="border-b border-paper/10 py-4 text-sm font-medium uppercase tracking-wider text-paper/85"
                activeProps={{ className: "!text-accent" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}