import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext'; 
import { useCart } from '../context/CartContext'; 
import { api } from '../services/api';

const translations = {
  si: {
    home: 'මුල් පිටුව', shop: 'වෙළඳසැල', chair: 'භාණ්ඩ විස්තර',
    reviews: 'ප්‍රතිචාර', sold: 'විකිණී ඇත', newShopper: '20% සුළු අව',
    vat: 'මිලට වැට් බදු ඇතුළත් වේ', colorTitle: 'වර්ණය (Colors):',
    commitment: 'අපගේ වගකීම', freeDeliveryTitle: 'නොමිලේ ප්‍රවාහනය',
    freeDeliverySub: 'දින 3-5 ඇතුළත', returnTitle: 'දින 15ක් ඇතුළත ආපසු භාරදීම',
    returnSub: 'ඉක්මන් ආපසු භාරදීමේ පහසුකම', quantity: 'ප්‍රමාණය (Quantity):',
    maxLimit: 'උපරිම 10යි', addToCart: 'කරත්තයට එක් කරන්න', buyNow: 'දැන් මිලදී ගන්න',
    securePayment: 'ආරක්ෂිත ගෙවීම්', customerReviews: 'පාරිභෝගික ප්‍රතිචාර',
    writeReview: 'ප්‍රතිචාරයක් එක් කරන්න', yourName: 'ඔබේ නම',
    yourReview: 'ඔබේ අදහස...', submitReview: 'ප්‍රතිචාරය යොමු කරන්න',
    recentReviews: 'මෑත කාලීන ප්‍රතිචාර', noReviews: 'තවමත් ප්‍රතිචාර කිසිවක් නොමැත.',
    addedToCart: 'භාණ්ඩය කරත්තයට එක් කරන ලදී!', productNotFound: 'ඔබ සොයන භාණ්ඩය හමු නොවීය.',
    sellerNoBuy: 'විකුණුම්කරුවෙකු ලෙස ඔබට මිලදී ගැනීමේ පහසුකම අක්‍රිය කර ඇත.',
    sellerNoReview: 'විකුණුම්කරුවන්ට ප්‍රතිචාර එක් කිරීමට අවසර නැත.'
  },
  en: {
    home: 'Home', shop: 'Shop', chair: 'Product Details',
    reviews: 'Reviews', sold: 'sold', newShopper: 'New shopper only',
    vat: 'Price includes VAT', colorTitle: 'Colors:',
    commitment: 'Our Commitment', freeDeliveryTitle: 'Free Delivery',
    freeDeliverySub: '(within 3-5 days)', returnTitle: '15-Day Free Return',
    returnSub: 'Return & refund policy', quantity: 'Quantity:',
    maxLimit: 'Max. 10 pcs/shopper', addToCart: 'Add to Cart', buyNow: 'Buy Now',
    securePayment: 'Secure Payment', customerReviews: 'Customer Reviews',
    writeReview: 'Write a Review', yourName: 'Your Name',
    yourReview: 'Share your thoughts...', submitReview: 'Submit Review',
    recentReviews: 'Recent Reviews', noReviews: 'No reviews yet.',
    addedToCart: 'Product added to cart successfully!', productNotFound: 'Product not found.',
    sellerNoBuy: 'Purchase disabled for Sellers.',
    sellerNoReview: 'Sellers are not allowed to post reviews.'
  }
};

