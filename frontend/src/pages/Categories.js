import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';
import API from '../utils/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await API.get('/categories');
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const bgColors = [
    'from-[#F5D0D8] to-[#FDE8EE]',
    'from-[#FDE8EE] to-[#FFF2F5]',
    'from-[#E8D5A0]/30 to-[#FFF2F5]',
    'from-[#FFF2F5] to-[#F5D0D8]',
    'from-[#FDE8EE] to-[#E8D5A0]/20',
    'from-[#F5D0D8] to-[#FFF2F5]',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#4A1F30] via-[#7D3A52] to-[#4A1F30] py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M 0 100 Q 200 50, 400 100 T 800 100" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="150" cy="80" r="40" stroke="white" strokeWidth="1" fill="none"/>
            <circle cx="650" cy="120" r="60" stroke="white" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-10 h-px bg-[#E8D5A0]"></span>
            <FaCrown className="text-[#E8D5A0] text-xl" />
            <span className="w-10 h-px bg-[#E8D5A0]"></span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3">Our Collections</h1>
          <p className="text-pink-200 text-sm md:text-base max-w-xl mx-auto">
            Explore our handcrafted dress collections — each designed with love for the modern woman
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-12 md:py-16 px-4 max-w-[1400px] mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#FDE8EE] aspect-square rounded-2xl mb-3"></div>
                <div className="bg-[#F5D0D8] h-4 rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#FFF2F5] rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCrown className="text-3xl text-[#D4849A]" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No collections available yet</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon for new arrivals</p>
          </div>
        ) : (
          <>
            {/* Section label */}
            <div className="text-center mb-8 md:mb-10">
              <p className="text-[#C5A55A] text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2 mb-2">
                <span className="w-8 h-px bg-[#C5A55A]"></span>
                Browse by Style
                <span className="w-8 h-px bg-[#C5A55A]"></span>
              </p>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#4A1F30]">
                All Collections ({categories.length})
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category._id}
                  to={`/products?category=${category._id}`}
                  className="group block"
                >
                  <div className={`relative bg-gradient-to-br ${bgColors[index % bgColors.length]} aspect-square rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-lg transition-all duration-300`}>
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <FaCrown className="text-2xl text-[#B5617A]" />
                        </div>
                        <span className="text-xs text-[#7D3A52] font-medium opacity-70 tracking-wide uppercase">Collection</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7D3A52]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-[#4A1F30] text-sm md:text-base group-hover:text-[#B5617A] transition-colors duration-200">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{category.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="py-10 bg-gradient-to-r from-[#FFF2F5] to-[#FDE8EE] border-t border-[#F5D0D8]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-[#C5A55A] text-xs tracking-[0.2em] uppercase mb-2">Can't find what you're looking for?</p>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4A1F30] mb-3">
            Custom Dress Designing
          </h3>
          <p className="text-gray-600 text-sm mb-5">
            We design and customize dresses for every occasion. Contact us for a personalized fashion experience.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-[#B5617A] to-[#7D3A52] text-white px-8 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Request Custom Design
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Categories;
