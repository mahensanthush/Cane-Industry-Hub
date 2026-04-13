import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const navTranslations = {
  si: { home: 'මුල් පිටුව', about: 'අප ගැන', shop: 'වෙළඳසැල', suppliers: 'සැපයුම්කරුවන්', admin: 'පිවිසුම', logout: 'ඉවත් වන්න', cart: 'කරත්තය', cane: 'වේවැල්', hub: 'කේන්ද්‍රය', addItem: 'භාණ්ඩ එක් කරන්න', signup: 'ගිණුමක් තනන්න' },
  en: { home: 'Home', about: 'About', shop: 'Shop', suppliers: 'Suppliers', admin: 'Login', logout: 'Logout', cart: 'Cart', cane: 'Cane', hub: 'Hub', addItem: 'Add Item', signup: 'Create Account' }
};

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { lang, toggleLanguage } = useLanguage(); 
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole')); 

  const t = navTranslations[lang];
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const isHomeOrAbout = location.pathname === '/' || location.pathname === '/about';
  const isLoginPage = location.pathname === '/admin'; 

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setUserRole(localStorage.getItem('userRole'));
    };
    window.addEventListener('storage', handleAuthChange);
    const interval = setInterval(handleAuthChange, 1000);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      padding: '8px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '800',
      textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.3s ease',
      color: isActive ? '#0A4B3A' : '#E5E7EB',
      backgroundColor: isActive ? '#ffffff' : 'transparent',
      boxShadow: isActive ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'
    };
  };

  return (
    <nav style={{
      width: '100%',
      backgroundColor: '#0A4B3A',
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        
        {/* Logo Section */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#D4AF37', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A4B3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.56-7.43H5.05"/>
            </svg>
          </div>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
            {t.cane} <span style={{ color: '#D4AF37' }}>{t.hub}</span>
          </div>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {isLoginPage && !isLoggedIn ? (
              <>
                <Link to="/" style={getLinkStyle('/')}>{t.home}</Link>
                <Link 
                  to="/admin?mode=signup" 
                  style={{ 
                    color: '#D4AF37', 
                    fontSize: '13px', 
                    fontWeight: '900', 
                    marginLeft: '15px',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px'
                  }}
                >
                  {t.signup}
                </Link>
              </>
            ) : (
              
              isLoggedIn && userRole === 'seller' ? (
                <>
                  <Link to="/" style={getLinkStyle('/')}>{t.home}</Link>
                  <Link to="/shop" style={getLinkStyle('/shop')}>{t.shop}</Link>
                  <Link to="/admin" style={getLinkStyle('/admin')}>{t.addItem}</Link>
                  <Link to="/about" style={getLinkStyle('/about')}>{t.about}</Link>
                </>
              ) : (isLoggedIn || !isHomeOrAbout) ? (
                
                <>
                  <Link to="/" style={getLinkStyle('/')}>{t.home}</Link>
                  <Link to="/shop" style={getLinkStyle('/shop')}>{t.shop}</Link>
                  <Link to="/suppliers" style={getLinkStyle('/suppliers')}>{t.suppliers}</Link>
                  <Link to="/about" style={getLinkStyle('/about')}>{t.about}</Link>
                  {!isLoggedIn && <Link to="/admin" style={getLinkStyle('/admin')}>{t.admin}</Link>}
                </>
              ) : (
                
                <Link to="/admin" style={getLinkStyle('/admin')}>{t.admin}</Link>
              )
            )}

            {isLoggedIn && (
              <button onClick={handleLogout} style={{ ...getLinkStyle('none'), cursor: 'pointer', border: 'none', color: '#ff9999' }}>
                {t.logout}
              </button>
            )}
          </div>

          <div style={{ width: '1.5px', height: '24px', backgroundColor: 'rgba(255,255,255,0.15)' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={toggleLanguage}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                height: '42px', padding: '0 16px', borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#ffffff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#D4AF37" style={{ width: '18px', height: '18px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span>{lang === 'si' ? 'EN' : 'සිංහල'}</span>
            </button>

            {!isLoginPage && userRole !== 'seller' && (isLoggedIn || !isHomeOrAbout) && (
              <Link 
                to="/cart" 
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  height: '42px', padding: '0 16px', borderRadius: '12px',
                  backgroundColor: location.pathname === '/cart' ? '#ffffff' : 'rgba(255,255,255,0.08)',
                  color: location.pathname === '/cart' ? '#0A4B3A' : '#ffffff',
                  fontSize: '13px', fontWeight: 'bold', textDecoration: 'none'
                }}
              >
                <span style={{ whiteSpace: 'nowrap' }}>{t.cart}</span>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span style={{
                    position: 'absolute', top: '-8px', right: '-10px',
                    width: '20px', height: '20px', borderRadius: '50%',
                    backgroundColor: '#D4AF37', color: '#0A4B3A',
                    fontSize: '11px', fontWeight: '900',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #0A4B3A' 
                  }}>
                    {totalItems}
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}