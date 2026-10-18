/**
 * POST /.netlify/functions/lead
 *
 * Takes the /new-client form, validates it with the same rules as the form,
 * and either:
 *   - SUPABASE MODE: inserts into public.leads over PostgREST when both
 *     SUPABASE_URL and SUPABASE_ANON_KEY are set in the Netlify environment, or
 *   - DEMO MODE: stores nothing, when either var is missing.
 *
 * In BOTH modes the only "alert" is a console.log of the texts that will one
 * day go to Glen (SMS #5) and to Glen + Gian (email #6), exactly as written in
 * Nami's form-labels.md. Nothing is sent: no SMS, no Twilio, no email. SMS
 * can't go out until the 10DLC campaign is approved. The phone number is
 * masked to its last 4 digits in every log line.
 *
 * No npm deps: uses the global fetch / Request / Response of the Netlify
 * Functions 2.0 runtime (Node 18+). See docs/lead-gen.md.
 */

/**
 * Version tag of the SMS disclosure text shown on the form. Bump it whenever
 * the disclosure wording changes, so every stored consent can be tied to the
 * exact text the person agreed to (10DLC proof-of-consent).
 */
export const SMS_DISCLOSURE_VERSION = 'sms-v1-2026-10-17';

const SERVICE_LABELS = {
  haircut: 'Haircut',
  fade: 'Fade',
  haircut_beard: 'Haircut & Beard',
  kids_cut: 'Kids Cut',
};

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const str = (v) => (typeof v === 'string' ? v : '');
const squash = (s) => s.replace(/\s+/g, ' ').trim();

/** 10 US digits, or 11 starting with 1 → "+1XXXXXXXXXX" (E.164). Else null. */
export function normalizeUSPhone(raw) {
  const digits = str(raw).replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

/** Keep origin + path + query of an http(s) URL, capped. Anything else → null. */
function cleanPageUrl(raw) {
  try {
    const u = new URL(str(raw));
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return `${u.origin}${u.pathname}${u.search}`.slice(0, 500);
  } catch {
    return null;
  }
}

/**
 * Same rules as LeadForm.tsx. Returns { lead } or { error: { code, field } }.
 * Pure, so it is easy to test.
 */
export function validateLead(input) {
  const fail = (field) => ({ error: { code: 'validation', field } });
  if (!input || typeof input !== 'object') return fail('body');

  const first_name = squash(str(input.first_name));
  if (first_name.length < 1 || first_name.length > 40) return fail('first_name');

  const phone = normalizeUSPhone(input.phone);
  if (!phone) return fail('phone');

  const preferred_time = squash(str(input.preferred_time));
  if (preferred_time.length > 80) return fail('preferred_time');

  const service = str(input.service);
  if (!Object.hasOwn(SERVICE_LABELS, service)) return fail('service');

  const sms_consent = input.sms_consent === true;

  const source = str(input.source).toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 32) || 'site';
  const page_url = cleanPageUrl(input.page_url);

  return {
    lead: {
      first_name,
      phone,
      preferred_time: preferred_time || null,
      service,
      sms_consent,
      page_url,
      source,
    },
  };
}

/** Row as stored in public.leads. Consent proof only when consent was given. */
export function buildRow(lead, now) {
  return {
    ...lead,
    consent_at: lead.sms_consent ? now.toISOString() : null,
    disclosure_version: lead.sms_consent ? SMS_DISCLOSURE_VERSION : null,
  };
}

const maskPhone = (phone) => `***-***-${phone.slice(-4)}`;

/** Alert text #5 (to Glen), per form-labels.md. One SMS segment where possible. */
export function glenAlertText(lead, maskedPhone) {
  return [
    `NEW LEAD: ${lead.first_name}, ${maskedPhone}`,
    `Wants: ${SERVICE_LABELS[lead.service]}`,
    `Best time: ${lead.preferred_time || 'not given'}`,
    `Texts OK: ${lead.sms_consent ? 'YES' : 'NO, call only'}`,
    'Offer: free Line Up / Trim w/ first cut',
    'Tap when contacted: (demo: no link yet)',
  ].join('\n');
}

/** Email alert #6 (Glen + Gian): same fields plus submit time and page source. */
export function emailAlert(lead, maskedPhone, now) {
  const pacific = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(now);
  return {
    subject: `New lead: ${lead.first_name}, ${SERVICE_LABELS[lead.service]}`,
    body: [
      glenAlertText(lead, maskedPhone),
      `Submitted: ${pacific} PT (${now.toISOString()})`,
      `Source: ${lead.source}`,
      `Page: ${lead.page_url || 'not given'}`,
    ].join('\n'),
  };
}

function logAlerts(lead, now, mode) {
  const masked = maskPhone(lead.phone);
  const email = emailAlert(lead, masked, now);
  console.log(`[LEAD ALERT ${mode}] SMS to Glen (demo: not sent):\n${glenAlertText(lead, masked)}`);
  console.log(
    `[LEAD ALERT ${mode}] Email to Glen + Gian (demo: not sent):\nSubject: ${email.subject}\n${email.body}`,
  );
}

class DuplicateLeadError extends Error {
  code = 'duplicate';
}

async function storeInSupabase(row, url, anonKey) {
  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  });
  if (res.ok) return;

  const text = await res.text().catch(() => '');
  // The 24h duplicate trigger raises unique_violation (23505, PostgREST → 409)
  // with the message 'duplicate_lead_24h'. See the migration.
  if (res.status === 409 || text.includes('duplicate_lead_24h')) {
    throw new DuplicateLeadError('duplicate_lead_24h');
  }
  throw new Error(`supabase ${res.status}: ${text.slice(0, 200)}`);
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return json(405, { ok: false, code: 'method_not_allowed' });
  }

  let input;
  try {
    input = await req.json();
  } catch {
    return json(400, { ok: false, code: 'validation', field: 'body' });
  }

  // Honeypot: bots fill every field. Pretend it worked, store and log nothing
  // identifying.
  if (str(input?.honeypot).trim() !== '') {
    console.log('[LEAD SPAM] honeypot filled, dropped');
    return json(200, { ok: true, mode: 'honeypot' });
  }

  const { lead, error } = validateLead(input);
  if (error) return json(400, { ok: false, ...error });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const mode = supabaseUrl && supabaseKey ? 'supabase' : 'demo';
  const now = new Date();
  const row = buildRow(lead, now);

  if (mode === 'supabase') {
    try {
      await storeInSupabase(row, supabaseUrl, supabaseKey);
    } catch (err) {
      if (err instanceof DuplicateLeadError) {
        console.log(`[LEAD DUPLICATE] ${maskPhone(lead.phone)} already submitted in the last 24h`);
        return json(409, { ok: false, code: 'duplicate' });
      }
      console.error('[LEAD ERROR] store failed:', err instanceof Error ? err.message : err);
      return json(502, { ok: false, code: 'server' });
    }
  }

  logAlerts(lead, now, mode);
  return json(200, { ok: true, mode });
}
