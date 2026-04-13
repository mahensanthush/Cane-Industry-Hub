import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  si: {
    cartTitle: 'මගේ කරත්තය',
    clearCart: 'සියල්ල ඉවත් කරන්න',
    emptyCart: 'ඔබේ කරත්තය දැනට හිස්ව පවතී.',
    goToShop: 'වෙළඳසැලට යන්න',
    totalToPay: 'ගෙවිය යුතු මුළු මුදල',
    checkout: 'ඇණවුම සම්පූර්ණ කරන්න',
    addMore: '← තවත් භාණ්ඩ එක් කරන්න',
    color: 'වර්ණය',
    remove: 'ඉවත් කරන්න',
    rs: 'රු.'
  },
  en: {
    cartTitle: 'My Cart',
    clearCart: 'Clear All',
    emptyCart: 'Your cart is currently empty.',
    goToShop: 'Go to Shop',
    totalToPay: 'Total Amount to Pay',
    checkout: 'Proceed to Checkout',
    addMore: '← Add more items',
    color: 'Color',
    remove: 'Remove',
    rs: 'Rs.'
  }
};

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { lang } = useLanguage();
  const t = translations[lang];

  
  const totalPrice = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * item.quantity, 0);

  return (
    <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh', padding: '40px 16px', display: 'flex', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Header Card */}
        <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0 }}>
            {t.cartTitle}
          </h1>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              style={{ padding: '10px 20px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontWeight: 'bold', fontSize: '13px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              {t.clearCart}
            </button>
          )}
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          
          /* --- Empty Cart State --- */
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '80px 20px', textAlign: 'center', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
            <p style={{ fontSize: '18px', color: '#6B7280', fontWeight: 'bold', marginBottom: '32px' }}>{t.emptyCart}</p>
            <Link to="/shop" style={{ textDecoration: 'none', backgroundColor: '#244034', color: '#fff', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '15px', display: 'inline-block' }}>
              {t.goToShop}
            </Link>
          </div>

        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* --- Cart Items List --- */}
            <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.color}`} style={{ 
                  display: 'flex', alignItems: 'center', padding: '24px 32px', 
                  borderBottom: index === cartItems.length - 1 ? 'none' : '1px solid #F3F4F6', 
                  gap: '24px', flexWrap: 'wrap' 
                }}>
                  
                  {/* Item Image */}
                  <div style={{ width: '100px', height: '100px', borderRadius: '12px', backgroundColor: '#F3F4F6', overflow: 'hidden', flexShrink: 0, border: '1px solid #E5E7EB' }}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#9CA3AF', fontWeight: 'bold' }}>No Img</div>
                    )}
                  </div>
                  
                  {/* Item Details */}
                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{item.title}</h3>
                    {item.color && (
                      <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 'bold', backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '6px', width: 'fit-content' }}>
                        {t.color}: {item.color}
                      </span>
                    )}
                    <p style={{ fontSize: '14px', color: '#6B7280', margin: 0, marginTop: '4px', fontWeight: '500' }}>
                      {t.rs} {(Number(item.price) || 0).toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  
                  {/* Price & Delete Action */}
                  <div style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '900', color: '#111827' }}>
                      {t.rs} {((Number(item.price) || 0) * item.quantity).toLocaleString()}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id, item.color)} 
                      style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      {t.remove}
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* --- Total Summary Section --- */}
            <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #E5E7EB', boxShadow: '0 4px 12px -2px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
              
              <div>
                <p style={{ fontSize: '11px', fontWeight: '900', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>
                  {t.totalToPay}
                </p>
                <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#244034', margin: 0 }}>
                  {t.rs} {totalPrice.toLocaleString()}
                </h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', flex: '1 1 200px', maxWidth: '300px', marginLeft: 'auto' }}>
                <Link 
                  to="/checkout" 
                  style={{ 
                    backgroundColor: '#111827', 
                    color: '#fff', 
                    padding: '16px 40px', 
                    borderRadius: '12px', 
                    fontWeight: 'bold', 
                    fontSize: '16px', 
                    border: 'none', 
                    cursor: 'pointer', 
                    width: '100%', 
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#244034'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#111827'}
                >
                  {t.checkout}
                </Link>
                <Link to="/shop" style={{ fontSize: '13px', fontWeight: 'bold', color: '#6B7280', textDecoration: 'underline', textDecorationColor: '#D1D5DB', textUnderlineOffset: '4px' }}>
                  {t.addMore}
                </Link>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}