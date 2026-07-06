import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export const ExperienceCard = ({ experience }) => {
  const { id, title, category, tagline, description, image, priceStarting, duration } = experience;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-primary/5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      {/* Cover Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Category Badge overlay */}
        <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-accent px-3.5 py-1 rounded-full text-xs font-display font-extrabold uppercase tracking-wide shadow-md">
          {category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="font-display font-black text-xl sm:text-2xl text-primary leading-snug group-hover:text-primary-light transition-colors">
            {title}
          </h3>
          <p className="font-display font-bold text-accent-hover text-sm italic">
            "{tagline}"
          </p>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Pricing, Duration & CTA Action */}
        <div className="border-t border-primary/5 mt-6 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-display font-bold text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-accent-hover" />
              {duration}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-accent-hover" />
              Starts ${priceStarting}
            </span>
          </div>

          <Link
            to={`/contact?experience=${encodeURIComponent(title)}`}
            className="inline-flex items-center justify-center gap-1.5 bg-sand-dark/30 hover:bg-primary text-primary hover:text-white font-display font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all group-hover:translate-x-0.5 cursor-pointer"
          >
            Inquire Bookings
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ExperienceCard;
