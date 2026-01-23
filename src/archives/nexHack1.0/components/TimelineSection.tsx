import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type EventType =
  | "hack"
  | "break"
  | "judging"
  | "ceremony"
  | "mentoring"
  | "selection";

interface EventNode {
  time: string;
  title: string;
  location: string;
  type: EventType;
}

const schedule = {
  day1: [
    { time: "9:00", title: "Spawn & Registration", location: "F Block", type: "ceremony" },
    { time: "11:00", title: "World Initialization", location: "Auditorium", type: "ceremony" },
    { time: "13:00", title: "Build Phase I", location: "Hack Area", type: "hack" },
    { time: "15:30", title: "Mentor Encounter", location: "Hack Area", type: "mentoring" },
    { time: "18:00", title: "Build Phase II", location: "Hack Area", type: "hack" },
  ],
  day2: [
    { time: "01:30", title: "Night Build", location: "Hack Area", type: "hack" },
    { time: "07:00", title: "Judgement Phase", location: "F Block", type: "judging" },
    { time: "09:00", title: "Top Teams Unlocked", location: "Online", type: "selection" },
    { time: "10:00", title: "Final Boss Fight", location: "Auditorium", type: "ceremony" },
    { time: "13:30", title: "Loot Distribution", location: "Auditorium", type: "ceremony" },
  ],
};

const iconMap: Record<EventType, string> = {
  ceremony: "https://cdn.lordicon.com/aklfruoc.json",
  hack: "https://cdn.lordicon.com/kthelypq.json",
  mentoring: "https://cdn.lordicon.com/zpxybbhl.json",
  judging: "https://cdn.lordicon.com/egiwmiit.json",
  selection: "https://cdn.lordicon.com/iltqorsz.json",
  break: "https://cdn.lordicon.com/oqhlhtfq.json",
};

export function TimelineSection() {
  const [day, setDay] = useState<"day1" | "day2">("day1");
  const nodes = schedule[day];
  const isNether = day === "day2";

  return (
    <section id="schedule" className="relative px-6 py-20 overflow-hidden">

      {/* BIOME FOG */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute inset-0 transition-opacity duration-700
            ${isNether
              ? "bg-gradient-to-b from-red-900/40 via-transparent to-black/70"
              : "bg-gradient-to-b from-black/40 via-transparent to-black/70"}
          `}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16 flex justify-between items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.35em] uppercase text-muted-foreground">
              World Progression
            </p>
            <h2 className="mt-4 font-pixel text-4xl text-primary">
              QUEST LOG
            </h2>
            <p className="mt-4 font-mono text-sm text-muted-foreground max-w-md">
              Each checkpoint marks a decision that shaped NexHack 1.0.
            </p>
          </div>

          {/* DAY SWITCH */}
          <div className="minecraft-card p-2 flex gap-2 border-2 border-primary bg-black/60">
            {(["day1", "day2"] as const).map(d => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`font-pixel px-4 py-2 text-xs border-2 transition
                  ${
                    day === d
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-neutral-700 text-neutral-400"
                  }`}
              >
                {d === "day1" ? "OVERWORLD" : "NETHER"}
              </button>
            ))}
          </div>
        </div>

        {/* MINI MAP */}
        <div className="mb-16 flex justify-center">
          <div className="flex gap-3 p-3 border-2 border-neutral-700 bg-black/60">
            {nodes.map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 border-2 transition-all
                  ${
                    isNether
                      ? "border-red-500 bg-red-500/30"
                      : "border-primary bg-primary/30"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={day}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
          >
            {nodes.map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`
                  minecraft-card relative
                  p-8 border-2
                  ${isNether
                    ? "border-red-600 shadow-[0_0_40px_rgba(255,80,80,0.45)]"
                    : "border-primary shadow-[0_0_35px_rgba(26,255,26,0.35)]"}
                `}
              >
                {/* FOG LAYER */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                  className="absolute inset-0 bg-black/70 z-10"
                />

                {/* ICON */}
                <div className="mb-6 flex justify-center relative z-20">
                  <div className="p-4 border-2 border-primary bg-black/70">
                    <lord-icon
                      src={iconMap[node.type]}
                      trigger="loop"
                      colors={`primary:${isNether ? "#ff5555" : "#19E71A"}`}
                      class="w-9 h-9"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <p className="font-mono text-xs text-muted-foreground text-center">
                  XP {node.time}
                </p>

                <h4 className="mt-3 font-pixel text-sm text-center text-foreground">
                  {node.title}
                </h4>

                <p className="mt-2 font-mono text-xs text-center text-muted-foreground">
                  {node.location}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-28 h-[3px] w-full bg-neutral-800" />
      </div>
    </section>
  );
}
