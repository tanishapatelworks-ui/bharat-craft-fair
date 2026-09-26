import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, whatsappLink, type Listing } from "@/lib/categories";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hunar Hub — Discover Local Indian Artisans & Home Businesses" },
      {
        name: "description",
        content:
          "A free directory connecting local Indian artisans, weavers, potters, tailors and home cooks with buyers everywhere. No fees, no commissions.",
      },
      { property: "og:title", content: "Hunar Hub — Discover Local Indian Artisans" },
      {
        property: "og:description",
        content:
          "Browse handcrafted sarees, pottery, snacks, woodwork and more — contact makers directly on WhatsApp. Free forever.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("");

  const { data: listings, isLoading, isError } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .order("date_added", { ascending: false });
      if (error) throw error;
      return data as Listing[];
    },
  });

  const cities = useMemo(() => {
    const set = new Set((listings ?? []).map((l) => l.city));
    return Array.from(set).sort();
  }, [listings]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (listings ?? []).filter((l) => {
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q);
      const matchesCategory = category === "All" || l.category === category;
      const matchesCity = !city || l.city === city;
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [listings, search, category, city]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:py-20">
          <p className="text-sm font-bold uppercase tracking-widest text-secondary">
            Free forever · No commissions
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl">
            Handmade in India, discovered{" "}
            <span className="text-primary">everywhere</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Find potters, weavers, tailors, home cooks and craftspeople from
            every corner of India — and chat with them directly on WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#makers"
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Browse Makers
            </a>
            <Link
              to="/list-business"
              className="w-full rounded-full border-2 border-secondary px-6 py-3 text-sm font-bold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground sm:w-auto"
            >
              List Your Business — It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* Directory */}
      <main id="makers" className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        {/* Filters */}
        <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:grid-cols-[1fr_220px_220px]">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, craft, or city…"
            className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div className="mt-8">
          {isLoading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-52 animate-pulse rounded-2xl border border-border bg-card"
                />
              ))}
            </div>
          )}

          {isError && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              Couldn't load listings right now. Please refresh the page.
            </p>
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-input bg-card p-12 text-center">
              <p className="text-lg font-bold text-foreground">
                No makers found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search or filter — or be the first to list in
                this category.
              </p>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l) => (
              <article
                key={l.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                    {l.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(l.date_added).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-extrabold leading-snug text-foreground">
                  {l.name}
                </h2>
                <p className="mt-0.5 text-sm font-semibold text-secondary">
                  📍 {l.city}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {l.description}
                </p>
                <a
                  href={whatsappLink(l.contact, l.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.96L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.45 1.34-2 1.4-.52.05-1.17.24-3.94-.82-3.33-1.31-5.44-4.7-5.6-4.92-.17-.22-1.35-1.8-1.35-3.43 0-1.63.85-2.43 1.15-2.76.3-.33.66-.42.88-.42h.63c.2 0 .47-.07.74.57.27.65.93 2.26 1.01 2.42.08.17.14.36.03.58-.11.22-.17.36-.33.55-.17.2-.35.44-.5.6-.17.16-.34.34-.15.66.2.33.88 1.45 1.9 2.35 1.3 1.16 2.4 1.52 2.74 1.7.33.16.53.14.72-.09.2-.22.83-.97 1.05-1.3.22-.34.44-.28.74-.17.3.11 1.92.9 2.25 1.07.33.17.55.25.63.39.08.14.08.8-.17 1.5Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
