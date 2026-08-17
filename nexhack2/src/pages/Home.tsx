import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  color: string;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const colors = [
      'rgba(246, 220, 134, ',
      'rgba(238, 185, 57, ',
      'rgba(255, 240, 200, ',
      'rgba(200, 230, 255, ',
    ];

    const particles: Particle[] = Array.from({ length: 48 }, () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.1 - Math.random() * 0.25,
        size: 0.8 + Math.random() * 2.0,
        baseAlpha: 0.15 + Math.random() * 0.45,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        pulseOffset: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    let frame = 0;
    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        const pulse = Math.sin(now * 0.0015 * p.pulseSpeed * 60 + p.pulseOffset);
        const dynamicAlpha = Math.max(0, Math.min(1, p.baseAlpha + pulse * 0.15));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${dynamicAlpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(238, 185, 57, 0.5)';
        ctx.fill();

        p.x += p.vx + Math.sin(now * 0.0008 + i) * 0.1;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      });

      ctx.shadowBlur = 0;
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="hero-section homepage-hero-bg">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="homepage-bg-img homepage-hero-video"
        poster="/images/home/image copy.png"
      >
        <source src="/hero.mp4" type="video/mp4" />
        <source src="/images/home/hero.mp4" type="video/mp4" />
        <source src="./hero.mp4" type="video/mp4" />
        <source src="./images/home/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-scrim-overlay" aria-hidden="true" />
      <canvas ref={canvasRef} className="hero-particles-canvas" aria-hidden="true" />

      {/* Hero Content Positioned in the Clouds/Fog below the Castle */}
      <div className="hero-content-container hero-fog-bottom">
        <div className="hero-content-copy">
          <h1 className="hero-brand-heading">
            <span className="brand-word">NEXHACK</span>
            <sup className="brand-tag">2.0</sup>
          </h1>

          <div className="hero-gold-divider" aria-hidden="true">
            <span className="divider-line left" />
            <span className="divider-diamond">◆</span>
            <span className="divider-line right" />
          </div>

          <p className="hero-org-credit">
            Organized by <strong className="org-highlight">Geeta Technical Hub</strong> in collaboration with<br />
            <strong className="org-highlight">School of Computer Science and Engineering</strong> powered by <strong className="org-highlight">Codeforge</strong>
          </p>

          <div className="hero-action-group">
            <span className="flair-wing left" aria-hidden="true">― ◆</span>
            <a
              className="register-btn-gold"
              href="https://unstop.com/hackathons/nexhack-20-geeta-university-naultha-panipat-1733198"
              target="_blank"
              rel="noopener noreferrer"
            >
              REGISTER NOW
            </a>
            <span className="flair-wing right" aria-hidden="true">◆ ―</span>
          </div>
        </div>
      </div>
    </main>
  );
}
