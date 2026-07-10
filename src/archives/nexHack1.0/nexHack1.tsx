import { useEffect } from "react";

import { AboutSection } from "./components/AboutSection";
import { TimelineSection } from "./components/TimelineSection";
import { StatsSection } from "./components/StatsSection";
import { SponsorsSection } from "./components/SponsorsSection";
import { GlimpseSection } from "./components/GlimpseSection";
import { NextHackathonSection } from "./components/NextHackathonSection";
import { BackToHome } from "./components/BackToHome";
import { MinecraftChunkBackground } from "./components/MinecraftChunkBackground";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ArchiveHeroSection } from "./components/HeroSection";
import { LightboxProvider } from "./context/LightboxContext";

export default function NexHack1() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
    <LightboxProvider>

    <Header />
      {/* BACKGROUND LAYER */}
      <MinecraftChunkBackground />

      {/* CONTENT LAYER */}
      <div className="relative z-10 min-h-screen text-white overflow-x-hidden w-full">
        <ArchiveHeroSection />
        <AboutSection />
        <StatsSection />
        <TimelineSection />
        <SponsorsSection />
        <GlimpseSection />
        <NextHackathonSection />
        <BackToHome />
      </div>
      <Footer />
    </LightboxProvider>
    </>
  );
}
