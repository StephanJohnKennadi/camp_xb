import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description = "Experience premium outdoor camping, high-performance sports training, family retreats, and shop official wilderness gear at Camp Revive.",
  keywords = "camping, outdoor camp, sports training, corporate retreats, active lifestyle, camp revive",
  ogImage = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800",
  ogType = "website"
}) => {
  useEffect(() => {
    // Dynamic page title
    document.title = title ? `${title} | Camp Revive` : "Camp Revive | Outdoor Camp, Sports & Merchandise";

    // Set meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      let element = document.querySelector(isProperty ? `meta[property='${name}']` : `meta[name='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph
    updateMetaTag('og:title', title ? `${title} | Camp Revive` : "Camp Revive", true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', window.location.href, true);
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title ? `${title} | Camp Revive` : "Camp Revive");
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

  }, [title, description, keywords, ogImage, ogType]);

  return null;
};

export default SEO;
