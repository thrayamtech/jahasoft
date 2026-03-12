import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaHeart, FaPhone, FaEnvelope, FaWhatsapp, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import API from '../utils/api';
import { trackSearch } from '../utils/metaPixel';

const Navbar = ({ onCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const categoryMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackSearch(searchQuery);
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Info Bar — blush-to-rose gradient */}
      <div className="bg-gradient-to-r from-[#7D3A52] via-[#9B5068] to-[#7D3A52] text-white py-2 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-xs font-light tracking-wide">
            <div className="flex items-center space-x-4">
              <a href="mailto:info@jjtrendz.com" className="flex items-center hover:text-[#E8D5A0] transition-colors duration-300">
                <FaEnvelope className="mr-1.5 text-sm" />
                <span className="hidden sm:inline">info@jjtrendz.com</span>
              </a>
              <a href="tel:+918807259471" className="flex items-center hover:text-[#E8D5A0] transition-colors duration-300">
                <FaPhone className="mr-1.5 text-sm" />
                +91 88072 59471
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://wa.me/918807259471" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#E8D5A0] transition-colors duration-300">
                <FaWhatsapp className="mr-1.5 text-sm" />
                <span className="hidden md:inline">WhatsApp</span>
              </a>
              <span className="hidden md:inline font-medium text-[#E8D5A0]">✦ Free Shipping on Orders Above ₹999 ✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-[#F5D0D8]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">

            {/* Left: Logo + Nav Links */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="flex items-center flex-shrink-0 mr-4">
                <div className="flex items-center space-x-3">
                  <img
                    src="/logo.jpg"
                    alt="JJ Trendz Logo"
                    className="w-12 h-12 object-contain transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B5617A] to-[#7D3A52] rounded-lg shadow-lg items-center justify-center hidden">
                    <span className="text-white font-serif font-bold text-lg">JJ</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-serif font-bold bg-gradient-to-r from-[#7D3A52] to-[#B5617A] bg-clip-text text-transparent tracking-wider leading-tight">
                      JJ TRENDZ
                    </span>
                    <span className="text-[10px] font-sans font-semibold text-[#C5A55A] tracking-[0.2em] leading-tight uppercase">
                      Official Boutique
                    </span>
                  </div>
                </div>
              </Link>

              {/* Nav Links */}
              <div className="flex items-center space-x-7 border-l border-[#F5D0D8] pl-8">
                <Link to="/" className="text-gray-600 hover:text-[#B5617A] font-medium transition-colors duration-300 text-sm tracking-wide">Home</Link>
                <Link to="/products" className="text-gray-600 hover:text-[#B5617A] font-medium transition-colors duration-300 text-sm tracking-wide">Shop</Link>

                {/* Collections Dropdown */}
                <div className="relative" ref={categoryMenuRef} onMouseEnter={() => setShowCategoriesMenu(true)} onMouseLeave={() => setShowCategoriesMenu(false)}>
                  <button className="text-gray-600 hover:text-[#B5617A] font-medium transition-colors duration-300 flex items-center space-x-1 text-sm tracking-wide">
                    <span>Collections</span>
                    <FaChevronDown className="text-xs" />
                  </button>
                  <div
                    className={`absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-[#F5D0D8] overflow-hidden transition-all duration-200 ${showCategoriesMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                    style={{ top: '100%' }}
                  >
                    <div className="py-2 max-h-96 overflow-y-auto">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <Link key={category._id} to={`/products?category=${category._id}`}
                            className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-[#FFF2F5] hover:text-[#B5617A] transition-colors duration-200">
                            {category.name}
                          </Link>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-sm text-gray-500">No collections available</div>
                      )}
                    </div>
                  </div>
                </div>

                <Link to="/about" className="text-gray-600 hover:text-[#B5617A] font-medium transition-colors duration-300 text-sm tracking-wide">About</Link>
                <Link to="/contact" className="text-gray-600 hover:text-[#B5617A] font-medium transition-colors duration-300 text-sm tracking-wide">Contact</Link>
              </div>
            </div>

            {/* Mobile Logo */}
            <Link to="/" className="flex lg:hidden items-center">
              <div className="flex items-center space-x-2">
                <img src="/logo.jpg" alt="JJ Trendz Logo" className="w-10 h-10 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div className="w-10 h-10 bg-gradient-to-br from-[#B5617A] to-[#7D3A52] rounded-lg items-center justify-center hidden">
                  <span className="text-white font-serif font-bold text-base">JJ</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-serif font-bold bg-gradient-to-r from-[#7D3A52] to-[#B5617A] bg-clip-text text-transparent">JJ TRENDZ</span>
                  <span className="text-[8px] text-[#C5A55A] tracking-widest font-medium">OFFICIAL BOUTIQUE</span>
                </div>
              </div>
            </Link>

            {/* Right: Search, Wishlist, Cart, User */}
            <div className="hidden lg:flex items-center space-x-3">
              {showSearchBar ? (
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search designs..."
                    className="w-44 px-4 py-2 pr-10 border border-[#F5D0D8] rounded-full focus:outline-none focus:border-[#B5617A] focus:w-60 transition-all duration-300 text-sm"
                    autoFocus onBlur={() => !searchQuery && setShowSearchBar(false)}
                  />
                  <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#B5617A]">
                    <FaSearch className="text-sm" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setShowSearchBar(true)} className="text-gray-500 hover:text-[#B5617A] p-2 hover:bg-[#FFF2F5] rounded-full transition-colors" aria-label="Search">
                  <FaSearch className="text-lg" />
                </button>
              )}

              {isAuthenticated && (
                <Link to="/wishlist" className="text-gray-500 hover:text-[#B5617A] p-2 hover:bg-[#FFF2F5] rounded-full transition-colors relative" aria-label="Wishlist">
                  <FaHeart className="text-lg" />
                </Link>
              )}

              <button onClick={onCartOpen} className="text-gray-500 hover:text-[#B5617A] p-2 hover:bg-[#FFF2F5] rounded-full relative transition-colors" aria-label="Cart">
                <FaShoppingCart className="text-lg" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B5617A] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md">
                    {getCartCount()}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef} onMouseEnter={() => setShowUserMenu(true)} onMouseLeave={() => setShowUserMenu(false)}>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2 cursor-pointer group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B5617A] to-[#7D3A52] flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-[#F5D0D8] group-hover:ring-[#C5A55A]/40 transition-all">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden xl:block">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-[#B5617A] transition-colors">{user?.name?.split(' ')[0]}</p>
                      <p className="text-xs text-gray-400">My Account</p>
                    </div>
                    <FaChevronDown className="text-xs text-gray-400 group-hover:text-[#B5617A] transition-colors" />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#B5617A] to-[#7D3A52] text-white rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all">
                    <FaUser className="text-sm" />
                    <span className="font-semibold text-sm">Login</span>
                  </div>
                )}

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-[#F5D0D8] overflow-hidden transition-all duration-300 transform ${showUserMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-3'}`}
                  style={{ top: '100%' }}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-5 py-4 bg-gradient-to-br from-[#FFF2F5] to-white border-b border-[#F5D0D8]">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B5617A] to-[#7D3A52] flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {user?.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-[#C5A55A] font-medium">Premium Member</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link to="/profile" className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-[#FFF2F5] hover:text-[#B5617A] transition-all group">
                          <FaUser className="mr-3 text-gray-300 group-hover:text-[#B5617A]" />
                          <span className="font-medium">My Profile</span>
                        </Link>
                        <Link to="/orders" className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-[#FFF2F5] hover:text-[#B5617A] transition-all group">
                          <FaShoppingCart className="mr-3 text-gray-300 group-hover:text-[#B5617A]" />
                          <span className="font-medium">My Orders</span>
                        </Link>
                        <Link to="/wishlist" className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-[#FFF2F5] hover:text-[#B5617A] transition-all group">
                          <FaHeart className="mr-3 text-gray-300 group-hover:text-[#B5617A]" />
                          <span className="font-medium">My Wishlist</span>
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-[#FFF2F5] hover:text-[#B5617A] transition-all group">
                            <span className="mr-3">⚙️</span>
                            <span className="font-medium">Admin Dashboard</span>
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-[#F5D0D8]">
                        <button onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }}
                          className="flex items-center w-full px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-all font-semibold">
                          <span className="mr-3">🚪</span>Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-5">
                      <div className="text-center mb-4">
                        <p className="text-sm font-semibold text-gray-800 mb-1">Welcome to JJ Trendz</p>
                        <p className="text-xs text-gray-500">Sign in with your mobile number</p>
                      </div>
                      <Link to="/login" className="block w-full px-4 py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-[#B5617A] to-[#7D3A52] hover:opacity-90 rounded-xl transition-all shadow-md hover:shadow-lg">
                        Login / Register
                      </Link>
                      <p className="text-xs text-gray-400 mt-3 text-center">Quick & easy sign-in with OTP</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-[#B5617A] text-2xl p-2" aria-label="Menu">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 px-4 bg-white border-t border-[#F5D0D8]">
            <form onSubmit={handleSearch} className="my-4">
              <div className="relative">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search designs..."
                  className="w-full px-4 py-2.5 border-2 border-[#F5D0D8] rounded-full focus:outline-none focus:border-[#B5617A] text-sm" />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B5617A]"><FaSearch /></button>
              </div>
            </form>
            <div className="flex flex-col space-y-1">
              {[{ to: '/', label: 'Home' }, { to: '/products', label: 'Shop' }, { to: '/categories', label: 'Collections' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map(({ to, label }) => (
                <Link key={to} to={to} onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-[#B5617A] font-medium py-2.5 px-3 rounded-lg hover:bg-[#FFF2F5] transition-colors">
                  {label}
                </Link>
              ))}
              <hr className="my-2 border-[#F5D0D8]" />
              <button onClick={() => { onCartOpen(); setIsOpen(false); }}
                className="text-left text-gray-700 hover:text-[#B5617A] font-medium py-2.5 px-3 rounded-lg hover:bg-[#FFF2F5] transition-colors flex items-center gap-2">
                <FaShoppingCart /> Cart {getCartCount() > 0 && `(${getCartCount()})`}
              </button>
              {isAuthenticated ? (
                <>
                  <Link to="/wishlist" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#B5617A] font-medium py-2.5 px-3 rounded-lg hover:bg-[#FFF2F5] transition-colors flex items-center gap-2"><FaHeart /> Wishlist</Link>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#B5617A] font-medium py-2.5 px-3 rounded-lg hover:bg-[#FFF2F5] transition-colors flex items-center gap-2"><FaUser /> My Profile</Link>
                  <Link to="/orders" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#B5617A] font-medium py-2.5 px-3 rounded-lg hover:bg-[#FFF2F5] transition-colors flex items-center gap-2"><FaShoppingCart /> My Orders</Link>
                  {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#B5617A] font-medium py-2.5 px-3 rounded-lg hover:bg-[#FFF2F5] transition-colors">Admin Dashboard</Link>}
                  <button onClick={() => { logout(); setIsOpen(false); navigate('/'); }}
                    className="text-left text-red-500 font-medium py-2.5 px-3 rounded-lg hover:bg-red-50 transition-colors">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#B5617A] font-medium py-2.5 px-3 rounded-lg hover:bg-[#FFF2F5] transition-colors">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#B5617A] font-medium py-2.5 px-3 rounded-lg hover:bg-[#FFF2F5] transition-colors">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
