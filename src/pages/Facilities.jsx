import React from 'react';
import SEO from '../components/common/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import SectionTitle from '../components/ui/SectionTitle';
import FacilityCard from '../components/ui/FacilityCard';
import { FACILITIES } from '../constants/data';
import { ShieldCheck } from 'lucide-react';

export const Facilities = () => {
  return (
    <div className="pt-20">
      <SEO title="Premium Facilities & Accommodations" description="Explore the pro synthetic football turf, wood glamping log cabins, 120-seat open stone fireplace dining pavilion, and Valley Amphitheatre." />

      {/* 1. Page Header */}
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600&auto=format&fit=crop" 
            alt="Football turf pro turf" 
            className="w-full h-full object-cover opacity-20 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="bg-accent/25 text-accent font-display font-extrabold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-accent/25">
            Basecamp Blueprint
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none">
            Camp Facilities & <span className="text-accent">Dormitories</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sand-dark/70 text-sm sm:text-base leading-relaxed">
            Tour our multisport synthetic turfs, open-hearth stone dining, mountain boardroom cabins, and premium wooden glass dormitories.
          </p>
        </div>
      </section>

      {/* 2. Facility Cards Stack Section */}
      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <SectionTitle
            tagline="Basecamp Map"
            title="Premium Infrastructure Portfolio"
            description="All our structures feature a timber-glass structural design, blending safety and luxury with surrounding forests."
          />

          <div className="space-y-10">
            {FACILITIES.map((facility, idx) => (
              <AnimatedSection key={facility.id} yOffset={25}>
                {/* Each FacilityCard contains a built-in interactive interior slider */}
                <FacilityCard facility={facility} />
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Basecamp Standards info */}
      <section className="py-16 bg-white border-t border-primary/5 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h3 className="font-display font-black text-2xl sm:text-3.5xl text-primary leading-tight">
            Basecamp Technical & Safety Standards
          </h3>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Camp Revive operates under a premium resort mandate, offering high comfort thresholds, and certified medical safety nets in surrounding zones.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-xs font-display font-bold text-primary">
            <div className="p-4 bg-sand rounded-xl border border-primary/5">
              <span className="block text-xl text-accent-hover mb-1">24/7</span>
              <span>Paramedic & Guard Cover</span>
            </div>
            <div className="p-4 bg-sand rounded-xl border border-primary/5">
              <span className="block text-xl text-accent-hover mb-1">100%</span>
              <span>Filtered Drinking Water</span>
            </div>
            <div className="p-4 bg-sand rounded-xl border border-primary/5">
              <span className="block text-xl text-accent-hover mb-1">10kW</span>
              <span>Back-up Solar Generators</span>
            </div>
            <div className="p-4 bg-sand rounded-xl border border-primary/5">
              <span className="block text-xl text-accent-hover mb-1">20+</span>
              <span>Fully Serviced Restrooms</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default Facilities;
