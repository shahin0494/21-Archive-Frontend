import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Settings, LogOut, Package, CreditCard, User, ArrowRight, ChevronRight, X, Plus, LayoutGrid, MapPin, Bell, Shield } from 'lucide-react';
import Curtain from '../components/CurtainTransition'
import Header from '../components/Header'
import { addAddressAPI, getAddressAPI, updateAddressAPI } from '@/Services/allAPI';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

// --- MOCK DATA ---
const USER = {
    name: "Jordan Hayes",
    email: "jordan@example.com",
    memberId: "MBR-9382",
    tier: "HYPE TIER",
    points: 4500
};

const ORDERS = [
    { id: "ORD-9921", date: "Oct 24", items: ["Air Max Pulse", "Tech Fleece"], total: "$245", status: "Delivered" },
    { id: "ORD-9984", date: "Nov 02", items: ["Dunk Low Retro"], total: "$115", status: "Shipped" },
    { id: "ORD-9912", date: "Nov 15", items: ["Yeezy Boost 350"], total: "$220", status: "Processing" },
    { id: "ORD-9800", date: "Sep 12", items: ["Jordan 4 Retro"], total: "$210", status: "Delivered" },
];

const WISHLIST = [
    { id: 1, name: "Jordan 1 Retro", price: "$180", added: "2d", tag: "GRAIL" },
    { id: 2, name: "Yeezy Slide", price: "$70", added: "1w", tag: "DROP" },
    { id: 3, name: "NB 9060", price: "$150", added: "3w", tag: "RESTOCK" },
    { id: 4, name: "Air Max 97", price: "$175", added: "1mo", tag: "CLASSIC" },
];

// --- SHARED COMPONENTS ---
const SneakerIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <path d="M16 12h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4" />
        <path d="M4 14v-2a6 6 0 0 1 12 0v2" />
        <path d="M4 20h16" />
        <path d="M14 8l-2-4-2 4" />
    </svg>
);

