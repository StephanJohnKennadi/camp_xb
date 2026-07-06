import React, { useEffect, useState } from 'react';
import SEO from '../components/common/SEO';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCard from '../components/ui/ProductCard';
import { shopifyService } from '../services/shopify';
import { Compass, SlidersHorizontal, Search, ArrowUpDown } from 'lucide-react';

export const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const CATEGORIES = ['All', 'Camping Gear', 'Apparel', 'Accessories'];

  // Fetch products from Shopify service
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await shopifyService.getProducts();
        setProducts(res);
        setFilteredProducts(res);
      } catch (e) {
        console.error("Failed to load storefront products:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Filter and sort products whenever query, category, or sort updates
  useEffect(() => {
    let result = [...products];

    // 1. Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(result);
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="pt-20">
      <SEO title="Wilderness Gear Store" description="Official Camp Revive store. Shop official 4-person tents, sleeping bags, insulated flasks, quick dry caps, and trail hoodies." />

      {/* 1. Header Banner */}
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1600&auto=format&fit=crop" 
            alt="Camping flask tent" 
            className="w-full h-full object-cover opacity-20 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="bg-accent/25 text-accent font-display font-extrabold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-accent/25">
            Camp Storefront
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-none">
            Official Revive <span className="text-accent">Expedition Gear</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sand-dark/70 text-sm sm:text-base leading-relaxed">
            Professional heavy-duty tents, thermal water flasks, trekking backpacks, and quick-dry apparel.
          </p>
        </div>
      </section>

      {/* 2. Control center: filters, search, and sorting bar */}
      <section className="py-8 bg-white border-b border-primary/5 sticky top-18 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 justify-between items-center">
          
          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'text-primary/70 bg-sand hover:text-primary border border-primary/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Panel */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-stretch sm:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/45" />
              <input
                type="text"
                placeholder="Search gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-sand border border-primary/10 rounded-full pl-11 pr-5 py-3 focus:outline-none focus:border-accent"
              />
            </div>

            {/* Sort Select */}
            <div className="relative flex items-center bg-sand border border-primary/10 rounded-full px-4 py-2 text-xs font-display font-bold text-primary">
              <ArrowUpDown className="w-3.5 h-3.5 text-primary/45 mr-2.5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-4 uppercase tracking-wider text-[10px]"
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Product Grid Showcase */}
      <section className="py-20 bg-sand min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6">
          
          {isLoading ? (
            // Loading Skeletons
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="aspect-[4/5] rounded-3xl bg-white border border-primary/5 shadow animate-pulse p-6 space-y-4">
                  <div className="aspect-square w-full bg-sand-dark/40 rounded-2xl" />
                  <div className="h-5 bg-sand-dark/40 w-2/3 rounded" />
                  <div className="h-4 bg-sand-dark/40 w-1/3 rounded" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-primary/5 p-8 max-w-md mx-auto">
              <Compass className="w-16 h-16 text-primary/30 mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-primary">No products found</h3>
              <p className="text-gray-400 text-sm mt-1">Please try modifying your search keywords or tags.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <AnimatedSection key={product.id}>
                  <ProductCard product={product} />
                </AnimatedSection>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
export default Store;
