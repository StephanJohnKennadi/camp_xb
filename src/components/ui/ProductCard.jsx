import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { ShoppingBag, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { title, handle, price, category, images, variants } = product;
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to the first available variant for immediate addition
    if (variants && variants.length > 0) {
      addToCart(product, variants[0], 1);
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-primary/5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
      
      {/* Product Image Panel */}
      <Link to={`/store/${handle}`} className="relative aspect-square overflow-hidden bg-sand block">
        <img 
          src={images[0]} 
          alt={title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover action overlay sheet */}
        <div className="absolute inset-0 bg-primary-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleQuickAdd}
            className="w-11 h-11 bg-accent hover:bg-accent-hover text-primary rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="Quick Add to Bag"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
          </button>
          
          <Link
            to={`/store/${handle}`}
            className="w-11 h-11 bg-white hover:bg-sand text-primary rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
            title="View Product Details"
          >
            <Eye className="w-4.5 h-4.5" />
          </Link>
        </div>

        {/* Category Overlay */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary font-display font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-primary/5 shadow-sm">
          {category}
        </span>
      </Link>

      {/* Details Box */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-bold text-base text-primary truncate leading-snug hover:underline">
            <Link to={`/store/${handle}`}>{title}</Link>
          </h4>
          <p className="text-gray-400 text-xs font-semibold">{category}</p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-primary/5">
          <span className="font-display font-extrabold text-lg text-primary">
            ${parseFloat(price).toFixed(2)}
          </span>
          
          <button
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1 text-xs font-display font-bold text-accent-hover hover:text-primary transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

    </div>
  );
};
export default ProductCard;
