import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Settings,
    User,
    Mail,
    LayoutDashboard,
    Compass,
    Bell,
    Star,
    Menu,
    X,
    ChevronDown,
    Box,
    Users,
    CreditCard,
    FileText,
    PieChart,
    Folder,
    Calendar,
    Plus
} from "lucide-react";
import { Link } from "react-router-dom";

// --- Variation 1: Expandable "Hover-State" Mixed with Minimalist Line-Indicator ---
function ExpandableSidebar() {
    const [isHovered, setIsHovered] = useState(false);
    const [active, setActive] = useState(0);

    const menuItems = [
        { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
        { icon: User, label: "User Profile", path: "/admin/profile" },
        { icon: Plus, label: "Add", path: "/admin/add" },
        { icon: Mail, label: "Messages", path: "/admin/messages" },
        { icon: Settings, label: "Settings", path: "/admin/settings" },
    ];

    return (
        <motion.div
            className="fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col py-8 z-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ width: 80 }}
            animate={{ width: isHovered ? 260 : 80 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
            <div className="flex items-center justify-center mb-12 w-[80px] shrink-0">
                <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center shadow-md">
                    <h1 className="goth text-red-50 text-2xl">21</h1>
                </div>
            </div>

            <div className="relative flex flex-col gap-8 w-full mt-2">
                {/* The muted track line */}
                <div className="absolute left-6 top-1 bottom-1 w-[2px] bg-gray-100 rounded-full" />

                {menuItems.map((item, index) => (
                    <Link
                        to={item.path}
                        key={index}
                        className="relative cursor-pointer text-sm font-semibold flex items-center group py-1"
                        onClick={() => setActive(index)}
                    >
                        {active === index && (
                            <motion.div
                                layoutId="activeLineExpandable"
                                className="absolute left-[23px] top-0 bottom-0 w-[4px] bg-black rounded-full z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <div className="pl-12 flex items-center gap-5 overflow-hidden whitespace-nowrap w-full">
                            <item.icon
                                size={22}
                                className={`shrink-0 transition-colors duration-300 ${active === index ? "text-black" : "text-gray-400 group-hover:text-gray-600"
                                    }`}
                            />
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                                transition={{ duration: 0.2, delay: isHovered ? 0.1 : 0 }}
                                className={`text-base transition-colors ${active === index ? "text-black" : "text-gray-400 group-hover:text-gray-800"
                                    }`}
                            >
                                {item.label}
                            </motion.span>
                        </div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}

export default ExpandableSidebar