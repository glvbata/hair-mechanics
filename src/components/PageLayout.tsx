import Navbar from './Navbar';
import Footer from './Footer';
import { useSEO } from '../utils/useSEO';

interface PageLayoutProps {
  title: string;
  description: string;
  canonical?: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, description, canonical, children }: PageLayoutProps) => {
  useSEO({ title, description, canonical });

  const handleBooking = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17956338356/ONVqCLjl6IgcELT1n_JC',
        value: 1.0,
        currency: 'USD',
      });
    }
    window.location.href = 'tel:+1-206-399-9288';
  };

  return (
    <div className="min-h-screen bg-dark-800 text-white">
      <Navbar onBook={handleBooking} />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
