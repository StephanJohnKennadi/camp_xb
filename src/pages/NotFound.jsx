import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="pt-28 pb-20 min-h-[90vh] bg-sand flex items-center justify-center text-center">
      <SEO title="Page Not Found (404)" description="Looks like you wandered off the marked trail. Return to the Camp Revive safety center." />
      
      <div className="max-w-md mx-auto px-6 space-y-8">
        
        <AnimatedSection className="space-y-4">
          
          {/* Pulsing compass illustration */}
          <div className="w-24 h-24 bg-primary text-accent rounded-full flex items-center justify-center mx-auto shadow-2xl relative mb-6">
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <Compass className="w-12 h-12 relative animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          <span className="bg-primary/5 text-primary-light font-display font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-primary/5">
            Compass Error 404
          </span>
          
          <h1 className="font-display font-black text-3xl sm:text-4.5xl text-primary leading-tight tracking-tight">
            Lost in the Woods?
          </h1>
          
          <p className="text-gray-500 text-sm leading-relaxed">
            Looks like you wandered off the marked coordinates. No worries, adventurer—even the best navigators make wrong turns. Let's redirect you back to basecamp.
          </p>

        </AnimatedSection>

        {/* Redirect links */}
        <AnimatedSection delay={0.1} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-primary hover:bg-primary-light text-white font-display font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            Back to Basecamp
          </Link>
          
          <Link
            to="/contact"
            className="bg-white hover:bg-sand border border-primary/10 text-primary font-display font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-full flex items-center justify-center transition-colors"
          >
            Contact Camp Ranger
          </Link>
        </AnimatedSection>

      </div>
    </div>
  );
};
export default NotFound;
