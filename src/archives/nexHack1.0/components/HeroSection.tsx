import { motion } from "framer-motion";
import { Cover } from "@/components/cover";
import bg from "/video/nexhack1-bg.mp4"; // optional video OR image

export const ArchiveHeroSection = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Background (video OR image) */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src={bg}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 -z-10" />

      {/* Content */}
      <motion.div
        className="container-max relative z-10 px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* SAVE BADGE */}
        <div className="mb-8">
          <span className="minecraft-card inline-block px-6 py-2 border-2 border-neutral-700 bg-black/60 font-pixel text-[10px] tracking-widest uppercase text-muted-foreground">
            World Saved • Archive Mode
          </span>
        </div>

        {/* TITLE */}
        <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-primary text-shadow-glow leading-tight">
          NEXHACK
          <br />
          <Cover>1.0 ARCHIVE</Cover>
        </h1>

        {/* SUBTITLE */}
        <p className="mt-8 font-mono text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          The first world where NexHack began.
          <br />
          Ideas were forged. Communities were born.
          <br />
          History was written.
        </p>

        {/* META INFO */}
        {/* <div className="mt-10 minecraft-card inline-block bg-card/40 backdrop-blur-sm p-4">
          <p className="font-mono text-sm text-foreground">
            📍 Geeta University, Panipat
            <br />
            🗓 March 2024 • 24 Hours
            <br />
            🧑‍💻 250+ Hackers • 50+ Teams
          </p>
        </div> */}

        {/* DIVIDER */}
        <div className="mt-16 flex justify-center">
          <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        </div>

        {/* SCROLL HINT */}
        <p className="mt-6 font-mono text-xs text-muted-foreground tracking-widest uppercase">
          Scroll to explore the archive ↓
        </p>
      </motion.div>

      {/* Ambient pixel elements */}
      <div className="absolute top-1/4 left-16 w-6 h-6 bg-primary/20 rotate-45 animate-pulse hidden lg:block" />
      <div className="absolute bottom-1/3 right-20 w-4 h-4 bg-primary/20 rotate-45 animate-pulse hidden lg:block" />
    </section>
  );
};
