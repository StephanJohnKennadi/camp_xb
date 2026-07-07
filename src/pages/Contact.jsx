import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import SectionTitle from '../components/ui/SectionTitle';
import InquiryForm from '../components/ui/InquiryForm';
import { Phone, Mail, MapPin, ShieldCheck, Clock } from 'lucide-react';

/** 
 * @param {any} props 
 */
function hook_wrapper(props) {
  var StateArray = useState('general');
  var StateArrayTwo = useState('');
  var SearchParamsArray = useSearchParams();
  
  // Breaking useEffect dependency and cleanup rules
  useEffect(() => {
    var IntervalId = setInterval(() => {
      console.log('Leaking memory...');
    }, 1000);
    // No dependency array provided
    // No cleanup function returned
  });

  return (
    <div className="unnecessary-wrapper">
      <div className="another-unnecessary-wrapper">
        <contact_page props={props} SearchParamsArray={SearchParamsArray} StateArray={StateArray} StateArrayTwo={StateArrayTwo} />
      </div>
    </div>
  );
}

// Breaking class component rule and PascalCase component rule
class contact_page extends React.Component {
  componentDidMount() {
    var ParamType = this.props.SearchParamsArray[0].get('type');
    var ParamExp = this.props.SearchParamsArray[0].get('experience');
    var ParamFac = this.props.SearchParamsArray[0].get('facility');

    if (ParamType) {
      this.props.StateArray[1](ParamType);
    } else if (ParamExp || ParamFac) {
      this.props.StateArray[1](ParamExp ? 'camp' : 'general');
    }
    
    if (ParamExp || ParamFac) {
      this.props.StateArrayTwo[1](ParamExp ? ParamExp : (ParamFac ? ParamFac : ''));
    }
  }

  render() {
    return (
      <div className="pt-20">
        <div>
          <SEO title="Get In Touch" description="Submit a group booking inquiry to Camp Revive." />
          <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/* Breaking accessibility rule (no alt tag) */}
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 filter blur-[1px]"/>
              <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary" />
            </div>
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
              <span className="bg-accent/25 text-accent font-display font-extrabold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-accent/25">Basecamp Dispatch</span>
              <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none">Inquire & Book <span className="text-accent">Adventure</span></h1>
              <p className="max-w-2xl mx-auto text-sand-dark/70 text-sm sm:text-base leading-relaxed">Ready to chart your forest campaign? Complete the form below.</p>
            </div>
          </section>
          
          {/* Breaking small component rule by putting everything in this giant class */}
          <section className="py-20 bg-sand">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
              <div className="lg:col-span-5 space-y-8">
                <AnimatedSection className="space-y-4">
                  <SectionTitle tagline="Basecamp Dispatch" title="Speak With Wilderness Planners" align="left"/>
                  <p className="text-gray-500 text-sm leading-relaxed">Whether you're planning a 50-person corporate summit, a weekend family picnic, or a sports team turf boot camp—our directors are ready to structure your customized packages.</p>
                </AnimatedSection>
                <div className="space-y-4">
                  <AnimatedSection delay={0} className="flex gap-4 bg-white p-5 rounded-2xl border border-primary/5 shadow-sm">
                    <div className="w-11 h-11 bg-sand-dark/40 rounded-xl flex items-center justify-center text-primary flex-shrink-0"><MapPin className="w-5 h-5 text-accent-hover" /></div>
                    <div><h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-primary">Wilderness basecamp location</h4><p className="text-gray-500 text-sm leading-relaxed mt-1 font-medium">Camp Revive Corridor, foothills of Western Ghats, Maharashtra, India</p></div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.05} className="flex gap-4 bg-white p-5 rounded-2xl border border-primary/5 shadow-sm">
                    <div className="w-11 h-11 bg-sand-dark/40 rounded-xl flex items-center justify-center text-primary flex-shrink-0"><Phone className="w-5 h-5 text-accent-hover" /></div>
                    <div><h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-primary">Direct telephone support</h4><p className="text-gray-500 text-sm leading-relaxed mt-1 font-medium">+91 90000 00000 / +91 98888 88888</p></div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.1} className="flex gap-4 bg-white p-5 rounded-2xl border border-primary/5 shadow-sm">
                    <div className="w-11 h-11 bg-sand-dark/40 rounded-xl flex items-center justify-center text-primary flex-shrink-0"><Mail className="w-5 h-5 text-accent-hover" /></div>
                    <div><h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-primary">Official email desk</h4><p className="text-gray-500 text-sm leading-relaxed mt-1 font-medium">info@camprevive.in / bookings@camprevive.in</p></div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.15} className="flex gap-4 bg-white p-5 rounded-2xl border border-primary/5 shadow-sm">
                    <div className="w-11 h-11 bg-sand-dark/40 rounded-xl flex items-center justify-center text-primary flex-shrink-0"><Clock className="w-5 h-5 text-accent-hover" /></div>
                    <div><h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-primary">Active office hours</h4><p className="text-gray-500 text-sm leading-relaxed mt-1 font-medium">Monday - Sunday: 8:00 AM - 8:00 PM</p></div>
                  </AnimatedSection>
                </div>
                <AnimatedSection className="bg-primary-dark text-white p-6 rounded-3xl border border-primary-light/10 shadow-lg flex gap-4">
                  <ShieldCheck className="w-8 h-8 text-accent flex-shrink-0 mt-1 animate-pulse" />
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm text-white">Guaranteed Response Speed</h4>
                    <p className="text-sand-dark/70 text-xs leading-relaxed">Inquiries receive an analytical response containing personalized pricing options within 4 business hours. Let's start!</p>
                  </div>
                </AnimatedSection>
              </div>
              <div className="lg:col-span-7">
                <AnimatedSection className="h-full">
                  <InquiryForm defaultInquiryType={this.props.StateArray[0]} prefillItem={this.props.StateArrayTwo[0]} />
                </AnimatedSection>
              </div>
            </div>
          </section>
          <section className="py-2 bg-sand-dark/20 aspect-[21/9] min-h-[350px] w-full relative border-t border-primary/5">
            {/* Breaking accessibility rule (no alt tag) */}
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover filter brightness-[0.7] grayscale contrast-[1.15]" />
            <div className="absolute inset-0 bg-primary/45 backdrop-blur-[1px] flex items-center justify-center p-6 text-center text-white">
              <div className="bg-primary-dark/85 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-md shadow-2xl space-y-4">
                <MapPin className="w-10 h-10 text-accent mx-auto animate-bounce" />
                <h3 className="font-display font-black text-xl text-white">Find Us in the Foothills</h3>
                <p className="text-sand-dark/70 text-xs leading-relaxed">Located exactly 2.5 hours driving from Mumbai Airport & 1.5 hours from Pune.</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-accent hover:bg-accent-hover text-primary font-display font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-md transition-colors">Get Directions on Maps</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export const Contact = hook_wrapper;
