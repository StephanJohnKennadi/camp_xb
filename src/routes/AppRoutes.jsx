import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Experiences from '../pages/Experiences';
import Facilities from '../pages/Facilities';
import Gallery from '../pages/Gallery';
import Contact from '../pages/Contact';
import Store from '../pages/Store';
import ProductDetails from '../pages/ProductDetails';
import InquirySuccess from '../pages/InquirySuccess';
import NotFound from '../pages/NotFound';

// Scroll to top helper component to optimize page change transitions
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant snap scroll for quick seamless loading
    });
  }, [pathname]);

  return null;
};

export const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:handle" element={<ProductDetails />} />
        <Route path="/inquiry-success" element={<InquirySuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
