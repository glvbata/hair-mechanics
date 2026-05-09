import Navbar from './Navbar';
import Footer from './Footer';
import { useSEO } from '../utils/useSEO';
import { handleCall } from '../utils/analytics';

interface PageLayoutProps {
  title: string;
  description: string;
  canonical?: string;
  /** Optional JSON-LD schema (FAQPage, BreadcrumbList, etc.) — forwarded to useSEO. */
  schema?: object | object[];
  schemaId?: string;
  /** Page language (BCP 47) — drives <html lang> and og:locale. */
  lang?: string;
  /** hreflang alternates — declares same-content URLs in other languages. */
  alternates?: Array<{ hreflang: string; href: string }>;
  children: React.ReactNode;
}

const PageLayout = ({ title, description, canonical, schema, schemaId, lang, alternates, children }: PageLayoutProps) => {
  useSEO({ title, description, canonical, schema, schemaId, lang, alternates });

  return (
    <div className="min-h-screen bg-dark-800 text-white">
      <Navbar onBook={handleCall} />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
