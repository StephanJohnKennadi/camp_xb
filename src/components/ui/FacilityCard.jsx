import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, BadgeCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FacilityCard = ({ facility }) => {
  const { id, title, tag, description, images, capacity, highlights } = facility;
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentSlide(prev => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentSlide(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-primary/5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row h-full group">
      
      {/* Photo Slider Section */}
      <div className="relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto min-h-[300px] overflow-hidden bg-sand-dark flex-shrink-0">
        <img 
          src={images[currentSlide]} 
          alt={`${title} view ${currentSlide + 1}`} 
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent pointer-events-none" />

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white text-primary rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white text-primary rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setCurrentSlide(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentSlide ? 'bg-accent w-5' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Tag overlay */}
        <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-0.5 rounded-full text-[10px] font-display font-extrabold uppercase tracking-widest shadow-md">
          {tag}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-display font-black text-2xl text-primary leading-tight">
              {title}
            </h3>
            
            <div className="flex items-center gap-1 text-xs font-display font-bold text-gray-500 bg-sand px-3 py-1.5 rounded-full border border-primary/5">
              <Users className="w-3.5 h-3.5 text-accent-hover" />
              {capacity}
            </div>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed">
            {description}
          </p>

          {/* Highlights Checklist */}
          <div className="space-y-2 pt-2">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary">Amenities Include:</h4>
            <div className="grid grid-cols-2 gap-2">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                  <BadgeCheck className="w-4 h-4 text-accent-hover flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Inquire */}
        <div className="border-t border-primary/5 mt-6 pt-6">
          <Link
            to={`/contact?facility=${encodeURIComponent(title)}`}
            className="w-full bg-primary hover:bg-primary-light text-white font-display font-bold text-center block py-3.5 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
          >
            Inquire Facility Rental
          </Link>
        </div>
      </div>

    </div>
  );
};
export default FacilityCard;
