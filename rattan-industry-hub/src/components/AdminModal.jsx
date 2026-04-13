import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  si: {
    editTitle: 'භාණ්ඩය සංස්කරණය', addTitle: 'නව භාණ්ඩයක් එක් කිරීම',
    basicInfo: 'මූලික තොරතුරු', enName: 'English Name', siName: 'සිංහල නම',
    category: 'කාණ්ඩය', furn: 'ගෘහ භාණ්ඩ', decor: 'අලංකරණ', raw: 'අමුද්‍රව්‍ය',
    tags: 'Tags (කොමාවකින් වෙන් කරන්න)', autoTrans: 'Auto Translate',
    pricingStock: 'මිල සහ තොග', price: 'මිල (රු.)', stock: 'තොග ප්‍රමාණය',
    media: 'පින්තූර', maxImg: 'Max 4', addImg: '+ පින්තූරයක් එක් කරන්න',
    variants: 'වර්ණ', noColors: 'වර්ණ එක් කර නැත', addColorBtn: 'එක් කරන්න',
    policies: 'ප්‍රතිපත්ති', delivery: 'බෙදාහැරීම', freeDel: 'Free Delivery', delCharge: 'Delivery Charges',
    fee: 'ගාස්තුව (රු.)', returns: 'ආපසු භාරදීම', freeRet: '15-Day Free Return', retPol: 'Return & refund policy', noRet: 'No Returns',
    cancel: 'අවලංගු කරන්න', save: 'සුරකින්න', addProdBtn: 'භාණ්ඩය එක් කරන්න'
  },
  en: {
    editTitle: 'Edit Product', addTitle: 'Add New Product',
    basicInfo: 'Basic Info', enName: 'English Name', siName: 'Sinhala Name',
    category: 'Category', furn: 'Furniture', decor: 'Decor', raw: 'Raw Materials',
    tags: 'Tags (Comma separated)', autoTrans: 'Auto Translate',
    pricingStock: 'Pricing & Stock', price: 'Price (Rs.)', stock: 'Stock Count',
    media: 'Images', maxImg: 'Max 4', addImg: '+ Add Image',
    variants: 'Colors', noColors: 'No colors added', addColorBtn: 'Add Color',
    policies: 'Policies', delivery: 'Delivery', freeDel: 'Free Delivery', delCharge: 'Delivery Charges',
    fee: 'Fee (Rs.)', returns: 'Returns', freeRet: '15-Day Free Return', retPol: 'Return & refund policy', noRet: 'No Returns',
    cancel: 'Cancel', save: 'Save Changes', addProdBtn: 'Add Product'
  }
};

const tagsToString = (tagsArray) => tagsArray ? tagsArray.join(', ') : '';
const stringToTagsArray = (tagString) => tagString ? tagString.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [];

const translateToSinhala = (englishText) => {
  if (!englishText) return '';
  const dictionary = {
    "rattan": "වේවැල්", "chair": "පුටුව", "lounge": "විවේක", "table": "මේසය", "coffee": "කෝපි", "lamp": "ලාම්පුව",
    "modern": "නවීන", "basket": "කූඩය", "sofa": "සෝෆාව", "bed": "ඇඳ", "natural": "ස්වාභාවික", "wood": "දැව", "finish": "නිමාව"
  };
  let translated = englishText.toLowerCase();
  Object.keys(dictionary).forEach(key => {
    translated = translated.replace(new RegExp(`\\b${key}\\b`, 'gi'), dictionary[key]);
  });
  return translated;
};

