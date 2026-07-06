import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import confetti from 'canvas-confetti';
import { Check, Sparkles, MessageSquare, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const InquirySuccess = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const type = searchParams.get('type') || 'inquiry'; // 'inquiry' or 'store'
  const referenceId = searchParams.get('ref') || `REF-${Math.floor(Math.random() * 900000) + 100000}`;

  // Execute confetti on mount for fantastic premium UX!
  useEffect(() => {
    // If e-commerce purchase success, clear the local cart state
    if (type === 'store') {
      clearCart();
    }

    // Confetti blast!
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#70e000', '#1b4332', '#f4f1de']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#70e000', '#1b4332', '#f4f1de']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [type, clearCart]);

  return (
    <div className="pt-28 pb-24 min-h-[90vh] bg-sand flex items-center">
      <SEO title="Success" description="Inquiry or Order processed successfully. Thank you for connecting with Camp Revive!" />

      <div className="max-w-xl mx-auto px-6 text-center w-full">
        <AnimatedSection scale={0.95} duration={0.8} className="bg-white p-8 sm:p-12 rounded-[40px] border border-primary/5 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Decorative burst */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Success Check Badge */}
          <div className="w-20 h-20 bg-accent text-primary rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10 animate-bounce">
            <Check className="w-10 h-10 stroke-[3px]" />
          </div>

          {/* Success Message Header */}
          <div className="space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-display font-extrabold uppercase tracking-widest text-accent-hover bg-accent/10 px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Dispatch Confirmed
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4.5xl text-primary tracking-tight">
              {type === 'store' ? 'Order Successful!' : 'Inquiry Submitted!'}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
              {type === 'store' 
                ? 'Your premium adventure merchandise transaction was completed. We are prepping your inventory.'
                : 'Your custom camp/sports reservation inquiry has been registered inside our Firestore database.'}
            </p>
          </div>

          {/* Reference Card block */}
          <div className="bg-sand p-5 rounded-2xl border border-primary/5 text-center space-y-1">
            <span className="text-[10px] uppercase font-display font-extrabold tracking-widest text-gray-400 block">
              Reference Code
            </span>
            <span className="font-display font-black text-xl text-primary select-all tracking-wider">
              {referenceId}
            </span>
          </div>

          {/* Helpful steps */}
          <div className="text-left space-y-3 border-t border-dashed border-primary/10 pt-6">
            <h4 className="font-display font-extrabold text-xs text-primary uppercase tracking-wider">Next steps:</h4>
            <ul className="text-xs text-gray-500 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <div className="w-4 h-4 bg-accent/20 text-accent-hover font-bold rounded-full flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">1</div>
                <span>Our wilderness planners will analyze availability and compile package quotes within 4 business hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-4 h-4 bg-accent/20 text-accent-hover font-bold rounded-full flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">2</div>
                <span>A confirmation brief will be sent directly to your supplied email and phone registry.</span>
              </li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-primary/5 relative z-10">
            <a
              href={`https://wa.me/919000000000?text=${encodeURIComponent(`Hi Camp Revive team! My booking reference code is ${referenceId}. I would like to expedite my reservation details!`)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-display font-black text-xs uppercase tracking-wider py-4.5 rounded-full flex-1 flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4.5 h-4.5 fill-current" />
              Expedite on WhatsApp
            </a>
            
            <Link
              to="/"
              className="bg-primary hover:bg-primary-light text-white font-display font-bold text-xs uppercase tracking-wider py-4.5 rounded-full flex-1 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              Back to Safety
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>

          {/* Secure transaction notice */}
          <div className="flex justify-center items-center gap-1.5 text-[10px] text-gray-400 font-display font-semibold pt-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            Saved securely inside Database collection
          </div>

        </AnimatedSection>
      </div>
    </div>
  );
};
export default InquirySuccess;
