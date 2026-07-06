import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/common/SEO';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../components/ui/AnimatedSection';
import SectionTitle from '../components/ui/SectionTitle';
import ExperienceCard from '../components/ui/ExperienceCard';
import ProductCard from '../components/ui/ProductCard';
import { EXPERIENCES, FACILITIES, TESTIMONIALS, GALLERY_ITEMS } from '../constants/data';
import { shopifyService } from '../services/shopify';
import { ArrowRight, Sparkles, Trophy, Flame, TreePine, Star, ShieldCheck, Heart } from 'lucide-react';

export const Home = () => {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Fetch featured products from Shopify storefront
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const products = await shopifyService.getProducts();
        setFeaturedProducts(products.slice(0, 3)); // Grab first 3 products for preview
      } catch (e) {
        console.error("Failed to load featured products for home:", e);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="pt-20">
      <SEO title="Home" description="Welcome to Camp Revive—Western Ghats' premier wilderness camp, sports training turf, and official outdoor gear storefront." />

      {/* 1. Hero Banner Section */}
      <section className="relative min-h-[92vh] flex items-center bg-primary-dark text-white overflow-hidden py-24 sm:py-32">
        {/* Ambient background decoration */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1600&auto=format&fit=crop"
            alt="Forest wilderness backdrop"
            className="w-full h-full object-cover opacity-35 scale-105 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl space-y-8 text-left">
            <AnimatedSection delay={0.1} yOffset={20}>
              <span className="inline-flex items-center gap-2 bg-accent/20 text-accent font-display font-extrabold text-xs uppercase tracking-widest px-4.5 py-2 rounded-full border border-accent/20">
                <Sparkles className="w-3.5 h-3.5" />
                Western Ghats Premium Basecamp
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.2} yOffset={30}>
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7.5xl leading-[1.05] tracking-tight">
                Where Raw Wilderness <br className="hidden sm:inline" />
                Meets <span className="text-accent">Active Athletics</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.3} yOffset={30}>
              <p className="text-sand-dark/80 text-base sm:text-xl leading-relaxed max-w-2xl">
                Experience high-performance synthetic sports turfs, raw survival bushcraft training, and deluxe mountain glamping. Tailored for corporate synergies, athletic development, and deep family bonding.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4} yOffset={30}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/experiences"
                  className="bg-accent hover:bg-accent-hover text-primary font-display font-black text-sm tracking-wider uppercase px-8 py-4.5 rounded-full shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Adventures
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
                <Link
                  to="/facilities"
                  className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-display font-bold text-sm tracking-wider uppercase px-8 py-4.5 rounded-full transition-all text-center flex items-center justify-center cursor-pointer"
                >
                  View Premium Arenas
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Floating statistics cards */}
        <div className="absolute bottom-10 right-10 hidden xl:flex gap-6 z-10">
          {[
            { value: "40+", label: "Acre Basecamp" },
            { value: "10k+", label: "Happy Campers" },
            { value: "5★", label: "Google Rated" }
          ].map((stat, idx) => (
            <AnimatedSection key={idx} delay={0.5 + idx * 0.1} yOffset={20} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-center min-w-[120px]">
              <span className="font-display font-black text-2xl text-accent block">{stat.value}</span>
              <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">{stat.label}</span>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 2. Core Experience Highlights */}
      <section className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            tagline="Adventure Awaits"
            title="Curated Wilderness & Sports Camps"
            description="Discover specialized retreat blueprints engineered to test thresholds, foster connections, and heal spirits in the valley."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXPERIENCES.map((exp, idx) => (
              <StaggerItem key={exp.id} className="h-full">
                <ExperienceCard experience={exp} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Facilities Showcase Strip */}
      <section className="py-24 bg-primary-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(112,224,0,0.08),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <SectionTitle
              tagline="State-of-the-Art Arenas"
              title="Camp Infrastructure Built to Inspire"
              description="A premium blend of Olympic-grade active athletic facilities and cozy log glamping accommodations."
              align="left"
              white={true}
            />
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-accent text-white hover:text-primary font-display font-bold px-6 py-3.5 rounded-full transition-all duration-300 self-start lg:mb-16 border border-white/10 hover:border-transparent text-sm"
            >
              Tour All Facilities
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.slice(0, 3).map((facility, idx) => (
              <AnimatedSection key={facility.id} delay={idx * 0.1} className="bg-earthy-card border border-earthy-border rounded-3xl overflow-hidden shadow-lg group">
                <div className="aspect-[4/3] overflow-hidden bg-earthy-dark relative">
                  <img
                    src={facility.mainImage}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-accent text-primary px-3 py-0.5 rounded-full text-[9px] font-display font-extrabold uppercase tracking-widest">
                    {facility.tag}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-display font-black text-xl text-white">{facility.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{facility.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {facility.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-accent uppercase font-bold border border-white/5">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Corporate and Family Dedicated Showcase Panels */}
      <section className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-6 space-y-20">

          {/* Corporate Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-[40px] p-8 sm:p-12 border border-primary/5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1 text-xs font-display font-extrabold text-accent-hover uppercase tracking-widest bg-accent/10 px-3.5 py-1 rounded-full">
                <Trophy className="w-3.5 h-3.5" />
                {t('corporate.tag')}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4.5xl text-primary leading-tight">
                {t('corporate.title')}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {t('corporate.description')}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-display font-bold text-primary pt-2">
                <div className="flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-accent-hover" />
                  {t('corporate.feature1')}
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-accent-hover" />
                  {t('corporate.feature2')}
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-accent-hover" />
                  {t('corporate.feature3')}
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-accent-hover" />
                  {t('corporate.feature4')}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact?type=corporate"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-display font-bold px-7 py-4 rounded-full transition-all text-xs uppercase tracking-wider shadow-md hover:shadow-lg cursor-pointer"
                >
                  {t('corporate.button')}
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 aspect-[4/3] rounded-3xl overflow-hidden border border-primary/5 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop"
                alt="Corporate synergy team meeting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Family Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-[40px] p-8 sm:p-12 border border-primary/5 shadow-xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-5 order-last lg:order-first aspect-[4/3] rounded-3xl overflow-hidden border border-primary/5 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop"
                alt="Family barbecue fireside campfire"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1 text-xs font-display font-extrabold text-accent-hover uppercase tracking-widest bg-accent/10 px-3.5 py-1 rounded-full">
                <Heart className="w-3.5 h-3.5" />
                {t('family.tag')}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4.5xl text-primary leading-tight">
                {t('family.title')}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {t('family.description')}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-display font-bold text-primary pt-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-accent-hover" />
                  {t('family.feature1')}
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-accent-hover" />
                  {t('family.feature2')}
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-accent-hover" />
                  {t('family.feature3')}
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-accent-hover" />
                  {t('family.feature4')}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact?type=family"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-display font-bold px-7 py-4 rounded-full transition-all text-xs uppercase tracking-wider shadow-md hover:shadow-lg cursor-pointer"
                >
                  {t('family.button')}
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Shopify E-Commerce Gear Preview Strip */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <SectionTitle
              tagline="Camp Store"
              title="Official Revive Expedition Gear"
              description="Browse official heavy-duty tents, insulated flasks, high-capacity backpacks, and active apparel built to outlast."
              align="left"
            />
            <Link
              to="/store"
              className="inline-flex items-center gap-2 bg-sand-dark hover:bg-primary hover:text-white text-primary font-display font-bold px-6 py-3.5 rounded-full transition-all duration-300 self-start lg:mb-16 border border-primary/5 text-sm"
            >
              Shop All Gear
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="aspect-[4/5] rounded-3xl bg-sand animate-pulse border border-primary/5" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <AnimatedSection key={product.id}>
                  <ProductCard product={product} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Image Gallery Sneak Peek Grid */}
      <section className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <SectionTitle
              tagline="Visual Diaries"
              title="Shared Memories in the Wilderness"
              description="Catch a glimpse of true athletic energy, cozy campfire laughs, and scenic mountain range sunrises."
              align="left"
            />
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-display font-bold px-6 py-3.5 rounded-full transition-all duration-300 self-start lg:mb-16 shadow-lg text-sm"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {GALLERY_ITEMS.slice(0, 4).map((item, idx) => (
              <AnimatedSection key={item.id} delay={idx * 0.08} scale={0.98} className="aspect-square rounded-2xl overflow-hidden border border-primary/5 shadow-sm relative group bg-sand-dark">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-accent">{item.category}</h4>
                  <h3 className="font-display font-extrabold text-sm truncate">{item.title}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials Feed section */}
      <section className="py-24 bg-white border-t border-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            tagline="Adventurers Feedback"
            title="Stories Shared Around The Campfire"
            description="Listen to direct, unfiltered reviews from our corporate partners, parents, and professional trainees."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test, idx) => (
              <AnimatedSection key={test.id} delay={idx * 0.1} className="bg-sand p-6 sm:p-8 rounded-3xl border border-primary/5 shadow-md flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4.5 h-4.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-primary/5">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-11 h-11 rounded-full border border-primary/10 bg-sand-dark"
                  />
                  <div>
                    <h4 className="font-display font-black text-sm text-primary">{test.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold">{test.role}, <span className="text-accent-hover">{test.company}</span></p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call To Action (Inquiry Trigger) */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1496080174650-637e3f22fa03?q=80&w=1600&auto=format&fit=crop"
            alt="Adventure campers"
            className="w-full h-full object-cover opacity-20 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-primary-dark" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="font-display font-black text-3.5xl sm:text-5xl tracking-tight leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-sand-dark/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/contact"
              className="bg-accent hover:bg-accent-hover text-primary font-display font-black text-sm tracking-wider uppercase px-8 py-4.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              {t('cta.button')}
            </Link>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-display font-bold text-sm tracking-wider uppercase px-8 py-4.5 rounded-full transition-all flex items-center justify-center gap-2"
            >
              {t('cta.whatsapp')}
            </a>
          </div>

          <div className="flex justify-center items-center gap-8 pt-8 text-xs text-gray-400 font-display font-bold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-accent" /> {t('cta.securing')}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-accent" /> {t('cta.arrangements')}</span>
          </div>
        </div>
      </section>

    </div>
  );
};
export default Home;
