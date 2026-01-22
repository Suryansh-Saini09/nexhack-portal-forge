import { useEffect, useRef, useState } from "react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  description: string;
  icon: string;
  tier: "emerald" | "diamond" | "iron" | "netherite";
};

const stats: Stat[] = [
  {
    label: "Participants",
    value: 400,
    suffix: "+",
    icon: "https://cdn.lordicon.com/kthelypq.json",
    tier: "emerald",
    description:
      "Developers, designers, and innovators collaborated in a focused 24-hour build environment.",
  },
  {
    label: "Teams",
    value: 85,
    suffix:"+",
    icon: "https://cdn.lordicon.com/zpxybbhl.json",
    tier: "diamond",
    description:
      "Cross-disciplinary teams formed organically, balancing speed, skill, and creativity.",
  },
  {
    label: "Institutions",
    value: 18,
    icon: "https://cdn.lordicon.com/zzcjjxew.json",
    tier: "iron",
    description:
      "A diverse academic presence representing multiple regions and perspectives.",
  },
  {
    label: "Prize Pool",
    value: 1500,
    suffix: " $",
    icon: "https://cdn.lordicon.com/iltqorsz.json",
    tier: "netherite",
    description:
      "Rewards, mentorship opportunities, and recognition for standout solutions.",
  },
];

const glowMap: Record<Stat["tier"], string> = {
  emerald: "shadow-[0_0_40px_rgba(16,185,129,0.45)]",
  diamond: "shadow-[0_0_40px_rgba(59,130,246,0.45)]",
  iron: "shadow-[0_0_35px_rgba(148,163,184,0.4)]",
  netherite: "shadow-[0_0_45px_rgba(250,204,21,0.55)]",
};

export function StatsSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [unlocked, setUnlocked] = useState<boolean[]>(
    stats.map(() => false)
  );
  const [displayValues, setDisplayValues] = useState<number[]>(
    stats.map(() => 0)
  );

  /* -------------------------------
     UNLOCK CARDS (STABLE)
  -------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setUnlocked((prev) => {
              if (prev[index]) return prev;
              const copy = [...prev];
              copy[index] = true;
              return copy;
            });
          }
        });
      },
      {
        threshold: 0.45,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* -------------------------------
     COUNT-UP ANIMATION (ONCE)
  -------------------------------- */
  useEffect(() => {
    unlocked.forEach((isUnlocked, index) => {
      if (!isUnlocked) return;

      const end = stats[index].value;
      const duration = 900;
      const startTime = performance.now();

      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const current = Math.floor(progress * end);

        setDisplayValues((prev) => {
          const copy = [...prev];
          copy[index] = current;
          return copy;
        });

        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });
  }, [unlocked]);

  return (
    <section id="metrics" className="px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-28 max-w-3xl">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-muted-foreground">
            Event Metrics
          </p>
          <h2 className="mt-4 font-pixel text-3xl md:text-4xl text-primary">
            MEASURED IMPACT
          </h2>
        </div>

        {/* STAT TOTEMS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          {stats.map((stat, index) => {
            const isUnlocked = unlocked[index];

            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={`
                  relative flex flex-col items-center text-center
                  transition-all duration-700
                  ${isUnlocked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  ${glowMap[stat.tier]}
                `}
              >
                {/* ICON FRAME (PADDING FIXED) */}
                <div className="mb-8 p-5 border-2 border-primary bg-black/60">
                  <div className="w-10 h-10">
                    <lord-icon
                      src={stat.icon}
                      trigger="loop"
                      colors="primary:#19E71A,secondary:#19E71A"
                      class="w-full h-full"
                    />
                  </div>
                </div>

                {/* VALUE */}
                <div className="font-pixel text-3xl text-foreground text-shadow-glow">
                  {displayValues[index].toLocaleString()}
                  {stat.suffix || ""}
                </div>

                {/* LABEL */}
                <div className="mt-2 font-mono text-xs tracking-widest uppercase text-muted-foreground">
                  {stat.label}
                </div>

                {/* XP BAR */}
                <div className="mt-5 w-full h-2 bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-700"
                    style={{ width: isUnlocked ? "100%" : "0%" }}
                  />
                </div>

                {/* DESCRIPTION */}
                <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SEAM */}
        <div className="mt-28 h-[3px] w-full bg-neutral-800" />
      </div>
    </section>
  );
}
