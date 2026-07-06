import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';
import SectionTitle from '../components/ui/SectionTitle';
import ExperienceCard from '../components/ui/ExperienceCard';
import { EXPERIENCES } from '../constants/data';
import { ShieldCheck, Compass } from 'lucide-react';

export const Experiences = () => {
  const [activeTab, setActiveTab] = useState('All');

  const CATEGORIES = ['All', 'Corporate Experiences', 'Family Experiences', 'Sports Activities', 'Camp Activities'];

  const filteredExperiences = activeTab === 'All' 
    ? EXPERIENCES 
    : EXPERIENCES.filter(exp => exp.category === activeTab);

  return (
    <div className="pt-20">
      <SEO title="Adventure Camps & Sports Academy" description="Explore custom group programs. Features corporate navigation, parent-child archery, and altitude sports turf endurance." />

      {/* 1. Page Header */}
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1496080174650-637e3f22fa03?q=80&w=1600&auto=format&fit=crop" 
            alt="Survivalist hiking forest" 
            className="w-full h-full object-cover opacity-25 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="bg-accent/25 text-accent font-display font-extrabold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-accent/25">
            Adventure Packages
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none">
            Wilderness Blueprints & <span className="text-accent">Active Arenas</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sand-dark/70 text-sm sm:text-base leading-relaxed">
            Select a tailored adventure package designed to align company delegates, build family connections, or coach athlete stamina.
          </p>
        </div>
      </section>

      {/* 2. Interactive Filter Tabs Section */}
      <section className="py-12 bg-white border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-2.5 pb-3 no-scrollbar justify-start md:justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-primary/70 bg-sand hover:text-primary border border-primary/5'
                }`}
              >
                {cat.replace(' Experiences', '').replace(' Activities', '')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Experiences Cards Grid Showcase */}
      <section className="py-20 bg-sand min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6">
          {filteredExperiences.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-primary/5 p-8">
              <Compass className="w-16 h-16 text-primary/30 mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-primary">No packages found</h3>
              <p className="text-gray-400 text-sm">Please select another active filter tab.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredExperiences.map((exp) => (
                <AnimatedSection key={exp.id} yOffset={20}>
                  <ExperienceCard experience={exp} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Help Inquiries banner */}
      <section className="py-16 bg-white border-t border-primary/5 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h3 className="font-display font-black text-2xl sm:text-3.5xl text-primary leading-tight">
            Need a Fully Customized Camp Blueprint?
          </h3>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            We structure fully customizable day workshops, weekend passes, camping packages, and dining configurations tailored for group sizes ranging from 15 to 300 delegates. Let's build your experience together.
          </p>
          <div className="flex gap-4 justify-center pt-2">
            <a
              href="/contact?type=custom"
              className="bg-primary hover:bg-primary-light text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full shadow-lg transition-all"
            >
              Get Custom Quote
            </a>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noreferrer"
              className="bg-sand hover:bg-sand-dark text-primary border border-primary/5 font-display font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full transition-all"
            >
              WhatsApp Consulting
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
export default Experiences;
