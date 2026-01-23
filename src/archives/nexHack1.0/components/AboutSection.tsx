export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full px-6 py-36 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* WORLD GENERATION HEADER */}
        <div className="mb-28 max-w-4xl relative">
          <span className="font-mono text-xs tracking-[0.45em] uppercase text-muted-foreground">
            World Generated
          </span>

          <h1 className="mt-6 font-pixel text-4xl md:text-5xl text-primary text-shadow-glow">
            NEXHACK 1.0
          </h1>

          <p className="mt-6 font-mono text-muted-foreground leading-relaxed max-w-2xl">
            This archive preserves the first instance of NexHack —  
            a world where ideas spawned under pressure,
            collaboration replaced competition,
            and execution mattered more than perfection.
          </p>

          {/* World load bar */}
          <div className="mt-10 w-72 h-2 bg-neutral-800 overflow-hidden">
            <div className="h-full w-full bg-primary shadow-[0_0_12px_rgba(26,255,26,0.6)]" />
          </div>
        </div>

        {/* MAIN LORE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* LEFT — WORLD METADATA */}
          <div className="lg:col-span-4 space-y-8">

            {/* WORLD INFO */}
            <div className="
              minecraft-card
              bg-black/50 backdrop-blur-sm
              border-2 border-primary
              p-6
              relative
            ">
              <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
                World Properties
              </p>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seed</span>
                  <span className="text-primary">NEX-GU-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mode</span>
                  <span>Survival (Collaborative)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="text-primary">Hard</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Limit</span>
                  <span>24 Cycles</span>
                </div>
              </div>

              {/* Pixel notch */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary" />
            </div>

            {/* COORDINATES */}
            <div className="
              minecraft-card
              bg-black/40
              border border-neutral-700
              p-5
            ">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Spawn Coordinates
              </p>
              <p className="font-mono text-sm text-foreground tracking-wider">
                X: 29.30°N &nbsp; Y: 76.89°E  
                <br />
                <span className="text-muted-foreground text-xs">
                  (Geeta University)
                </span>
              </p>
            </div>
          </div>

          {/* RIGHT — LORE SCROLL */}
          <div className="lg:col-span-8 relative">

            <div className="
              minecraft-card
              bg-black/30
              border-2 border-neutral-700
              p-10
              relative
            ">
              <p className="font-mono text-foreground/90 leading-relaxed text-base md:text-lg">
                In this world, participants entered with raw ideas and left with
                battle-tested solutions.
                <br /><br />
                Sleep was optional. Curiosity was mandatory.
                Teams formed not by obligation, but by shared intent —
                designers, developers, and thinkers aligning under a single goal:
                build something that matters.
                <br /><br />
                As the hours passed, systems failed, plans changed,
                and assumptions were rewritten.
                What survived was not the cleanest idea,
                but the one resilient enough to adapt.
                <br /><br />
                NexHack 1.0 did not reward perfection.
                It rewarded momentum.
                This philosophy became the backbone of every NexHack world that followed.
              </p>

              {/* Subtle grid texture */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.035]
                bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)]
                bg-[size:28px_28px]"
              />
            </div>

            {/* ARCHIVE TAG */}
            <div className="
              absolute -bottom-6 right-8
              minecraft-card
              bg-black
              border border-neutral-700
              px-4 py-2
              font-mono text-xs text-muted-foreground
            ">
              ARCHIVE LOG • ORIGIN ERA
            </div>
          </div>
        </div>

        {/* BLOCKS UNLOCKED */}
        <div className="mt-32">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-muted-foreground mb-6">
            Blocks Unlocked
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Team Formation",
              "Rapid Prototyping",
              "Pitch Crafting",
              "Production Mindset",
            ].map((block, i) => (
              <div
                key={i}
                className="
                  minecraft-card
                  bg-black/40
                  border border-neutral-700
                  p-4
                  text-center
                  font-mono text-sm text-foreground
                "
              >
                ⛏️ {block}
              </div>
            ))}
          </div>
        </div>

        {/* FINAL SEAM */}
        <div className="mt-32 h-[3px] w-full bg-neutral-800" />
      </div>
    </section>
  );
}
