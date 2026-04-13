import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext'; 
import { api } from '../services/api'; 

export default function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { lang } = useLanguage(); 
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState(50000); // Price Filter State
  const [allProducts, setAllProducts] = useState([]);

  const userRole = localStorage.getItem('userRole');

  const t = {
    pageTitle: { si: 'නිමි භාණ්ඩ (Finished Goods)', en: 'Finished Goods' },
    hideFilter: { si: 'පෙරහන් සඟවන්න', en: 'Hide Filters' },
    showFilter: { si: 'පෙරහන් පෙන්වන්න', en: 'Show Filters' },
    searchPlaceholder: { si: 'නිෂ්පාදන සොයන්න...', en: 'Search products...' },
    filterCategory: { si: 'වර්ගය', en: 'Category' },
    filterType: { si: 'වේවැල් වර්ගය', en: 'Cane Type' },
    filterPrice: { si: 'උපරිම මිල', en: 'Max Price' },
    currency: { si: 'රු.', en: 'Rs.' },
    noProducts: { si: 'ඔබ සොයන නිෂ්පාදනය හමු නොවීය.', en: 'No products found matching your criteria.' }
  };

  const categoriesList = lang === 'si' 
    ? ['ගෘහ භාණ්ඩ', 'අලංකරණ භාණ්ඩ', 'ආලෝකකරණ උපකරණ'] 
    : ['Furniture', 'Decor', 'Lighting'];

  const typesList = lang === 'si' 
    ? ['මහ වේවැල්', 'හීන් වේවැල්', 'වෙනත්'] 
    : ['Thick Rattan', 'Fine Rattan', 'Other'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        if (Array.isArray(data)) {
          const formattedProducts = data.map(p => ({
            id: p._id, 
            title: p.title || { si: 'නමක් නොමැත', en: 'No Name' },
            img: p.images && p.images.length > 0 ? p.images[0] : null,
            price: p.price,
            category: { 
              si: p.category || 'වෙනත්', 
              en: p.category === 'ගෘහ භාණ්ඩ' ? 'Furniture' : 
                  p.category === 'ආලෝකකරණ උපකරණ' ? 'Lighting' : 
                  p.category === 'අලංකරණ භාණ්ඩ' ? 'Decor' : 'Other'
            },
            type: { 
              si: p.type?.si || (p.price > 10000 ? 'මහ වේවැල්' : 'හීන් වේවැල්'), 
              en: p.type?.en || (p.price > 10000 ? 'Thick Rattan' : 'Fine Rattan')
            } 
          }));
          setAllProducts(formattedProducts);
        }
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    fetchProducts();
  }, [lang]); 

  const filteredProducts = allProducts.filter(product => {
    const titleToSearch = (product.title[lang] || product.title.en || '').toLowerCase();
    const matchesSearch = titleToSearch.includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category[lang]);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type[lang]);
    const matchesPrice = product.price <= priceRange; // Price filter logic
    
    return matchesSearch && matchesCategory && matchesType && matchesPrice;
  });

  const handleCheckboxChange = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 flex flex-col">
        
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900">{t.pageTitle[lang]}</h1>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded text-[14px] font-bold text-gray-800 hover:border-[#244034] transition-colors">
            {isFilterOpen ? t.hideFilter[lang] : t.showFilter[lang]}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {isFilterOpen && (
            <aside className="w-full md:w-60 flex-shrink-0">
              {/* Search */}
              <div className="mb-8">
                <input type="text" placeholder={t.searchPlaceholder[lang]} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-[#244034]" />
              </div>

              {/* Price Filter UI */}
              <div className="mb-8">
                <h2 className="text-[16px] font-bold mb-4">{t.filterPrice[lang]}</h2>
                <input 
                  type="range" 
                  min="0" 
                  max="50000" 
                  step="500"
                  value={priceRange} 
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#244034]"
                />
                <div className="flex justify-between mt-2 text-[14px] font-bold text-gray-600">
                  <span>{t.currency[lang]} 0</span>
                  <span className="text-[#244034]">{t.currency[lang]} {priceRange.toLocaleString()}</span>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gray-200 mb-8"></div>

              {/* Category Filter */}
              <div className="mb-8">
                <h2 className="text-[16px] font-bold mb-4">{t.filterCategory[lang]}</h2>
                <div className="space-y-3">
                  {categoriesList.map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => handleCheckboxChange(cat, selectedCategories, setSelectedCategories)} className="mr-3" />
                      <span className="text-[15px] text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="h-[1px] w-full bg-gray-200 mb-8"></div>

              {/* Cane Type Filter */}
              <div className="mb-8">
                <h2 className="text-[16px] font-bold mb-4">{t.filterType[lang]}</h2>
                <div className="space-y-3">
                  {typesList.map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => handleCheckboxChange(type, selectedTypes, setSelectedTypes)} className="mr-3" />
                      <span className="text-[15px] text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          )}

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(item => (
                  <ProductCard key={item.id} id={item.id} image={item.img} title={item.title[lang] || item.title.en} price={item.price} isSeller={userRole === 'seller'} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">{t.noProducts[lang]}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}