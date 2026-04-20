import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, ChevronRight, ArrowLeft, ArrowUpRight, MapPin, Package } from 'lucide-react';
import { getMyOrdersAPI, getSingleOrderAPI } from '@/Services/allAPI';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer'


// Shared Animation Variants
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUpItem = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };


const Layout1_Standard = ({ orders, onViewDetails }) => (
  <motion.div variants={staggerContainer} initial="hidden" animate="show" className=" mx-auto px-6 mt-12 space-y-6">
    <div className="mb-3">
      <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-2">Orders</h2>
      <p className="text-zinc-500 ms-1 font-medium">Review your past drops and track active shipments.</p>
    </div>
    {orders.map((order) => (
      <motion.div key={order.id} variants={fadeUpItem} className="bg-white border border-zinc-200 rounded-xl  mb-5 overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-8 text-sm">
            <div><p className="text-xs text-zinc-500 uppercase font-semibold">Placed</p><p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p></div>
            <div><p className="text-xs text-zinc-500 uppercase font-semibold">Total</p><p className="font-medium">${Number(order.orderTotal || 0).toFixed(2)}</p></div>
            <div><p className="text-xs text-zinc-500 uppercase font-semibold">Order #</p><p className="font-mono">{order._id?.slice(-8)}</p></div>
          </div>
          <div className="font-bold text-xs uppercase tracking-widest">{order.orderStatus}</div>
        </div>
        <div className="p-6 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{order.paymentStatus === 'paid' ? 'Order confirmed' : 'Awaiting payment'}</h3>
            <div className="flex gap-4">
              {order.items?.map((item, idx) => (
                <img key={idx} src={item.photos?.startsWith('http') ? item.photos : `http://localhost:3000/${item.photos}`} className="w-20 h-20 object-cover rounded-md border border-zinc-200 grayscale-[0.2]" alt="" />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-end">
            {/* <button className="bg-black text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest">Track Package</button> */}
            <button onClick={() => onViewDetails(order._id)} className="border border-zinc-200 px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest">View Details</button>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default function App() {
  const [activeLayout, setActiveLayout] = useState(1);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      toast.warning('Please login');
      navigate('/login');
      return;
    }

    try {
      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const result = await getMyOrdersAPI(reqHeader);

      if (result.status === 200) {
        setOrders(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to load orders');
    }
  };

  const handleViewDetails = async (id) => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      toast.warning('Please login');
      navigate('/login');
      return;
    }

    try {
      setLoadingDetails(true);

      const reqHeader = {
        Authorization: `Bearer ${token}`
      };

      const result = await getSingleOrderAPI(id, reqHeader);

      if (result.status === 200) {
        setSelectedOrder(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to load order details');
    } finally {
      setLoadingDetails(false);
    }
  };

  // Background colors depend on active layout
  const getBgColor = () => {
    if (activeLayout === 4) return 'bg-zinc-200'; // Receipt needs darker bg to pop
    if (activeLayout === 5) return 'bg-zinc-950'; // Dark mode
    return 'bg-[#F9F9F9]';
  };

  return (
    <div className={`min-h-screen transition-colors mt-29 duration-500 ${getBgColor()} font-sans pb-32`}>
      {/* Standard Header (Inverted for Dark Mode) */}
      <Header/>

      {/* Dynamic Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLayout}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Layout1_Standard orders={orders} onViewDetails={handleViewDetails} />
          </motion.div>
        </AnimatePresence>
      </main>
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black uppercase">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-sm font-bold">Close</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6 border-b pb-6">
              <div><span className="text-zinc-500">Order ID</span><p className="font-semibold">{selectedOrder._id}</p></div>
              <div><span className="text-zinc-500">Placed</span><p className="font-semibold">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p></div>
              <div><span className="text-zinc-500">Payment</span><p className="font-semibold uppercase">{selectedOrder.paymentStatus}</p></div>
              <div><span className="text-zinc-500">Status</span><p className="font-semibold uppercase">{selectedOrder.orderStatus}</p></div>
            </div>

            <div className="space-y-4">
              {selectedOrder.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border rounded-xl p-4">
                  <img src={item.photos?.startsWith('http') ? item.photos : `http://localhost:3000/${item.photos}`} className="w-20 h-20 object-cover rounded-lg" alt="" />
                  <div className="flex-1">
                    <h3 className="font-bold">{item.sneakerName}</h3>
                    <p className="text-sm text-zinc-500">{item.brand}</p>
                    <p className="text-sm">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">${item.totalPrice}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-6 flex justify-between text-lg font-black">
              <span>Total</span>
              <span>${selectedOrder.orderTotal}</span>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
}