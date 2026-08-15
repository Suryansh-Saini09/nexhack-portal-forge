import React, { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const maxDrops = 110;

    class Drop {
      x: number = 0; y: number = 0; vy: number = 0;
      len: number = 0; opacity: number = 0;

      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = Math.random() * 8 + 10;
        this.len = Math.random() * 15 + 10;
        this.opacity = Math.random() * 0.15 + 0.05;
      }
      draw() {
        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(174, 219, 255, ${this.opacity})`;
        ctx!.lineWidth = 1;
        ctx!.moveTo(this.x, this.y);
        ctx!.lineTo(this.x + 1, this.y + this.len);
        ctx!.stroke();
      }
      update() {
        this.y += this.vy;
        if (this.y > height) this.reset();
      }
    }

    const drops: Drop[] = [];
    for (let i = 0; i < maxDrops; i++) drops.push(new Drop());

    let rainId: number;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      drops.forEach(drop => { drop.update(); drop.draw(); });
      rainId = requestAnimationFrame(loop);
    };
    loop();

    const hero = heroRef.current;
    let lightningTimerId: ReturnType<typeof setTimeout>;

    const triggerLightning = () => {
      if (!hero) return;
      hero.classList.add('lightning-flash');
      setTimeout(() => { if (hero) hero.classList.remove('lightning-flash'); }, 800);
      lightningTimerId = setTimeout(triggerLightning, Math.random() * 8000 + 6000);
    };

    const initialLightningId = setTimeout(triggerLightning, 4000);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rainId);
      clearTimeout(lightningTimerId);
      clearTimeout(initialLightningId);
    };
  }, []);

  return (
    <main ref={heroRef} className="hero-section">
      <div className="magic-glow-orb" />

      {/* Hero Magical Characters Artwork */}
      <div className="hero-characters-container">
        <img
          src="./images/home/hero_characters.png"
          alt="NexHack 2.0"
          className="hero-characters-artwork"
        />
      </div>
      <canvas ref={canvasRef} id="rain-canvas" />
    </main>
  );
}
