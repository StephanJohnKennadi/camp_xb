import React from 'react';

export const SectionTitle = ({
  tagline,
  title,
  description,
  align = 'center',
  white = false
}) => {
  return (
    <div className={`max-w-3xl mb-12 sm:mb-16 ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      {tagline && (
        <span className={`inline-block font-display font-extrabold text-xs uppercase tracking-widest mb-3 px-3 py-1 rounded-full ${
          white 
            ? 'bg-white/10 text-accent' 
            : 'bg-primary/5 text-primary-light'
        }`}>
          {tagline}
        </span>
      )}
      {title && (
        <h2 className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mt-2 ${
          white ? 'text-white' : 'text-primary'
        }`}>
          {title}
        </h2>
      )}
      {description && (
        <p className={`mt-4.5 text-base sm:text-lg leading-relaxed ${
          white ? 'text-sand-dark/70' : 'text-gray-500'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
};
export default SectionTitle;
