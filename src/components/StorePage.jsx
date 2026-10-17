import React, { useState } from 'react';
import { storeProductsData } from '../data/homeData';
import ProtectedPdfViewer from './ProtectedPdfViewer';
import CheckoutModal from './CheckoutModal';
import Navbar from './Navbar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function StorePage({ 
  data = {},
  onNavigateHome, 
  onNavigateDashboard,
  onNavigateCourse, 
  onNavigateExams, 
  onNavigateLeaderboard,
  onNavigateAbout, 
  onNavigateDevices,
  onNavigateOrders,
  onNavigatePolicies,
  onOpenAdmin, 
  onLoginClick,
  onEnrollSuccess
}) {
  const { isDark } = useTheme();
  const { currentUser } = useAuth();
  const storeProducts = data.storeProducts || storeProductsData;
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPdfReader, setShowPdfReader] = useState(false);

  const categories = ["All", "Book", "E-book", "Stationery", "Others"];

  const filteredProducts = storeProducts.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 selection:bg-[#2563eb] selection:text-white ${
      isDark ? 'bg-transparent text-gray-100' : 'bg-[#F8F9FA] text-[#111827]'
    }`}>
      {/* Shared Sticky Navbar */}
      <Navbar 
        activePage="store"
        siteSettings={data.siteSettings}
        onNavigateHome={onNavigateHome}
        onNavigateDashboard={onNavigateDashboard}
        onNavigateCourse={onNavigateCourse}
        onNavigateExams={onNavigateExams}
        onNavigateLeaderboard={onNavigateLeaderboard}
        onNavigateStore={() => {}}
        onNavigateAbout={onNavigateAbout}
        onNavigateDevices={onNavigateDevices}
        onNavigateOrders={onNavigateOrders}
        onNavigatePolicies={onNavigatePolicies}
        onOpenAdmin={onOpenAdmin}
        onLoginClick={onLoginClick || (() => setShowCheckout(true))}
      />

      {/* Main Content */}
      <main className="pt-16 md:pt-20 min-h-screen">
        
        {/* Hero Banner */}
        <div className={`eh-course-hero relative overflow-hidden transition-colors duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-[#030712] via-[#0b172a] to-[#030712] border-b border-[#2563eb]/20' 
            : 'bg-gradient-to-r from-[#1e3a8a] via-[#2563eb] to-[#1e3a8a] border-b border-blue-700/20'
        }`}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-white">
            <div className="shrink-0">
              <h1 className="text-3xl md:text-4xl font-black text-white whitespace-nowrap">
                Hunters Store
              </h1>
              <p className="text-white/80 mt-1 text-sm md:text-base">
                Books, E-books, Stationery and more
              </p>
            </div>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full sm:w-72 px-4 py-3 rounded-xl border transition-all text-sm focus:outline-none focus:ring-2 ${
                isDark 
                  ? 'border-[#2563eb]/30 bg-[#08152c] text-white placeholder:text-gray-400 focus:ring-[#2563eb]/40' 
                  : 'border-white/30 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-blue-400'
              }`}
              placeholder="Search products..."
            />
          </div>
        </div>

        {/* Product Catalog */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, idx) => {
              const isSelected = activeCategory === cat;
              return (
                <button 
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all cursor-pointer ${
                    isSelected 
                      ? (isDark 
                          ? 'bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white border-[#38bdf8]/40 shadow-[0_4px_16px_rgba(37, 99, 235,0.35)]' 
                          : 'bg-[#2563eb] text-white border-[#2563eb] shadow-sm')
                      : (isDark 
                          ? 'bg-[#0b172a]/80 text-gray-300 border-[#2563eb]/20 hover:border-[#2563eb]/60 hover:text-white' 
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600')
                  }`}
                >
                  {cat} 
                  <span className="ml-1.5 text-[10px] font-bold opacity-70 tabular-nums">
                    {cat === "All" 
                      ? storeProducts.length 
                      : storeProducts.filter(p => p.category === cat).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid of Books & E-books */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div 
                  key={p.id}
                  className={`rounded-2xl overflow-hidden transition-all flex flex-col group border ${
                    isDark 
                      ? 'bg-[#060f20]/90 shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-[#2563eb]/20 hover:border-[#2563eb]/60 hover:shadow-[0_12px_40px_rgba(37, 99, 235,0.25)]' 
                      : 'bg-white shadow-sm hover:shadow-xl border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className={`aspect-[4/3] overflow-hidden relative ${isDark ? 'bg-[#030712]' : 'bg-gray-100'}`}>
                    <img 
                      src={p.cover} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2563eb] text-white shadow-sm">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className={`font-bold mb-1 line-clamp-1 transition-colors text-sm ${
                      isDark ? 'text-white group-hover:text-[#38bdf8]' : 'text-[#111827] group-hover:text-[#2563eb]'
                    }`}>
                      {p.title}
                    </h3>
                    <p className={`text-xs mb-4 line-clamp-2 leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {p.description}
                    </p>

                    <div className={`mt-auto flex items-center justify-between pt-2 border-t ${
                      isDark ? 'border-[#2563eb]/15' : 'border-gray-100'
                    }`}>
                      <div>
                        <span className={`text-base font-black ${isDark ? 'text-[#38bdf8]' : 'text-[#2563eb]'}`}>৳{p.price}</span>
                        <span className="text-xs text-gray-400 line-through ml-1">৳{p.regularPrice}</span>
                      </div>

                      <div className="flex gap-1.5">
                        {p.category === "E-book" && (
                          <button 
                            onClick={() => setShowPdfReader(true)}
                            className={`px-2.5 py-1 text-xs font-semibold rounded-lg cursor-pointer ${
                              isDark 
                                ? 'text-[#38bdf8] bg-[#091830] hover:bg-[#0e2246] border border-[#2563eb]/30' 
                                : 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200'
                            }`}
                          >
                            পড়ুন
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            if (!currentUser) {
                              if (onLoginClick) {
                                onLoginClick(() => {
                                  setSelectedProduct(p);
                                  setShowCheckout(true);
                                });
                              }
                              return;
                            }
                            setSelectedProduct(p);
                            setShowCheckout(true);
                          }}
                          className="px-3 py-1 text-xs font-bold text-white bg-[#2563eb] hover:brightness-110 rounded-lg border-none cursor-pointer shadow-md"
                        >
                          অর্ডার
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`py-20 px-6 text-center rounded-3xl border transition-all max-w-2xl mx-auto ${
              isDark 
                ? 'bg-[#060f20]/90 border-[#2563eb]/25 shadow-[0_8px_30px_rgba(0,0,0,0.5)]' 
                : 'bg-white border-gray-200 shadow-sm'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center border ${
                isDark 
                  ? 'bg-[#08162e] border-[#2563eb]/30 text-[#38bdf8]' 
                  : 'bg-blue-50 border-blue-100 text-[#2563eb]'
              }`}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 className={`text-lg font-bold mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                বর্তমানে কোনো প্রোডাক্ট যুক্ত নেই
              </h3>
              <p className={`text-xs max-w-sm mx-auto leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                খুব শীঘ্রই Hunters Store-এ নতুন বই, ই-বুক ও স্টাডি ম্যাটেরিয়াল যুক্ত করা হবে।
              </p>
              {(activeCategory !== "All" || searchQuery) && (
                <button 
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className={`mt-4 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isDark 
                      ? 'border-[#2563eb]/30 bg-[#091834] text-[#38bdf8] hover:bg-[#08162e]' 
                      : 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  ফিল্টার ক্লিয়ার করো
                </button>
              )}
            </div>
          )}

        </div>
      </main>

      {/* FOOTER (Hidden on mobile) */}
      <div className="hidden sm:block">
        {isDark ? (
          <footer className="bg-gradient-to-b from-[#071329] via-[#040a16] to-[#030712] text-white border-t border-[#2563eb]/25">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Technical Home" className="h-6 w-6 rounded-full object-cover shadow-sm" />
                  <span className="font-bold text-[#38bdf8]">HUNTERS STORE</span>
                </div>
                <p>© 2026 Technical Home. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <button onClick={() => onNavigatePolicies ? onNavigatePolicies('privacy') : (window.location.href = '/privacy-policy')} className="hover:underline bg-transparent border-none p-0 text-inherit cursor-pointer">Privacy Policy</button>
                  <button onClick={() => onNavigatePolicies ? onNavigatePolicies('terms') : (window.location.href = '/terms')} className="hover:underline bg-transparent border-none p-0 text-inherit cursor-pointer">Terms of Use</button>
                  <button onClick={() => onNavigatePolicies ? onNavigatePolicies('refund') : (window.location.href = '/refund-policy')} className="hover:underline bg-transparent border-none p-0 text-inherit cursor-pointer">Refund Policy</button>
                </div>
              </div>
            </div>
          </footer>
        ) : (
          <footer className="bg-[#2563eb] text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white/80 gap-4">
                <div className="flex items-center gap-2 bg-white rounded-full px-2.5 py-1">
                  <img src="/logo.png" alt="Technical Home" className="h-5 w-5 rounded-full object-cover" />
                  <span className="font-bold text-[#2563eb]">HUNTERS STORE</span>
                </div>
                <p className="text-white/70">© 2026 Technical Home. All rights reserved.</p>
                <div className="flex items-center gap-4 text-white/80">
                  <button onClick={() => onNavigatePolicies ? onNavigatePolicies('privacy') : (window.location.href = '/privacy-policy')} className="hover:underline bg-transparent border-none p-0 text-inherit cursor-pointer">Privacy Policy</button>
                  <button onClick={() => onNavigatePolicies ? onNavigatePolicies('terms') : (window.location.href = '/terms')} className="hover:underline bg-transparent border-none p-0 text-inherit cursor-pointer">Terms of Use</button>
                  <button onClick={() => onNavigatePolicies ? onNavigatePolicies('refund') : (window.location.href = '/refund-policy')} className="hover:underline bg-transparent border-none p-0 text-inherit cursor-pointer">Refund Policy</button>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>

      {/* PDF WATERMARKED PROTECTED VIEWER */}
      {showPdfReader && (
        <ProtectedPdfViewer 
          pdfTitle="Biology Extra Info Material (Protected)" 
          studentPhone="01886129841"
          onClose={() => setShowPdfReader(false)} 
        />
      )}

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <CheckoutModal 
          course={{
            title: selectedProduct ? selectedProduct.title : "Store Item",
            salePrice: selectedProduct ? selectedProduct.price : 299,
            regularPrice: selectedProduct ? selectedProduct.regularPrice : 500
          }}
          siteSettings={data.siteSettings}
          onSuccess={onEnrollSuccess}
          onClose={() => setShowCheckout(false)} 
        />
      )}
    </div>
  );
}

