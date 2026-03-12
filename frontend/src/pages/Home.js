import { useState, useEffect, useRef } from 'react';
import { FaTruck, FaUndo, FaShieldAlt, FaHeadset, FaTag, FaCrown, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import ProductReels from '../components/ProductReels';
import API from '../utils/api';
import { setStructuredData, generateCollectionSchema } from '../utils/seo';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [reels, setReels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [showFeaturedLeftArrow, setShowFeaturedLeftArrow] = useState(false);
  const [showFeaturedRightArrow, setShowFeaturedRightArrow] = useState(true);
  const [reelsEnabled, setReelsEnabled] = useState(true);
  const featuredScrollRef = useRef(null);

  useEffect(() => { fetchData(); fetchSettings(); }, []);
  useEffect(() => { fetchCategoryProducts(); }, [selectedCategory]);

  const fetchSettings = async () => {
    try {
      const { data } = await API.get('/settings/public');
      const reelsValue = data.settings?.reels_enabled;
      setReelsEnabled(reelsValue === undefined ? true : reelsValue);
    } catch { setReelsEnabled(true); }
  };

  const fetchData = async () => {
    try {
      const [categoriesRes, productsRes, reelsRes] = await Promise.all([
        API.get('/categories'),
        API.get('/products?featured=true&limit=12'),
        API.get('/reels/active')
      ]);
      setCategories(categoriesRes.data.categories || []);
      setFeaturedProducts(productsRes.data.products || []);
      setReels(reelsRes.data.reels || []);
      if (productsRes.data.products?.length > 0) {
        setStructuredData(generateCollectionSchema({ name: 'Featured Collection', description: 'Our handpicked premium dress collection' }, productsRes.data.products), 'homepage-collection-data');
      }
      fetchCategoryProducts();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryProducts = async () => {
    setCategoryLoading(true);
    try {
      const url = selectedCategory === 'all' ? '/products?limit=12' : `/products?category=${selectedCategory}&limit=12`;
      const { data } = await API.get(url);
      setCategoryProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching category products:', error);
    } finally {
      setCategoryLoading(false);
    }
  };

  const scrollFeaturedCarousel = (direction) => {
    if (featuredScrollRef.current) {
      featuredScrollRef.current.scrollTo({ left: featuredScrollRef.current.scrollLeft + (direction === 'left' ? -300 : 300), behavior: 'smooth' });
    }
  };

  const checkFeaturedScrollPosition = () => {
    if (featuredScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = featuredScrollRef.current;
      setShowFeaturedLeftArrow(scrollLeft > 0);
      setShowFeaturedRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = featuredScrollRef.current;
    if (container) {
      checkFeaturedScrollPosition();
      container.addEventListener('scroll', checkFeaturedScrollPosition);
      return () => container.removeEventListener('scroll', checkFeaturedScrollPosition);
    }
  }, [featuredProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Promo Marquee Banner — soft rose */}
      <div className="bg-gradient-to-r from-[#7D3A52] via-[#B5617A] to-[#7D3A52] text-white py-2.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 px-6">
              <span className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide">
                <FaStar className="text-[#E8D5A0] text-xs" /> New Arrivals Every Week
              </span>
              <span className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide">
                <FaTag className="text-[#E8D5A0] text-xs" /> Free Shipping on Orders Above ₹999
              </span>
              <span className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide">
                <FaCrown className="text-[#E8D5A0] text-xs" /> Custom Dress Designing Available
              </span>
              <span className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide">
                <FaStar className="text-[#E8D5A0] text-xs" /> Premium Boutique Fabrics
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Collection Carousel */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-white via-[#FFF2F5] to-white relative overflow-hidden">
        <div className="absolute top-8 right-12 w-48 h-48 bg-[#F5D0D8]/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-8 left-12 w-56 h-56 bg-[#FDE8EE]/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1600px] mx-auto px-4 md:px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[#C5A55A] font-sans text-xs tracking-[0.25em] uppercase mb-2 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-[#C5A55A] inline-block"></span>
              Handpicked for You
              <span className="w-8 h-px bg-[#C5A55A] inline-block"></span>
            </p>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#4A1F30] mb-2">
              Featured Collection
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Elegant designs crafted for every occasion — from casual chic to bridal couture
            </p>
          </div>

          {loading ? (
            <div className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[170px] sm:w-[190px] md:w-[220px] animate-pulse">
                  <div className="bg-gradient-to-br from-[#FDE8EE] to-[#FFF2F5] aspect-[3/4] rounded-2xl mb-3"></div>
                  <div className="bg-[#F5D0D8] h-3 rounded w-3/4 mb-2"></div>
                  <div className="bg-[#F5D0D8] h-3 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative group">
              {showFeaturedLeftArrow && (
                <button onClick={() => scrollFeaturedCarousel('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white hover:bg-[#B5617A] shadow-xl rounded-full flex items-center justify-center text-[#B5617A] hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#F5D0D8]"
                  aria-label="Scroll left"><FaChevronLeft /></button>
              )}
              {showFeaturedRightArrow && (
                <button onClick={() => scrollFeaturedCarousel('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white hover:bg-[#B5617A] shadow-xl rounded-full flex items-center justify-center text-[#B5617A] hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 border border-[#F5D0D8]"
                  aria-label="Scroll right"><FaChevronRight /></button>
              )}
              <div ref={featuredScrollRef} className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-4 scroll-smooth" onScroll={checkFeaturedScrollPosition}>
                {featuredProducts.map(product => (
                  <div key={product._id} className="flex-shrink-0 w-[170px] sm:w-[190px] md:w-[220px]">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reels */}
      {reelsEnabled && (
        <div className="bg-gradient-to-b from-[#FFF2F5] to-white">
          <ProductReels reels={reels} />
        </div>
      )}

      {/* Shop by Category */}
      <section className="py-10 md:py-14 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDE8EE]/30 via-transparent to-[#FFF2F5]/30 pointer-events-none"></div>

        <div className="max-w-[1600px] mx-auto px-4 md:px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-8">
            <p className="text-[#C5A55A] font-sans text-xs tracking-[0.25em] uppercase mb-2 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-[#C5A55A] inline-block"></span>
              Explore
              <span className="w-8 h-px bg-[#C5A55A] inline-block"></span>
            </p>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#4A1F30] mb-2">
              Shop by Collection
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Discover our curated dress collections for every style and occasion
            </p>
          </div>

          {/* Category Pills */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-[#B5617A] to-[#7D3A52] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-[#FFF2F5] border border-[#F5D0D8] hover:border-[#B5617A]'
                }`}
              >
                All Designs
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat._id)}
                  className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat._id
                      ? 'bg-gradient-to-r from-[#B5617A] to-[#7D3A52] text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-[#FFF2F5] border border-[#F5D0D8] hover:border-[#B5617A]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {categoryLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gradient-to-br from-[#FDE8EE] to-[#FFF2F5] aspect-[3/4] rounded-xl mb-3"></div>
                  <div className="bg-[#F5D0D8] h-3 rounded w-3/4 mb-2"></div>
                  <div className="bg-[#F5D0D8] h-3 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
                {categoryProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              {categoryProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="inline-block p-5 bg-[#FFF2F5] rounded-full mb-4">
                    <FaStar className="text-3xl text-[#D4849A]" />
                  </div>
                  <p className="text-gray-500 text-base font-medium">No designs in this collection yet</p>
                  <p className="text-gray-400 text-sm mt-1">Try selecting a different collection</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-[#FFF2F5] via-white to-[#FFF2F5]">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <FaTruck className="text-2xl" />, title: 'Free Shipping', desc: 'On orders above ₹999' },
              { icon: <FaUndo className="text-2xl" />, title: 'Easy Returns', desc: '7 days return policy' },
              { icon: <FaShieldAlt className="text-2xl" />, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: <FaHeadset className="text-2xl" />, title: 'Style Support', desc: 'Dedicated fashion advisors' },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#B5617A] to-[#7D3A52] flex items-center justify-center text-white mb-3 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-[#4A1F30] text-sm md:text-base mb-1">{feature.title}</h3>
                <p className="text-xs md:text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-gradient-to-r from-[#4A1F30] via-[#7D3A52] to-[#4A1F30] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
            <path d="M 0 150 Q 200 80, 400 150 T 800 150" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M 0 170 Q 200 240, 400 170 T 800 170" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="100" cy="120" r="40" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/>
            <circle cx="700" cy="180" r="60" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/>
          </svg>
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="text-[#E8D5A0] text-xs tracking-[0.3em] uppercase mb-3 font-medium">Custom Boutique Designing</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            Your Dream Dress,<br />Designed Just for You
          </h2>
          <p className="text-pink-200 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            From casual everyday wear to stunning bridal couture — we craft each piece with love and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/products" className="inline-block bg-white text-[#7D3A52] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#FFF2F5] transition-all shadow-xl hover:-translate-y-0.5">
              Browse Collection
            </a>
            <a href="/contact" className="inline-block border-2 border-white/50 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all hover:-translate-y-0.5">
              Custom Order
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
