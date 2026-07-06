import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { useCart } from '../hooks/useCart';
import { shopifyService } from '../services/shopify';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, BadgeCheck, Minus, Plus } from 'lucide-react';

export const ProductDetails = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const data = await shopifyService.getProductByHandle(handle);
        setProduct(data);
        setActiveImage(data.images[0] || '');
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (e) {
        console.error(`Failed to load product details for: ${handle}`, e);
        navigate('/store');
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [handle, navigate]);

  const handleQuantityChange = (val) => {
    if (val <= 0) return;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    addToCart(product, selectedVariant, quantity);
  };

  if (isLoading) {
    return (
      <div className="pt-32 min-h-screen bg-sand flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-display font-bold text-primary uppercase tracking-wider">Unboxing Gear Details...</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="pt-28 pb-20 bg-sand">
      <SEO title={product.title} description={product.description.slice(0, 150)} />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Link */}
        <Link 
          to="/store" 
          className="inline-flex items-center gap-2 text-xs font-display font-bold text-primary/75 hover:text-primary uppercase tracking-wider mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Gear Shop
        </Link>

        {/* Product Details Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column: Image viewer */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatedSection className="aspect-square bg-white rounded-[32px] overflow-hidden border border-primary/5 shadow-md relative">
              <img 
                src={activeImage} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </AnimatedSection>

            {/* Thumbnail selector strip if more than 1 image exists */}
            {product.images.length > 1 && (
              <AnimatedSection className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border bg-white focus:outline-none transition-all ${
                      activeImage === img 
                        ? 'border-accent ring-2 ring-accent/30' 
                        : 'border-primary/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </AnimatedSection>
            )}
          </div>

          {/* Right Column: details purchasing panel */}
          <div className="lg:col-span-5 space-y-8 bg-white p-6 sm:p-10 rounded-[32px] border border-primary/5 shadow-xl">
            
            {/* Header info */}
            <div className="space-y-3">
              <span className="bg-primary/5 text-primary-light font-display font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-primary/5">
                {product.category}
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4.5xl text-primary leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-baseline gap-4 pt-1">
                <span className="font-display font-black text-2.5xl text-primary">
                  ${parseFloat(selectedVariant ? selectedVariant.price : product.price).toFixed(2)}
                </span>
                <span className="text-xs text-emerald-500 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  In Stock & Ready
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed border-t border-primary/5 pt-6">
              {product.description}
            </p>

            {/* Variant Selector List if more than 1 option exists */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-3">
                <label className="text-xs font-display font-bold text-primary uppercase tracking-wide">
                  Select Specification Variant
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4.5 py-2.5 rounded-xl font-display font-bold text-xs transition-all cursor-pointer ${
                        selectedVariant?.id === v.id
                          ? 'bg-primary text-white shadow-md border border-transparent'
                          : 'bg-sand hover:bg-sand-dark text-primary border border-primary/5'
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart action */}
            <div className="space-y-6 pt-4 border-t border-primary/5">
              <div className="flex items-center gap-6">
                <div className="space-y-1.5 flex-1">
                  <label className="text-xs font-display font-bold text-primary uppercase tracking-wide block">
                    Quantity
                  </label>
                  
                  <div className="flex items-center border border-primary/10 rounded-xl px-3 py-1.5 bg-sand max-w-[120px] justify-between">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-1 hover:text-accent transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-display font-bold text-sm w-6 text-center text-primary">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-1 hover:text-accent transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary-light text-white font-display font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-sm uppercase tracking-wider cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-accent" />
                Add Gear to Bag
              </button>
            </div>

            {/* E-Commerce trust checklist */}
            <div className="space-y-4 pt-6 border-t border-primary/5 text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-accent-hover flex-shrink-0" />
                <span>Express dispatch inside India. Custom global delivery options available.</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-accent-hover flex-shrink-0" />
                <span>Fulfilled & processed directly through official secure Shopify Checkout.</span>
              </div>
            </div>

            {/* Features Specifications Accordion */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-primary/5">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-primary">Gear Specifications:</h4>
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 font-medium">
                      <BadgeCheck className="w-4 h-4 text-accent-hover mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
export default ProductDetails;
