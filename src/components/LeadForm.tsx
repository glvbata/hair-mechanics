import { FormEvent, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import CallLink from './CallLink';
import { trackGenerateLead } from '../utils/analytics';
import { HOURS, PHONE_DISPLAY, getService } from '../constants/business';

/**
 * /new-client lead form. Copy owner: Nami (form-labels.md) — every label,
 * placeholder, helper and error below is hers word for word. Four fields and
 * no notes box: free text invites health details we must not collect.
 *
 * Posts JSON to the `lead` Netlify Function. GA4 `generate_lead` fires ONLY
 * after the function answers ok, so the GA4 count matches the leads table.
 *
 * SMS consent (10DLC): its own checkbox, unchecked by default, optional. The
 * disclosure sits directly under the box and directly above the submit button.
 */

export type ServiceId = 'haircut' | 'fade' | 'haircut_beard' | 'kids_cut';

// Prices come from business.ts so the form can never drift from the site.
const price = (slug: string) => getService(slug)!.price;

const SERVICE_OPTIONS: ReadonlyArray<{ id: ServiceId; label: string }> = [
  { id: 'haircut', label: `Haircut — $${price('haircut')}` },
  { id: 'fade', label: `Fade — $${price('fade')}` },
  { id: 'haircut_beard', label: `Haircut & Beard — $${price('beard-trim')}` },
  { id: 'kids_cut', label: `Kids Cut — $${price('kids-cut')} (12 and under)` },
];

/** 10 US digits (a leading 1 is tolerated — the function normalizes it). */
const isUSPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
};

/** `?source=gbp` → "gbp". Anything odd falls back to "site". */
const readSource = (search: string) => {
  const raw = new URLSearchParams(search).get('source') ?? '';
  const clean = raw.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 32);
  return clean || 'site';
};

type FieldKey = 'first_name' | 'phone' | 'service';
type Errors = Partial<Record<FieldKey, string>>;
type Banner = 'validation' | 'server' | 'duplicate' | null;
type Status = 'idle' | 'sending' | 'success';

interface LeadResponse {
  ok?: boolean;
  mode?: string;
  code?: string;
  field?: string;
}

const inputBase =
  'w-full bg-gray-900 border rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500';
const inputOk = `${inputBase} border-gray-700`;
const inputBad = `${inputBase} border-red-500`;
const labelClass = 'block text-sm font-medium text-gray-200 mb-1.5';
const helperClass = 'text-sm text-gray-400 mt-1.5';
const errorClass = 'text-sm text-red-400 mt-1.5';

