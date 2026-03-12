import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaCrown } from 'react-icons/fa';
import API from '../utils/api';
import { getSliderImage } from '../utils/imageHelper';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultSlides = [
    {
      _id: '1',
      title: 'Crafted for You',
      subtitle: 'New Season Collection',
      description: 'Discover handcrafted dresses designed to make you shine on every occasion',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200',
      cta: 'Shop Now',
      link: '/products'
    },
    {
      _id: '2',
      title: 'Custom Boutique Designs',
      subtitle: 'Exclusively Yours',
      description: 'From casual chic to bridal couture — every stitch made with love',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=1200',
      cta: 'Explore Collection',
      link: '/products?featured=true'
    },
    {
      _id: '3',
      title: 'Festive Specials',
      subtitle: 'Celebrate in Style',
      description: 'Premium fabrics, elegant cuts — get up to 40% off on selected styles',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200',
      cta: 'Shop Sale',
      link: '/products?sale=true'
    }
  ];

  const fetchSliders = useCallback(async () => {
    try {
      const { data } = await API.get('/sliders/active');
      setSlides(data.sliders?.length > 0 ? data.sliders : defaultSlides);
    } catch {
      setSlides(defaultSlides);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { fetchSliders(); }, [fetchSliders]);

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5500);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (loading) {
    return (
      <div className="relative h-[480px] md:h-[580px] overflow-hidden bg-gradient-to-br from-[#FFF2F5] to-[#FDE8EE] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B5617A]"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[480px] md:h-[580px] overflow-hidden">
      {slides.map((slide, index) => {
        const imageUrl = getSliderImage(slide);
        return (
          <div
            key={slide._id || slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})`, filter: 'brightness(0.55)' }}
            />

            {/* Boutique gradient overlay — left side blush, right side darker */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A1F30]/80 via-[#7D3A52]/40 to-transparent" />

            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A55A] via-[#E8D5A0] to-[#C5A55A]"></div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-xl animate-fadeIn">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-[#E8D5A0]/40 rounded-full px-4 py-1.5 mb-5">
                    <FaCrown className="text-[#E8D5A0] text-xs" />
                    <span className="text-[#E8D5A0] text-xs font-semibold tracking-[0.15em] uppercase">
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
                    {slide.title}
                  </h1>

                  {/* Gold divider */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-px bg-[#C5A55A]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#C5A55A]"></div>
                    <div className="w-10 h-px bg-[#C5A55A]"></div>
                  </div>

                  {/* Description */}
                  <p className="text-pink-100 text-sm md:text-base leading-relaxed mb-7 max-w-md">
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B5617A] to-[#7D3A52] hover:from-[#7D3A52] hover:to-[#4A1F30] text-white font-bold py-3.5 px-7 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-sm"
                    >
                      {slide.cta}
                    </Link>
                    <Link
                      to="/categories"
                      className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/40 text-white font-semibold py-3.5 px-7 rounded-full transition-all text-sm hover:-translate-y-0.5"
                    >
                      View Collections
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C5A55A]/60 to-transparent z-10"></div>

      {/* Prev Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/15 hover:bg-[#B5617A] backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-[#B5617A] hover:shadow-lg"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-base" />
      </button>

      {/* Next Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white/15 hover:bg-[#B5617A] backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-[#B5617A] hover:shadow-lg"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-base" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#C5A55A] w-8 h-2.5'
                : 'bg-white/40 hover:bg-white/70 w-2.5 h-2.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-5 right-6 z-10 text-white/60 text-xs font-medium tabular-nums">
        {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
};

export default HeroSlider;
