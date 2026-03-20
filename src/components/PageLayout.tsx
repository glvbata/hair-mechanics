import Navbar from './Navbar';
import Footer from './Footer';
import { useSEO } from '../utils/useSEO';
import { handleCall } from '../utils/analytics';

interface PageLayoutProps {
  title: string;
  description: string;
  canonical?: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, description, canonical, children }: PageLayoutProps) => {
  useSEO({ title, description, canonical });

  return (
    <div className="min-h-screen bg-dark-800 text-white">
      <Navbar onBook={handleCall} />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
