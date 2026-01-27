import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Phase = "nether" | "overworld" | "emerald";

const GRID = 10;
const TOTAL = GRID * GRID;

const PHASE_COLORS: Record<Phase, string> = {
  nether: "bg-red-900 shadow-red-500/40",
  overworld: "bg-neutral-700 shadow-neutral-400/30",
  emerald: "bg-primary shadow-[0_0_14px_rgba(26,255,26,0.6)]",
};

const MESSAGES = [
  "Saving World…",
  "Writing Region Data…",
  "Loading Chunks…",
  "Spawning Player…",
  "Entering Archive World…",
];

export function PageTransitionOverlay({
  progress = 0,
}: {
  progress: number; // 0 → 1
}) {
  const [phase, setPhase] = useState<Phase>("nether");
  const [messageIndex, setMessageIndex] = useState(0);

  /** Chunk order (wave: left → right → top → bottom) */
  const chunkOrder = useMemo(() => {
    const order: number[] = [];
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        order.push(y * GRID + x);
      }
    }
    return order;
  }, []);

  const activeCount = Math.floor(progress * TOTAL);

  // Loading sound
  useEffect(() => {
    const audio = new Audio("/sounds/loading.wav");
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, []);

  /** Phase control */
  useEffect(() => {
    if (progress < 0.33) setPhase("nether");
    else if (progress < 0.66) setPhase("overworld");
    else setPhase("emerald");
  }, [progress]);

  /** Message rotation */
  useEffect(() => {
    const i = Math.min(
      MESSAGES.length - 1,
      Math.floor(progress * MESSAGES.length)
    );
    setMessageIndex(i);
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* PIXEL NOISE */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#000 0,#000 1px,transparent 1px,transparent 3px)",
        }}
      />

      {/* CHUNK GRID */}
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
      >
        {chunkOrder.map((id, i) => {
          const active = i < activeCount;
          return (
            <div
              key={id}
              className={`
                w-6 h-6 md:w-7 md:h-7
                border border-neutral-800
                transition-all duration-200
                ${active ? PHASE_COLORS[phase] : "bg-neutral-900"}
              `}
            />
          );
        })}
      </div>

      {/* STATUS TEXT */}
      <div className="absolute bottom-16 text-center space-y-2">
        <div className="font-pixel text-xs tracking-widest text-primary">
          {MESSAGES[messageIndex]}
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">
          {Math.floor(progress * 100)}%
        </div>
      </div>
    </motion.div>
  );
}
