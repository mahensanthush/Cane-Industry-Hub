import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminModal from '../components/AdminModal';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api'; 

const translations = {
  si: {
    loginTitle: 'පිවිසුම', signupTitle: 'නව ගිණුමක් අරඹන්න',
    loginSub: 'පද්ධතියට ඇතුල් වීම සඳහා ඔබගේ දත්ත ලබා දෙන්න', signupSub: 'පද්ධතිය භාවිතා කිරීමට ලියාපදිංචි වන්න',
    username: 'පරිශීලක නාමය', password: 'මුරපදය', confirmPass: 'මුරපදය තහවුරු කරන්න',
    loginBtn: 'ඇතුල් වන්න', signupBtn: 'ලියාපදිංචි වන්න',
    toSignup: 'අලුත් ගිණුමක් සාදන්න', toLogin: 'දැනටමත් ගිණුමක් තිබේද? ඇතුල් වන්න',
    passMismatch: 'මුරපද එකිනෙකට නොගැලපේ!', invalidCreds: 'පරිශීලක නාමය හෝ මුරපදය වැරදියි!',
    signupSuccess: 'ගිණුම සාර්ථකව නිපදවන ලදී! දැන් ඇතුල් වන්න.',
    roleBuyer: 'පාරිභෝගිකයෙක් (Buyer)', roleSeller: 'විකුණුම්කරුවෙක් (Seller)',
    dashTitle: 'නිෂ්පාදන කළමනාකරණය', dashSub: 'ඔබේ වෙළඳසැලේ භාණ්ඩ මෙතැනින් කළමනාකරණය කරන්න',
    addNew: 'නව අයිතමයක්', logout: 'ඉවත් වන්න',
    colName: 'නිෂ්පාදනය', colCategory: 'කාණ්ඩය', colStock: 'තොගය', colPrice: 'මිල (රු.)', colColors: 'වර්ණ', colActions: 'ක්‍රියාමාර්ග',
    noProducts: 'භාණ්ඩ කිසිවක් හමු නොවීය.', edit: 'Edit', delete: 'Delete', deleteConfirm: 'මෙම භාණ්ඩය මකා දැමීමට අවශ්‍ය බව විශ්වාසද?',
  },
  en: {
    loginTitle: 'Login', signupTitle: 'Create an Account',
    loginSub: 'Enter your credentials to access the system', signupSub: 'Register to manage your store',
    username: 'Username', password: 'Password', confirmPass: 'Confirm Password',
    loginBtn: 'Login', signupBtn: 'Sign Up',
    toSignup: 'Create a new account', toLogin: 'Already have an account? Login',
    passMismatch: 'Passwords do not match!', invalidCreds: 'Invalid username or password!',
    signupSuccess: 'Account created successfully! Please login.',
    roleBuyer: 'As a Buyer', roleSeller: 'As a Seller',
    dashTitle: 'Product Management', dashSub: 'Manage your store products and inventory here',
    addNew: 'New Item', logout: 'Logout',
    colName: 'Product', colCategory: 'Category', colStock: 'Stock', colPrice: 'Price (Rs.)', colColors: 'Colors', colActions: 'Actions',
    noProducts: 'No products found.', edit: 'Edit', delete: 'Delete', deleteConfirm: 'Are you sure you want to delete this product?',
  }
};

