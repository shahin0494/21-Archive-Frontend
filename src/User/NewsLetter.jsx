import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header'

// --- Shared Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// --- Shared Styles ---
const colors = {
    bgDark: '#2c2a27',
    cardLight: '#d5d1c8',
    textDark: '#1a1a1a',
    textMuted: '#5c5c5c'
};


const newsletters = [
    {
        id: 1,
        title: "The Blueprint of Flight",
        subtitle: "The Air Jordan 1 Legacy",
        description: "This vintage-styled infographic captures the definitive origin story of sneaker culture's most iconic silhouette. Designed by Peter Moore and released in 1985, the Air Jordan 1 was Nike's bold gamble on a young Michael Jordan, turning a simple basketball shoe into a cultural revolution that birthed the modern sneaker era.From the moment Jordan laced up the original Bred (Black/Red) colorway, the shoe defied convention. Inspired by flight itself, Moore sketched the signature Wings logo while on an airplane—drawing from a child's pilot wings pin and adding a basketball for that unmistakable Air Jordan flair. The high-top silhouette borrowed DNA from Nike classics like the Air Force 1 and Dunk, but added premium leather panels, a cushioned ankle collar, supportive straps, and a visible Air unit for game-changing comfort and style.The NBA wasn't ready for the revolution. The bold black-and-red design violated the league's uniform policy (which demanded mostly white shoes), leading to the legendary ban and $5,000 fines per game—fines Nike happily paid. This act of defiance became the ultimate marketing masterstroke: an iconic ad declared, On Sept. 15, Nike created a revolutionary new basketball shoe. On Oct. 18, the NBA threw them out of the game. The controversy only fueled demand, with the Air Jordan 1 generating over $126 million in its first year—far beyond expectations.What started as a rookie sensation evolved into a legacy. The Air Jordan 1 wasn't just footwear; it blended performance, rebellion, and street style, expanding basketball's creative potential and redefining how athletes connect with culture. Decades later, the Retro High OG editions honor that original blueprint—proving that true icons never land... they keep taking flight.(You can repeat or break up the core story across different sections of your infographic for visual flow, such as one block for The Design, another for The Ban, and a final one for The Legacy." ,
        images: ["./fd15.avif", "./fd14.jpeg", "./adl.avif", "./fd4.jpg"],
        hero: "./feedsnkr1.png"
    },
    {
        id: 2,
        title: "Urban Pulse: The Streets’ Core",
        subtitle: "The Global Sneaker Archi-Tactics",
        description: "This collage-style visual captures the raw, energetic essence of city life and the architectural foundations of modern street culture. Utilizing a gritty, torn-paper aesthetic, it bridges the gap between the concrete jungle and the athletes who navigate it, showcasing how urban environments serve as the ultimate playground for style and self-expression through footwear.From the towering skyscrapers of a monochromatic skyline to the tiered seating of an empty stadium, the imagery reflects the diverse stages where sneaker culture performs. The central figure, perched atop a concrete ledge in classic high-tops, embodies the spirit of the city dweller—always moving, always climbing. This composition blends the structural rigidity of metropolitan design with the fluid, hand-drawn textures of street art, creating a high-contrast tribute to the landscapes that define our aesthetic.The blue-and-white color palette evokes a sense of blueprint precision, yet the jagged edges and bold typography suggest a rebellion against traditional order. This is where Archi-Tactics come into play: the strategic use of fashion to navigate and claim space within the urban sprawl. By layering iconic branding over industrial scenes, the design highlights how specific silhouettes become landmarks in their own right, as permanent and recognizable as the buildings surrounding them.Ultimately, this artwork represents more than just a promotional banner; it is a snapshot of an ongoing dialogue between the wearer and the world. It honors the textures of the sidewalk and the height of the rafters, reminding us that every step taken on pavement is a part of a larger, global narrative. As the city continues to evolve and expand, so too does the culture that walks its streets—proving that the intersection of architecture and athletics remains the heartbeat of the modern era.",
        images: ["./fd2.jpg", "./fd3.jpg", "./fd4.jpg", "./fd1.jpg"],
        hero: "./feedsnkr5.png"
    },
    {
        id: 3,
        title: "Versatile Performance Defined",
        subtitle: "The Adidas SL 72 Resurgence",
        description: "This vintage-styled infographic captures the definitive origin story of running culture's most enduring silhouette. Designed for the global stage and released in 1972, the Adidas SL 72 was the brand's bold step into super-lightweight footwear, turning a simple track shoe into a cultural staple that birthed the modern lifestyle runner era.From the moment athletes laced up the original nylon and suede colorway, the shoe defied heavy convention. Inspired by speed itself, the designers prioritized a featherweight construction, utilizing a breathable mesh upper paired with durable suede overlays for that unmistakable vintage flair. The low-top silhouette introduced a revolutionary EVA cushioning wedge, but added a supportive torsion element, a maroon structural accent, and a signature gum rubber ripple outsole for game-changing traction and style.The streets were instantly ready for the evolution. The bold yet simple design transitioned effortlessly from strict athletic uniform policies to casual everyday wear, leading to its legendary, undisputed status as a versatile wardrobe essential. This shift in utility became the ultimate style masterstroke: an iconic look that seamlessly blended rigorous performance metrics with relaxed everyday comfort. The enduring versatility only fueled global demand, with the SL 72 expanding its narrative far beyond initial expectations, shot beautifully in modern campaigns by visual storytellers like Kenny Germé alongside stylist Cece Liu.What started as a highly anticipated global track sensation quickly evolved into a truly lasting legacy. The SL 72 wasn't just footwear; it blended athleticism, casual comfort, and retro style, expanding running's aesthetic potential and redefining how individuals connect with vintage catalogs. Decades later, these reimagined editions honor that original blueprint—proving that true classics never fade... they keep setting the pace.(You can repeat or break up the main details across various sections of your layout for visual flow, such as one block for The Anatomy, another for The Campaign, and a final one for The Heritage " ,
        images: ["./fd1.jpg", "./fd2.jpg", "./fd3.jpg", "./fd4.jpg"],
        hero: "./feedsnkr3.png"
    },
    {
        id: 3,
        title: "The Roots of Skate",
        subtitle: "The Adidas Campus 00s Legacy",
        description: "This technical-styled blueprint graphic captures the definitive origin story of skate culture's most enduring silhouette. Engineered by Adidas and directly referencing the 1970s, the Campus 00s was the brand's bold, strategic shift toward a new millennium, turning a classic basketball shoe into a chunky revolution that birthed the modern skateboarding era.From the moment skaters laced up the reimagined fat-tongued silhouette, the shoe defied standard convention. Inspired by technical progression itself, designers drafted the signature multi-layered upper while in the studio, drawing from a rich vintage catalog and adding a heavily padded profile for that unmistakable Y2K flair. The low-top design borrowed DNA from iconic classics like the Campus 70, but added premium waxed suede panels, a reinforced heel collar, thicker laces, and a complex midsole unit for game-changing impact absorption and extreme durability.The market wasn't entirely ready for the reinvention. The bold oversized proportions directly violated the era's minimalist trends (which demanded mostly slim shoes), leading to widespread cultural adoption and endless street credibility, praise Adidas happily embraced. This brilliant act of redesign became the ultimate aesthetic masterstroke: an engineering schematic declared, On paper, Adidas created a structural new skate shoe. On board, the riders proved them right every single time. The innovation only fueled demand, with the Campus 00s generating massive global cultural momentum in its resurgence, far beyond expectations.What originally started as a retro obsession evolved into a legacy. The Campus 00s wasn't just footwear; it blended performance, durability, and skate style, expanding modern skateboarding's creative potential and redefining how riders connect with culture. Decades later, the waxed suede editions honor that original blueprint, proving that true classics never break, they keep pushing forward.(You can repeat or break up the core details across different sections of your blueprint for visual flow, such as one block for The Upper, another for The Midsole, and a final one for The Impact.",
        images: ["./fd2.jpg", "./fd3.jpg", "./fd4.jpg", "./fd1.jpg"],
        hero: "./feedsnkr7.png"
    }
];

