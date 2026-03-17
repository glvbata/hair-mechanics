/**
 * GA4 custom event tracking for Hair Mechanics.
 * Wraps window.gtag calls so components stay clean.
 */

const track = (eventName: string, params?: Record<string, string>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

export const trackSMSClick = () => track('sms_click', { method: 'sms' });
export const trackDirectionsClick = () => track('get_directions', { method: 'google_maps' });
export const trackReviewClick = () => track('review_click', { method: 'google' });
export const trackGalleryView = (imageIndex: number) =>
  track('gallery_image_view', { image_index: String(imageIndex) });
export const trackPhoneCall = () => track('phone_call', { method: 'click_to_call' });
