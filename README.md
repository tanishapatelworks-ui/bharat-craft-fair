# Craft Connect

App Name:Hunar Hub

One-liner: Free digital directory connecting local Indian artisans/home businesses to buyers beyond their neighborhood — no fees, no tech skills needed.

Problem: Skilled artisans (potters, weavers, tailors, home cooks, jewelry/woodwork makers) stay limited to local word-of-mouth. E-commerce platforms need GST, charge commission, require tech skills — excluding them.

Core Pages:

List Your Business (form): Name, Category (dropdown), City, Description, WhatsApp number → saves to database, no login

Browse Makers (directory): Search bar + Category filter + City filter → grid of listing cards → each card has WhatsApp contact link (wa.me)

Categories: Handicrafts, Textiles & Tailoring, Food & Snacks, Pottery & Home Decor, Jewelry, Woodwork, Beauty & Wellness, Other

Data fields per listing: name, category, city, description, contact, date_added

Tech requirement: Real backend (Supabase) — shared database, listings visible to all users, not local-only

Seed data: 5-6 sample listings pre-loaded (different categories/states) so it's not empty on launch

Design: Earthy/craft aesthetic — rust/terracotta primary + slate blue secondary, clean sans-serif, mobile-first, card-based grid layout

Purpose (context only, not UI): UN SDG 9 (Industry, Innovation & Infrastructure) — inclusive digital market access for informal-sector small businesses

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bharat-craft-fair.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2ef49bdb-4fb5-42c6-a481-a24314ab3422).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
