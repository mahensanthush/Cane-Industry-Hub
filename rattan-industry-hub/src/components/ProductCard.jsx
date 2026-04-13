import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';


export default function ProductCard({ id, title, image, price, isSeller }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group">
      
      
      <Link to={`/product/${id}`} className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-50">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow text-left">
        <Link to={`/product/${id}`} className="hover:text-[#244034]">
          <h3 className="font-bold text-gray-900 text-[15px] md:text-[16px] leading-tight h-10 overflow-hidden mb-2">
            {title}
          </h3>
        </Link>
        
        <div className="mt-auto">
          <p className="text-[#244034] font-black text-[17px] mb-3">
            රු. {(Number(price) || 0).toLocaleString()}
          </p>
          
          
          {!isSeller ? (
            <button 
              onClick={() => addToCart({ id, title, image, price })}
              className="w-full py-2.5 bg-[#244034] text-white rounded-xl font-bold text-[13px] hover:bg-[#1a2e25] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>+</span> කරත්තයට එක් කරන්න
            </button>
          ) : (
            
            <div className="w-full py-2.5 bg-gray-100 text-gray-500 rounded-xl font-bold text-[11px] text-center border border-dashed border-gray-300">
              View Only Mode
            </div>
          )}
        </div>
      </div>
    </div>
  );
}