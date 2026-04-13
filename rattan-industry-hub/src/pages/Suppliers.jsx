import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext'; 


import sup1 from '../assets/supply/sup1.jpg';
import sup2 from '../assets/supply/sup2.jpg';
import sup3 from '../assets/supply/sup3.jpg';
import sup4 from '../assets/supply/sup4.jpg';


const translations = {
  si: {
    materialType: 'අමුද්‍රව්‍ය වර්ගය',
    processStage1: 'ක්‍රියාවලි අදියර',
    processStage2: 'වෙනත් අදියර',
    volPricing: 'පරිමාව අනුව මිල (Volume Pricing)',
    volHeader: 'පරිමාව',
    priceHeader: 'මිල',
    buyHeader: 'මිලදී ගැනීම',
    moqText: 'අවම ඇණවුම් ප්‍රමාණය (MOQ):',
    rfqBtn: 'මිල ගණන් විමසන්න (RFQ)',
    noItems: 'ඔබ තෝරාගත් පෙරහන් වලට අදාළ අමුද්‍රව්‍ය කිසිවක් හමු නොවීය.'
  },
  en: {
    materialType: 'Material Type',
    processStage1: 'Process Stage',
    processStage2: 'Other Stages',
    volPricing: 'Volume Pricing',
    volHeader: 'Volume',
    priceHeader: 'Price',
    buyHeader: 'Buy',
    moqText: 'Minimum Order Quantity (MOQ):',
    rfqBtn: 'Request for Quote (RFQ)',
    noItems: 'No materials found matching your filters.'
  }
};


const materialFilters = [
  { key: 'all', si: 'සියලුම අමුද්‍රව්‍ය', en: 'All Materials' },
  { key: 'bulk_rattan', si: 'තොග වේවැල්', en: 'Bulk Rattan' },
  { key: 'other_bulk', si: 'වෙනත් තොග', en: 'Other Bulk' }
];

const stage1Filters = [
  { key: 'furniture', si: 'ගෘහ භාණ්ඩ', en: 'Furniture' },
  { key: 'rattan', si: 'වේවැල්', en: 'Rattan' },
  { key: 'bundles', si: 'වේවැල් මිටි', en: 'Rattan Bundles' },
  { key: 'decor', si: 'අලංකරණ', en: 'Decor' },
  { key: 'raw_types', si: 'අමුද්‍රව්‍ය වර්ග', en: 'Raw Material Types' },
  { key: 'diameters', si: 'විවිධ විෂ්කම්භයන්', en: 'Various Diameters' },
  { key: 'sticks', si: 'වේවැල් කූරු', en: 'Rattan Sticks' },
  { key: 'raw_rattan', si: 'අමු වේවැල්', en: 'Raw Rattan' }
];

const stage2Filters = [
  { key: 'harvesting', si: 'අස්වනු නෙලීම', en: 'Harvesting' },
  { key: 'processing', si: 'සකස් කිරීම', en: 'Processing' },
  { key: 'weaving', si: 'වේවැල් වියුම්', en: 'Weaving' }
];

