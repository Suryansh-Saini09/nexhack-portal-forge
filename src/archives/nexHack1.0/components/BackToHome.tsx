import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageTransitionOverlay } from "./PageTransitionOverlay";

export function BackToHome() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const goHome = () => {
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          clearInterval(interval);
          navigate("/");
          return 1;
        }
        return Math.min(1, p + 0.05);
      });
    }, 80);
  };

  return (
    <>
      {loading && <PageTransitionOverlay progress={progress} />}

      <section
        id="main"
        className="relative w-full px-6 py-28 overflow-hidden"
      >
        {/* PORTAL AMBIENCE */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,255,26,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.35)_50%)] bg-[length:4px_4px] opacity-40" />
        </div>

        <motion.div
          className="relative max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* SAVE CONFIRMATION */}
          <motion.div
            className="mb-14"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <span className="minecraft-card inline-block px-8 py-3 border-2 border-primary bg-black/70 font-pixel text-[10px] tracking-widest uppercase text-primary shadow-[0_0_20px_rgba(26,255,26,0.35)]">
              ✓ World Saved Successfully
            </span>
          </motion.div>

          {/* EXIT PORTAL */}
          <motion.button
            onClick={goHome}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex flex-col items-center gap-8"
          >
            {/* PORTAL FRAME */}
            <div
              className="
                relative
                minecraft-card
                flex items-center gap-5
                px-10 py-6
                border-2 border-primary
                bg-black/75
                transition-all duration-300
                group-hover:-translate-y-1
                group-hover:shadow-[0_0_35px_rgba(26,255,26,0.45)]
              "
            >
              {/* ICON CORE */}
              <span
                className="
                  relative
                  flex items-center justify-center
                  w-12 h-12
                  border-2 border-primary
                  bg-primary/10
                  shadow-[inset_0_0_12px_rgba(26,255,26,0.4)]
                "
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
              </span>

              <span className="font-pixel text-sm md:text-base text-primary tracking-[0.2em] uppercase">
                Return to Main World
              </span>
            </div>

            {/* SYSTEM MESSAGE */}
            <span className="font-mono text-xs text-muted-foreground tracking-wide">
              Progress recorded • Archive completed • Safe exit
            </span>
          </motion.button>

          {/* LORE BLOCK */}
          <motion.div
            className="mt-16 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              You’ve walked through the earliest chunks of NexHack —
              <br />
              where ideas were raw, victories uncertain,
              <br />
              and the community was first forged.
              <br />
              <br />
              <span className="text-primary">
                The present world awaits your return.
              </span>
            </p>
          </motion.div>

          {/* FINAL SEAM */}
          <div className="mt-28 h-[3px] w-full bg-neutral-800" />
        </motion.div>
      </section>
    </>
  );
}
