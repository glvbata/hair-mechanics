import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Use Calendly's preferred popup implementation
      window.Calendly?.showPopupWidget('https://calendly.com/sungodnika-ai-0505/30min');
      
      // Add event listener for when the popup is closed
      const handleMessage = (e: MessageEvent) => {
        if (e.data.event === 'calendly.event_scheduled' || e.data.event === 'calendly.popup_closed') {
          onClose();
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      return () => {
        window.removeEventListener('message', handleMessage);
        // Close the popup when component unmounts
        window.Calendly?.closePopupWidget();
      };
    }
  }, [isOpen, onClose]);

  // We don't need to render a modal anymore since we're using Calendly's popup
  return null;
};

export default BookingModal;