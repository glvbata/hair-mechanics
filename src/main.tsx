import { StrictMode, useEffect, lazy, Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from './App.tsx';
import './index.css';

// Lazy-load all non-home pages — keeps initial bundle small
const GalleryPage      = lazy(() => import('./pages/Gallery.tsx'));
const BookPage         = lazy(() => import('./pages/Book.tsx'));
const NotFound         = lazy(() => import('./pages/NotFound.tsx'));
const BarberPage       = lazy(() => import('./pages/Barber.tsx'));
const BarberAkshatPage = lazy(() => import('./pages/BarberAkshat.tsx'));
const TeamPage         = lazy(() => import('./pages/Team.tsx'));
// Service pages
const FadePage         = lazy(() => import('./pages/services/Fade.tsx'));
const BeardTrimPage    = lazy(() => import('./pages/services/BeardTrim.tsx'));
const HaircutPage      = lazy(() => import('./pages/services/Haircut.tsx'));
const KidsCutPage      = lazy(() => import('./pages/services/KidsCut.tsx'));
const LineUpPage       = lazy(() => import('./pages/services/LineUp.tsx'));
// Area pages
const AuburnPage       = lazy(() => import('./pages/areas/Auburn.tsx'));
const KentPage         = lazy(() => import('./pages/areas/Kent.tsx'));
const FederalWayPage   = lazy(() => import('./pages/areas/FederalWay.tsx'));
const SumnerPage       = lazy(() => import('./pages/areas/Sumner.tsx'));
const PuyallupPage     = lazy(() => import('./pages/areas/Puyallup.tsx'));
const RentonPage       = lazy(() => import('./pages/areas/Renton.tsx'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

const AppWithScrollRestoration = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
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
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

const rootEl = document.getElementById('root')!;

if (rootEl.innerHTML) {
  hydrateRoot(
    rootEl,
    <StrictMode>
      <AppWithScrollRestoration />
    </StrictMode>
  );
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <AppWithScrollRestoration />
    </StrictMode>
  );
}