// --- CONCEPT 1: STRUCTURE (Professional / Swiss Style) ---
const DesignOne = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const [isEditMode, setIsEditMode] = useState(false); 
    const [addressId, setAddressId] = useState("");

    const [addressData, setAddressData] = useState({
        userID: "",
        name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        landmark: "",
        pincode: "",
        country: ""
    });

    // UPDATED: Fetch address on mount
    useEffect(() => {
        const fetchUserDataAndAddress = async () => {
            const userData = JSON.parse(sessionStorage.getItem("user"));
            const token = sessionStorage.getItem("token");

            // Set basic profile info immediately from session storage
            if (userData) {
                setAddressData(prev => ({
                    ...prev,
                    userID: userData._id || "",
                    name: userData.username || "",
                    email: userData.email || ""
                }));
            }

            // Fetch all addresses and filter for this user
            if (token && userData && userData._id) {
                const reqHeader = {
                    "Authorization": `Bearer ${token}`,
                };
                try {
                    const result = await getAddressAPI(reqHeader);
                    if (result.status === 200) {
                        const userAddress = result.data.find(addr => addr.userID === userData._id);
                        
                        if (userAddress) {
                            // Merge DB address BUT preserve the email from session storage
                            setAddressData({
                                ...userAddress,
                                email: userData.email // Ensures email stays visible even if DB doesn't have it
                            }); 
                            setAddressId(userAddress._id); 
                            setIsEditMode(true); 
                        }
                    }
                } catch (error) {
                    console.log("Error fetching address:", error);
                }
            }
        };

        fetchUserDataAndAddress();
    }, []);

    const MenuItem = ({ label }) => (
        <button
            onClick={() => setActiveTab(label)}
            className={`w-full text-left py-3 text-xs font-medium uppercase tracking-widest transition-all duration-300 flex justify-between items-center group ${activeTab === label ? 'text-black pl-2' : 'text-gray-400 hover:text-black hover:pl-2'
                }`}
        >
            {label}
            <span className={`w-1 h-1 bg-red-600 rounded-full transition-opacity duration-300 ${activeTab === label ? 'opacity-100' : 'opacity-0'}`} />
        </button>
    );

    // -- Sub-Sections --

    const OverviewSection = () => (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Recent Order Section */}
            <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between border-b border-black pb-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest">Recent Orders</h2>
                    <button onClick={() => setActiveTab('Orders')} className="text-xs font-medium hover:text-red-600 transition-colors">View All</button>
                </div>

                <div className="space-y-0">
                    {ORDERS.slice(0, 3).map((order, i) => (
                        <div key={i} className="group flex items-center justify-between py-6 border-b border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-red-50 group-hover:text-red-500 transition-colors duration-500">
                                    <Package size={20} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">{order.items[0]}</h3>
                                    <p className="text-xs text-gray-400 mt-1">{order.id} • {order.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">{order.total}</p>
                                <p className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-black transition-colors">{order.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions / Wishlist */}
            <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-black pb-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest">Grails</h2>
                    <button onClick={() => setActiveTab('Wishlist')} className="text-xs font-medium hover:text-red-600 transition-colors">View All</button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {WISHLIST.slice(0, 3).map((item) => (
                        <div key={item.id} className="group p-4 border border-gray-100 hover:border-red-200 hover:shadow-sm transition-all duration-300 bg-white">
                            <div className="flex justify-between items-start mb-4">
                                <SneakerIcon className="w-8 h-8 text-gray-300 group-hover:text-black transition-colors" />
                                <Heart size={14} className="text-gray-200 group-hover:text-red-600 transition-colors" />
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-xs font-bold uppercase text-gray-900">{item.name}</div>
                                    <div className="text-[10px] text-gray-400 mt-1">{item.added} ago</div>
                                </div>
                                <div className="text-xs font-medium">{item.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const OrdersSection = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b border-black pb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest">Order History</h2>
                <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <button className="text-black">All</button>
                    <button className="hover:text-black transition-colors">Open</button>
                    <button className="hover:text-black transition-colors">Archived</button>
                </div>
            </div>
            <div className="w-full">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                    <div className="col-span-2">Order ID</div>
                    <div className="col-span-4">Items</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Total</div>
                </div>
                {/* Table Rows */}
                {ORDERS.map((order, i) => (
                    <div key={i} className="group grid grid-cols-12 gap-4 py-6 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer items-center">
                        <div className="col-span-2 font-mono text-xs text-gray-500 group-hover:text-black transition-colors">{order.id}</div>
                        <div className="col-span-4 text-sm font-medium">
                            {order.items.join(", ")}
                            {order.items.length > 1 && <span className="text-xs text-gray-400 ml-1">...</span>}
                        </div>
                        <div className="col-span-2 text-xs text-gray-500">{order.date}</div>
                        <div className="col-span-2">
                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${order.status === 'Processing' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' : 'border-gray-100 text-black bg-white'}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="col-span-2 text-right text-sm font-medium">{order.total}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    const WishlistSection = () => (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b border-black pb-4 mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest">My Grails</h2>
                <span className="text-xs text-gray-400">{WISHLIST.length} Items</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {WISHLIST.map((item) => (
                    <div key={item.id} className="group border border-gray-100 p-6 flex flex-col justify-between h-64 hover:border-black transition-colors duration-300 relative bg-white">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-gray-100 rounded-full"><X size={14} /></button>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <SneakerIcon className="w-24 h-24 text-gray-200 group-hover:text-red-600 group-hover:scale-110 transition-all duration-500" />
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-sm font-bold uppercase tracking-wide">{item.name}</span>
                                <span className="text-sm font-medium">{item.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.tag}</span>
                                <button className="text-[10px] font-bold uppercase underline hover:text-red-600">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Add New Card */}
                <div className="border border-dashed border-gray-200 p-6 flex flex-col items-center justify-center h-64 hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer text-gray-300 hover:text-red-500 gap-4">
                    <Plus size={32} strokeWidth={1} />
                    <span className="text-xs font-bold uppercase tracking-widest">Add Grail</span>
                </div>
            </div>
        </div>
    );

    // UPDATED: handleReset now preserves the user's permanent data
    const handleReset = () => {
        const userData = JSON.parse(sessionStorage.getItem("user"));
        
        setAddressData({
            userID: userData?._id || "", 
            name: userData?.username || "", 
            email: userData?.email || "", 
            phone: "", street: "", city: "", state: "", landmark: "", pincode: "", country: ""
        });
        setIsEditMode(false);
        setAddressId("");
    }

    // UNCHANGED: Your original add address logic
    const handleAddAddress = async () => {
        const token = sessionStorage.getItem("token")

        const userData = JSON.parse(sessionStorage.getItem("user"))

        const { userID, username, email } = userData || {}

        const { name, phone, street, city, state, landmark, pincode, country } = addressData

        if (!name || !phone || !street || !city || !state || !landmark || !pincode || !country) {
            toast.info("Don’t leave us guessing — fill it all")
            return
        }

        if (!token) {
            toast.error("Please login again")
            return
        }

        const reqHeader = {
            "Authorization": `Bearer ${token}`,
        }

        const reqBody = {
            userID,
            name: username || name,
            email,
            phone,
            street,
            city,
            state,
            landmark,
            pincode,
            country,
        }

        try {
            const result = await addAddressAPI(reqBody, reqHeader)

            if (result.status === 200) {
                toast.success("Saved. We won’t get lost anymore")
                setIsEditMode(true);
                setAddressId(result.data._id);
            } else {
                toast.error("Ughhh. Something Went Wrong")
            }
        } catch (error) {
            console.log(error)
            toast.error("Server error")
        }
    }

    const handleUpdateAddress = async () => {
        const token = sessionStorage.getItem("token");

        const { name, phone, street, city, state, landmark, pincode, country } = addressData;

        if (!name || !phone || !street || !city || !state || !landmark || !pincode || !country) {
            toast.info("Don’t leave us guessing — fill it all");
            return;
        }

        if (!token) {
            toast.error("Please login again");
            return;
        }

        const reqHeader = {
            "Authorization": `Bearer ${token}`,
        };

        const reqBody = { name, phone, street, city, state, landmark, pincode, country };

        try {
            const result = await updateAddressAPI(addressId, reqBody, reqHeader);

            if (result.status === 200) {
                toast.success("Archive Updated. Shipping routes recalculated.");
            } else {
                toast.error("Update failed. Check your connection.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error during update.");
        }
    };

    const SettingsSection = () => (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between border-b border-black pb-4 mb-10">
                    <h2 className="text-sm font-bold uppercase tracking-widest">Account Config</h2>
                </div>
                <div className="space-y-12">
                    {/* Profile */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                            <User size={14} /> Profile
                        </h3>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest">Full Name</label>
                                <input
                                    type="text"
                                    value={addressData.name}
                                    onChange={e => setAddressData({ ...addressData, name: e.target.value })}
                                    className="w-full border-b border-gray-200 py-2 text-xl focus:outline-none focus:border-red-600 transition-colors bg-transparent"
                                />
                            </div>
                            
                            {/* UPDATED: Email Input is now read-only and styled to look disabled */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest">Email</label>
                                <input
                                    type="email"
                                    value={addressData.email}
                                    readOnly
                                    title="Email cannot be changed"
                                    className="w-full border-b border-gray-200 py-2 text-xl text-red-400 cursor-not-allowed focus:outline-none bg-transparent"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest">Phone</label>
                                <input
                                    type="phone"
                                    value={addressData.phone}
                                    onChange={e => setAddressData({ ...addressData, phone: e.target.value })}
                                    className="w-full border-b border-gray-200 py-2 text-xl focus:outline-none focus:border-red-600 transition-colors bg-transparent"
                                />
                            </div>
                        </div>
                    </section>
                    {/* Shipping */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                            <MapPin size={14} /> Shipping
                        </h3>
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-8">
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest">Street</label>
                                    <input value={addressData.street}
                                        onChange={e => { setAddressData({ ...addressData, street: e.target.value }) }}
                                        type="text" className="w-full border-b border-gray-200 py-2 text-lg focus:outline-none focus:border-red-600 transition-colors bg-transparent" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest">City</label>
                                    <input value={addressData.city}
                                        onChange={e => { setAddressData({ ...addressData, city: e.target.value }) }}
                                        type="text"
                                        className="w-full border-b border-gray-200 py-2 text-lg focus:outline-none focus:border-red-600 transition-colors bg-transparent" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest">landmark</label>
                                    <input value={addressData.landmark}
                                        onChange={e => { setAddressData({ ...addressData, landmark: e.target.value }) }} type="text" className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-red-600 transition-colors bg-transparent" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest">state</label>
                                    <input value={addressData.state}
                                        onChange={e => { setAddressData({ ...addressData, state: e.target.value }) }} type="text" className="w-full border-b border-gray-200 py-2 text-lg focus:outline-none focus:border-red-600 transition-colors bg-transparent" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest">country</label>
                                    <input value={addressData.country}
                                        onChange={e => { setAddressData({ ...addressData, country: e.target.value }) }} type="text" className="w-full border-b border-gray-200 py-2 text-lg focus:outline-none focus:border-red-600 transition-colors bg-transparent" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest">pincode</label>
                                    <input value={addressData.pincode}
                                        onChange={e => { setAddressData({ ...addressData, pincode: e.target.value }) }} type="text" className="w-full border-b border-gray-200 py-2 text-lg focus:outline-none focus:border-red-600 transition-colors bg-transparent" />
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <div className="pt-8 flex justify-end gap-4">
                        <button type="button" onClick={handleReset} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-700 transition-colors">Clear</button>
                        <button 
                            type='button' 
                            onClick={isEditMode ? handleUpdateAddress : handleAddAddress} 
                            className="px-6 py-3  bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
                        >
                            {isEditMode ? "Update Details" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );

    return (
        <div className="flex h-full bg-white text-black font-sans selection:bg-red-100">
            {/* Sidebar */}
            <div className="w-64 p-12 border-r border-gray-100 hidden md:flex flex-col justify-between">
                <div>
                    <div className="text-xl font-bold tracking-tighter mb-16">21ARCHIVE<span className="text-red-600">.</span></div>
                    <div className="space-y-1">
                        {['Overview', 'Orders', 'Wishlist', 'Settings'].map(item => (
                            <MenuItem key={item} label={item} />
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-none border border-gray-100">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Status</div>
                        <div className="text-sm font-bold">{USER.tier}</div>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-600 transition-colors">
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-12 overflow-y-auto">
                <header className="flex justify-between items-baseline mb-20">
                    <h1 className="text-4xl font-light tracking-tight text-gray-900">
                        {activeTab === 'Overview' ? (
                            <>Welcome back, <span className="font-bold text-red-700">{USER.name.split(' ')[0]}</span></>
                        ) : (
                            <span className="font-bold">{activeTab}</span>
                        )}
                    </h1>
                    <span className="text-xs font-mono text-red-600">{USER.points} PTS</span>
                </header>
                {activeTab === 'Overview' && OverviewSection()}
                {activeTab === 'Orders' && OrdersSection()}
                {activeTab === 'Wishlist' && WishlistSection()}
                {activeTab === 'Settings' && SettingsSection()}

            </div>
        </div>
    );
};

// --- MAIN WRAPPER (Switcher) ---
const App = () => {

    return (
        <>
            <Header />
            <Curtain>
                <DesignOne />
            </Curtain>
            <Toaster
                position="top-right"
                richColors
                theme="dark" />
        </>

    );
};

export default App;