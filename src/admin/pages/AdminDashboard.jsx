import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Box, Users, Settings, Bell, Search, 
  ArrowUpRight, ArrowDown, ShoppingBag, Activity, 
  Menu, X, Zap, Database, AlertTriangle, ShieldAlert
} from 'lucide-react';

// --- MOCK DATA ---
const STATS = [
  { label: "Total Revenue", value: "$124,592", change: "+12.5%", trend: "up" },
  { label: "Active Orders", value: "421", change: "+24 today", trend: "up" },
  { label: "Inventory", value: "1,420", change: "-12 items", trend: "down" },
  { label: "Site Traffic", value: "48.2k", change: "+8.1%", trend: "up" },
];

const ORDERS = [
  { id: "ORD_7721", item: "VAPOR_MAX", status: "PROCESSING", user: "kicks_addict", price: "$220" },
  { id: "ORD_7720", item: "DUNK_LOW", status: "SHIPPED", user: "j_doe_99", price: "$180" },
  { id: "ORD_7719", item: "YEEZY_SLIDE", status: "DELIVERED", user: "sarah_k", price: "$80" },
  { id: "ORD_7718", item: "AIR_JORDAN_1", status: "PROCESSING", user: "mike_t", price: "$450" },
  { id: "ORD_7717", item: "NEW_BALANCE", status: "CANCELLED", user: "bot_user_x", price: "$140" },
];

// --- MINIMALIST ADMIN ---
const MinimalistAdmin = () => (
  <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-red-100 selection:text-red-900">
    {/* Sidebar */}
    <aside className="fixed left-0 top-0 h-full w-64 border-r border-neutral-100 bg-white p-8 z-20 hidden md:block">
      <div className="mb-12">
        <h1 className="font-bold tracking-widest uppercase text-xs flex items-center gap-2">
          <div className="w-2 h-2 bg-red-600 rounded-full" />
          Kicks_OS
        </h1>
      </div>
      <nav className="space-y-1">
        {[
          { icon: LayoutDashboard, label: "Overview", active: true },
          { icon: Box, label: "Inventory", active: false },
          { icon: Users, label: "Customers", active: false },
          { icon: Activity, label: "Analytics", active: false },
        ].map((item, i) => (
          <button 
            key={i}
            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors rounded-lg
              ${item.active ? 'bg-neutral-50 text-black' : 'text-neutral-400 hover:text-black hover:bg-neutral-50'}
            `}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-8 left-8">
        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-red-600 transition-colors">
          <Settings size={14} /> System Settings
        </button>
      </div>
    </aside>

    {/* Main Content */}
    <main className="md:ml-64 p-8 md:p-12 bg-neutral-50/50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-16">
        <div>
          <h2 className="text-3xl font-light tracking-tight text-neutral-900 mb-1">Dashboard</h2>
          <p className="text-sm text-neutral-400">Welcome back, Administrator.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-b border-neutral-200 pl-8 pr-4 py-2 text-sm outline-none focus:border-black transition-colors w-48"
            />
          </div>
          <button className="relative text-neutral-400 hover:text-black transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-600 rounded-full border border-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-neutral-200 border border-white shadow-sm" />
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-light text-neutral-900">{stat.value}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-medium">Recent Orders</h3>
            <button className="text-xs font-bold text-red-600 uppercase tracking-widest hover:underline">View All</button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="pb-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Order ID</th>
                <th className="pb-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Product</th>
                <th className="pb-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                <th className="pb-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {ORDERS.map((order, i) => (
                <tr key={i} className="group hover:bg-neutral-50 transition-colors">
                  <td className="py-4 font-mono text-neutral-500 group-hover:text-black">{order.id}</td>
                  <td className="py-4 font-medium">{order.item.replace('_', ' ')}</td>
                  <td className="py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded
                      ${order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-600' : 
                        order.status === 'SHIPPED' ? 'bg-purple-50 text-purple-600' :
                        order.status === 'DELIVERED' ? 'bg-green-50 text-green-600' : 
                        'bg-red-50 text-red-600'}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right font-medium text-neutral-900">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sales Chart Area */}
        <div className="bg-black text-white rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-red-600 rounded-full blur-[80px] opacity-20 pointer-events-none" />
          
          <div>
            <h3 className="text-lg font-medium mb-1">Live Sales</h3>
            <p className="text-sm text-neutral-400">Real-time performance</p>
          </div>

          <div className="h-48 flex items-end justify-between gap-2 mt-8">
            {[40, 70, 45, 90, 65, 85, 50].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-full bg-neutral-800 rounded-t-sm relative group"
              >
                <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-sm" />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
            <div>
              <p className="text-2xl font-light">$4,291.00</p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Revenue Today</p>
            </div>
            <button className="bg-white text-black p-3 rounded-full hover:bg-neutral-200 transition-colors">
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
);

// --- BRUTALIST ADMIN ---


// --- MAIN WRAPPER ---
export default function AdminPanel() {
  const [theme, setTheme] = useState('minimal'); // 'minimal' | 'brutal'

  return (
    <div className="relative">
     <MinimalistAdmin /> 
    </div>
  );
}