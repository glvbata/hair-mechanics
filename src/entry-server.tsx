import { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import App from './App';

// Sync imports for SSR — lazy() doesn't work server-side
import GalleryPage from './pages/Gallery';
import BookPage from './pages/Book';
import BlogPage from './pages/Blog';
import BlogPostPage from './pages/BlogPost';
import BarberPage from './pages/Barber';
import BarberAkshatPage from './pages/BarberAkshat';
import TeamPage from './pages/Team';
import FadePage from './pages/services/Fade';
import BeardTrimPage from './pages/services/BeardTrim';
import HaircutPage from './pages/services/Haircut';
import KidsCutPage from './pages/services/KidsCut';
import LineUpPage from './pages/services/LineUp';
import AuburnPage from './pages/areas/Auburn';
import KentPage from './pages/areas/Kent';
import FederalWayPage from './pages/areas/FederalWay';
import SumnerPage from './pages/areas/Sumner';
import PuyallupPage from './pages/areas/Puyallup';
import RentonPage from './pages/areas/Renton';
import NotFound from './pages/NotFound';

function ServerApp() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        {/* Service pages */}
        <Route path="/services/fade" element={<FadePage />} />
        <Route path="/services/beard-trim" element={<BeardTrimPage />} />
        <Route path="/services/haircut" element={<HaircutPage />} />
        <Route path="/services/kids-cut" element={<KidsCutPage />} />
        <Route path="/services/line-up" element={<LineUpPage />} />
        {/* Area pages */}
        <Route path="/auburn-barber" element={<AuburnPage />} />
        <Route path="/kent-barber" element={<KentPage />} />
        <Route path="/federal-way-barber" element={<FederalWayPage />} />
        <Route path="/sumner-barber" element={<SumnerPage />} />
        <Route path="/puyallup-barber" element={<PuyallupPage />} />
        <Route path="/renton-barber" element={<RentonPage />} />
        {/* Team & barber profiles */}
        <Route path="/team" element={<TeamPage />} />
        <Route path="/barber" element={<BarberPage />} />
        <Route path="/barber/akshat" element={<BarberAkshatPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <ServerApp />
    </StaticRouter>
  );
}
