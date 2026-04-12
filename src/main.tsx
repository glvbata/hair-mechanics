import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from './App.tsx';
import GalleryPage from './pages/Gallery.tsx';
import BookPage from './pages/Book.tsx';
import NotFound from './pages/NotFound.tsx';
import BarberPage from './pages/Barber.tsx';
import BarberAkshatPage from './pages/BarberAkshat.tsx';
import TeamPage from './pages/Team.tsx';
// Service pages
import FadePage from './pages/services/Fade.tsx';
import BeardTrimPage from './pages/services/BeardTrim.tsx';
import HaircutPage from './pages/services/Haircut.tsx';
import KidsCutPage from './pages/services/KidsCut.tsx';
import LineUpPage from './pages/services/LineUp.tsx';
// Area pages
import AuburnPage from './pages/areas/Auburn.tsx';
import KentPage from './pages/areas/Kent.tsx';
import FederalWayPage from './pages/areas/FederalWay.tsx';
import SumnerPage from './pages/areas/Sumner.tsx';
import PuyallupPage from './pages/areas/Puyallup.tsx';
import RentonPage from './pages/areas/Renton.tsx';
import './index.css';

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
  </BrowserRouter>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithScrollRestoration />
  </StrictMode>
);
