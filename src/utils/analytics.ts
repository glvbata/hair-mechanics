/**
 * GA4 custom event tracking + centralized call handler for Hair Mechanics.
 */
import { PHONE_TEL, ADS_CONVERSION } from '../constants/business';

const track = (eventName: string, params?: Record<string, string>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

/** Fire Google Ads conversion + GA4 phone_call event, then dial. */
export const handleCall = () => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: ADS_CONVERSION,
      value: 1.0,
      currency: 'USD',
    });
  }
  track('phone_call', { method: 'click_to_call' });
  window.location.href = `tel:${PHONE_TEL}`;
};

export const trackSMSClick = () => track('sms_click', { method: 'sms' });
export const trackDirectionsClick = () => track('get_directions', { method: 'google_maps' });
export const trackReviewClick = () => track('review_click', { method: 'google' });
export const trackGalleryView = (imageIndex: number) =>
  track('gallery_image_view', { image_index: String(imageIndex) });
export const trackSocialClick = (platform: string) =>
  track('social_click', { platform });
