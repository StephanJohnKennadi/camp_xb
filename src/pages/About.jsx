import React from 'react';
import SEO from '../components/common/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import SectionTitle from '../components/ui/SectionTitle';
import { ShieldCheck, Users, Eye, Target, Compass, Award } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-20">
      <SEO title="About Our Mission" description="Learn about Camp Revive's founding roots, wilderness values, team alignment strategies, and dedication to eco-sustainable camping." />

      {/* 1. Header Hero Panel */}
      <section className="relative bg-primary-dark text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop" 
            alt="Misty redwood forest wilderness" 
            className="w-full h-full object-cover opacity-25 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="bg-accent/20 text-accent font-display font-extrabold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-accent/20">
            Our Wilderness Genesis
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none text-white">
            Rooted In Adventure, <br />
            Built For <span className="text-accent">Transformation</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sand-dark/70 text-sm sm:text-base leading-relaxed">
            Camp Revive was founded on a simple truth: the modern human soul thrives when challenged by gravity, wind, water, and athletic camaraderie.
          </p>
        </div>
      </section>

      {/* 2. Core Story & Vision Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <AnimatedSection className="space-y-6">
            <SectionTitle
              tagline="Behind The Basecamp"
              title="How Camp Revive Restructured Adventure Retreations"
              align="left"
            />
            
            <div className="space-y-4.5 text-gray-500 text-sm sm:text-base leading-relaxed">
              <p>
                Established in 2018 at the base of the Western Ghats, Camp Revive was born as a small experimental bootcamp for high-performance football teams looking for wilderness high-altitude endurance training.
              </p>
              <p>
                As our professional arenas grew, we realized corporate operations were looking for similar extreme alignment triggers to break team friction. Families were searching for safe portals to reconnect kids with real earth, fire, and sky.
              </p>
              <p>
                Today, Camp Revive spans over 40 acres of private forest reserve, featuring elite synthetic arenas, rustic luxury wooden glass cabins, an organic farm-to-table kitchen, and survival challenges that have reshaped over 10,000 corporate leaders and athletes.
              </p>
            </div>
            
            <div className="flex items-center gap-6 pt-4 text-xs font-display font-bold text-primary">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-accent" /> Eco-Sustainable Cert</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-accent" /> Expert Survival Rangers</span>
            </div>
          </AnimatedSection>

          <AnimatedSection className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-primary/5 relative group bg-sand-dark">
            <img 
              src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop" 
              alt="Misty morning campers looking at hills" 
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute bottom-6 right-6 bg-primary/95 text-white p-5 rounded-2xl border border-white/10 shadow-lg text-center min-w-[140px]">
              <span className="font-display font-black text-3xl text-accent block">8+ Years</span>
              <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">Wilderness Service</span>
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-24 bg-sand border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            tagline="Our Philosophy"
            title="The Core Pillars We Scout By"
            description="We balance extreme athletic adrenaline demands with profound respect for ecological preservation."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass className="w-8 h-8 text-primary" />,
                title: "Wilderness Self-Sufficiency",
                text: "We teach primitive fire building, water filtration physics, and compass path-mapping. Empowering guests to unlock internal confidence through outdoor challenges."
              },
              {
                icon: <Target className="w-8 h-8 text-primary" />,
                title: "Elite Athletic Performance",
                text: "Sports aren't just recreational play here. Our multisport turf and sand terrains are built to pro-league standards to strictly elevate endurance and coordination."
              },
              {
                icon: <Eye className="w-8 h-8 text-primary" />,
                title: "Ecological Conservation",
                text: "We occupy nature under a zero-plastic, solar-fueled, farm-to-table organic mandate. 10% of all retreat profits fund surrounding tribal forest conservancies."
              }
            ].map((value, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} className="bg-white p-8 rounded-3xl border border-primary/5 shadow-md space-y-4">
                <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-primary">
                  {value.icon}
                </div>
                <h3 className="font-display font-black text-xl text-primary">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership / Instructor Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            tagline="Basecamp Guardians"
            title="Qualified Guides & Sports Directors"
            description="Our workshops, bootcamps, and hikes are directed by highly credentialed experts holding certified global skills."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Commander Satish Rao",
                role: "Lead Bushcraft Ranger",
                cert: "Ex-Indian Navy Special Forces",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
              },
              {
                name: "Coach Kabir Fernandez",
                role: "Director of Athletics",
                cert: "UEFA 'A' License Football Coach",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
              },
              {
                name: "Dr. Sunita Deshmukh",
                role: "Lead Nature Therapist & Yogi",
                cert: "PhD Wilderness Psychology",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
              },
              {
                name: "Chef Ryan D'Souza",
                role: "Executive Camp Culinary Director",
                cert: "Michelin Guide Green Star Alumnus",
                img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=300&auto=format&fit=crop"
              }
            ].map((member, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.08} className="bg-sand rounded-3xl overflow-hidden border border-primary/5 shadow-md text-center group">
                <div className="aspect-[4/5] overflow-hidden bg-sand-dark relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-6 space-y-1">
                  <h4 className="font-display font-black text-lg text-primary">{member.name}</h4>
                  <p className="text-accent-hover font-display font-bold text-xs uppercase">{member.role}</p>
                  <p className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider">{member.cert}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Clean, beautiful Milestones Chronology strip */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            tagline="Our Milestones"
            title="The Adventure Timeline"
            white={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 relative z-10">
            {[
              { year: "2018", title: "Forest Sandbox", text: "Acquired 40 acres of degraded basalt lands. Started clearing invasive species and planting over 8,000 endemic trees." },
              { year: "2020", title: "Turf Construction", text: "Completed the pro multisport turf arena and open amphitheatre, inviting athletic leagues for remote altitude camps." },
              { year: "2022", title: "Corporate Synergy Launch", text: "Structured navigation, survival orienteering and leadership workshops. Welcomed top-tier technology firms." },
              { year: "2025", title: "Merchandise & Beyond", text: "Launched official expedition gear, custom tents, sleeping bags, and insulated flasks directly integrated with Shopify storefronts." }
            ].map((milestone, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1} className="space-y-3 p-6 bg-white/5 rounded-2xl border border-white/10 relative group">
                <span className="font-display font-black text-3xl text-accent block group-hover:scale-105 transition-transform">{milestone.year}</span>
                <h4 className="font-display font-bold text-white text-base">{milestone.title}</h4>
                <p className="text-sand-dark/70 text-xs leading-relaxed">{milestone.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
export default About;
