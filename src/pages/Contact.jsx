import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import SectionTitle from '../components/ui/SectionTitle';
import InquiryForm from '../components/ui/InquiryForm';
import { Phone, Mail, MapPin, ShieldCheck, Clock, MessageSquare } from 'lucide-react';

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const [inquiryType, setInquiryType] = useState('general');
  const [prefillItem, setPrefillItem] = useState('');

  // Extract preset values from URL queries
  useEffect(() => {
    const type = searchParams.get('type');
    const exp = searchParams.get('experience');
    const fac = searchParams.get('facility');

    if (type) {
      setInquiryType(type);
    } else if (exp || fac) {
      setInquiryType(exp ? 'camp' : 'general');
    }
    
    if (exp || fac) {
      setPrefillItem(exp || fac || '');
    }
  }, [searchParams]);

  return (
    <div className="pt-20">
      <SEO title="Get In Touch" description="Submit a group booking inquiry to Camp Revive. Speak with our wilderness trail coordinators, custom catering planners, or athletic turfs team." />

      {/* 1. Page Header */}
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop" 
            alt="Office boardroom log cabin" 
            className="w-full h-full object-cover opacity-20 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="bg-accent/25 text-accent font-display font-extrabold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-accent/25">
            Basecamp Dispatch
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none">
            Inquire & Book <span className="text-accent">Adventure</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sand-dark/70 text-sm sm:text-base leading-relaxed">
            Ready to chart your forest campaign? Complete the form below and align our outdoor rangers with your group goals.
          </p>
        </div>
      </section>

      {/* 2. Contact Details & Form Layout Grid */}
      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <AnimatedSection className="space-y-4">
              <SectionTitle
                tagline="Basecamp Dispatch"
                title="Speak With Wilderness Planners"
                align="left"
              />
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether you're planning a 50-person corporate summit, a weekend family picnic, or a sports team turf boot camp—our directors are ready to structure your customized packages.
              </p>
            </AnimatedSection>

            {/* Info cards list */}
            <div className="space-y-4">
              {[
                {
                  icon: <MapPin className="w-5 h-5 text-accent-hover" />,
                  title: "Wilderness basecamp location",
                  val: "Camp Revive Corridor, foothills of Western Ghats, Maharashtra, India"
                },
                {
                  icon: <Phone className="w-5 h-5 text-accent-hover" />,
                  title: "Direct telephone support",
                  val: "+91 90000 00000 / +91 98888 88888"
                },
                {
                  icon: <Mail className="w-5 h-5 text-accent-hover" />,
                  title: "Official email desk",
                  val: "info@camprevive.in / bookings@camprevive.in"
                },
                {
                  icon: <Clock className="w-5 h-5 text-accent-hover" />,
                  title: "Active office hours",
                  val: "Monday - Sunday: 8:00 AM - 8:00 PM"
                }
              ].map((info, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.05} className="flex gap-4 bg-white p-5 rounded-2xl border border-primary/5 shadow-sm">
                  <div className="w-11 h-11 bg-sand-dark/40 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-primary">{info.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed mt-1 font-medium">{info.val}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Quick emergency notice */}
            <AnimatedSection className="bg-primary-dark text-white p-6 rounded-3xl border border-primary-light/10 shadow-lg flex gap-4">
              <ShieldCheck className="w-8 h-8 text-accent flex-shrink-0 mt-1 animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-white">Guaranteed Response Speed</h4>
                <p className="text-sand-dark/70 text-xs leading-relaxed">
                  Inquiries receive an analytical response containing personalized pricing options within 4 business hours. Let's start!
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Reusable InquiryForm */}
          <div className="lg:col-span-7">
            <AnimatedSection className="h-full">
              <InquiryForm 
                defaultInquiryType={inquiryType} 
                prefillItem={prefillItem} 
              />
            </AnimatedSection>
          </div>

        </div>
      </section>

      {/* 3. Embedded Google Map Simulation */}
      <section className="py-2 bg-sand-dark/20 aspect-[21/9] min-h-[350px] w-full relative border-t border-primary/5">
        {/* Simulate real high quality map image backdrop */}
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop" 
          alt="Forest satellite hills map" 
          className="w-full h-full object-cover filter brightness-[0.7] grayscale contrast-[1.15]"
        />
        
        {/* Transparent dark glass overlay */}
        <div className="absolute inset-0 bg-primary/45 backdrop-blur-[1px] flex items-center justify-center p-6 text-center text-white">
          <div className="bg-primary-dark/85 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-md shadow-2xl space-y-4">
            <MapPin className="w-10 h-10 text-accent mx-auto animate-bounce" />
            <h3 className="font-display font-black text-xl text-white">Find Us in the Foothills</h3>
            <p className="text-sand-dark/70 text-xs leading-relaxed">
              Located exactly 2.5 hours driving from Mumbai Airport & 1.5 hours from Pune. Private shuttles can be arranged upon request.
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-accent hover:bg-accent-hover text-primary font-display font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-md transition-colors"
            >
              Get Directions on Maps
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
export default Contact;
