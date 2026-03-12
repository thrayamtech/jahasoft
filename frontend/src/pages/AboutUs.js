import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaShippingFast, FaLock, FaPhone, FaCrown, FaStar, FaHeart, FaCut } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#4A1F30] via-[#7D3A52] to-[#4A1F30] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            <path d="M 0 200 Q 200 100, 400 200 T 800 200" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M 0 220 Q 200 320, 400 220 T 800 220" stroke="white" strokeWidth="1.5" fill="none"/>
            <circle cx="100" cy="150" r="60" stroke="white" strokeWidth="1" fill="none"/>
            <circle cx="700" cy="250" r="80" stroke="white" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-px bg-[#E8D5A0]"></span>
            <FaCrown className="text-[#E8D5A0] text-2xl" />
            <span className="w-10 h-px bg-[#E8D5A0]"></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">JJ Trendz Official</h1>
          <p className="text-xl text-pink-200 font-light italic mb-3">
            Fashion that defines you
          </p>
          <p className="text-base text-pink-300 max-w-2xl mx-auto leading-relaxed">
            Where every stitch tells a story of style, elegance, and craftsmanship
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[#C5A55A] text-xs tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-[#C5A55A]"></span> Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4A1F30] mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  At <span className="font-bold text-[#7D3A52]">JJ Trendz Official</span>, we believe
                  that fashion is more than just clothing — it's an expression of who you are. Every design
                  we create carries the essence of craftsmanship, the spirit of modern trends, and the
                  promise of timeless elegance.
                </p>
                <p>
                  Founded with a passion for boutique fashion, we specialize in handcrafted and designer
                  wear that blends traditional artistry with contemporary style. From kurti sets and
                  co-ords to party wear and bridal collections, we curate pieces for every occasion.
                </p>
                <p>
                  When you wear <span className="italic font-medium text-[#B5617A]">JJ Trendz</span>, you're
                  not just wearing fashion — you're making a statement. We are committed to bringing you
                  pieces that reflect your personality and elevate your confidence.
                </p>
              </div>
            </div>

            {/* Decorative Art */}
            <div className="relative flex items-center justify-center">
              <div className="w-full h-80 relative">
                {/* Outer blush rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full border-2 border-[#F5D0D8] opacity-60"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-52 h-52 rounded-full border-2 border-[#E0A8B8] opacity-50"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#FDE8EE] to-[#FFF2F5] shadow-lg flex items-center justify-center">
                    <div className="text-center">
                      <FaCrown className="text-4xl text-[#B5617A] mx-auto mb-1" />
                      <p className="text-xs text-[#7D3A52] font-serif font-bold tracking-wider">JJ TRENDZ</p>
                    </div>
                  </div>
                </div>
                {/* Floating icons */}
                {[
                  { icon: <FaHeart />, pos: 'top-6 left-16', color: 'text-[#D4849A]' },
                  { icon: <FaCut />, pos: 'top-6 right-16', color: 'text-[#C5A55A]' },
                  { icon: <FaStar />, pos: 'bottom-6 left-16', color: 'text-[#C5A55A]' },
                  { icon: <FaCrown />, pos: 'bottom-6 right-16', color: 'text-[#D4849A]' },
                ].map((item, i) => (
                  <div key={i} className={`absolute ${item.pos} w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center ${item.color}`}>
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#FFF2F5] to-white">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Decorative */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#F5D0D8]">
                <div className="space-y-5">
                  {[
                    { title: 'Quality First', text: 'We source premium fabrics and work with skilled artisans to ensure every piece meets our exacting standards of luxury and comfort.' },
                    { title: 'Trendsetting Design', text: 'Our collections blend traditional craftsmanship with modern silhouettes, keeping you ahead of the fashion curve.' },
                    { title: 'Your Confidence', text: 'Whether casual wear or special occasions, we believe the right outfit empowers you to shine and feel your best.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B5617A] to-[#7D3A52] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <span className="text-white text-xs font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#4A1F30] mb-1 text-sm">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-[#C5A55A] text-xs tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-[#C5A55A]"></span> What Drives Us
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4A1F30] mb-6">Our Philosophy</h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Every person has a unique style — a reflection of their dreams, personality, and journey.
                  At JJ Trendz Official, we celebrate individuality by offering fashion that resonates with your story.
                </p>
                <p>
                  We go beyond just selling clothes. We partner with you to create looks that make you feel seen, celebrated, and absolutely beautiful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#C5A55A] text-xs tracking-[0.25em] uppercase mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-[#C5A55A]"></span> Our Promise
              <span className="w-8 h-px bg-[#C5A55A]"></span>
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4A1F30] mb-3">Why Choose JJ Trendz</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">We weave trust, quality, and care into every creation</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaAward, title: 'Premium Quality', desc: 'Every piece is crafted with premium materials, ensuring style and durability that lasts.' },
              { icon: FaShippingFast, title: 'Swift Delivery', desc: 'Your order reaches you safely and quickly. Free delivery on orders above ₹999.' },
              { icon: FaLock, title: 'Secure Shopping', desc: 'Shop with confidence using our secure payment gateway. Your trust is our priority.' },
              { icon: FaPhone, title: 'Style Support', desc: 'Our team is here to guide you through every fashion choice, ensuring you look your best.' },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-b from-[#FFF2F5] to-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center border border-[#F5D0D8]">
                <div className="w-16 h-16 bg-gradient-to-br from-[#B5617A] to-[#7D3A52] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <item.icon className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-[#4A1F30] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Quote */}
      <section className="py-16 bg-gradient-to-b from-[#FFF2F5] to-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <FaStar className="text-[#C5A55A]" />
            <FaCrown className="text-[#B5617A] text-xl" />
            <FaStar className="text-[#C5A55A]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#4A1F30] mb-6">The JJ Trendz Promise</h2>
          <div className="bg-white rounded-3xl shadow-lg border border-[#F5D0D8] p-8 md:p-10">
            <p className="text-xl italic text-[#7D3A52] font-serif mb-5 leading-relaxed">
              "When you choose JJ Trendz Official, you're not just buying fashion — you're choosing a lifestyle."
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#B5617A] to-transparent mx-auto mb-5"></div>
            <p className="text-gray-600 text-sm leading-relaxed">
              From the finest fabrics to the last finishing stitch, from our boutique to your wardrobe, every step honors the craft of fashion and celebrates you — the person who brings these designs to life.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#4A1F30] via-[#7D3A52] to-[#4A1F30] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
            <path d="M 0 150 Q 200 80, 400 150 T 800 150" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M 0 170 Q 200 240, 400 170 T 800 170" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <FaCrown className="text-4xl text-[#E8D5A0] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Discover Your Style With Us</h2>
          <p className="text-pink-200 text-base mb-8 leading-relaxed">
            Explore our curated collection and find the perfect outfit for every occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="inline-block bg-white text-[#7D3A52] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#FFF2F5] transition-all shadow-xl hover:-translate-y-0.5">
              Shop Now
            </Link>
            <Link to="/contact" className="inline-block border-2 border-white/40 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all hover:-translate-y-0.5">
              Custom Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
