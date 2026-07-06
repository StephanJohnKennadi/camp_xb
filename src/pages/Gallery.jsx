import React, { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import SectionTitle from '../components/ui/SectionTitle';
import { GALLERY_ITEMS } from '../constants/data';
import { ChevronLeft, ChevronRight, X, Maximize2, Compass } from 'lucide-react';

export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const FILTERS = ['All', 'Camps', 'Sports', 'Corporate', 'Family'];

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'ArrowLeft') handlePrevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrevLightbox = () => {
    setLightboxIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNextLightbox = () => {
    setLightboxIndex(prev => (prev + 1) % filteredItems.length);
  };

  return (
    <div className="pt-20">
      <SEO title="Wilderness Photo Gallery" description="Tour the sights of Camp Revive. High-resolution visuals of forest glamping tents, pro turf games, and group team challenges." />

      {/* 1. Page Header */}
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1600&auto=format&fit=crop" 
            alt="Camp sunset view" 
            className="w-full h-full object-cover opacity-20 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="bg-accent/25 text-accent font-display font-extrabold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-accent/25">
            Visual Diaries
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none">
            Camp Revive <span className="text-accent">Memories</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sand-dark/70 text-sm sm:text-base leading-relaxed">
            A raw high-fidelity lens capture of campfire circles, sports turf actions, and beautiful morning sunrises.
          </p>
        </div>
      </section>

      {/* 2. Interactive Filter Tabs Section */}
      <section className="py-12 bg-white border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-2.5 pb-3 no-scrollbar justify-start md:justify-center">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-primary/70 bg-sand hover:text-primary border border-primary/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Image Grid */}
      <section className="py-20 bg-sand min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-primary/5 p-8">
              <Compass className="w-16 h-16 text-primary/30 mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-primary">No images in this category</h3>
              <p className="text-gray-400 text-sm">Please select another active filter tab.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredItems.map((item, idx) => (
                <AnimatedSection 
                  key={item.id} 
                  delay={idx * 0.05} 
                  scale={0.98}
                  className="aspect-square rounded-2xl overflow-hidden border border-primary/5 shadow-sm relative group bg-sand-dark cursor-pointer"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Hover visualizer overlay sheet */}
                  <div className="absolute inset-0 bg-primary-dark/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white">
                    <div className="flex justify-end">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                        <Maximize2 className="w-4 h-4 text-accent" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-display font-extrabold tracking-widest text-accent block">
                        {item.category}
                      </span>
                      <h3 className="font-display font-extrabold text-sm sm:text-base truncate">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-sand-dark/70 leading-relaxed truncate">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Fullscreen Lightbox Overlay Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-4">
          
          {/* Close button */}
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center border border-white/10 transition-colors z-50 cursor-pointer"
            title="Close Lightbox (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button 
            onClick={handlePrevLightbox}
            className="absolute left-6 w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/5 transition-colors z-50 cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image Display */}
          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center relative select-none">
            <img 
              src={filteredItems[lightboxIndex].imageUrl} 
              alt={filteredItems[lightboxIndex].title} 
              className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-white/5 bg-neutral-900"
            />
            
            {/* Meta descriptions strip */}
            <div className="text-center text-white mt-5 space-y-1 max-w-xl">
              <span className="text-xs uppercase font-display font-extrabold tracking-widest text-accent">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={handleNextLightbox}
            className="absolute right-6 w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/5 transition-colors z-50 cursor-pointer"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          {/* Index Counter overlay */}
          <div className="absolute bottom-6 left-6 text-xs text-gray-500 font-display font-semibold">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>

        </div>
      )}

    </div>
  );
};
export default Gallery;
