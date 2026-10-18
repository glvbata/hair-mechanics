# Lead gen: /new-client form, function, and leads table

Status: **DRAFT, branch `feat/lead-gen`.** Copy owner Nami, build Nika. Nothing is live until Gian approves and Glen says yes to the offer.

## What's in it

| Piece | File | Notes |
|---|---|---|
| Promo landing | `src/pages/NewClient.tsx` | `/new-client`. noindex, not in nav or sitemap while draft. |
| Lead form | `src/components/LeadForm.tsx` | 4 fields + optional SMS consent + honeypot. Posts JSON to the function. |
| Privacy Policy | `src/pages/Privacy.tsx` | `/privacy`, footer link. |
| SMS Terms | `src/pages/Terms.tsx` | `/terms`, footer link. Needed for 10DLC since June 30, 2026. |
| Function | `netlify/functions/lead.mjs` | Validates, stores (or not), logs the alert text. |
| Table | `supabase/migrations/20261017120000_create_leads.sql` | **Not applied anywhere yet.** |
| Env | `.env.example` | `SUPABASE_URL`, `SUPABASE_ANON_KEY` (server-only). |
| Test | `scripts/test-lead.mjs` | Runs the function in demo mode with 4 fake submits. |

The bracketed placeholders on the pages (`[EFFECTIVE DATE — set when published]`, `[EMAIL — Glen to confirm]`, `[12 MONTHS — Glen to confirm]`, `[END DATE — Glen sets]`) are on purpose. They are the open items; fill them before the DRAFT banners come off.

## Demo mode (how it runs today)

The function looks for `SUPABASE_URL` and `SUPABASE_ANON_KEY`. If either is missing it runs in **demo mode**: it validates the submit, stores nothing, and prints two log lines to the Netlify function log:

1. The alert text that will one day go to Glen by SMS (form-labels.md #5), and
2. the email alert for Glen + Gian (#6) with subject, submit time and page source.

The phone number is masked to its last 4 digits in every log line, in both modes. The "tap when contacted" link reads `(demo: no link yet)`.

Nothing is sent in either mode: no SMS, no Twilio, no email. The form still shows the thank-you message and GA4 still records `generate_lead` (params `service`, `source`, `sms_consent`), so the funnel can be watched before storage exists. Demo mode cannot detect duplicates (there is nothing to compare against).

Try it locally without a server:

```bash
node scripts/test-lead.mjs
```

## Env vars

Set in Netlify → Site configuration → Environment variables. Server-side only; **no `VITE_` prefix**, so they never reach the browser bundle.

| Var | What |
|---|---|
| `SUPABASE_URL` | Project URL, e.g. `https://xxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | The anon (publishable) key. Insert-only on `public.leads` thanks to RLS; it can never read leads. |

Local copy goes in `.env` (gitignored). Never commit real values.

## Applying the migration later

1. Create the Supabase project (none exists for this site yet).
2. Run `supabase/migrations/20261017120000_create_leads.sql` in the SQL editor, or `supabase db push` with the CLI.
3. Set the two env vars in Netlify and redeploy. The function switches to **supabase mode** on its own (`mode: "supabase"` in the response).
4. Submit the form once with your own number and check the row in Table Editor → `leads`.

What the migration gives you:

- `public.leads` with the form fields plus consent proof (`sms_consent`, `consent_at`, `disclosure_version`, `page_url`) and follow-up fields (`sms_opted_out`, `contacted_at`, `booked`, `visited_at`, `upsold`).
- RLS on. One policy: anon may INSERT a clean row (constraints repeated, follow-up fields must be empty). SELECT/UPDATE/DELETE are revoked from `anon` and `authenticated`. Reading happens in the dashboard.
- A `BEFORE INSERT` trigger (security definer, fixed `search_path`) that rejects a second request from the same phone within 24 hours. It raises `duplicate_lead_24h`; PostgREST returns 409; the function answers `{ok:false, code:"duplicate"}`; the form shows Nami's duplicate banner. The trigger also pins `created_at` to server time and clears consent fields when `sms_consent` is false.

The `disclosure_version` constant lives in `lead.mjs` (`sms-v1-2026-10-17`). Bump it whenever the disclosure text on the form changes.

## No SMS until 10DLC is approved

The SMS consent box is optional, unchecked by default, and separate from everything else (10DLC rules). Automated texts (confirmation, follow-up, HELP/STOP replies, Glen's alert) only exist as copy in Nami's form-labels.md. Before any of them can go out:

1. `/privacy` and `/terms` must be live and public with every placeholder filled. Reviewers check the live form.
2. Register the 10DLC brand + campaign (Twilio) with those two URLs.
3. Only then wire Twilio into the function, gated on `sms_consent = true` and `sms_opted_out = false`.

Until then the function logs the alert text and that is all.

## Why not Netlify Forms

Netlify Forms was considered and skipped:

- **Consent proof.** 10DLC wants the consent timestamp, the exact disclosure version and the page URL stored with each lead, plus opt-outs. Netlify Forms stores whatever fields are posted with no server-side rules; the table with constraints and the trigger do that work.
- **Duplicate check.** "Same phone in the last 24 hours" needs a lookup. Netlify Forms has none.
- **Follow-up fields.** Speed-to-lead and lead-to-visit (`contacted_at`, `visited_at`, `booked`) need a real table that Glen's future tap link can update.
- **Validation + honeypot.** The function enforces the same rules as the form and drops honeypot hits silently, instead of relying on Netlify's spam filter.
- **Prerendered React.** Netlify Forms needs the `netlify` attribute on static HTML at build time. It can work with prerendering but is fragile with hydration; a plain function is one less thing to debug.

A Netlify Function + Supabase table costs nothing at this volume and leaves a clean path to SMS and email later.
