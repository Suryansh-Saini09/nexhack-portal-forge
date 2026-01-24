import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import netherBg from "/bg-video.mp4";
import { Cover } from "@/components/cover";
import { RegistrationForm } from "@/components/RegistrationForm";

export const HeroSection = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const { isNether } = useTheme();

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={netherBg}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Black Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10" />

      {/* Content */}
      <div className="container-max text-center relative z-10 px-4">
        <div className="space-y-8">

          {/* MAIN HEADLINE */}
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-primary text-shadow-glow leading-tight">
            HACK THE NEXT
            <br />
            <Cover>DIMENSION</Cover>
          </h1>

          {/* SUB HEADLINE */}
          <p className="font-mono text-lg md:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed text-shadow-glow">
            Welcome to NexHack 2025. The nexus of innovation where the next
            generation of builders, coders, and dreamers unite.
          </p>

          {/* ORGANISED BY */}
          <div className="minecraft-card inline-block bg-card/50 backdrop-blur-sm p-3">
            <p className="font-mono text-sm text-foreground">
              Organised by{" "}
              <strong>Geeta Technical Hub</strong> and{" "}
              <strong>School of Computer Science and Engineering</strong>
              <br />
              Powered by{" "}
              <span className="text-primary text-shadow-glow font-bold">
                Codeforge Society
              </span>
            </p>
          </div>

          {/* COMING SOON — 2026 */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-[2px] w-36 bg-primary/40" />

            <p className="font-pixel text-xs tracking-[0.45em] uppercase text-primary/80">
              Coming Soon • 2026
            </p>

            <p className="font-mono text-[11px] text-muted-foreground">
              A new dimension is under construction
            </p>
          </div>

          {/* DECORATIVE PIXELS */}
          <div className="absolute top-1/2 left-10 w-8 h-8 bg-primary/20 rotate-45 animate-pulse hidden lg:block" />
          <div className="absolute top-1/3 right-16 w-6 h-6 bg-secondary/20 rotate-45 animate-pulse hidden lg:block animation-delay-500" />
          <div className="absolute bottom-1/3 left-20 w-4 h-4 bg-accent/20 rotate-45 animate-pulse hidden lg:block animation-delay-1000" />
        </div>
      </div>

      <RegistrationForm
        open={isRegistrationOpen}
        onOpenChange={setIsRegistrationOpen}
      />
    </section>
  );
};
