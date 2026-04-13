import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext'; 


import bg1 from '../assets/bg.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import bg4 from '../assets/bg4.jpeg';

export default function Home() {
  const { lang } = useLanguage(); 
  
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    
    const interval = setInterval(handleAuthChange, 1000);
    window.addEventListener('storage', handleAuthChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const t = {
    heroTitle: {
      si: 'වේවැල් නිර්මාණ හරහා සබැඳියාවන් ගොඩනගමු',
      en: 'Building Connections Through Cane Creations'
    },
    heroSub: {
      si: 'ඔබගේ නිර්මාණ අලෙවි කරන්න. අවශ්‍ය අමුද්‍රව්‍ය සපයා ගන්න.',
      en: 'Sell your creations. Source your raw materials.'
    },
    btnLogin: {
      si: 'පද්ධතියට පිවිසෙන්න',
      en: 'Login to Portal'
    },
    btnShop: {
      si: 'වෙළඳසැලට පිවිසෙන්න',
      en: 'Visit the Shop'
    },
    btnAbout: {
      si: 'අප ගැන වැඩිදුරටත්',
      en: 'Learn About Us'
    }
  };

  const images = [bg1, bg2, bg3, bg4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  
  const primaryBtnStyle = {
    padding: '14px 32px',
    backgroundColor: '#ffffff',
    color: '#0A4B3A',
    fontWeight: '900',
    borderRadius: '50px',
    textDecoration: 'none',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    display: 'inline-block'
  };

  const secondaryBtnStyle = {
    padding: '14px 32px',
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontWeight: '900',
    borderRadius: '50px',
    textDecoration: 'none',
    fontSize: '15px',
    border: '2px solid #ffffff',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)',
    display: 'inline-block'
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Fix: itemsCenter -> alignItems
      justifyContent: 'center',
      minHeight: '90vh',
      textAlign: 'center',
      overflow: 'hidden',
      fontFamily: 'sans-serif'
    }}>
      
      
      {images.map((img, index) => (
        <div 
          key={index}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 1s ease-in-out',
            opacity: index === currentIndex ? 1 : 0,
            filter: 'brightness(0.4)' 
          }}
        ></div>
      ))}

      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 1 }}></div>
      
      {/* Content Layer */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: '0 20px', marginTop: '-5vh' }}>
        
        <h1 style={{
          fontSize: 'clamp(32px, 8vw, 64px)',
          fontWeight: '900',
          color: '#ffffff',
          marginBottom: '20px',
          letterSpacing: 'tight',
          lineHeight: '1.1',
          textShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          {t.heroTitle[lang]}
        </h1>
        
        <p style={{
          fontSize: 'clamp(16px, 4vw, 24px)',
          color: '#E5E7EB',
          marginBottom: '40px',
          fontWeight: '500',
          maxWidth: '800px',
          marginInline: 'auto',
          textShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)'
        }}>
          {t.heroSub[lang]}
        </p>
        
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          
          
          {isLoggedIn ? (
            <Link 
              to="/shop" 
              style={primaryBtnStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {t.btnShop[lang]}
            </Link>
          ) : (
            <Link 
              to="/admin" 
              style={primaryBtnStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {t.btnLogin[lang]}
            </Link>
          )}

          
          <Link 
            to="/about" 
            style={secondaryBtnStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#0A4B3A';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
            }}
          >
            {t.btnAbout[lang]}
          </Link>

        </div>
      </div>
    </div>
  );
}