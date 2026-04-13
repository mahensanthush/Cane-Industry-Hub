import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51TM3TsDPj842w8DX7MfHVUmefk4IzeiYLc8Y5uaCM7jfNwQEubegUund2lTMUypdnTnSiAwctZvOJmUukdQIZrJL00Th5xT6eS');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#111827',
      fontFamily: 'sans-serif',
      '::placeholder': { color: '#9CA3AF' },
    },
    invalid: { color: '#EF4444' },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { getCartTotal, clearCart, cartItems } = useCart();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const currentTotal = getCartTotal();
      setPaidAmount(currentTotal);

      const res = await fetch('http://localhost:5000/api/payment/create-intent', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ amount: currentTotal }),
      });
      
      const data = await res.json();
      const clientSecret = data.clientSecret;

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (payload.error) {
        setError(`ගෙවීම අසාර්ථකයි: ${payload.error.message}`);
        setProcessing(false);
      } else {
        setPaymentId(payload.paymentIntent.id);
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        clearCart(); 
      }
    } catch (err) {
      setError("සර්වර් දෝෂයක් ඇති විය.");
      setProcessing(false);
    }
  };

  
  if (succeeded) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in duration-300">
        <style>
          {`
            @media print {
              .no-print { display: none !important; }
              body { background: white !important; }
              .receipt-container { box-shadow: none !important; border: 1px solid #eee !important; }
            }
          `}
        </style>
        
        <div className="receipt-container">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-black text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-8">Thank you for your purchase from Cane Hub.</p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-dashed border-gray-300">
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-gray-500 font-medium">Date:</span>
              <span className="text-gray-800 font-bold">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-gray-500 font-medium">Order ID:</span>
              <span className="text-gray-800 font-mono text-[10px]">{paymentId.replace('pi_', 'CH_')}</span>
            </div>
            <hr className="my-4 border-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-bold">Total Paid:</span>
              <span className="text-2xl font-black text-[#244034]">Rs. {paidAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 no-print">
          <button 
            onClick={() => window.print()}
            className="w-full py-3 bg-[#244034] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a3026] transition-all"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt
          </button>
          
          <Link to="/shop" className="text-[#244034] font-bold text-sm hover:underline mt-2">
            Back to Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-10 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-black mb-8 text-[#244034] flex items-center gap-3">
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
        Secure Payment
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Number</label>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus-within:border-[#244034] transition-all">
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expiry Date</label>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus-within:border-[#244034] transition-all">
              <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CVC / CVV</label>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus-within:border-[#244034] transition-all">
              <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>

        <button
          disabled={processing || succeeded}
          className="w-full py-4 bg-[#244034] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[#1a3026] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:bg-gray-400 disabled:scale-100 mt-4"
        >
          {processing ? "මොහොතක් රැඳී සිටින්න..." : `රු. ${getCartTotal().toLocaleString()} ගෙවන්න`}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-left">
            <div className="flex items-center gap-3">
              <div className="bg-red-500 text-white rounded-full p-1">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
              <p className="text-red-700 font-bold text-sm">Payment Failed</p>
            </div>
            <p className="text-red-600 text-xs mt-1 ml-8">{error}</p>
            <button onClick={() => setError(null)} className="ml-8 mt-2 text-xs font-bold text-red-800 underline">
              Try Again
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-gray-400 text-[10px] mt-8 uppercase tracking-widest font-medium">
        🛡️ Encrypted by Stripe SDK
      </p>
    </form>
  );
};

export default function Checkout() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen flex items-center justify-center p-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}