import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getSingleOrderAPI, createPaymentAPI, getAddressAPI } from '../Services/allAPI'; 
import { toast } from 'sonner';

// 1. Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51SPbdm2M3fJPEa74kzqrVzHG5VXvbyJuPoIhAbzvKtOew8YzF694jJsC0lq5cNZk4F8vkkrv2d23l17OSO4NXKAr00RFERt4ox');

// 2. Updated InputField to support defaultValue for pre-filling
const InputField = ({ label, type = 'text', placeholder, value, className = '' }) => (
  <div className={`flex flex-col space-y-1 ${className}`}>
    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={value} // Allows the field to be pre-filled but still editable
      className="border border-zinc-300 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
    />
  </div>
);

// 3. The Inner Form Component
const CheckoutForm = ({ orderData, userAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsCheckingOut(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required', 
    });

    if (error) {
      toast.error(error.message || "Payment failed");
      setIsCheckingOut(false);
    } else {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight">Order Confirmed</h1>
          <p className="text-zinc-500">
            Thank you for your purchase. Your payment was successful and your sneakers are being prepared.
          </p>
          
          {orderData.items.length > 0 && (
            <div className="bg-zinc-50 p-6 rounded-xl text-left border border-zinc-100 flex items-center gap-4">
              <div className="w-20 h-20 bg-zinc-200 rounded-md overflow-hidden">
                 <img src={`http://localhost:3000/${orderData.items[0].photos || 'default.jpg'}`} alt={orderData.items[0].sneakerName} className="w-full h-full object-cover" />
              </div>
              <div>
                  <p className="font-semibold text-zinc-900 uppercase">{orderData.items[0].sneakerName}</p>
                  <p className="text-sm text-zinc-500">Size: {orderData.items[0].size}</p>
              </div>
            </div>
          )}

          <button 
            onClick={() => navigate('/')}
            className="mt-8 w-full bg-black text-white py-4 rounded-md font-medium tracking-wide hover:bg-zinc-800 transition-colors"
          >
            BACK TO ARCHIVE
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      <header className="border-b border-zinc-100 py-6 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div onClick={() => navigate('/cart')} className="flex items-center gap-2 cursor-pointer group">
          <ArrowLeft size={20} className="text-zinc-400 group-hover:text-black transition-colors" />
          <span className="text-sm font-medium text-zinc-500 group-hover:text-black transition-colors">Back to cart</span>
        </div>
        <h1 className="text-2xl font-black tracking-tighter uppercase italic">
          21 ARCHIVE.
        </h1>
        <div className="flex items-center gap-2 text-sm font-medium text-green-600">
          <ShieldCheck size={18} />
          <span className="hidden sm:inline">Secure Checkout</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 p-6 md:p-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-12"
        >
          {/* Shipping Details - Now Pre-filled */}
          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Shipping Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Name" placeholder="Full Name" value={userAddress?.name || ''} className="col-span-2" />
              <InputField label="Street Address" placeholder="123 Sneaker St." value={userAddress?.street || ''} className="col-span-2" />
              <InputField label="Landmark" placeholder="Near the park" value={userAddress?.landmark || ''} className="col-span-2" />
              <InputField label="City" placeholder="Los Angeles" value={userAddress?.city || ''} />
              <InputField label="State" placeholder="California" value={userAddress?.state || ''} />
              <InputField label="Postal Code" placeholder="90001" value={userAddress?.pincode || ''} />
              <InputField label="Country" placeholder="United States" value={userAddress?.country || ''} />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Payment Method
            </h2>
            <div className="border border-zinc-200 rounded-lg p-6 bg-zinc-50/50">
              <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            </div>
          </section>

        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="bg-zinc-50 rounded-2xl p-6 md:p-8 sticky top-24 border border-zinc-100">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-4 max-h-[40vh] overflow-y-auto scrollbar-hide mb-6">
              {orderData.items.map((item) => (
                <div key={item.sneakerID + item.size} className="flex justify-between items-center gap-4 border-b border-zinc-200 pb-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-zinc-200 rounded-md overflow-hidden">
                       <img src={`http://localhost:3000/${item.photos || 'default.jpg'}`} alt={item.sneakerName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase">{item.brand}</h4>
                      <p className="text-xs text-zinc-500 uppercase">{item.sneakerName}</p>
                      <p className="text-xs text-zinc-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm">${item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-200 space-y-3 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>${orderData.orderTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Estimated Shipping</span>
                <span className="text-black font-medium uppercase text-xs tracking-wider flex items-center gap-1"><Truck size={14}/> Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t border-zinc-200 mt-4">
                <span>Total</span>
                <span>${orderData.orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={isCheckingOut || !stripe || !elements}
              className="w-full mt-8 bg-black text-white py-4 rounded-md font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 disabled:opacity-70 transition-all"
            >
              {isCheckingOut ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full"
                />
              ) : (
                <>
                  Pay ${orderData.orderTotal.toFixed(2)} <ChevronRight size={18} />
                </>
              )}
            </motion.button>
            <p className="text-center text-xs text-zinc-400 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={14}/> All transactions are secure and encrypted.
            </p>
          </div>
        </motion.div>

      </main>
    </div>
  );
};

// 4. Wrapper Component
export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;
  
  const [clientSecret, setClientSecret] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      toast.error("No active order found");
      navigate('/cart');
      return;
    }

    const fetchCheckoutData = async () => {
      const token = sessionStorage.getItem("token");
      const reqHeader = { Authorization: `Bearer ${token}` };

      try {
        // 1. Get Order details
        const orderRes = await getSingleOrderAPI(orderId, reqHeader);
        if (orderRes.status === 200) {
          setOrderData(orderRes.data);
        }

        // 2. Request Payment Intent
        const paymentRes = await createPaymentAPI({ orderId }, reqHeader);
        if (paymentRes.status === 200) {
          setClientSecret(paymentRes.data.clientSecret);
        }

        // 3. Get User Address
        const addressRes = await getAddressAPI(reqHeader);
        if (addressRes.status === 200 && addressRes.data.length > 0) {
          // Assuming user has at least 1 address saved, grab the first one
          setUserAddress(addressRes.data[0]);
        }

      } catch (err) {
        console.error(err);
        toast.error("Failed to load checkout data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-zinc-200 border-t-black rounded-full"
        />
      </div>
    );
  }

  if (!clientSecret || !orderData) {
    return <div className="p-10 text-center font-bold">Error loading checkout. Please try again.</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
      <CheckoutForm orderData={orderData} userAddress={userAddress} />
    </Elements>
  );
}