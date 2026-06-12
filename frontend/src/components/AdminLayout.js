import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBoxes, FaShoppingCart, FaUsers, FaTags, FaTicketAlt, FaBars, FaTimes, FaSignOutAlt, FaChartLine, FaImages, FaCog, FaChartBar, FaFilm, FaFileInvoiceDollar, FaChevronDown, FaChevronRight, FaTruck, FaIndustry, FaMoneyBillWave, FaClipboardList } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, isStaff } = useAuth();

  // Staff land directly in billing — keep submenu expanded by default for them
  const [billingExpanded, setBillingExpanded] = useState(isStaff);

  const handleLogout = () => { logout(); navigate('/login'); };

  const isBillingActive = location.pathname.startsWith('/admin/billing');

  const menuItems = [
    { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard', exact: true },
    { path: '/admin/products', icon: FaBoxes, label: 'Products' },
    { path: '/admin/categories', icon: FaTags, label: 'Categories' },
    { path: '/admin/orders', icon: FaShoppingCart, label: 'Orders' },
    { path: '/admin/users', icon: FaUsers, label: 'Users' },
    { path: '/admin/coupons', icon: FaTicketAlt, label: 'Coupons' },
    { path: '/admin/sliders', icon: FaImages, label: 'Sliders' },
    { path: '/admin/reels', icon: FaFilm, label: 'Reels' },
    { path: '/admin/settings', icon: FaCog, label: 'Settings' },
    { path: '/admin/reports', icon: FaChartLine, label: 'Reports' },
    { path: '/admin/analytics', icon: FaChartBar, label: 'Analytics' },
  ];

  const billingMenuItems = [
    { path: '/admin/billing', icon: FaTachometerAlt, label: 'Dashboard', exact: true },
    { path: '/admin/billing/suppliers', icon: FaTruck, label: 'Suppliers' },
    { path: '/admin/billing/raw-materials', icon: FaBoxes, label: 'Raw Materials' },
    { path: '/admin/billing/purchase', icon: FaClipboardList, label: 'Purchase' },
    { path: '/admin/billing/production', icon: FaIndustry, label: 'Production' },
    { path: '/admin/billing/sales', icon: FaFileInvoiceDollar, label: 'Sales' },
    { path: '/admin/billing/vouchers', icon: FaMoneyBillWave, label: 'Vouchers' },
    { path: '/admin/billing/reports', icon: FaChartLine, label: 'Reports' },
  ];

  const isActive = (path, exact = false) => exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="flex h-screen bg-[#FFF8FA] overflow-hidden">
      {/* Sidebar — blush rose gradient */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-[#4A1F30] via-[#7D3A52] to-[#9B5068] text-white transition-all duration-300 flex flex-col shadow-xl`}>

        {/* Logo */}
        <div className="p-4 border-b border-[#B5617A]/40">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-serif font-bold bg-gradient-to-r from-white to-[#E8D5A0] bg-clip-text text-transparent">
                  JJ Trendz
                </h1>
                <p className="text-[9px] text-[#E8D5A0] tracking-[0.2em] font-medium uppercase">Official Boutique</p>
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {/* Main menu items hidden from staff */}
            {!isStaff && menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                    isActive(item.path, item.exact)
                      ? 'bg-white/20 text-white shadow font-semibold'
                      : 'hover:bg-white/10 text-pink-100'
                  }`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <item.icon className="text-lg flex-shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}

            {/* Billing Submenu */}
            <li>
              <button
                onClick={() => setBillingExpanded(!billingExpanded)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                  isBillingActive ? 'bg-white/20 text-white shadow font-semibold' : 'hover:bg-white/10 text-pink-100'
                }`}
                title={!sidebarOpen ? 'Billing' : ''}
              >
                <FaFileInvoiceDollar className="text-lg flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">Billing</span>
                    {billingExpanded ? <FaChevronDown className="text-xs" /> : <FaChevronRight className="text-xs" />}
                  </>
                )}
              </button>
              {sidebarOpen && billingExpanded && (
                <ul className="mt-1 ml-4 space-y-1 border-l-2 border-white/20 pl-4">
                  {billingMenuItems.map((subItem) => (
                    <li key={subItem.path}>
                      <Link
                        to={subItem.path}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs ${
                          isActive(subItem.path, subItem.exact) ? 'bg-white/20 text-white font-semibold' : 'hover:bg-white/10 text-pink-200'
                        }`}
                      >
                        <subItem.icon className="text-sm flex-shrink-0" />
                        <span>{subItem.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ring-2 ring-[#E8D5A0]/40">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate text-white">{user?.name}</p>
                <p className="text-xs text-pink-200 truncate">{user?.email}</p>
                <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded mt-0.5 inline-block ${
                  isStaff ? 'bg-amber-400/30 text-amber-200' : 'bg-white/20 text-white'
                }`}>
                  {user?.role}
                </span>
              </div>
            )}
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors text-sm"
            title={!sidebarOpen ? 'Logout' : ''}>
            <FaSignOutAlt className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-[#F5D0D8] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#7D3A52]">
                {menuItems.find(item => isActive(item.path, item.exact))?.label || 'Admin'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                JJ Trendz Official Boutique — {isStaff ? 'Staff Billing Panel' : 'Admin Panel'}
              </p>
            </div>
            <Link to="/" target="_blank"
              className="px-4 py-2 bg-gradient-to-r from-[#B5617A] to-[#7D3A52] text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium shadow-md">
              View Store
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
