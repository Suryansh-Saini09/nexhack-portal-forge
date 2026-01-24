import { Lock, ShieldAlert } from "lucide-react";

export const PrizesSection = () => {
  const lockedTiers = [
    {
      tier: "NETHERITE VAULT",
      description: "The highest reward tier. Power, prestige, and legacy.",
      glow: "shadow-[0_0_40px_rgba(250,204,21,0.45)] border-yellow-400/40",
    },
    {
      tier: "DIAMOND VAULT",
      description: "Elite rewards forged for top-tier builders.",
      glow: "shadow-[0_0_40px_rgba(59,130,246,0.45)] border-blue-400/40",
    },
    {
      tier: "EMERALD VAULT",
      description: "Strategic rewards with long-term impact.",
      glow: "shadow-[0_0_40px_rgba(16,185,129,0.45)] border-emerald-400/40",
    },
  ];

  return (
    <section id="prizes" className="section-spacing">
      <div className="container-max">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="font-mono text-xs tracking-[0.45em] uppercase text-muted-foreground">
            Reward System
          </p>
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mt-4">
            THE PRIZE VAULT
          </h2>
          <p className="font-mono text-muted-foreground mt-6 max-w-3xl mx-auto">
            NexHack rewards are evolving.  
            Bigger stakes. Higher impact. Greater legacy.
          </p>
        </div>

        {/* VAULT GRID */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {lockedTiers.map((tier, i) => (
            <div
              key={i}
              className={`
                minecraft-card
                relative overflow-hidden
                border-2 bg-black/60 backdrop-blur-sm
                p-8 text-center
                ${tier.glow}
              `}
            >
              {/* LOCK ICON */}
              <div className="mb-6 flex justify-center">
                <div className="w-14 h-14 flex items-center justify-center border-2 border-primary bg-black/70">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* TITLE */}
              <h3 className="font-pixel text-lg text-primary mb-4">
                {tier.tier}
              </h3>

              {/* ENCRYPTED VALUE */}
              <div className="font-pixel text-xl text-muted-foreground tracking-widest mb-4">
                ███ ███ ███
              </div>

              {/* DESCRIPTION */}
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                {tier.description}
              </p>

              {/* SEALED TAG */}
              <div className="absolute top-4 right-4 font-pixel text-[9px] tracking-widest text-red-400">
                SEALED
              </div>
            </div>
          ))}
        </div>

        {/* SYSTEM MESSAGE */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="minecraft-card bg-black/70 border-2 border-neutral-700 p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <p className="font-pixel text-xs text-primary tracking-widest">
                SYSTEM NOTICE
              </p>
            </div>

            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Prize data is currently encrypted.
              <br />
              Vault access will unlock when NexHack 2026 goes live.
              <br />
              Prepare accordingly.
            </p>

            <p className="mt-4 font-mono text-xs text-muted-foreground italic">
              Archive rewards are preserved separately.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
