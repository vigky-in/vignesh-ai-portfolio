# Vignesh — AI/ML Engineer Portfolio

A premium dark-theme portfolio (Next.js 14 + Tailwind + Framer Motion + Prisma)
with a full admin dashboard to manage every section — no code edits needed
after setup.

## 1. Install

```bash
npm install
```

This also runs `prisma generate` automatically (postinstall). It needs
internet access to `binaries.prisma.sh` — this only fails inside restricted
sandboxes; a normal machine, Vercel, or Railway will work fine.

## 2. Set up the database

SQLite is used by default — zero setup, no external DB needed to get started.

```bash
cp .env.example .env      # already done if you got this from Claude
npm run db:push           # creates dev.db with all tables
npm run db:seed           # adds your admin login + honest placeholder content
```

The seed script prints your admin login to the terminal:

```
Admin login -> ADMIN_EMAIL / ADMIN_PASSWORD   (from your .env)
```

Change `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` **before** seeding if you
want a specific login.

## 3. Run it

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin/login

## 4. Fill in your real content

Nothing fabricated was seeded for you — no fake testimonials, no invented
projects, no made-up GitHub numbers. Everything marked `ADD_YOUR_*` or left
at 0 is a placeholder. Log into `/admin` and go through each tab:

- **Hero Content** — headline, subheadline, stats, resume link
- **Projects** — add your real projects, mark one "Featured"
- **Professional Journey** — real milestones only
- **Skills** — adjust levels to reflect real experience
- **GitHub Stats** — your actual repo/commit/follower counts
- **Testimonials** — only add ones people actually gave you
- **Social Links, Contact Info, FAQ** — self-explanatory
- **Messages** — inbox for your contact form submissions

## 5. Put your resume file

Drop your PDF at `public/resume.pdf` (or point the "Secondary CTA" URL in
Hero Content admin at wherever you host it).

## 6. Deploy

**Recommended: Vercel (frontend) + a real Postgres DB (Neon/Railway/Supabase)**

1. Push this repo to GitHub.
2. Create a free Postgres database (Neon.tech is easiest).
3. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"   // was "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
4. Import the repo on vercel.com, set environment variables
   (`DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `AUTH_SECRET`) in the
   Vercel dashboard.
5. Vercel runs `npm install && npm run build` automatically. Run
   `npx prisma db push && npx prisma db seed` once via `vercel env pull` +
   local terminal, or a one-off Vercel deploy hook.

SQLite (the default) does **not** persist on Vercel's serverless filesystem,
so switch to Postgres before your real deployment — it works locally as-is.

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
Prisma ORM · SQLite (dev) / PostgreSQL (prod) · JWT cookie auth (jose) ·
lucide-react icons

## Project structure

```
app/
  page.tsx              → public homepage (server component, fetches all content)
  admin/                → dashboard pages (protected by middleware.ts)
  api/
    contact/             → public contact form submission
    admin/                → CRUD routes for every content type
components/
  site/                 → public-facing sections (Hero, Projects, etc.)
  admin/                → Sidebar + generic ResourceManager (CRUD UI)
  ui/                   → shared bits (SectionHeader)
lib/
  prisma.ts, auth.ts, crud.ts, types.ts
prisma/
  schema.prisma, seed.ts
```

## Notes on the admin auth

This uses a simple single-admin, cookie+JWT setup (`lib/auth.ts` +
`middleware.ts`) — intentionally lightweight since only you need access.
For anything beyond a personal portfolio, swap in NextAuth or a proper
auth provider.
