# CLAUDE.md — Pugsie PA

This file orients Claude at the start of every session in this project. Read it first.

## What this is

**Pugsie PA** is a mobile-first admin assistant for window cleaners and small local service businesses. It handles the messy admin: customers, appointments, job completion, invoices, payments, repeat bookings, route grouping, and seasonal work (Christmas lights).

The whole product hangs off one core workflow:

> Finish the job → tick complete → send invoice → confirm payment → book next visit → send calendar invite → chase if unpaid.

The guiding test for any feature: **does it help the user save time, get paid faster, reduce travel, or secure repeat work?** If not, it's not in the MVP.

## Current state (as of 2026-05-24)

- **Phase 0 (product definition) is done.** PRD, README, and ROADMAP are written and live in this folder.
- **Phase 1 — Supabase database foundation is DONE and verified.** The 8 core tables, RLS policies, and Storage buckets are all live in the project below. Security advisor is clean (0 warnings).
- **Still to do in Phase 1:** Railway backend skeleton + health check, Next.js app skeleton with Supabase Auth login, env vars wired up. Cross-business RLS isolation is structurally complete but should be smoke-tested once auth/login works (it's a Phase 1 exit criterion).
- **Frontend decided: Next.js** — a mobile-first responsive web app (not Expo/React Native for now). Reasons: fastest to ship, works in the phone browser immediately, no app store approval, simplest path for a first launch. A native app can come later. Not scaffolded yet.
- **Accounts:** Ringo has Supabase and Railway accounts. Supabase project for Pugsie PA now exists (see below). Railway project not created yet. Stripe is **not set up yet** (needed for Phase 5).

## Supabase project

- **Name:** Pugsie PA
- **Project ref / ID:** `tzlscfbfpfvginwdphru`
- **Region:** eu-west-1 (Ireland) — fine for a UK product
- **API URL:** `https://tzlscfbfpfvginwdphru.supabase.co`
- **Org:** "Car Crash Supabase" (`mqpzmbmtbredczwwpaqe`), paid plan; this project bills $10/month.
- **Multi-tenancy model:** every business-owned table has a `business_id`. RLS uses `private.current_business_id()` (a SECURITY DEFINER helper in the non-API `private` schema) to scope every read/write to the logged-in user's business. A trigger on `auth.users` auto-creates a `profiles` row on signup; onboarding then creates a `businesses` row and links the profile's `business_id`.
- **Onboarding flow the app must implement:** sign up → profile auto-created (business_id null) → app inserts a `businesses` row → app updates own profile's `business_id` → all other tables become accessible.
- **Storage buckets:** `invoices` and `photos`, both private; files must be stored under a `<business_id>/...` path prefix for the isolation policy to work.

## Tech stack

- **Frontend:** Next.js (mobile-first responsive web app)
- **Database / Auth / Storage:** Supabase (Postgres + Auth + Storage + Row Level Security)
- **Backend / automations:** Railway (Node.js — Express or Fastify; webhooks, scheduled jobs, invoice + calendar generation)
- **Payments:** Stripe Payment Links / Checkout (Phase 5)
- **Email:** Resend, SendGrid, or Postmark (TBD)
- **Calendar:** `.ics` invites first, full Google/Outlook sync later

Supabase is the single source of truth for business data. Railway runs everything that needs a server: Stripe webhooks, invoice PDFs, email, calendar invites, reminder jobs, route grouping, and AI calls.

## Build order (from ROADMAP.md)

Build money-first, AI last. The short version:

1. Supabase project + Auth + core schema + RLS policies
2. Railway backend skeleton + env vars + health check
3. Customers (add/edit/list/search)
4. Jobs + daily list + basic calendar
5. Job Complete checkbox + completion workflow
6. Invoice generation + cash/manual paid status + unpaid dashboard
7. Stripe payment links + webhooks
8. Repeat appointments + `.ics` calendar invites
9. Payment reminders (scheduled)
10. Smart Rounds (postcode grouping)
11. Christmas lights CRM
12. AI assistant

The current target is steps 1–2 (Phase 1 foundation).

## Core data model

Initial Supabase tables: `businesses`, `profiles`, `customers`, `jobs`, `invoices`, `payments`, `messages`, `seasonal_services`. Field-level detail is in `PRD (1).md` section 10 — refer to it rather than reinventing the schema. Every business-owned table needs RLS so one business can never see another's data.

## Development principles

- Mobile-first, designed for use in a van, not at a desk.
- Big buttons, checkbox-led flows, minimal typing, sensible defaults.
- Make money status obvious (paid / unpaid / overdue).
- Start simple: email before SMS/WhatsApp, `.ics` before calendar sync, postcode grouping before route optimisation.
- Don't overbuild the AI layer before the core admin workflow works.
- Keep solutions simple and practical — don't over-engineer. Build the smallest thing that delivers the value, then iterate.

## How to work with Ringo

- Ringo is a former chef, new to coding (started ~early 2026) and learning fast. Treat this as a mentoring partnership.
- Explain concisely but thoroughly, with practical examples and actionable next steps. Use real industry terms but don't drown him in jargon.
- Keep it conversational and to the point. Avoid heavy formatting in chat.
- Check your own work. Flag risks and trade-offs plainly rather than just doing the clever thing.
- When a decision has real consequences (cost, security, lock-in, rework), pause and lay out the options before building.

## Key references in this folder

- `PRD (1).md` — full product requirements, data model, features, success metrics, open questions.
- `ROADMAP.md` — phased build plan with exit criteria for each phase.
- `README.md` — product summary, tech stack, env var examples, dev principles.

## Open questions still to settle (PRD section 14)

A few decisions are deferred until they're actually needed, so we don't block the build:

- Email-only at MVP, or email + SMS?
- VAT support from MVP, or later?
- Team/staff accounts in MVP, or later?
- Christmas lights as a separate module, or a tag-driven workflow?
- GoCardless planned from day one for repeat customers, or Stripe-only first?

Surface these when the relevant phase comes up — don't pre-solve them.
