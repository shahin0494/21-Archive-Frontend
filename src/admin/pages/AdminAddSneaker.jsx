import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Upload, Activity } from 'lucide-react';
import Sidebar from '../component/AdminSidebar'
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { addSneakerAPI } from '@/Services/allAPI';

// --- INITIAL STATE ---
const initialFormState = {
    sneakerName: '',
    brand: '',
    type: '',
    price: '',
    style: '',
    description: '',
    gender: 'Unisex',
    sizes: [{ size: '', stock: '' }],
    photos: ['']
};

export default function App() {
    const [formData, setFormData] = useState(initialFormState);
    const [sneakerDetails, setSneakerDEtails] = useState({
        sneakerName: "", brand: "", type: "", price: "", style: "", description: "", gender: "", sizes: [{ size: "", stock: "" }], photos: []
    })
    const [token, setToken] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { sneakerName, brand, type, price, style, description, gender, sizes, photos } = formData;

        if (
            !sneakerName.trim() ||
            !brand.trim() ||
            !type.trim() ||
            !price ||
            !style.trim() ||
            !description.trim() ||
            !gender ||
            sizes.length === 0 ||
            photos.length === 0
        ) {
            toast.info("Please fill all required fields properly");
            return;
        }

        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            };

            const reqBody = new FormData();

            reqBody.append("sneakerName", sneakerName);
            reqBody.append("brand", brand);
            reqBody.append("type", type);
            reqBody.append("price", price);
            reqBody.append("style", style);
            reqBody.append("description", description);
            reqBody.append("gender", gender);

            // sizes must be stringified (backend uses JSON.parse)
            reqBody.append("sizes", JSON.stringify(sizes));

            // photos (currently URLs → backend expects files, so skip invalid ones)
            photos.forEach((photo) => {
                if (photo) {
                    reqBody.append("photos", photo);
                }
            });

            // call API (make sure it's imported)
            const result = await addSneakerAPI(reqBody, reqHeader);

            if (result.status === 200) {
                toast.success("Sneaker added successfully");
                setFormData(initialFormState);
            } else {
                toast.error("Failed to add sneaker");
            }

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    }

    // --- HANDLERS ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...formData.sizes];
        updatedSizes[index][field] = value;
        setFormData(prev => ({ ...prev, sizes: updatedSizes }));
    };

    const addSize = () => {
        setFormData(prev => ({
            ...prev,
            sizes: [...prev.sizes, { size: '', stock: '' }]
        }));
    };

    const removeSize = (index) => {
        const updatedSizes = formData.sizes.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, sizes: updatedSizes }));
    };

    const handlePhotoChange = (index, file) => {
        const updatedPhotos = [...formData.photos];
        updatedPhotos[index] = file;
        setFormData(prev => ({ ...prev, photos: updatedPhotos }));
    };

    const addPhoto = () => {
        if (formData.photos.length < 5) {
            setFormData(prev => ({
                ...prev,
                photos: [...prev.photos, null]
            }));
        }
    };

    const removePhoto = (index) => {
        const updatedPhotos = formData.photos.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, photos: updatedPhotos }));
    };

    return (
        <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
            {/* Top Navigation */}
            <div className="flex items-end">
                <Sidebar />

                <main className="ml-[80px] md:ml-[80px] lg:ml-[80px]  transition-all duration-300 pt-2 pb-2 px-6 md:px-12 max-w-6xl mx-auto h-screen">
                    {/* your content */}
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-16">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Admin / Create</h2>
                            <h1 className="text-4xl font-black uppercase tracking-tighter">New</h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                            {/* Column 1: Basics */}
                            <div className="lg:col-span-8 space-y-16">
                                <section>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                        <div className="md:col-span-2">
                                            <Input label="Sneaker Name" name="sneakerName" value={formData.sneakerName} onChange={handleChange} placeholder="e.g. SB Dunk Low Pro" />
                                        </div>
                                        <Input label="Brand" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Nike" />
                                        <Input label="Type" name="type" value={formData.type} onChange={handleChange} placeholder="e.g. Skateboarding" />
                                        <Input label="Style Code" name="style" value={formData.style} onChange={handleChange} placeholder="e.g. DD1391-100" />
                                        <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Men', 'Women', 'Unisex']} />
                                        <div className="md:col-span-2 mt-4">
                                            <TextArea label="Description" name="description" value={formData.description} onChange={handleChange} placeholder="Material details and story..." />
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Column 2: Specifics & Controls */}
                            <div className="lg:col-span-4 space-y-16">
                                <section>
                                    <Input label="Retail Price (USD)" name="price" type="number" value={formData.price} onChange={handleChange} placeholder="0.00" />
                                </section>

                                <section>
                                    <SizeManager
                                        sizes={formData.sizes}
                                        handleSizeChange={handleSizeChange}
                                        addSize={addSize}
                                        removeSize={removeSize}
                                    />
                                </section>

                                <section>
                                    <PhotoManager
                                        photos={formData.photos}
                                        handlePhotoChange={handlePhotoChange}
                                        addPhoto={addPhoto}
                                        removePhoto={removePhoto}
                                    />
                                </section>

                                <div className="pt-8">
                                    <button onClick={handleSubmit} type="submit" className="w-full bg-black text-white text-xs font-bold uppercase tracking-[0.2em] py-5 hover:bg-red-600 transition-colors">
                                        Save Configuration
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </main>
            </div>

            {/* Main Content Area - Minimal Grind Layout */}
            <main className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto min-h-screen">

            </main>
        </div>
    );
}

