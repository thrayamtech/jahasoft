import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaPaperPlane, FaCrown } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#4A1F30] via-[#7D3A52] to-[#4A1F30] text-white py-14 md:py-18 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
            <path d="M 0 100 Q 200 50, 400 100 T 800 100" stroke="white" strokeWidth="2" fill="none"/>
            <circle cx="100" cy="80" r="40" stroke="white" strokeWidth="1" fill="none"/>
            <circle cx="700" cy="120" r="60" stroke="white" strokeWidth="1" fill="none"/>
          </svg>
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#E8D5A0]"></span>
            <FaCrown className="text-[#E8D5A0] text-lg" />
            <span className="w-8 h-px bg-[#E8D5A0]"></span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3">Get In Touch</h1>
          <p className="text-pink-200 text-sm md:text-base max-w-xl mx-auto">
            Have a question or want to place a custom order? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 py-12 md:py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            {
              icon: FaPhone,
              title: 'Call Us',
              sub: 'Mon–Sat (10 AM – 7 PM)',
              link: 'tel:+918807259471',
              label: '+91 88072 59471',
            },
            {
              icon: FaEnvelope,
              title: 'Email Us',
              sub: "We'll respond within 24 hours",
              link: 'mailto:info@jjtrendz.com',
              label: 'info@jjtrendz.com',
            },
            {
              icon: FaWhatsapp,
              title: 'WhatsApp',
              sub: 'Chat with us instantly',
              link: 'https://wa.me/918807259471',
              label: 'Start Chat',
              external: true,
            },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-[#F5D0D8] p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#B5617A] to-[#7D3A52] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                <card.icon className="text-xl text-white" />
              </div>
              <h3 className="font-bold text-[#4A1F30] mb-1">{card.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{card.sub}</p>
              <a
                href={card.link}
                {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-[#B5617A] font-semibold text-sm hover:text-[#7D3A52] transition-colors"
              >
                {card.label}
              </a>
            </div>
          ))}
        </div>

        {/* Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#F5D0D8] p-7 md:p-9">
            <p className="text-[#C5A55A] text-xs tracking-[0.2em] uppercase mb-2">Let's Talk</p>
            <h2 className="text-2xl font-serif font-bold text-[#4A1F30] mb-1">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-6">Fill out the form and we'll get back to you shortly</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-[#F5D0D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B5617A]/20 focus:border-[#B5617A] text-sm transition-all" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-[#F5D0D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B5617A]/20 focus:border-[#B5617A] text-sm transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 border border-[#F5D0D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B5617A]/20 focus:border-[#B5617A] text-sm transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subject *</label>
                <select name="subject" value={formData.subject} onChange={handleChange} required
                  className="w-full px-4 py-3 border border-[#F5D0D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B5617A]/20 focus:border-[#B5617A] text-sm transition-all bg-white">
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="custom-design">Custom Design Request</option>
                  <option value="order-status">Order Status</option>
                  <option value="return-exchange">Return / Exchange</option>
                  <option value="bulk-order">Bulk Order</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Message *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="4"
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 border border-[#F5D0D8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B5617A]/20 focus:border-[#B5617A] text-sm transition-all resize-none">
                </textarea>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#B5617A] to-[#7D3A52] text-white py-3.5 px-6 rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                {loading ? (
                  <><div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div> Sending...</>
                ) : (
                  <><FaPaperPlane className="text-sm" /> Send Message</>
                )}
              </button>
            </form>
          </div>

          {/* Right Info Panel */}
          <div className="space-y-5">
            {/* Office */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#F5D0D8] p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-[#B5617A] to-[#7D3A52] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#4A1F30] mb-2">Our Studio</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    11/109/2, Edavattam,<br />
                    Thirunanthikarai, Kulasekharam,<br />
                    Kanyakumari Dist – 629161,<br />
                    Tamilnadu, India
                  </p>
                </div>
              </div>
              <div className="mt-4 w-full h-48 rounded-xl overflow-hidden">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085284335113!3d12.953945614058336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#F5D0D8] p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-[#B5617A] to-[#7D3A52] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <FaClock className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#4A1F30] mb-3">Business Hours</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { day: 'Monday – Friday', time: '10:00 AM – 7:00 PM' },
                      { day: 'Saturday', time: '10:00 AM – 6:00 PM' },
                      { day: 'Sunday', time: 'Closed', closed: true },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between text-gray-600">
                        <span className="font-medium">{row.day}:</span>
                        <span className={row.closed ? 'text-red-400 font-medium' : ''}>{row.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help CTA */}
            <div className="bg-gradient-to-r from-[#4A1F30] to-[#7D3A52] rounded-2xl p-6 text-white">
              <h3 className="text-lg font-serif font-bold mb-2">Need Quick Answers?</h3>
              <p className="text-pink-200 text-sm mb-4 leading-relaxed">
                Check our FAQ section for instant answers about orders, shipping, and custom designs.
              </p>
              <button className="bg-white text-[#7D3A52] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#FFF2F5] transition-all shadow-md">
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
