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
    const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    const drops = Array.from({ length: 100 }, () => ({ x: Math.random() * width, y: Math.random() * height, speed: 7 + Math.random() * 7, length: 10 + Math.random() * 14, opacity: 0.04 + Math.random() * 0.1 }));
    let frame = 0;
    const animateRain = () => {
      ctx.clearRect(0, 0, width, height);
      drops.forEach((drop) => {
        ctx.beginPath(); ctx.strokeStyle = `rgba(174, 219, 255, ${drop.opacity})`; ctx.lineWidth = 1;
        ctx.moveTo(drop.x, drop.y); ctx.lineTo(drop.x + 1, drop.y + drop.length); ctx.stroke();
        drop.y += drop.speed;
        if (drop.y > height + 20) { drop.y = -drop.length; drop.x = Math.random() * width; }
      });
      frame = requestAnimationFrame(animateRain);
    };
    animateRain();
    const hero = heroRef.current;
    let lightningTimer: ReturnType<typeof setTimeout>;
    const flash = () => {
      hero?.classList.add('lightning-flash');
      window.setTimeout(() => hero?.classList.remove('lightning-flash'), 700);
      lightningTimer = window.setTimeout(flash, 8000 + Math.random() * 9000);
    };
    const firstFlash = window.setTimeout(flash, 4200);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(frame); clearTimeout(firstFlash); clearTimeout(lightningTimer); };
  }, []);

  return (
    <main ref={heroRef} className="hero-section cinematic-hero">
      <div className="cinematic-fog fog-one" aria-hidden="true" />
      <div className="cinematic-fog fog-two" aria-hidden="true" />
      <canvas ref={canvasRef} id="rain-canvas" aria-hidden="true" />
      <div className="hero-atmosphere-title" aria-hidden="true">2026</div>
      <h1 className="cinematic-title"><span>NEXHACK</span><small>2.0</small></h1>
      <div className="cinematic-wizard-wrap">
        <img className="cinematic-wizard" src="./images/home/image.png" alt="Harry Potter-inspired wizard holding a wand" />
        <span className="wand-spark spark-a" /><span className="wand-spark spark-b" /><span className="wand-spark spark-c" />
      </div>
      <div className="cinematic-hero-cta"><a className="register-btn" href="#contact">Register Now</a></div>
    </main>
  );
}