// --- SHARED UI COMPONENTS (Minimalist) ---

const Input = ({ label, name, value, onChange, type = "text", placeholder }) => (
    <div className="space-y-2 w-full group">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 group-focus-within:text-black transition-colors">{label}</label>
        <input
            type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
            className="w-full pb-2 border-b border-zinc-200 focus:border-black focus:outline-none bg-transparent transition-colors text-zinc-900 placeholder-zinc-300 text-sm rounded-none"
            required
        />
    </div>
);

const Select = ({ label, name, value, onChange, options }) => (
    <div className="space-y-2 w-full group">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 group-focus-within:text-black transition-colors">{label}</label>
        <select
            name={name} value={value} onChange={onChange}
            className="w-full pb-2 border-b border-zinc-200 focus:border-black focus:outline-none bg-transparent transition-colors appearance-none text-zinc-900 text-sm rounded-none cursor-pointer"
            required
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const TextArea = ({ label, name, value, onChange, placeholder }) => (
    <div className="space-y-2 w-full group">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 group-focus-within:text-black transition-colors">{label}</label>
        <textarea
            name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3}
            className="w-full p-3 border border-zinc-200 focus:border-black focus:outline-none bg-transparent transition-colors resize-none text-zinc-900 placeholder-zinc-300 text-sm rounded-none"
            required
        />
    </div>
);

const SizeManager = ({ sizes, handleSizeChange, addSize, removeSize }) => (
    <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Sizing & Stock</label>
            <button type="button" onClick={addSize} className="text-[10px] font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:text-zinc-500 transition-colors">
                <Plus className="w-3 h-3" /> Add
            </button>
        </div>
        <div className="space-y-3">
            <AnimatePresence>
                {sizes.map((size, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 items-end"
                    >
                        <div className="flex-1">
                            <Input label={`Size ${index + 1}`} type="number" placeholder="US 9" value={size.size} onChange={(e) => handleSizeChange(index, 'size', e.target.value)} />
                        </div>
                        <div className="flex-1">
                            <Input label="Qty" type="number" placeholder="10" value={size.stock} onChange={(e) => handleSizeChange(index, 'stock', e.target.value)} />
                        </div>
                        {sizes.length > 1 && (
                            <button type="button" onClick={() => removeSize(index)} className="pb-2 text-zinc-300 hover:text-black transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </div>
);

const PhotoManager = ({ photos, handlePhotoChange, addPhoto, removePhoto }) => (
    <div className="space-y-6 relative">

        <Toaster
            position="top-right"
            richColors
            theme="dark" />

        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Photos ({photos.length}/5)</label>
            {photos.length < 5 && (
                <button type="button" onClick={addPhoto} className="text-[10px] font-bold uppercase tracking-wider text-black flex items-center gap-1 hover:text-zinc-500 transition-colors">
                    <Plus className="w-3 h-3" /> Add
                </button>
            )}
        </div>
        <div className="space-y-3">
            <AnimatePresence>
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex gap-4 items-end"
                    >
                        <div className="flex-1 relative group">
                            <Upload className="w-3 h-3 absolute left-0 bottom-3 text-zinc-300 group-focus-within:text-black transition-colors" />
                            <input
                                type="file" placeholder="https://..."
                                onChange={(e) => handlePhotoChange(index, e.target.files[0])}
                                className="w-full pb-2 pl-6 border-b border-zinc-200 focus:border-black focus:outline-none bg-transparent transition-colors text-zinc-900 placeholder-zinc-300 text-sm rounded-none" required
                            />
                        </div>
                        {photos.length > 1 && (
                            <button type="button" onClick={() => removePhoto(index)} className="pb-2 text-zinc-300 hover:text-black transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </div>
);