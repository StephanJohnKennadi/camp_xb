import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';

export const WhatsAppButton = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Generate a customized default message based on the current page route
  useEffect(() => {
    let defaultMsg = "Hi Camp Revive! I would like to inquire about your camps and adventure experiences.";
    
    if (location.pathname.includes('/experiences')) {
      defaultMsg = "Hi Camp Revive! I'm interested in booking an experience (Corporate/Family/Sports activity) and wanted to know about pricing & available slots.";
    } else if (location.pathname.includes('/facilities')) {
      defaultMsg = "Hi Camp Revive! I am planning an event/retreat and want to inquire about renting your facilities (Arena, Amphitheatre, Dining, Dorms).";
    } else if (location.pathname.includes('/store')) {
      defaultMsg = "Hi Camp Revive! I am looking at your merchandise and store products. Can you help me with active sizes or gear specifications?";
    } else if (location.pathname.includes('/contact')) {
      defaultMsg = "Hi Camp Revive! I want to get in touch regarding a general inquiry. Please let me know how to proceed.";
    }
    
    setMessage(defaultMsg);
  }, [location.pathname]);

  const handleSend = () => {
    const phoneNumber = "919000000000"; // Default contact phone (replace with actual client WhatsApp number)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white border border-primary/10 rounded-2xl shadow-2xl p-5 mb-4 w-72 sm:w-80 overflow-hidden relative"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-primary/5 pb-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-primary">Camp Revive Concierge</h4>
                <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Online | Typically replies instantly
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body Bubble */}
            <div className="bg-sand-dark/30 p-3 rounded-2xl mb-4 text-xs text-gray-600 border border-primary/5">
              🌿 Hello adventurer! Ask us about custom group packages, campfire dates, sports coaching, or store products below!
            </div>

            {/* Form Input */}
            <div className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Type your inquiry here..."
                className="w-full text-xs bg-sand border border-primary/10 focus:border-accent focus:outline-none p-3 rounded-xl resize-none font-sans leading-relaxed"
              />
              <button
                onClick={handleSend}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-display font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all duration-300"
              >
                <Send className="w-3.5 h-3.5" />
                Start Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Trigger Button with pulsing ring */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl relative cursor-pointer group"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 group-hover:animate-ping z-0" />
        <MessageSquare className="w-6 h-6 fill-current relative z-10" />
      </motion.button>
    </div>
  );
};
export default WhatsAppButton;
