import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import img1 from "../gallery/1.jpeg";
import img2 from "../gallery/2.jpeg";
import img3 from "../gallery/3.jpeg";
import img4 from "../gallery/4.jpeg";
import img5 from "../gallery/5.jpeg";
import img6 from "../gallery/6.jpeg";
import img7 from "../gallery/7.jpeg";
import { useLightbox } from "../context/LightboxContext";


type GalleryImage = {
  src: string;
  caption?: string;
};

type Winner = {
  position: string;
  team: string;
  project: string;
  description: string;
  track: string;
  amount: string;
  tier: "netherite" | "diamond" | "emerald";
};


const galleryImages: GalleryImage[] = [
  { src: img1, caption: "Opening ceremony • 250+ hackers" },
  { src: img2 },
  { src: img3 },
  { src: img5, caption: "Final presentations" },
  { src: img4 },
  { src: img6 },
  { src: img7 },
];


const winners: Winner[] = [
  {
    position: "Winner",
    team: "Elite Squad",
    project: "EcoTrace",
    track: "Sustainability",
    amount: "₹25,000",
    tier: "netherite",
    description:
      "A blockchain-backed platform to trace carbon emissions across supply chains in real time.",
  },
  {
    position: "Runner Up",
    team: "Chips",
    project: "NeuroAssist",
    track: "AI & Healthcare",
    amount: "₹15,000",
    tier: "diamond",
    description:
      "An AI-powered assistant that helps doctors prioritize cases using predictive analytics.",
  },
  {
    position: "Second Runner Up",
    team: "Cipher Squad",
    project: "CivicLens",
    track: "GovTech",
    amount: "₹10,000",
    tier: "emerald",
    description:
      "A citizen reporting platform enabling faster resolution of urban infrastructure issues.",
  },
];


function Lightbox({
  image,
  onClose,
}: {
  image: GalleryImage | null;
  onClose: () => void;
}) {
  // ESC + scroll lock
  useEffect(() => {
    if (!image) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[10000] font-pixel text-xs text-muted-foreground hover:text-primary transition"
          >
            <X size={28} />
          </button>

          {/* IMAGE */}
          <motion.img
            src={image.src}
            alt={image.caption || "Gallery image"}
            className="max-h-[85vh] max-w-[90vw] object-contain border-4 border-primary"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.25 }}
          />

          {image.caption && (
            <p className="absolute bottom-8 font-mono text-muted-foreground text-sm">
              {image.caption}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function GlimpseSection() {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const { setIsLightboxOpen } = useLightbox();

  const openLightbox = (img: GalleryImage) => {
    setActiveImage(img);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setActiveImage(null);
    setIsLightboxOpen(false);
  };


  return (
    <section id="glimpse" className="relative w-full px-6 py-36 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-muted-foreground">
            Event Glimpse
          </p>
          <h2 className="mt-4 font-pixel text-3xl md:text-4xl text-primary">
            MOMENTS THAT DEFINED NEXHACK 1.0
          </h2>
          <p className="mt-6 font-mono text-muted-foreground leading-relaxed">
            The late-night breakthroughs. The collaborative energy.
            The moment an idea clicked.
          </p>
        </div>

        {/* MOSAIC GALLERY */}
        <div className="mb-36 grid grid-cols-12 gap-4 auto-rows-[160px]">
          {galleryImages.map((img, index) => {
            const layoutMap: Record<number, string> = {
              0: "col-span-5 row-span-3",
              1: "col-span-3 row-span-2",
              2: "col-span-3 row-span-2",
              3: "col-span-6 row-span-3",
              4: "col-span-5 row-span-2",
              5: "col-span-6 row-span-3",
              6: "col-span-5 row-span-3",
            };

            const isHero = index === 0;

            return (
              <motion.div
                key={index}
                className={`
          minecraft-card
          relative cursor-pointer
          border-2 border-neutral-800
          bg-black
          ${layoutMap[index]}
        `}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                onClick={() => openLightbox(img)}
              >
                {/* Frame */}
                <div className="absolute inset-2 border border-neutral-700 bg-black overflow-hidden">
                  {/* Blurred fill */}
                  <img
                    src={img.src}
                    className="absolute inset-0 w-full h-full object-cover blur-lg opacity-25"
                  />

                  {/* Main image */}
                  <img
                    src={img.src}
                    alt={img.caption || "NexHack moment"}
                    className={`
              relative h-full w-full
              ${isHero ? "object-cover" : "object-contain"}
              transition-transform duration-500
              hover:scale-[1.04]
            `}
                  />
                </div>

                {/* Screenshot icon */}
                <div className="absolute top-3 right-3 bg-black/60 border border-neutral-700 px-2 py-1 font-pixel text-[10px] text-primary opacity-0 hover:opacity-100 transition">
                  📷 VIEW
                </div>

                {/* Caption */}
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 font-mono text-xs text-foreground opacity-0 hover:opacity-100 transition-opacity">
                    {img.caption}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>



        <Lightbox image={activeImage} onClose={closeLightbox} />



        {/* WINNERS HEADER */}
        <div className="mb-20 max-w-3xl">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-muted-foreground">
            Winners
          </p>
          <h2 className="mt-4 font-pixel text-3xl md:text-4xl text-primary">
            ACHIEVEMENTS UNLOCKED
          </h2>
          <p className="mt-6 font-mono text-muted-foreground leading-relaxed">
            These teams didn’t just build projects —
            they unlocked real-world impact.
          </p>
        </div>

        {/* WINNER CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {winners.map((winner, index) => {
            const tierStyles = {
              netherite:
                "bg-netherite border-gray-600 shadow-yellow-400/40",
              diamond:
                "bg-sky-900/80 border-sky-500 shadow-blue-400/40",
              emerald:
                "bg-emerald-900/80 border-emerald-500 shadow-green-400/40",
            };

            return (
              <div
                key={index}
                className={`
          minecraft-card
          relative overflow-hidden
          border-4
          p-8
          shadow-2xl
          ${tierStyles[winner.tier]}
        `}
              >
                {/* TOP BADGE */}
                <div className="absolute top-0 left-0 right-0 bg-black/60 border-b border-neutral-700 text-center py-1">
                  <span className="font-pixel text-[10px] tracking-widest text-primary">
                    {winner.position.toUpperCase()}
                  </span>
                </div>

                <div className="pt-6 text-center space-y-4">
                  {/* PROJECT */}
                  <h3 className="font-pixel text-lg text-foreground">
                    {winner.project}
                  </h3>

                  {/* PRIZE AMOUNT */}
                  <div className="text-3xl font-pixel text-shadow-glow">
                    {winner.amount}
                  </div>

                  {/* TEAM */}
                  <p className="font-mono text-xs text-muted-foreground">
                    by {winner.team}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed pt-2">
                    {winner.description}
                  </p>

                  {/* TRACK TAG */}
                  <div className="inline-block mt-4 border-2 border-neutral-700 px-4 py-1 font-mono text-xs text-foreground">
                    {winner.track}
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* BOTTOM SEAM */}
        <div className="mt-32 h-[3px] w-full bg-neutral-800" />
      </div>
    </section>
  );
}
