import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransitionOverlay } from "./PageTransitionOverlay";

export function NextHackathonSection() {
  const [edition, setEdition] = useState<"1.0" | "2.0">("2.0");
  const [loading, setLoading] = useState(false);
  const [chunk, setChunk] = useState(0);
  const navigate = useNavigate();

  const isLocked = false;

  /* =========================
     CHUNK LOADING (2.0 ONLY)
  ========================= */
  useEffect(() => {
    if (!isLocked) return;

    const interval = setInterval(() => {
      setChunk((prev) => (prev >= 100 ? 0 : prev + 4));
    }, 120);

    return () => clearInterval(interval);
  }, [isLocked]);

  /* =========================
     WORLD TRAVEL
  ========================= */
  const travel = () => {
    if (isLocked) return;

    setLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <section id="world" className="relative w-full px-6 py-2 overflow-hidden">
      {loading && <PageTransitionOverlay progress={chunk} />}


      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-20 text-center">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-muted-foreground">
            World Selection
          </p>
          <h2 className="mt-4 font-pixel text-4xl md:text-5xl text-primary">
            SELECT DIMENSION
          </h2>
        </div>

        {/* WORLD TOGGLE */}
        <div className="mb-16 flex justify-center">
          <div className="minecraft-card bg-black/60 border-2 border-neutral-700 p-2 flex gap-2">
            {(["1.0", "2.0"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setEdition(v)}
                className={`
                  px-5 py-2 font-pixel text-xs uppercase border-2 transition
                  ${
                    edition === v
                      ? "border-primary text-primary bg-primary/10"
                      : "border-neutral-700 text-muted-foreground hover:border-neutral-500"
                  }
                `}
              >
                WORLD {v}
              </button>
            ))}
          </div>
        </div>

        {/* WORLD CARD */}
        <motion.div
          key={edition}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto"
        >
          {/* PORTAL SHIMMER */}
          {isLocked && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-red-600/20 blur-2xl animate-pulse" />
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.15)_50%)] bg-[length:4px_4px] opacity-30" />
            </div>
          )}

          <div
            className={`
              minecraft-card relative p-10 border-2
              ${
                isLocked
                  ? "border-red-600 bg-black/70"
                  : "border-primary bg-black/60 cursor-pointer"
              }
            `}
            onClick={travel}
          >
            {/* STATUS */}
            <div className="mb-6 flex justify-center">
              <span
                className={`
                  px-6 py-2 font-pixel text-[10px] tracking-widest uppercase border-2
                  ${
                    isLocked
                      ? "border-red-600 text-red-400 bg-red-900/20"
                      : "border-primary text-primary bg-primary/10"
                  }
                `}
              >
                {isLocked ? "WORLD LOCKED" : "WORLD READY"}
              </span>
            </div>

            {/* TITLE */}
            <h3
              className={`
                text-center font-pixel text-3xl md:text-4xl mb-8
                ${isLocked ? "text-red-400" : "text-primary"}
              `}
            >
              NEXHACK {edition}
            </h3>

            {/* META */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="minecraft-card p-4 border-2 border-neutral-700 bg-black/60 text-center">
                <p className="font-mono text-xs uppercase text-muted-foreground">Seed</p>
                <p className="mt-2 font-pixel text-sm">
                  {isLocked ? "Unknown" : "October 2025"}
                </p>
              </div>

              <div className="minecraft-card p-4 border-2 border-neutral-700 bg-black/60 text-center">
                <p className="font-mono text-xs uppercase text-muted-foreground">Difficulty</p>
                <p className="mt-2 font-pixel text-sm">
                  {isLocked ? "Hardcore" : "Normal"}
                </p>
              </div>
            </div>

            {/* LORE */}
            <p className="font-mono text-sm text-muted-foreground text-center leading-relaxed">
              {isLocked ? (
                <>
                  Chunks are still generating.
                  <br />
                  The world is unstable.
                  <br />
                  Return when the portal stabilizes.
                </>
              ) : (
                <>
                  The first world stands complete.
                  <br />
                  Your journey can safely continue.
                </>
              )}
            </p>

            {/* CHUNK LOADER */}
            {isLocked && (
              <div className="mt-10">
                <div className="h-2 bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-300"
                    style={{ width: `${chunk}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground text-center">
                  Generating terrain… {chunk}%
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* SEAM */}
        <div className="mt-32 h-[3px] w-full bg-neutral-800" />
      </div>
    </section>
  );
}
