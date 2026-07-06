import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useNavigate } from 'react-router-dom';
import { firebaseService } from '../../services/firebase';
import { Send, Sparkles, CheckCircle } from 'lucide-react';

// Form validation schema
const inquirySchema = zod.object({
  name: zod.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: zod.string().email({ message: 'Please enter a valid email address.' }),
  phone: zod.string().min(10, { message: 'Please enter a valid 10-digit mobile number.' }),
  inquiryType: zod.enum(['camp', 'sports', 'corporate', 'family', 'general'], {
    errorMap: () => ({ message: 'Please select an inquiry category.' })
  }),
  interestDetails: zod.string().optional(),
  message: zod.string().min(10, { message: 'Message must detail at least 10 characters.' })
});

export const InquiryForm = ({ defaultInquiryType = 'general', prefillItem = '' }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      inquiryType: defaultInquiryType,
      interestDetails: prefillItem,
      message: prefillItem ? `Hi Camp Revive team! I'm interested in booking the "${prefillItem}". Please send over details on packages, pricing, and available dates.` : ''
    }
  });

  // Prefill details if parameters change
  useEffect(() => {
    if (prefillItem) {
      setValue('interestDetails', prefillItem);
      setValue('message', `Hi Camp Revive team! I'm interested in booking the "${prefillItem}". Please send over details on packages, pricing, and available dates.`);
    }
    if (defaultInquiryType) {
      setValue('inquiryType', defaultInquiryType);
    }
  }, [defaultInquiryType, prefillItem, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Save submission inside Firestore collection (fallback handles local)
      const res = await firebaseService.saveInquiry(data);
      
      // Redirect to Inquiry Success screen
      navigate(`/inquiry-success?type=inquiry&ref=${res.id || 'INC-' + Date.now()}`);
      reset();
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('An error occurred submitting your inquiry. Please try again or chat with us on WhatsApp!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="bg-white rounded-3xl p-6 sm:p-10 border border-primary/5 shadow-xl space-y-6 relative overflow-hidden"
    >
      {/* Decorative premium header badge */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-[80px] pointer-events-none flex items-center justify-center pl-6 pb-6">
        <Sparkles className="w-5 h-5 text-accent-hover" />
      </div>

      <div className="space-y-1">
        <h3 className="font-display font-black text-2xl text-primary">Inquiry & Booking Form</h3>
        <p className="text-gray-400 text-xs font-semibold">Ready for your adventure? Secure your slot now.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name input */}
        <div className="space-y-1.5">
          <label className="text-xs font-display font-bold text-primary uppercase tracking-wide">Your Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register('name')}
            className={`w-full text-sm bg-sand border rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent ${
              errors.name ? 'border-red-400' : 'border-primary/10'
            }`}
          />
          {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name.message}</p>}
        </div>

        {/* Email input */}
        <div className="space-y-1.5">
          <label className="text-xs font-display font-bold text-primary uppercase tracking-wide">Email Address</label>
          <input
            type="email"
            placeholder="johndoe@example.com"
            {...register('email')}
            className={`w-full text-sm bg-sand border rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent ${
              errors.email ? 'border-red-400' : 'border-primary/10'
            }`}
          />
          {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Phone input */}
        <div className="space-y-1.5">
          <label className="text-xs font-display font-bold text-primary uppercase tracking-wide">Contact Number</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            {...register('phone')}
            className={`w-full text-sm bg-sand border rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent ${
              errors.phone ? 'border-red-400' : 'border-primary/10'
            }`}
          />
          {errors.phone && <p className="text-[10px] text-red-500 font-bold">{errors.phone.message}</p>}
        </div>

        {/* Inquiry Category Select */}
        <div className="space-y-1.5">
          <label className="text-xs font-display font-bold text-primary uppercase tracking-wide">Experience Category</label>
          <select
            {...register('inquiryType')}
            className={`w-full text-sm bg-sand border rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent cursor-pointer ${
              errors.inquiryType ? 'border-red-400' : 'border-primary/10'
            }`}
          >
            <option value="general">General Outdoor Inquiry</option>
            <option value="camp">Adventure Camp Bookings</option>
            <option value="sports">High-Performance Sports Academy</option>
            <option value="corporate">Corporate Outings & Retreations</option>
            <option value="family">Family Picnic Retreats</option>
          </select>
          {errors.inquiryType && <p className="text-[10px] text-red-500 font-bold">{errors.inquiryType.message}</p>}
        </div>
      </div>

      {/* Prefill Interest Details Display if present */}
      <div className="space-y-1.5">
        <label className="text-xs font-display font-bold text-primary uppercase tracking-wide">Inquired Product/Experience (Optional)</label>
        <input
          type="text"
          placeholder="e.g. Wilderness Leadership Summit"
          {...register('interestDetails')}
          className="w-full text-sm bg-sand border border-primary/10 rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent"
        />
      </div>

      {/* Message input */}
      <div className="space-y-1.5">
        <label className="text-xs font-display font-bold text-primary uppercase tracking-wide">Additional Details / Message</label>
        <textarea
          rows={4}
          placeholder="Please write details about your expected guest count, tentative dates, diet preferences, or merchandise inquiries..."
          {...register('message')}
          className={`w-full text-sm bg-sand border rounded-xl px-4 py-3.5 focus:outline-none focus:border-accent resize-none ${
            errors.message ? 'border-red-400' : 'border-primary/10'
          }`}
        />
        {errors.message && <p className="text-[10px] text-red-500 font-bold">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary-light disabled:bg-primary/60 text-white font-display font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 text-sm tracking-wider uppercase shadow-lg hover:shadow-xl cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Submitting Booking...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-accent" />
            Send Booking Inquiry
          </>
        )}
      </button>
      
      <div className="flex items-center gap-2 justify-center text-[10px] text-gray-400 text-center font-medium bg-sand/50 py-2 rounded-lg border border-dashed border-primary/5">
        <CheckCircle className="w-3.5 h-3.5 text-accent-hover" />
        Saves automatically to Firebase DB. Replied within 4 hours.
      </div>
    </form>
  );
};
export default InquiryForm;
