import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Box, Disc, X, Eye, EyeOff, Hexagon } from 'lucide-react';
import { registerAPI, loginAPI } from '../Services/allAPI'
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';



const NoiseBackground = ({ alpha = 25, refresh = 3 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = 1024;
    let frame = 0;
    let raf;

    canvas.width = size;
    canvas.height = size;

    const draw = () => {
      const imageData = ctx.createImageData(size, size);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = alpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % refresh === 0) draw();
      frame++;
      raf = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(raf);
  }, [alpha, refresh]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{
        imageRendering: 'pixelated',
        mixBlendMode: '',
        opacity: 1
      }}
    />
  );
};

const Input = ({ type = "text", placeholder, theme, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  const baseStyles = "w-full outline-none transition-all duration-300 bg-transparent py-3 px-1";

  const themeStyles = {
    v1: `border-b-2 ${focused ? 'border-white' : 'border-white/20'} text-white placeholder-gray-400 font-bold tracking-tighter`,
    v2: `border-b ${focused ? 'border-green-400' : 'border-gray-700'} text-white placeholder-gray-600 font-mono text-sm bg-gray-900/50 rounded-t px-4`,
    v3: `border border-transparent ${focused ? 'bg-white shadow-sm' : 'bg-[#EFECE6]'} rounded-xl px-4 text-[#5C4033] placeholder-[#A89F91] font-medium`
  };

  return (
    <div className="relative mb-6 group">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseStyles} ${themeStyles[theme]}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

const Variant1 = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const images = ['./lg1.jpg', './lg2.jpg', './lg3.jpg',];
  const [imageIndex, setImageIndex] = useState(0);

  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" })
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 7500); // slow cinematic change
    return () => clearInterval(interval);
  }, []);

  // registwer
  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = formData
    console.log(formData);
    if (!username || !email || !password || !confirmPassword) {
      toast.info("We recommend completing all sections of the form.")
      return
    }
    if (password !== confirmPassword) {
      toast.warning("That password doesn’t seem to match.")
      return
    }
    try {
      const payload = { username, email, password };

      const result = await registerAPI(payload)
      console.log(result);
      if (result.status == 200) {
        toast.success("Congrats, you exist now. Log in.")
        setFormData({ username: "", email: "", password: "", confirmPassword: "" })
        setMode("login")
      } else if (result.status == 409) {
        toast.info(result.response.data)
        setFormData({ username: "", email: "", password: "", confirmPassword: "" })
        setMode("login")
      } else {
        toast.warning("Well… that didn’t go as planned.")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = async () => {
    const { email, password } = formData
    if (!email || !password) {
      toast.info("Yeah… we need you to fill the form")
      return
    }
    try {
      const result = await loginAPI(formData)
      console.log(result);
      if (result.status == 200) {
        toast.success("Access granted — enjoy the chaos!")
        sessionStorage.setItem("user", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        setTimeout(() => {
          if (result.data.user.role=="admin") {
            navigate("/admin-dashboard")
          }else {
            navigate("/")
          }
          
        }, 1500);
      }
      else if (result.status == 401 || result.status == 409) {
        toast.warning(result.response.data)
        setFormData({ username: "", email: "", password: "", confirmPassword: "" })
      } else {
        toast("Something went wrong 😭");
        setFormData({ username: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative flex flex-col md:grid  h-full w-full bg-black text-white font-sans selection:bg-white selection:text-black overflow-hidden">

      {/* Animated noise background */}
      <NoiseBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:grid md:grid-cols-2 h-full w-full">

        {/* Left: Content */}
        <div className="relative h-64 md:h-full border-b md:border-b-0 md:border-r-2 border-red-800/20 flex flex-col justify-between p-8 md:p-12 overflow-hidden">
          <div className="z-10">
            {/* <h2 className="text-xl font-black tracking-tighter uppercase">Drop_001</h2> */}
          </div>

          {/* Full-size Image Background */}
          <AnimatePresence mode="wait">
            <motion.img
              key={imageIndex}
              src={images[imageIndex]}
              alt="Skate sneaker editorial"
              className="absolute inset-0 w-full h-full object-cover contrast-125"
              initial={{ opacity: 0, filter: 'blur(12px)', scale: 1.08 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.04 }}
              transition={{ duration: 3.8, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>

        {/* Right: Login */}
        <div className="flex items-center justify-center p-8 md:p-20 bg-transparent relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-md"
            >
              <div className="mb-12">
                <h1 className="text-5xl goth font-black text-neutral-500 tracking-wide mb-2">
                  {mode === 'login' ? 'ENTER' : 'CLAIM ACCESS'}
                </h1>
                <p className="text-gray-400 font-medium">The queue is open.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (mode === 'login') {
                    handleLogin();
                  } else {
                    handleRegister();
                  }
                }}
              >
                {mode === 'register' && (
                  <Input
                    theme="v1"
                    placeholder="FULL NAME"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                )}
                <Input
                  theme="v1"
                  placeholder="ACCESS ID / EMAIL"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  theme="v1"
                  placeholder="PASSWORD"
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {mode === 'register' && (
                  <Input
                    theme="v1"
                    placeholder="CONFIRM PASSWORD"
                    type="text"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-neutral-400/30 text-white/50 font-black rounded uppercase py-4 mt-8 flex items-center justify-between  px-6 hover:text-neutral-400 hover:bg-red-800 transition-colors group"
                >
                  <span>
                    {mode === 'login' ? 'Secure Login' : 'Request Access'}
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              <div className="mt-8 flex justify-between text-xs font-bold uppercase tracking-widest">
                {/* <a href="#" className="border-b border-white/20">Recover</a> */}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="border-b border-white/20 hover:text-red-700 transition-colors"
                >
                  {mode === 'login' ? 'Claim Access' : 'Back to Login'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

const App = () => {
  const [variant, setVariant] = useState(0);

  const variants = [
    { name: 'Concrete', component: <Variant1 /> }];

  return (
    <div className="w-full h-screen bg-gray-100 overflow-hidden relative">

      <Toaster
        position="top-right"
        richColors
        theme="dark" />

      <div className="w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={variant}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            {variants[variant].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;