export default function ProductDetails() {
  const { lang } = useLanguage(); 
  const t = translations[lang]; 
  
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { addToCart } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(0);

  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState('');

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts();
        if (Array.isArray(data)) {
          const foundProduct = data.find(p => p._id.toString() === id.toString());
          if (foundProduct) {
            setProductData({
              ...foundProduct,
              images: foundProduct.images && foundProduct.images.length > 0 ? foundProduct.images : ['https://via.placeholder.com/600?text=No+Image'],
              rating: foundProduct.rating || 4.9,
              reviewsCount: foundProduct.reviewsCount || Math.floor(Math.random() * 500),
              comments: foundProduct.comments || [
                { user: 'Mahen P.', rating: 5, date: '08 Apr 2026', text: lang === 'si' ? 'ඉතා විශිෂ්ට නිමාවක්.' : 'Excellent finish.' }
              ]
            });
          }
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
    setActiveImg(0); setQuantity(1); setActiveColor(0);
  }, [id, lang]);

  const handleQuantity = (type) => {
    if (type === 'inc' && quantity < 10) setQuantity(prev => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    if(!productData) return;
    addToCart({
      id: productData._id, title: productData.title[lang] || productData.title.en, 
      price: productData.price, image: productData.images[activeImg], 
      quantity: quantity, color: productData.colors?.[activeColor]?.[lang] || 'Default'
    });
    alert(t.addedToCart); 
  };

  const handleBuyNow = () => { handleAddToCart(); navigate('/cart'); };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText || !userName || userRating === 0) return alert('Please fill all fields');
    const newComment = { 
      user: userName, rating: userRating, 
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      text: commentText 
    };
    setProductData(prev => ({ ...prev, comments: [newComment, ...prev.comments], reviewsCount: prev.reviewsCount + 1 }));
    setCommentText(''); setUserName(''); setUserRating(0);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px', fontWeight: 'bold' }}>Loading...</div>;
  if (!productData) return <div style={{ textAlign: 'center', padding: '100px' }}>{t.productNotFound}</div>;

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#111827', padding: '40px 16px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '1350px', backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', padding: '32px' }}>
        
        <nav style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#6B7280', marginBottom: '32px', fontWeight: 'bold' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#6B7280' }}>{t.home}</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link to="/shop" style={{ textDecoration: 'none', color: '#6B7280' }}>{t.shop}</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: '#111827' }}>{t.chair}</span>
        </nav>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start', width: '100%' }}>
          
          <div style={{ width: '420px', flexShrink: 0, display: 'flex', gap: '16px' }}>
            <div style={{ width: '64px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {productData?.images?.map((img, i) => (
                <button key={i} onMouseEnter={() => setActiveImg(i)} style={{ width: '64px', height: '64px', borderRadius: '12px', border: activeImg === i ? '2px solid #111827' : '2px solid #E5E7EB', overflow: 'hidden', cursor: 'pointer', backgroundColor: '#fff' }}>
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
            <div style={{ width: '340px', height: '380px', backgroundColor: '#F3F4F6', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
              <img src={productData?.images?.[activeImg]} alt="main" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
            </div>
          </div>

          <div style={{ flex: '1 1 300px', minWidth: '300px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#111827', margin: 0 }}>{productData?.title?.[lang] || productData?.title?.en}</h1>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#6B7280', display: 'block', marginBottom: '16px' }}>{productData?.subTitle?.[lang] || `(${productData?.category})`}</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', borderBottom: '1px solid #F3F4F6', paddingBottom: '24px', marginBottom: '24px' }}>
              <div style={{ color: '#EAB308', fontSize: '18px' }}>★★★★★</div>
              <span style={{ color: '#111827', fontWeight: '900' }}>{productData?.rating}</span>
              <span style={{ borderLeft: '1px solid #E5E7EB', paddingLeft: '12px' }}>{productData?.reviewsCount} {t.reviews}</span>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <span style={{ fontSize: '36px', fontWeight: '900', color: '#0B6E4F' }}>රු. {productData?.price?.toLocaleString()}</span>
              <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 'bold' }}>{t.vat}</div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '14px', fontWeight: '900', marginBottom: '16px' }}>{t.colorTitle}</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                {productData?.colors?.map((color, i) => (
                  <button key={i} onClick={() => setActiveColor(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ backgroundColor: color.code, width: '42px', height: '42px', borderRadius: '50%', border: activeColor === i ? '2px solid #111827' : '1px solid #D1D5DB' }} />
                    <span style={{ display: 'block', fontSize: '11px', color: '#6B7280' }}>{color[lang]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ width: '300px', flexShrink: 0 }}>
            <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '20px', padding: '24px' }}>
              
              {/* Delivery & Return Section (Re-added) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <span style={{ backgroundColor: '#FACC15', color: '#000', fontSize: '11px', fontWeight: '900', padding: '4px 8px', fontStyle: 'italic', borderRadius: '6px' }}>PREMIUM</span>
                <span style={{ fontSize: '14px', fontWeight: '900', color: '#111827' }}>{t.commitment}</span>
              </div>

              <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B6E4F" strokeWidth="2"><path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                  <div><p style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{t.freeDeliveryTitle}</p><p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{t.freeDeliverySub}</p></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B6E4F" strokeWidth="2"><path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
                  <div><p style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{t.returnTitle}</p><p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{t.returnSub}</p></div>
                </div>
              </div>

              {userRole !== 'seller' ? (
                <>
                  <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '13px', fontWeight: '900', margin: 0 }}>{t.quantity}</p>
                    <div style={{ display: 'flex', border: '1px solid #D1D5DB', borderRadius: '8px', overflow: 'hidden' }}>
                      <button onClick={() => handleQuantity('dec')} style={{ padding: '5px 10px', border: 'none', cursor: 'pointer' }}>-</button>
                      <span style={{ padding: '5px 15px', fontWeight: 'bold' }}>{quantity}</span>
                      <button onClick={() => handleQuantity('inc')} style={{ padding: '5px 10px', border: 'none', cursor: 'pointer' }}>+</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button onClick={handleAddToCart} style={{ width: '100%', padding: '14px', backgroundColor: '#fff', border: '2px solid #0B6E4F', color: '#0B6E4F', fontWeight: '900', borderRadius: '12px', cursor: 'pointer' }}>{t.addToCart}</button>
                    <button onClick={handleBuyNow} style={{ width: '100%', padding: '14px', backgroundColor: '#0B6E4F', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer' }}>{t.buyNow}</button>
                  </div>
                </>
              ) : (
                <div style={{ padding: '16px', backgroundColor: '#F3F4F6', borderRadius: '12px', textAlign: 'center', color: '#4B5563', fontWeight: 'bold', fontSize: '13px', border: '1px dashed #D1D5DB' }}>{t.sellerNoBuy}</div>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '32px' }}>{t.customerReviews} ({productData?.reviewsCount})</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
            <div style={{ width: '300px' }}>
              <div style={{ backgroundColor: '#F9FAFB', padding: '24px', borderRadius: '20px', border: '1px solid #E5E7EB', marginBottom: '32px', textAlign: 'center' }}>
                <span style={{ fontSize: '48px', fontWeight: '900' }}>{productData?.rating}</span>
                <div style={{ color: '#EAB308', fontSize: '20px', margin: '8px 0' }}>★★★★★</div>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Verified Purchases</span>
              </div>
              {userRole !== 'seller' ? (
                <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder={t.yourName} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #D1D5DB' }} required />
                  <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={t.yourReview} rows="4" style={{ padding: '12px', borderRadius: '12px', border: '1px solid #D1D5DB' }} required />
                  <button type="submit" style={{ padding: '12px', backgroundColor: '#111827', color: '#fff', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>{t.submitReview}</button>
                </form>
              ) : (
                <div style={{ padding: '20px', backgroundColor: '#FEF2F2', borderRadius: '16px', textAlign: 'center', color: '#B91C1C', fontWeight: 'bold' }}>{t.sellerNoReview}</div>
              )}
            </div>
            <div style={{ flex: '1' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '24px' }}>{t.recentReviews}</h3>
              {productData?.comments?.map((c, i) => (
                <div key={i} style={{ marginBottom: '24px', borderBottom: '1px solid #F3F4F6', paddingBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '900' }}>{c.user}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{c.date}</span>
                  </div>
                  <div style={{ color: '#EAB308', margin: '4px 0' }}>{'★'.repeat(c.rating)}</div>
                  <p style={{ fontStyle: 'italic', color: '#4B5563', margin: 0 }}>"{c.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}