export default function AdminDashboard() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole')); 
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('buyer'); 
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsSignUp(params.get('mode') === 'signup');
  }, [location.search]);

  useEffect(() => {
    if (isAuthenticated && (userRole === 'admin' || userRole === 'seller')) {
      const fetchMyProducts = async () => {
        try {
          const data = await api.getMyProducts(); 
          if (Array.isArray(data)) {
            setProducts(data);
          }
        } catch (err) {
          console.error("Error fetching my products:", err);
        }
      };
      fetchMyProducts();
    }

    if (isAuthenticated && userRole === 'buyer') {
      navigate('/shop');
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault(); setError(''); setSuccess('');
    if (password !== confirmPassword) { setError(t.passMismatch); return; }
    
    try {
      const data = await api.register({ username, password, role: selectedRole });
      if (data._id) {
        setSuccess(t.signupSuccess); 
        setIsSignUp(false); 
        navigate('/admin');
        setUsername(''); setPassword(''); setConfirmPassword('');
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server connection error.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); setError('');
    try {
      const data = await api.login({ username, password });
      if (data.token) {
        localStorage.setItem('token', data.token); 
        localStorage.setItem('isLoggedIn', 'true'); 
        localStorage.setItem('userRole', data.role);
        setUserRole(data.role);

        if (data.role === 'buyer') navigate('/shop');
        else setIsAuthenticated(true);
      } else { 
        setError(data.message || t.invalidCreds); 
      }
    } catch (err) {
      setError("Server connection error.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/');
  };

  const saveProduct = async (productData) => {
    try {
      let res;
      if (editingProduct) {
        
        res = await api.updateProduct(editingProduct._id, productData);
        if (res._id) {
          
          setProducts(prev => prev.map(p => p._id === res._id ? res : p));
        }
      } else {
        
        res = await api.createProduct(productData);
        if (res._id) {
          
          setProducts(prev => [res, ...prev]);
        }
      }

      
      setIsModalOpen(false);
      setEditingProduct(null);
      
      
      const freshData = await api.getMyProducts();
      if (Array.isArray(freshData)) {
        setProducts(freshData);
      }
      
    } catch (err) {
      console.error("Save error:", err);
      alert("භාණ්ඩය සුරැකීමේදී දෝෂයක් ඇති විය.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.deleteConfirm)) {
      try {
        await api.deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', fontFamily: 'sans-serif', padding: '16px' }}>
        <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#ffffff', borderRadius: '24px', padding: '32px 24px', border: '1px solid #E5E7EB', boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0A4B3A', margin: '0 0 8px 0' }}>{isSignUp ? t.signupTitle : t.loginTitle}</h1>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>{isSignUp ? t.signupSub : t.loginSub}</p>
          </div>
          {error && <div style={{ color: '#DC2626', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
          {success && <div style={{ color: '#059669', backgroundColor: '#ECFDF5', padding: '10px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>{success}</div>}
          
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="text" placeholder={t.username} value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} required />
            <input type="password" placeholder={t.password} value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} required />
            
            {isSignUp && (
              <>
                <input type="password" placeholder={t.confirmPass} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '12px 16px', border: '1px solid #D1D5DB', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} required />
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <button type="button" onClick={() => setSelectedRole('buyer')} style={{ flex: 1, padding: '10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', border: selectedRole === 'buyer' ? '2px solid #0A4B3A' : '1px solid #D1D5DB', backgroundColor: selectedRole === 'buyer' ? '#F0FDF4' : '#fff', cursor: 'pointer' }}>{t.roleBuyer}</button>
                  <button type="button" onClick={() => setSelectedRole('seller')} style={{ flex: 1, padding: '10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', border: selectedRole === 'seller' ? '2px solid #0A4B3A' : '1px solid #D1D5DB', backgroundColor: selectedRole === 'seller' ? '#F0FDF4' : '#fff', cursor: 'pointer' }}>{t.roleSeller}</button>
                </div>
              </>
            )}

            <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#0A4B3A', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}>{isSignUp ? t.signupBtn : t.loginBtn}</button>
          </form>
          <button onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); navigate(isSignUp ? '/admin' : '/admin?mode=signup'); }} style={{ width: '100%', background: 'none', border: 'none', color: '#6B7280', fontSize: '12px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }}>{isSignUp ? t.toLogin : t.toSignup}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '40px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0 }}>{t.dashTitle}</h1>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>{t.dashSub}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} style={{ padding: '10px 20px', backgroundColor: '#0B6E4F', color: '#fff', fontWeight: 'bold', fontSize: '13px', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>+ {t.addNew}</button>
            <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #D1D5DB', color: '#B91C1C', fontWeight: 'bold', fontSize: '13px', borderRadius: '10px', cursor: 'pointer' }}>{t.logout}</button>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                <tr>
                  <th style={{ padding: '16px 20px', fontSize: '12px', color: '#6B7280', textTransform: 'uppercase' }}>{t.colName}</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', color: '#6B7280', textTransform: 'uppercase' }}>{t.colStock}</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', color: '#6B7280', textTransform: 'uppercase' }}>{t.colPrice}</th>
                  <th style={{ padding: '16px 20px', fontSize: '12px', color: '#6B7280', textTransform: 'uppercase', textAlign: 'center' }}>{t.colActions}</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? products.map((p) => (
                  <tr key={p._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={p.images?.[0] || 'https://via.placeholder.com/50'} alt="product" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #E5E7EB' }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{p.title?.[lang] || p.title?.en}</span>
                        <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 'bold' }}>{p.category}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                       <span style={{ fontSize: '13px', fontWeight: '900', color: p.stock <= 5 ? '#DC2626' : '#059669' }}>{p.stock} pcs</span>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: 'bold' }}>රු. {p.price.toLocaleString()}</td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <button onClick={() => { setEditingProduct(p); setIsModalOpen(true); }} style={{ marginRight: '15px', color: '#0B6E4F', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>{t.edit}</button>
                      <button onClick={() => handleDelete(p._id)} style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>{t.delete}</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>{t.noProducts[lang]}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {isModalOpen && (<AdminModal closeModal={() => setIsModalOpen(false)} saveProduct={saveProduct} editingProduct={editingProduct} />)}
      </div>
    </div>
  );
}