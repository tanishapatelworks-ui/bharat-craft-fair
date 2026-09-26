import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES } from "@/lib/categories";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/list-business")({
  head: () => ({
    meta: [
      { title: "List Your Business — Hunar Hub" },
      {
        name: "description",
        content:
          "Add your artisan or home business to Hunar Hub for free. No fees, no commissions, no tech skills needed — just your name, craft, city and WhatsApp number.",
      },
      { property: "og:title", content: "List Your Business — Hunar Hub" },
      {
        property: "og:description",
        content:
          "Reach buyers beyond your neighborhood. Free listing for Indian artisans and home businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ListBusinessPage,
});

const inputClass =
  "h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function ListBusinessPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const digits = contact.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please enter a valid WhatsApp number (at least 10 digits).");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("listings").insert({
      name: name.trim(),
      category,
      city: city.trim(),
      description: description.trim(),
      contact: digits,
    });
    setSubmitting(false);

    if (insertError) {
      setError("Something went wrong while saving. Please try again.");
      return;
    }
    setDone(true);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
        {done ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground">
              ✓
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-foreground">
              You're listed!
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Your business is now live on Hunar Hub. Buyers can find you and
              message you directly on WhatsApp.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
              >
                See Your Listing
              </Link>
              <button
                onClick={() => {
                  setDone(false);
                  setName("");
                  setCategory("");
                  setCity("");
                  setDescription("");
                  setContact("");
                }}
                className="rounded-full border-2 border-secondary px-6 py-3 text-sm font-bold text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                Add Another
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                List your business — <span className="text-primary">free</span>
              </h1>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
                No sign-up, no fees, no commissions. Fill this short form and
                buyers across India can find you and message you on WhatsApp.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-bold text-foreground"
                >
                  Business name
                </label>
                <input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Meera's Handloom Sarees"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-1.5 block text-sm font-bold text-foreground"
                >
                  Category
                </label>
                <select
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="mb-1.5 block text-sm font-bold text-foreground"
                >
                  City / Town
                </label>
                <input
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Jaipur, Rajasthan"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-bold text-foreground"
                >
                  What do you make or do?
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell buyers about your craft, products, and what makes them special…"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="mb-1.5 block text-sm font-bold text-foreground"
                >
                  WhatsApp number
                </label>
                <input
                  id="contact"
                  required
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. 98765 43210"
                  className={inputClass}
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Buyers will message you on this number. Include country code
                  (91) if outside India.
                </p>
              </div>

              {error && (
                <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {submitting ? "Saving…" : "Publish My Listing"}
              </button>
            </form>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
