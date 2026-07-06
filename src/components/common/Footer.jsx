import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Camp Revive bulletins! 🌿');
    e.target.reset();
  };

  return (
    <footer className="bg-primary-dark text-sand-dark pt-20 pb-8 border-t border-primary-light/10 relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Column 1: Brand & Bio */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary font-display font-extrabold text-xl shadow-lg">
              R
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1">
              CAMP <span className="text-accent">REVIVE</span>
            </span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Reconnecting souls with nature through custom premium camping adventures, high-intensity outdoor sports, and tailored experiences for families and corporate teams.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                ), 
                url: "https://instagram.com" 
              },
              { 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                ), 
                url: "https://youtube.com" 
              },
              { 
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                ), 
                url: "https://facebook.com" 
              }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-accent text-gray-300 hover:text-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="space-y-6">
          <h4 className="font-display font-bold text-white text-base tracking-wider uppercase">Explore</h4>
          <ul className="space-y-3.5 text-sm">
            {[
              { name: 'About Our Mission', path: '/about' },
              { name: 'Adventure Camps', path: '/experiences' },
              { name: 'Premium Facilities', path: '/facilities' },
              { name: 'Camp Gallery', path: '/gallery' },
              { name: 'Official Gear Shop', path: '/store' },
              { name: 'Get In Touch', path: '/contact' }
            ].map((link, idx) => (
              <li key={idx}>
                <Link 
                  to={link.path}
                  className="hover:text-accent transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact details */}
        <div className="space-y-6">
          <h4 className="font-display font-bold text-white text-base tracking-wider uppercase">Basecamp Location</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span>
                Camp Revive Foothills Basecamp,<br />
                Western Ghats Wilderness Corridor,<br />
                Maharashtra, India
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-accent flex-shrink-0" />
              <a href="tel:+919000000000" className="hover:text-accent transition-colors">+91 90000 00000</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-accent flex-shrink-0" />
              <a href="mailto:info@camprevive.in" className="hover:text-accent transition-colors">info@camprevive.in</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter sign-up */}
        <div className="space-y-6">
          <h4 className="font-display font-bold text-white text-base tracking-wider uppercase">Wilderness Bulletins</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Subscribe to receive notifications for upcoming forest camps, peak hiking trails, and seasonal merchandise releases.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input 
              type="email" 
              required
              placeholder="Email address"
              className="bg-white/5 border border-primary-light/20 text-white focus:outline-none focus:border-accent text-sm rounded-xl px-4 py-3 flex-1 min-w-0"
            />
            <button 
              type="submit"
              className="w-12 h-12 bg-accent hover:bg-accent-hover text-primary rounded-xl flex items-center justify-center font-bold shadow-lg transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>

      {/* Footer Bottom copyright and seals */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-primary-light/10 text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
        <p>© {currentYear} Camp Revive Experiences Platform. All rights reserved.</p>
        
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          <div className="flex items-center gap-1 text-[10px] bg-white/5 px-2.5 py-1 rounded-full text-gray-400 border border-white/5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            Verified Secure
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