export default function Suppliers() {
  const { lang } = useLanguage(); 
  const t = translations[lang];

  
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);

  
  const supplierItems = [
    {
      id: 1,
      title: { si: 'උසස් තත්ත්වයේ වේවැල් මිටි (විවිධ විෂ්කම්භයන්)', en: 'High Quality Rattan Bundles (Various Diameters)' },
      image: sup1, 
      materialId: 'bulk_rattan',
      tagIds: ['bundles', 'diameters', 'raw_types'],
      pricing: [
        { volume: { si: '2-5mm', en: '2-5mm' }, price: { si: 'රු. 2000', en: 'Rs. 2000' }, buy: { si: 'රු. 3500', en: 'Rs. 3500' } },
        { volume: { si: '1-10mm', en: '1-10mm' }, price: { si: 'රු. 4000', en: 'Rs. 4000' }, buy: { si: 'රු. 4000', en: 'Rs. 4000' } },
        { volume: { si: '3-5mm', en: '3-5mm' }, price: { si: 'රු. 4600', en: 'Rs. 4600' }, buy: { si: 'රු. 5000', en: 'Rs. 5000' } },
      ],
      moq: 10
    },
    {
      id: 2,
      title: { si: 'උසස් තත්ත්වයේ වේවැල් මිටි (දිගු ප්‍රමාණ)', en: 'High Quality Rattan Bundles (Long Sizes)' },
      image: sup2, 
      materialId: 'bulk_rattan',
      tagIds: ['bundles', 'raw_rattan'],
      pricing: [
        { volume: { si: '0mm - 250mm', en: '0mm - 250mm' }, price: { si: 'රු. 17500', en: 'Rs. 17500' }, buy: { si: 'රු. 15000', en: 'Rs. 15000' } },
        { volume: { si: '5mm - 300mm', en: '5mm - 300mm' }, price: { si: 'රු. 15000', en: 'Rs. 15000' }, buy: { si: 'රු. 10000', en: 'Rs. 10000' } },
        { volume: { si: '11mm - 350mm', en: '11mm - 350mm' }, price: { si: 'රු. 10000', en: 'Rs. 10000' }, buy: { si: 'රු. 8000', en: 'Rs. 8000' } },
      ],
      moq: 10
    },
    {
      id: 3,
      title: { si: 'වේවැල් වියුම් රෝල් (Webbing Rolls)', en: 'Rattan Webbing Rolls' },
      image: sup3, 
      materialId: 'other_bulk',
      tagIds: ['weaving', 'decor'],
      pricing: [
        { volume: { si: '8mm - 200mm', en: '8mm - 200mm' }, price: { si: 'රු. 8000', en: 'Rs. 8000' }, buy: { si: 'රු. 4000', en: 'Rs. 4000' } },
        { volume: { si: '5mm - 350mm', en: '5mm - 350mm' }, price: { si: 'රු. 6000', en: 'Rs. 6000' }, buy: { si: 'රු. 4000', en: 'Rs. 4000' } },
        { volume: { si: '10mm - 350mm', en: '10mm - 350mm' }, price: { si: 'රු. 4000', en: 'Rs. 4000' }, buy: { si: 'රු. 8000', en: 'Rs. 8000' } },
      ],
      moq: 10
    },
    {
      id: 4,
      title: { si: 'කාර්මික වේවැල් ඉරීමේ යන්ත්‍රය', en: 'Industrial Rattan Splitting Machine' },
      image: sup4, 
      materialId: 'other_bulk',
      tagIds: ['processing'],
      pricing: [
        { volume: { si: 'පරිමාව අනුව', en: 'Varies by volume' }, price: { si: 'රු. 20000', en: 'Rs. 20000' }, buy: { si: '-', en: '-' } },
        { volume: { si: 'පරිමාව අනුව', en: 'Varies by volume' }, price: { si: 'රු. 40000', en: 'Rs. 40000' }, buy: { si: '-', en: '-' } },
        { volume: { si: 'පරිමාව අනුව', en: 'Varies by volume' }, price: { si: 'රු. 80000', en: 'Rs. 80000' }, buy: { si: '-', en: '-' } },
      ],
      moq: 8
    }
  ];

 
  const toggleFilter = (key, state, setState) => {
    if (key === 'all') {
      setState([]); 
      return;
    }
    if (state.includes(key)) {
      setState(state.filter(item => item !== key)); 
    } else {
      setState([...state, key]); 
    }
  };

  const filteredItems = supplierItems.filter(item => {
    const matchMaterial = selectedMaterials.length === 0 || selectedMaterials.includes(item.materialId);
    const matchStage = selectedStages.length === 0 || selectedStages.some(stage => item.tagIds.includes(stage));
    return matchMaterial && matchStage;
  });

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans pb-20 text-gray-900">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row gap-12">
        

        <aside className="w-full md:w-64 flex-shrink-0">
          
          
          <div className="mb-8">
            <h2 className="text-[18px] font-bold mb-4">{t.materialType}</h2>
            <div className="space-y-3">
              {materialFilters.map((item) => (
                <label key={item.key} className="flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={item.key === 'all' ? selectedMaterials.length === 0 : selectedMaterials.includes(item.key)}
                    onChange={() => toggleFilter(item.key, selectedMaterials, setSelectedMaterials)}
                    className="w-4 h-4 rounded border-gray-300 text-[#244034] focus:ring-[#244034] mr-3" 
                  />
                  <span className="text-[15px] text-gray-700 group-hover:text-gray-900 font-medium">{item[lang]}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="h-[1px] w-full bg-gray-200 mb-8"></div>

         
          <div className="mb-8">
            <h2 className="text-[18px] font-bold mb-4">{t.processStage1}</h2>
            <div className="space-y-3">
              {stage1Filters.map((item) => (
                <label key={item.key} className="flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedStages.includes(item.key)}
                    onChange={() => toggleFilter(item.key, selectedStages, setSelectedStages)}
                    className="w-4 h-4 rounded border-gray-300 text-[#244034] focus:ring-[#244034] mr-3" 
                  />
                  <span className="text-[15px] text-gray-700 group-hover:text-gray-900 font-medium">{item[lang]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="h-[1px] w-full bg-gray-200 mb-8"></div>

          
          <div className="mb-8">
            <h2 className="text-[18px] font-bold mb-4">{t.processStage2}</h2>
            <div className="space-y-3">
              {stage2Filters.map((item) => (
                <label key={item.key} className="flex items-center cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedStages.includes(item.key)}
                    onChange={() => toggleFilter(item.key, selectedStages, setSelectedStages)}
                    className="w-4 h-4 rounded border-gray-300 text-[#244034] focus:ring-[#244034] mr-3" 
                  />
                  <span className="text-[15px] text-gray-700 group-hover:text-gray-900 font-medium">{item[lang]}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        
        <div className="flex-1 space-y-12">
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500 font-medium text-lg">
              {t.noItems}
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-8 border-b border-gray-200 pb-12 last:border-0">
                
                {/* Left: Image Box */}
                <div className="w-full md:w-[350px] flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title[lang]} 
                    className="w-full h-[250px] object-cover rounded-[8px] bg-white shadow-sm border border-gray-100"
                  />
                </div>

                {/* Right: Content & Pricing */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[22px] font-bold text-gray-900 mb-4 tracking-tight leading-snug">
                      {item.title[lang]}
                    </h3>
                    
                    {/* Pricing Table */}
                    <div className="mb-4">
                      <p className="text-[15px] text-gray-800 font-bold mb-2">{t.volPricing}</p>
                      
                      {/* Table Headers */}
                      <div className="grid grid-cols-3 text-[15px] font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">
                        <div>{t.volHeader}</div>
                        <div>{t.priceHeader}</div>
                        <div>{t.buyHeader}</div> 
                      </div>
                      
                      {/* Table Rows */}
                      <div className="space-y-1 mt-2">
                        {item.pricing.map((row, index) => (
                          <div key={index} className="grid grid-cols-3 text-[15px] text-gray-800 font-medium">
                            <div>{row.volume[lang]}</div>
                            <div>{row.price[lang]}</div>
                            <div>{row.buy[lang]}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* MOQ */}
                    <p className="text-[15px] text-[#244034] font-bold mb-6 bg-[#244034]/5 inline-block px-3 py-1 rounded">
                      {t.moqText} {item.moq}
                    </p>
                  </div>

                  {/* RFQ Button */}
                  <button className="w-full py-3 bg-[#244034] text-white rounded-[4px] hover:bg-[#1a2e25] transition-colors text-[16px] font-bold mt-auto shadow-sm">
                    {t.rfqBtn}
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}