const LeadForm = () => {
  const { search } = useLocation();
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [service, setService] = useState<ServiceId | ''>('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [banner, setBanner] = useState<Banner>(null);
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): Errors => {
    const next: Errors = {};
    const name = firstName.trim();
    if (name.length === 0) next.first_name = 'Please add your first name.';
    else if (name.length > 40) next.first_name = 'Just your first name is fine.';

    if (phone.trim().length === 0) next.phone = 'Please add your phone number.';
    else if (!isUSPhone(phone))
      next.phone = "That number doesn't look right. Use 10 digits, like (253) 555-0123.";

    if (!service) next.service = 'Pick a service.';
    return next;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBanner(null);

    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setBanner('validation');
      return;
    }

    const source = readSource(search);
    const pageUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    setStatus('sending');
    try {
      const res = await fetch('/.netlify/functions/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName.trim(),
          phone,
          preferred_time: preferredTime.trim().slice(0, 80),
          service,
          sms_consent: smsConsent,
          page_url: pageUrl,
          source,
          honeypot, // real people never fill this
        }),
      });
      const data = (await res.json().catch(() => null)) as LeadResponse | null;

      if (data?.ok) {
        setStatus('success');
        trackGenerateLead({ service, source, sms_consent: smsConsent ? 'yes' : 'no' });
        return;
      }

      setStatus('idle');
      if (data?.code === 'duplicate') setBanner('duplicate');
      else if (data?.code === 'validation') setBanner('validation');
      else setBanner('server');
    } catch {
      setStatus('idle');
      setBanner('server');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-gray-800 rounded-lg p-6 sm:p-8" role="status">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold mb-3">Got it, {firstName.trim()}.</h3>
        <div className="space-y-3 text-gray-300">
          <p>Glen or Akshat will call or text you soon to set a time.</p>
          <p>
            Shop hours: {HOURS.weekday}, {HOURS.weekend}. Sent after hours? We'll reach out when we
            open.
          </p>
          <p>
            Can't wait? Call{' '}
            <CallLink className="font-bold text-white hover:text-gold-500 underline">
              {PHONE_DISPLAY}
            </CallLink>{' '}
            or just walk in.
          </p>
          <p>
            Your offer: book a ${price('haircut')} Haircut or Fade, and your Line Up / Trim within
            14 days is free.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-800 rounded-lg p-6 sm:p-8 space-y-5"
      noValidate
      aria-describedby={banner ? 'lead-banner' : undefined}
    >
      {banner && (
        <div
          id="lead-banner"
          role="alert"
          className="bg-red-950/60 border border-red-500 text-red-200 text-sm rounded-md px-4 py-3"
        >
          {banner === 'validation' && 'Fix the fields marked in red and try again.'}
          {banner === 'server' && (
            <>
              Something went wrong on our end. Try again, or call{' '}
              <CallLink className="underline">{PHONE_DISPLAY}</CallLink>.
            </>
          )}
          {banner === 'duplicate' && (
            <>
              We already have your request. We'll be in touch soon, or call{' '}
              <CallLink className="underline">{PHONE_DISPLAY}</CallLink>.
            </>
          )}
        </div>
      )}

      {/* 1. First name */}
      <div>
        <label htmlFor="lead-first-name" className={labelClass}>
          First name
        </label>
        <input
          id="lead-first-name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          maxLength={40}
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={errors.first_name ? inputBad : inputOk}
          placeholder="e.g. Marcus"
          aria-invalid={errors.first_name ? true : undefined}
          aria-describedby={errors.first_name ? 'lead-first-name-error' : undefined}
        />
        {errors.first_name && (
          <p id="lead-first-name-error" className={errorClass}>
            {errors.first_name}
          </p>
        )}
      </div>

      {/* 2. Mobile phone */}
      <div>
        <label htmlFor="lead-phone" className={labelClass}>
          Mobile phone
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={errors.phone ? inputBad : inputOk}
          placeholder="(253) 555-0123"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'lead-phone-error' : 'lead-phone-helper'}
        />
        {errors.phone ? (
          <p id="lead-phone-error" className={errorClass}>
            {errors.phone}
          </p>
        ) : (
          <p id="lead-phone-helper" className={helperClass}>
            So we can call or text you back.
          </p>
        )}
      </div>

      {/* 3. Preferred day / time (optional) */}
      <div>
        <label htmlFor="lead-preferred-time" className={labelClass}>
          Best day or time (optional)
        </label>
        <input
          id="lead-preferred-time"
          name="preferred_time"
          type="text"
          autoComplete="off"
          maxLength={80}
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
          className={inputOk}
          placeholder="e.g. Saturday morning"
          aria-describedby="lead-preferred-time-helper"
        />
        <p id="lead-preferred-time-helper" className={helperClass}>
          We're open {HOURS.weekday}, {HOURS.weekend}.
        </p>
      </div>

      {/* 4. Service */}
      <fieldset aria-describedby={errors.service ? 'lead-service-error' : 'lead-service-helper'}>
        <legend className={labelClass}>What are you coming in for?</legend>
        <div
          className={`space-y-2 rounded-md border p-3 ${
            errors.service ? 'border-red-500' : 'border-gray-700'
          }`}
        >
          {SERVICE_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-3 text-gray-200 cursor-pointer py-1"
            >
              <input
                type="radio"
                name="service"
                value={opt.id}
                checked={service === opt.id}
                onChange={() => setService(opt.id)}
                className="h-4 w-4 border-gray-600 bg-gray-900 text-gold-500 focus:ring-gold-500"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.service ? (
          <p id="lead-service-error" className={errorClass}>
            {errors.service}
          </p>
        ) : (
          <p id="lead-service-helper" className={helperClass}>
            The free Line Up / Trim comes with a Haircut or Fade.
          </p>
        )}
      </fieldset>

      {/* Honeypot: visually hidden, tab-skipped, ignored by autofill. */}
      <div className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* SMS consent: own checkbox, unchecked, optional. Disclosure directly
          under it, directly above the submit button. */}
      <div className="border-t border-gray-700 pt-5">
        <label className="flex items-start gap-3 text-gray-100 cursor-pointer">
          <input
            type="checkbox"
            name="sms_consent"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-900 text-gold-500 focus:ring-gold-500"
          />
          <span className="font-medium">Yes, text me about my booking.</span>
        </label>
        <p className="text-sm text-gray-300 leading-relaxed mt-3">
          By checking this box, you agree to get booking texts from Hair Mechanics at the number
          above, about your request and appointment. Msg frequency varies (usually 1–2 per request).
          Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not
          required to book. We don't share your mobile number with third parties for marketing.{' '}
          <Link to="/privacy" className="underline hover:text-gold-500">
            Privacy Policy
          </Link>{' '}
          ·{' '}
          <Link to="/terms" className="underline hover:text-gold-500">
            SMS Terms
          </Link>
        </p>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-gold-500 text-gray-900 px-8 py-4 rounded-md font-bold text-lg hover:bg-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Send it'}
      </button>

      <p className="text-sm text-gray-400 text-center">
        Not checking the box? No problem. We'll call you instead.
      </p>
    </form>
  );
};

export default LeadForm;
