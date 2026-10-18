-- =============================================================================
-- Hair Mechanics: public.leads
--
-- STATUS: NOT APPLIED ANYWHERE. There is no Supabase project for this site yet.
-- When one exists, apply with the Supabase SQL editor or `supabase db push`,
-- then set SUPABASE_URL + SUPABASE_ANON_KEY in Netlify. See docs/lead-gen.md.
--
-- Written by the /new-client form via netlify/functions/lead.mjs using the
-- anon key over PostgREST. The anon role may INSERT and nothing else: no
-- SELECT, UPDATE or DELETE policies, and those privileges are revoked outright
-- so a leaked anon key can never read the list. Reading and follow-up
-- (contacted_at, booked, ...) happen from the Supabase dashboard or a future
-- authenticated admin, never from the browser.
--
-- 10DLC proof of consent: sms_consent + consent_at + disclosure_version +
-- page_url are stored with every lead. Opt-outs are kept (sms_opted_out) so
-- a number that said STOP is never texted again.
-- =============================================================================

create table if not exists public.leads (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  first_name          text not null check (char_length(first_name) between 1 and 40),
  phone               text not null check (phone ~ '^\+1[0-9]{10}$'),   -- E.164, US only
  preferred_time      text check (preferred_time is null or char_length(preferred_time) <= 80),
  service             text not null check (service in ('haircut', 'fade', 'haircut_beard', 'kids_cut')),
  sms_consent         boolean not null default false,
  consent_at          timestamptz,
  disclosure_version  text,
  page_url            text check (page_url is null or char_length(page_url) <= 500),
  source              text check (source is null or char_length(source) <= 32),
  sms_opted_out       boolean not null default false,
  contacted_at        timestamptz,
  booked              boolean,
  visited_at          timestamptz,
  upsold              text,
  -- A "yes" to texts must carry its proof: when, and which disclosure text.
  constraint leads_consent_has_proof
    check (sms_consent = false or (consent_at is not null and disclosure_version is not null))
);

comment on table public.leads is
  'New-client leads from hairmechanics.net/new-client. Insert-only for anon; read from dashboard/service role.';
comment on column public.leads.first_name         is 'First name only. No notes field anywhere: we must not collect health details (WA My Health My Data Act).';
comment on column public.leads.phone              is 'E.164, e.g. +12535550123. Normalized by the lead function.';
comment on column public.leads.preferred_time     is 'Free text "best day or time", optional, max 80 chars.';
comment on column public.leads.service            is 'haircut | fade | haircut_beard | kids_cut';
comment on column public.leads.sms_consent        is 'True only if the lead ticked the optional SMS box. No automated texts otherwise.';
comment on column public.leads.consent_at         is 'When the SMS box was ticked (server time). Null unless sms_consent.';
comment on column public.leads.disclosure_version is 'Version tag of the disclosure text shown, e.g. sms-v1-2026-10-17. Null unless sms_consent.';
comment on column public.leads.page_url           is 'Page the form was on (origin + path + query), for consent proof.';
comment on column public.leads.source             is 'Where the lead came from: site, meta, gbp, ... (from ?source= on the landing page).';
comment on column public.leads.sms_opted_out      is 'Set true on STOP. Never text this number again. Kept even if the lead is deleted on request.';
comment on column public.leads.contacted_at       is 'When Glen first called/texted back (speed-to-lead KPI). Set via the tap link, later.';
comment on column public.leads.booked             is 'Did the lead book a visit?';
comment on column public.leads.visited_at         is 'When the lead actually sat in the chair (lead-to-visit KPI).';
comment on column public.leads.upsold             is 'What they added at the chair, e.g. haircut_beard.';

-- Lookup used by the 24h duplicate check.
create index if not exists leads_phone_created_at_idx on public.leads (phone, created_at desc);

-- -----------------------------------------------------------------------------
-- BEFORE INSERT trigger: 24h duplicate check + server-set fields.
--
-- The anon role cannot SELECT, so the function cannot check for duplicates
-- itself. This trigger runs as the table owner (security definer, fixed
-- search_path) and raises unique_violation with a recognizable message.
-- PostgREST turns that into HTTP 409 with 'duplicate_lead_24h' in the body;
-- lead.mjs maps it to {ok:false, code:'duplicate'}.
-- -----------------------------------------------------------------------------
create or replace function public.leads_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Server-set: a client cannot backdate a row (and so dodge the 24h check).
  new.created_at := now();

  -- Consent proof travels only with a real "yes".
  if new.sms_consent then
    new.consent_at := coalesce(new.consent_at, now());
  else
    new.consent_at := null;
    new.disclosure_version := null;
  end if;

  if exists (
    select 1
    from public.leads l
    where l.phone = new.phone
      and l.created_at > now() - interval '24 hours'
  ) then
    raise exception 'duplicate_lead_24h'
      using errcode = 'unique_violation',
            hint = 'This phone number already sent a request in the last 24 hours.';
  end if;

  return new;
end;
$$;

comment on function public.leads_before_insert() is
  'Trigger-only. Rejects a second lead from the same phone within 24h (raises duplicate_lead_24h) and pins created_at/consent fields.';

drop trigger if exists leads_before_insert on public.leads;
create trigger leads_before_insert
  before insert on public.leads
  for each row execute function public.leads_before_insert();

-- -----------------------------------------------------------------------------
-- Row Level Security: anon may INSERT a clean lead and nothing else.
-- -----------------------------------------------------------------------------
alter table public.leads enable row level security;

drop policy if exists leads_insert_anon on public.leads;
create policy leads_insert_anon
  on public.leads
  for insert
  to anon
  with check (
    char_length(first_name) between 1 and 40
    and phone ~ '^\+1[0-9]{10}$'
    and (preferred_time is null or char_length(preferred_time) <= 80)
    and service in ('haircut', 'fade', 'haircut_beard', 'kids_cut')
    and (sms_consent = false or (consent_at is not null and disclosure_version is not null))
    -- Follow-up and opt-out fields are the shop's to set, never the form's.
    and sms_opted_out = false
    and contacted_at is null
    and visited_at is null
    and booked is null
    and upsold is null
  );

-- No select/update/delete policies on purpose. Belt and braces: take those
-- privileges away from the API roles entirely (RLS with no policy already
-- denies, but a future "allow all" policy added by mistake would otherwise
-- expose the list). Only anon inserts; the function never uses a user JWT.
revoke all on table public.leads from anon, authenticated;
grant insert on table public.leads to anon;
