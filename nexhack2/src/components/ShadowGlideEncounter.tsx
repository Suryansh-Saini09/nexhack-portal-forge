import React, { useState, useEffect, useRef } from 'react';

interface ShadowGlideEncounterProps {
  onTitleGlow?: (glow: boolean) => void;
  onDimChange?: (dim: boolean) => void;
}

type AnimStatus = 'idle' | 'dimming' | 'flashing' | 'gliding' | 'dissolving' | 'finished';

interface ShadowPos {
  x: number;
  y: number;
}

export default function ShadowGlideEncounter({ onTitleGlow, onDimChange }: ShadowGlideEncounterProps) {
  const [status, setStatus] = useState<AnimStatus>('idle');
  const [showFlash, setShowFlash] = useState(false);
  const [shadowPos, setShadowPos] = useState<ShadowPos>({ x: -350, y: 0 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const particlesRef = useRef<SmokeParticle[]>([]);

  class SmokeParticle {
    x: number; y: number; vx: number; vy: number;
    radius: number; radiusSpeed: number; alpha: number; decay: number;

    constructor(x: number, y: number, radiusSpeed = 0.5, vx = 0, vy = 0) {
      this.x = x + (Math.random() * 40 - 20);
      this.y = y + (Math.random() * 40 - 20);
      this.vx = vx || (Math.random() * 1.5 - 0.75) - 0.5;
      this.vy = vy || (Math.random() * 1 - 0.5) - 0.2;
      this.radius = Math.random() * 25 + 15;
      this.radiusSpeed = radiusSpeed;
      this.alpha = Math.random() * 0.45 + 0.25;
      this.decay = Math.random() * 0.008 + 0.005;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.radius += this.radiusSpeed; this.alpha -= this.decay;
    }
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      const grad = ctx.createRadialGradient(this.x, this.y, this.radius * 0.1, this.x, this.y, this.radius);
      grad.addColorStop(0, `rgba(15, 15, 20, ${this.alpha})`);
      grad.addColorStop(0.5, `rgba(40, 40, 45, ${this.alpha * 0.5})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatus(prev => (prev === 'idle' || prev === 'finished') ? 'dimming' : prev);
        } else {
          setStatus('idle');
          setShowFlash(false);
          setShadowPos({ x: -350, y: window.innerHeight * 0.4 });
          particlesRef.current = [];
          if (onDimChange) onDimChange(false);
          if (onTitleGlow) onTitleGlow(false);
          if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);
    observerRef.current = observer;

    return () => {
      if (triggerRef.current && observerRef.current) observerRef.current.unobserve(triggerRef.current);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [onDimChange, onTitleGlow]);

  useEffect(() => {
    if (status === 'dimming') {
      if (onDimChange) onDimChange(true);
      const timer = setTimeout(() => setStatus('flashing'), 800);
      return () => clearTimeout(timer);
    }
  }, [status, onDimChange]);

  useEffect(() => {
    if (status === 'flashing') {
      setShowFlash(true);
      const timer = setTimeout(() => { setShowFlash(false); setStatus('gliding'); }, 400);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (status !== 'gliding' && status !== 'dissolving') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animationDuration = 3000;
    startTimeRef.current = performance.now();

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / animationDuration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const shadowX = -350 + progress * (canvas.width + 700);
      const shadowY = (canvas.height * 0.45) + Math.sin(progress * Math.PI * 2) * 60;

      if (progress > 0.35 && progress < 0.7) { if (onTitleGlow) onTitleGlow(true); }
      else { if (onTitleGlow) onTitleGlow(false); }

      if (progress < 1) {
        setShadowPos({ x: shadowX, y: shadowY });
        if (Math.random() < 0.4) particlesRef.current.push(new SmokeParticle(shadowX + 100, shadowY + 110));
      } else if (status === 'gliding') {
        setStatus('dissolving');
        for (let i = 0; i < 28; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 4 + 1.5;
          particlesRef.current.push(new SmokeParticle(shadowX + 100, shadowY + 110, 0.8, Math.cos(angle) * speed, Math.sin(angle) * speed));
        }
        if (onDimChange) onDimChange(false);
      }

      particlesRef.current.forEach((p, idx) => {
        p.update(); p.draw(ctx);
        if (p.alpha <= 0) particlesRef.current.splice(idx, 1);
      });

      if (progress < 1 || particlesRef.current.length > 0) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setStatus('finished');
        if (onTitleGlow) onTitleGlow(false);
        if (onDimChange) onDimChange(false);
      }
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('resize', resizeCanvas); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [status, onDimChange, onTitleGlow]);

  const showShadow = status === 'gliding';
  const showCanvas = status === 'gliding' || status === 'dissolving';

  return (
    <div ref={triggerRef} className="glide-encounter-anchor">
      <div className={`glide-lightning-flash ${showFlash ? 'active' : ''}`} />
      {showCanvas && <canvas ref={canvasRef} className="glide-particle-canvas" />}
      {showShadow && (
        <div
          className="glide-shadow-sprite"
          style={{ left: `${shadowPos.x}px`, top: `${shadowPos.y}px`, backgroundImage: "url('./images/about/smoke.png')" }}
        />
      )}
    </div>
  );
}
