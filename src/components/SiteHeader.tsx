import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            ह
          </span>
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Hunar<span className="text-primary">Hub</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Browse Makers
          </Link>
          <Link
            to="/list-business"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            List Your Business
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <p className="text-lg font-extrabold text-foreground">
          Hunar<span className="text-primary">Hub</span>
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          A free directory connecting local Indian artisans and home businesses
          with buyers everywhere. No fees, no commissions, no tech skills
          needed.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Made with ♥ for India's makers
        </p>
      </div>
    </footer>
  );
}
