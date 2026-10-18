import { MouseEvent, ReactNode } from 'react';
import { handleCall } from '../utils/analytics';
import { PHONE_TEL } from '../constants/business';

/**
 * Inline `tel:` link that goes through the site's shared call handler, so it
 * fires the same GA4 `phone_call` event + Google Ads conversion as every
 * other call button. Keeps the href for no-JS / long-press "copy number".
 */
const CallLink = ({ children, className }: { children: ReactNode; className?: string }) => {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleCall();
  };
  return (
    <a href={`tel:${PHONE_TEL}`} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export default CallLink;
