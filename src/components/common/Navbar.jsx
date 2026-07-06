import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../hooks/useCart';
import { Menu, X, ShoppingBag, ArrowUpRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { toggleCart, getCartCount } = useCart();

  const NAV_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Store', path: '/store' },
  ];

  // Monitor scroll height to make navbar float with shadow and transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-sand/85 backdrop-blur-md border-b border-primary/5 shadow-md' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group focus:outline-none"
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-accent font-display font-extrabold text-xl shadow-lg transition-transform group-hover:rotate-6">
            R
          </div>
          <span className="font-display font-black text-xl tracking-tight text-primary flex items-center gap-1">
            CAMP <span className="text-accent-hover">REVIVE</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-primary-dark/5 p-1.5 rounded-full border border-primary/5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `px-4.5 py-2 rounded-full font-display font-bold text-sm tracking-wide transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-primary/70 hover:text-primary hover:bg-primary/5'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3.5">
          {/* Language Switcher */}
          <button
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
            className="w-11 h-11 border border-primary/10 hover:border-primary/20 bg-white rounded-full flex items-center justify-center text-primary relative transition-all hover:scale-105 active:scale-95 cursor-pointer uppercase font-display font-black text-xs gap-0.5 hover:bg-primary/5"
            title={t('navbar.language')}
          >
            <Globe className="w-4 h-4 text-primary/70" />
            <span className="text-[10px] tracking-tight">{i18n.language === 'es' ? 'ES' : 'EN'}</span>
          </button>

          {/* Cart Icon Toggle */}
          <button
            onClick={toggleCart}
            className="w-11 h-11 border border-primary/10 hover:border-primary/20 bg-white rounded-full flex items-center justify-center text-primary relative transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <AnimatePresence>
              {getCartCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-accent hover:bg-accent-hover text-primary font-display font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-sand"
                >
                  {getCartCount()}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Inquiry CTA */}
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 bg-primary hover:bg-primary-light text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            {i18n.language === 'es' ? 'Consultar' : 'Inquire Now'}
            <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="md:hidden w-11 h-11 border border-primary/10 bg-white rounded-full flex items-center justify-center text-primary cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-sand border-b border-primary/5 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4 flex flex-col">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.path}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => 
                      `block px-5 py-3 rounded-2xl font-display font-extrabold text-base tracking-wide transition-all ${
                        isActive 
                          ? 'bg-primary text-white' 
                          : 'text-primary/80 hover:text-primary hover:bg-primary/5'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="pt-4 border-t border-primary/5 flex flex-col gap-3"
              >
                <button
                  onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
                  className="w-full border border-primary/10 hover:border-primary/20 bg-white text-primary font-display font-extrabold text-center py-4 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase text-xs tracking-wider"
                >
                  <Globe className="w-4 h-4 text-primary/70" />
                  {t('navbar.language')}: {i18n.language === 'es' ? 'Español' : 'English'}
                </button>
                <Link
                  to="/contact"
                  className="w-full bg-primary hover:bg-primary-light text-white font-display font-bold text-center py-4 rounded-2xl shadow-lg transition-all"
                >
                  {i18n.language === 'es' ? 'Reservar Consulta' : 'Book Camp Inquiry'}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