// ==========================================
// VARIATION 1: The Editorial Card
// Directly mimics the layout structure of the cards in the reference image.
// ==========================================
const VariantOne = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = newsletters[activeIndex];

    return (
        <motion.div
            key="v1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-full flex items-center justify-center "
            style={{ backgroundColor: colors.bgDark }}
        >

            

            <div  className="w-full bg-neutral-900  h-full  flex flex-col relative overflow-hidden shadow-2xl"
                style={{
                    color: colors.textDark,
                    // backgroundImage: `url(./lg2.jpg)`,
                    // backgroundSize: "cover",
                    // backgroundPosition: "center",
                    // backgroundRepeat: "no-repeat"
                }}>
<Header/>

                {/* Top Section */}
                <div className=" flex-1 flex mt-25 flex-col justify-between border-t border-red-900 pt-3">
                   
                    {/* <Header /> */}
                    <div className="flex justify-between  items-end">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                variants={itemVariants}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className=""
                            >
                                <h3 className='grotesq text-red-600 font-medium text-lg tracking-wide '></h3> 
                                <h1 className="font-black goth text-4xl md:text-9xl lg:text-9xl leading-[0.9]  -tracking-normal text-red-800 uppercase">{active.title}</h1>
                                <span className='text-4xl grotesq  font-black uppercase p-0  text-neutral-600 tracking-normal  '>{active.subtitle}</span>
                                <p className="text-red-800 tracking-tight max-w-7xl font-medium  text-sm text-justify">{active.description}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Top Right Meta / Thumbnail */}
                        <motion.div variants={itemVariants} className="hidden md:flex mt-2 flex-col items-end gap-2">
                            {active.images.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-16 h-20 overflow-hidden cursor-pointer transition-all ${activeIndex === index ? "ring-2 ring-black" : "opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <img src={img} alt="detail" className="w-full h-full object-cover grayscale mix-blend-lighten" />
                                </div>
                            ))}
                            
                        </motion.div>
                    </div>

                </div>

                {/* Bottom Section: Feature Image */}
                <motion.div variants={itemVariants} className="h-[50%]  w-full bg-red-600 relative ">
                    <div className="w-full h-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={active.hero}
                                src={active.hero}
                                alt="Interior"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full object-cover object-center opacity-80 mix-blend-darken"
                            />
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};


// ==========================================
// MAIN COMPONENT CONTAINER
// ==========================================
export default function App() {
    return (
        <div className="w-full h-screen relative overflow-hidden">
            {/* Content Area */}

            <VariantOne />
        </div>
    );
}