// --- IMAGE COMPRESSION FUNCTION (Local Storage සීමාව මගහැරීමට) ---
const compressImage = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 600; // Resize width
      const MAX_HEIGHT = 600; // Resize height
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
      } else {
        if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to JPEG with 0.7 (70%) quality
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(dataUrl);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

export default function AdminModal({ closeModal, saveProduct, editingProduct }) {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [titleEn, setTitleEn] = useState('');
  const [titleSi, setTitleSi] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('ගෘහ භාණ්ඩ');
  const [images, setImages] = useState([]); 
  const [stock, setStock] = useState('');
  const [tags, setTags] = useState(''); 
  const [colors, setColors] = useState([]); 
  const [deliveryType, setDeliveryType] = useState('Free Delivery');
  const [deliveryCost, setDeliveryCost] = useState('0');
  const [returnType, setReturnType] = useState('15-Day Free Return');

  const [newColorSi, setNewColorSi] = useState('');
  const [newColorEn, setNewColorEn] = useState('');
  const [newColorCode, setNewColorCode] = useState('#000000');

  useEffect(() => {
    if (editingProduct) {
      setTitleEn(editingProduct.title.en || ''); setTitleSi(editingProduct.title.si || '');
      setPrice(editingProduct.price || ''); setCategory(editingProduct.category || 'ගෘහ භාණ්ඩ');
      setImages(editingProduct.images || []); setStock(editingProduct.stock || '');
      setTags(tagsToString(editingProduct.tags)); setColors(editingProduct.colors || []);
      setDeliveryType(editingProduct.deliveryPolicy?.type || 'Free Delivery');
      setDeliveryCost(editingProduct.deliveryPolicy?.cost || '0');
      setReturnType(editingProduct.returnPolicy?.type || '15-Day Free Return');
    }
  }, [editingProduct]);

  const handleAutoTranslate = () => setTitleSi(translateToSinhala(titleEn));

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 4) return alert("Max 4 images allowed");
    
    files.forEach(file => {
      // Use the new compression function instead of directly saving Base64
      compressImage(file, (compressedBase64) => {
        setImages(prev => [...prev, compressedBase64]);
      });
    });
  };

  const removeImage = (indexToRemove) => setImages(images.filter((_, index) => index !== indexToRemove));

  const addColor = () => {
    if (!newColorSi || !newColorEn) return;
    setColors([...colors, { code: newColorCode, en: newColorEn, si: newColorSi }]);
    setNewColorSi(''); setNewColorEn('');
  };

  const removeColor = (codeToRemove) => setColors(colors.filter(color => color.code !== codeToRemove));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) return alert("Please add at least one image.");
    saveProduct({
      id: editingProduct ? editingProduct.id : null,
      title: { si: titleSi, en: titleEn }, price: Number(price), images: images, category: category,
      stock: Number(stock), tags: stringToTagsArray(tags), colors: colors,
      deliveryPolicy: { type: deliveryType, cost: Number(deliveryCost) }, returnPolicy: { type: returnType }
    });
  };

  // Reusable Styles
  const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', outline: 'none', backgroundColor: '#F9FAFB', boxSizing: 'border-box', color: '#111827' };
  const labelStyle = { fontSize: '12px', fontWeight: '800', color: '#374151', marginBottom: '6px', display: 'block' };
  const sectionTitleStyle = { fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid #F3F4F6', margin: 0 };
  const rowStyle = { display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' };
  const colStyle = { flex: '1 1 min-content', minWidth: '250px', display: 'flex', flexDirection: 'column' };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '16px', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', width: '100%', maxWidth: '850px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{editingProduct ? t.editTitle : t.addTitle}</h2>
          <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '24px', color: '#9CA3AF', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
        </div>

        <div style={{ padding: '32px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
          <form id="productForm" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div>
              <h3 style={sectionTitleStyle}>{t.basicInfo}</h3>
              <div style={rowStyle}>
                <div style={colStyle}><label style={labelStyle}>{t.enName}</label><input required type="text" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} style={inputStyle} placeholder="e.g. Rattan Lounge Chair" /></div>
                <div style={colStyle}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px' }}><label style={{...labelStyle, marginBottom: 0}}>{t.siName}</label><button type="button" onClick={handleAutoTranslate} style={{ fontSize: '10px', fontWeight: 'bold', color: '#D97706', backgroundColor: '#FEF3C7', border: 'none', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }}>{t.autoTrans}</button></div><input required type="text" value={titleSi} onChange={(e) => setTitleSi(e.target.value)} style={inputStyle} /></div>
              </div>
              <div style={rowStyle}>
                <div style={colStyle}><label style={labelStyle}>{t.category}</label><select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}><option value="ගෘහ භාණ්ඩ">{t.furn}</option><option value="අලංකරණ">{t.decor}</option><option value="අමුද්‍රව්‍ය">{t.raw}</option></select></div>
                <div style={colStyle}><label style={labelStyle}>{t.tags}</label><input type="text" value={tags} onChange={(e) => setTags(e.target.value)} style={inputStyle} placeholder="chair, livingroom" /></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={sectionTitleStyle}>{t.pricingStock}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}><label style={labelStyle}>{t.price}</label><input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} placeholder="15000" /></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}><label style={labelStyle}>{t.stock}</label><input required type="number" value={stock} onChange={(e) => setStock(e.target.value)} style={inputStyle} placeholder="10" /></div>
                </div>
              </div>

              <div style={{ flex: '1 1 300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F3F4F6', marginBottom: '16px', paddingBottom: '8px' }}><h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{t.media}</h3><span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 'bold' }}>{images.length} / 4 {t.maxImg}</span></div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {images.map((imgBase64, index) => (
                    <div key={index} style={{ width: '72px', height: '72px', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}><img src={imgBase64} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><button type="button" onClick={() => removeImage(index)} style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#fff', color: '#DC2626', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>&times;</button></div>
                  ))}
                  {images.length < 4 && (
                    <label style={{ width: '72px', height: '72px', border: '2px dashed #D1D5DB', borderRadius: '12px', backgroundColor: '#F9FAFB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><span style={{ fontSize: '10px', fontWeight: 'bold', color: '#6B7280', textAlign: 'center', padding: '0 4px' }}>{t.addImg}</span><input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} /></label>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h3 style={sectionTitleStyle}>{t.variants}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {colors.map(color => (<div key={color.code} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid #E5E7EB', borderRadius: '8px', backgroundColor: '#fff' }}><div style={{ width: '14px', height: '14px', borderRadius: '4px', backgroundColor: color.code, border: '1px solid #D1D5DB' }}></div><span style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151' }}>{color.en} ({color.si})</span><button type="button" onClick={() => removeColor(color.code)} style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', marginLeft: '4px' }}>&times;</button></div>))}
                {colors.length === 0 && <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic', padding: '6px 0' }}>{t.noColors}</span>}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-end' }}>
                <div style={{ flex: '1 1 120px' }}><label style={labelStyle}>{t.enName}</label><input type="text" value={newColorEn} onChange={(e) => setNewColorEn(e.target.value)} style={inputStyle} placeholder="Black" /></div>
                <div style={{ flex: '1 1 120px' }}><label style={labelStyle}>{t.siName}</label><input type="text" value={newColorSi} onChange={(e) => setNewColorSi(e.target.value)} style={inputStyle} placeholder="කළු" /></div>
                <div style={{ flex: '0 0 auto' }}><label style={labelStyle}>Color</label><div style={{ display: 'flex', alignItems: 'center', height: '38px', border: '1px solid #D1D5DB', borderRadius: '8px', padding: '0 8px', backgroundColor: '#F9FAFB' }}><input type="color" value={newColorCode} onChange={(e) => setNewColorCode(e.target.value)} style={{ width: '24px', height: '24px', border: 'none', padding: 0, cursor: 'pointer', background: 'none' }} /></div></div>
                <button type="button" onClick={addColor} style={{ height: '38px', padding: '0 16px', backgroundColor: '#fff', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: '#374151', cursor: 'pointer' }}>{t.addColorBtn}</button>
              </div>
            </div>

            <div>
              <h3 style={sectionTitleStyle}>{t.policies}</h3>
              <div style={rowStyle}>
                <div style={colStyle}><label style={labelStyle}>{t.delivery}</label><select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} style={inputStyle}><option value="Free Delivery">{t.freeDel}</option><option value="Delivery Charges">{t.delCharge}</option></select></div>
                {deliveryType === 'Delivery Charges' && (<div style={colStyle}><label style={labelStyle}>{t.fee}</label><input type="number" value={deliveryCost} onChange={(e) => setDeliveryCost(e.target.value)} style={inputStyle} /></div>)}
                <div style={colStyle}><label style={labelStyle}>{t.returns}</label><select value={returnType} onChange={(e) => setReturnType(e.target.value)} style={inputStyle}><option value="15-Day Free Return">{t.freeRet}</option><option value="Return & refund policy">{t.retPol}</option><option value="No Returns">{t.noRet}</option></select></div>
              </div>
            </div>

          </form>
        </div>

        <div style={{ padding: '20px 32px', borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button type="button" onClick={closeModal} style={{ padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', color: '#374151', cursor: 'pointer' }}>{t.cancel}</button>
          <button type="submit" form="productForm" style={{ padding: '10px 24px', backgroundColor: '#0B6E4F', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', color: '#fff', cursor: 'pointer' }}>{editingProduct ? t.save : t.addProdBtn}</button>
        </div>

      </div>
    </div>
  );
}