import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import netherBg from '/bg-video.mp4';
// import overworldBg from '@/assets/overworld.mp4';
import { RegistrationForm } from '@/components/RegistrationForm';

export const HeroSection = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const { isNether } = useTheme();

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
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10"></div>


      {/* Content Overlay */}
      <div className="container-max text-center relative z-10 px-4">
        <div className="space-y-8">
          {/* Main Headline */}
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl text-primary text-shadow-glow leading-tight">
            HACK THE NEXT
            <br />
            DIMENSION
          </h1>

          {/* Sub-headline */}
          <p className="font-mono text-lg md:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed text-shadow-glow">
            Welcome to NexHack 2024. The nexus of innovation where the next generation of builders, coders, and dreamers unite.
          </p>

          {/* Social Proof */}
          <div className="minecraft-card inline-block bg-card/50 backdrop-blur-sm p-2 rounded">
            <p className="font-mono text-sm text-foreground">
              🏆 Join over <span className="text-primary font-bold">500+</span> participants in the arena!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setIsRegistrationOpen(true)}
              size="lg"
              className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4"
            >
              REGISTER NOW →
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="minecraft-btn border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4"
            >
              LEARN MORE
            </Button>
          </div>

          {/* Animated Elements */}
          <div className="absolute top-1/2 left-10 w-8 h-8 bg-primary/20 rotate-45 animate-pulse hidden lg:block" />
          <div className="absolute top-1/3 right-16 w-6 h-6 bg-secondary/20 rotate-45 animate-pulse hidden lg:block animation-delay-500" />
          <div className="absolute bottom-1/3 left-20 w-4 h-4 bg-accent/20 rotate-45 animate-pulse hidden lg:block animation-delay-1000" />
        </div>
      </div>

      <RegistrationForm open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen} />
    </section>

  );
};