/**
 * Exercise netlify/functions/lead.mjs directly in DEMO mode (no Supabase, no
 * network). Run: `node scripts/test-lead.mjs`. Prints the response and the
 * alert log lines for each case. Nothing is stored or sent.
 */
import handler from '../netlify/functions/lead.mjs';

// Force demo mode even if a local .env was loaded somehow.
delete process.env.SUPABASE_URL;
delete process.env.SUPABASE_ANON_KEY;

const PAGE = 'https://hairmechanics.net/new-client?source=gbp';

const cases = [
  {
    name: 'valid, with SMS consent',
    body: {
      first_name: 'Marcus',
      phone: '(253) 555-0123',
      preferred_time: 'Saturday morning',
      service: 'haircut',
      sms_consent: true,
      page_url: PAGE,
      source: 'gbp',
      honeypot: '',
    },
  },
  {
    name: 'valid, no SMS consent, no preferred time',
    body: {
      first_name: 'Dee',
      phone: '2535550199',
      preferred_time: '',
      service: 'kids_cut',
      sms_consent: false,
      page_url: 'https://hairmechanics.net/new-client',
      source: 'site',
      honeypot: '',
    },
  },
  {
    name: 'invalid phone',
    body: {
      first_name: 'Sam',
      phone: '555-0123',
      service: 'fade',
      sms_consent: false,
      page_url: PAGE,
      source: 'site',
      honeypot: '',
    },
  },
  {
    name: 'honeypot filled (bot)',
    body: {
      first_name: 'Bot',
      phone: '(253) 555-0100',
      service: 'haircut_beard',
      sms_consent: true,
      page_url: PAGE,
      source: 'site',
      honeypot: 'http://spam.example',
    },
  },
];

for (const c of cases) {
  console.log(`\n=== ${c.name}`);
  const req = new Request('http://localhost/.netlify/functions/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(c.body),
  });
  const res = await handler(req);
  console.log(`→ HTTP ${res.status} ${await res.text()}`);
}
