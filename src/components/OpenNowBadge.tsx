import { useEffect, useState } from 'react';
import { HOURS } from '../constants/business';
import { getOpenStatus, type OpenStatus } from '../utils/hours';

interface OpenNowBadgeProps {
  /** Extra classes for the wrapper — lets callers control spacing/size. */
  className?: string;
  /** Compact mode drops the trailing "walk-ins welcome" clause. */
  compact?: boolean;
}

/**
 * Live "Open now — until 8 PM" / "Closed — opens 10 AM tomorrow" indicator.
 *
 * SSR note: status is computed in an effect, never during render. The prerendered
 * HTML that Google indexes must not claim a live open/closed state — it's frozen
 * at build time and would be wrong most of the day. Until the client hydrates we
 * show the always-true fallback ("Open 7 days · until 8 PM"), which also keeps
 * the server and first client render identical, so there's no hydration mismatch.
 */
const OpenNowBadge = ({ className = '', compact = false }: OpenNowBadgeProps) => {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus());
    tick();
    // Re-check each minute so the badge flips at open/close without a reload.
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Pre-hydration / no-JS fallback: true at every hour of every day.
  if (!status) {
    return (
      <span className={`inline-flex items-center gap-2 text-sm text-gray-400 ${className}`}>
        <span className="h-2 w-2 rounded-full bg-gray-500" aria-hidden="true" />
        Open 7 days · {HOURS.weekday}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm ${
        status.isOpen ? 'text-green-400' : 'text-gray-400'
      } ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          status.isOpen ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
        }`}
        aria-hidden="true"
      />
      <span className="font-medium">{status.label}</span>
      {!compact && status.isOpen && <span className="text-gray-400">· Walk-ins welcome</span>}
    </span>
  );
};

export default OpenNowBadge;
