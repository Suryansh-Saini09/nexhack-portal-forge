import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTransitionOverlay } from "./PageTransitionOverlay";

// ─── SET YOUR LAUNCH DATE HERE ───────────────────────────────────────────────
const LAUNCH_DATE = new Date("2026-01-01T00:00:00+05:30");
// ─────────────────────────────────────────────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft | null {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Archives() {
  const navigate = useNavigate();

  const [edition, setEdition] = useState<"1.0" | "2.0">("2.0");
  const [loading, setLoading] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calcTimeLeft);

  const isLocked = edition === "2.0";
  const isUnlocked = isLocked && timeLeft === null;

  /* COUNTDOWN TICKER */
  useEffect(() => {
    if (!isLocked) return;
    const id = setInterval(() => {
      const t = calcTimeLeft();
      setTimeLeft(t);
      if (!t) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [isLocked]);

  /* WORLD TRAVEL */
  const travel = () => {
    if (isLocked && !isUnlocked) return;

    setLoading(true);
    setTransitionProgress(0);
    const interval = setInterval(() => {
      setTransitionProgress((p) => {
        if (p >= 1) {
          clearInterval(interval);
          if (edition === "2.0") {
            window.location.href = "/nexhack2/";
          } else {
            navigate("/archives/nexhack-1");
          }
          return 1;
        }
        return Math.min(1, p + 0.04);
      });
    }, 80);
  };

  return (
    <section
      id="archives"
      className="relative w-full px-6 py-24 bg-transparent overflow-hidden"
    >
      {loading && <PageTransitionOverlay progress={transitionProgress} />}

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-20 text-center">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-muted-foreground">
            Archives Selection
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
                  ${edition === v
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
          {/* LOCKED GLOW */}
          {isLocked && !isUnlocked && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-red-600/20 blur-2xl animate-pulse" />
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.15)_50%)] bg-[length:4px_4px] opacity-30" />
            </div>
          )}
          {isUnlocked && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-primary/10 blur-2xl animate-pulse" />
            </div>
          )}

          <div
            onClick={travel}
            className={`
              minecraft-card relative p-10 border-2 transition-all
              ${isLocked && !isUnlocked
                ? "border-red-600 bg-black/70 cursor-not-allowed"
                : "border-primary bg-black/60 cursor-pointer hover:shadow-[0_0_35px_rgba(26,255,26,0.35)]"
              }
            `}
          >
            {/* STATUS BADGE */}
            <div className="mb-6 flex justify-center">
              <span className={`
                px-6 py-2 font-pixel text-[10px] tracking-widest uppercase border-2
                ${isLocked && !isUnlocked
                  ? "border-red-600 text-red-400 bg-red-900/20"
                  : "border-primary text-primary bg-primary/10"
                }
              `}>
                {isLocked && !isUnlocked ? "WORLD LOCKED" : "WORLD READY"}
              </span>
            </div>

            {/* TITLE */}
            <h3 className={`
              text-center font-pixel text-3xl md:text-4xl mb-8
              ${isLocked && !isUnlocked ? "text-red-400" : "text-primary"}
            `}>
              NEXHACK {edition}
            </h3>

            {/* META GRID */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="minecraft-card p-4 border-2 border-neutral-700 bg-black/60 text-center">
                <p className="font-mono text-xs uppercase text-muted-foreground">Seed</p>
                <p className="mt-2 font-pixel text-sm">
                  {edition === "1.0" ? "October 2025" : isUnlocked ? "Active" : "Unknown"}
                </p>
              </div>
              <div className="minecraft-card p-4 border-2 border-neutral-700 bg-black/60 text-center">
                <p className="font-mono text-xs uppercase text-muted-foreground">Difficulty</p>
                <p className="mt-2 font-pixel text-sm">
                  {edition === "1.0" ? "Normal" : "Hardcore"}
                </p>
              </div>
            </div>

            {/* LORE */}
            <p className="font-mono text-sm text-muted-foreground text-center leading-relaxed">
              {edition === "1.0" ? (
                <>The first world stands complete.<br />Your journey can safely continue.</>
              ) : isUnlocked ? (
                <>The portal has stabilized.<br />The new world awaits your arrival.</>
              ) : (
                <>Chunks are still generating.<br />The world is unstable.<br />Return when the portal stabilizes.</>
              )}
            </p>

            {/* WORLD 2.0 BOTTOM — countdown or enter prompt */}
            {isLocked && (
              <div className="mt-10 text-center">
                {isUnlocked ? (
                  <p className="font-pixel text-sm text-primary animate-pulse tracking-widest">
                    ▶ &nbsp;PORTAL STABILIZED — CLICK TO ENTER
                  </p>
                ) : timeLeft ? (
                  <>
                    <div className="flex justify-center gap-6 mb-3">
                      {(["days", "hours", "minutes", "seconds"] as const).map((u) => (
                        <div key={u} className="flex flex-col items-center">
                          <span className="font-pixel text-2xl text-red-400">
                            {String(timeLeft![u]).padStart(2, "0")}
                          </span>
                          <span className="font-mono text-[10px] uppercase text-muted-foreground mt-1">
                            {u}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      Portal stabilizes when the countdown ends
                    </p>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}