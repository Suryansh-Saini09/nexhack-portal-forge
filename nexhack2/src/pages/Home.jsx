import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleCloseModal = () => {
    setIsRotating(true);
    setTimeout(() => {
      setShowModal(false);
      setIsRotating(false);
    }, 500);
  };

  useEffect(() => {
    // 1. Rain Effect
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = (canvas.width = window.innerWidth);
      height = (canvas.height = window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const maxDrops = 110;
    const drops = [];

    class Drop {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vy = Math.random() * 8 + 10;
        this.len = Math.random() * 15 + 10;
        this.opacity = Math.random() * 0.15 + 0.05;
      }
      draw() {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(174, 219, 255, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 1, this.y + this.len);
        ctx.stroke();
      }
      update() {
        this.y += this.vy;
        if (this.y > height) {
          this.reset();
        }
      }
    }

    for (let i = 0; i < maxDrops; i++) {
      drops.push(new Drop());
    }

    let rainId;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      drops.forEach(drop => {
        drop.update();
        drop.draw();
      });
      rainId = requestAnimationFrame(loop);
    };
    loop();

    // 2. Lightning Effect
    const hero = heroRef.current;
    let lightningTimerId;

    const triggerLightning = () => {
      if (!hero) return;
      hero.classList.add('lightning-flash');

      setTimeout(() => {
        if (hero) hero.classList.remove('lightning-flash');
      }, 800);

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
      <h1 className="hp-main-title">NexHack 2.0</h1>
      <div className="hero-subtitles">
        <p className="hero-subtitle organised-by">
          Organised by <span className="highlight-text">Geeta Technical Hub</span> and <span className="highlight-text">School of Computer Science and Engineering</span>
        </p>
        <p className="hero-subtitle powered-by">
          Powered by <span className="highlight-text">Codeforge Society</span>
        </p>
        <button className="register-btn" onClick={() => setShowModal(true)}>
          Register Now
        </button>
      </div>
      <canvas ref={canvasRef} id="rain-canvas" />

      {showModal && (
        <div className="magic-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="magic-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className={`magic-modal-close ${isRotating ? 'key-rotate' : ''}`} 
              onClick={handleCloseModal}
              style={{ padding: '4px' }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="magic-modal-key-icon"
              >
                <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </button>
            <div className="magic-modal-icon" aria-hidden="true">🔒</div>
            <h2 className="magic-modal-title">Chamber Sealed!</h2>
            <div className="magic-modal-divider" />
            <p className="magic-modal-text">
              Hold your wands, apprentice! The Registry Scroll is currently locked under an <span className="magic-modal-highlight">Alohomora</span> charm. The counter-spell is being brewed—registration will open soon!
            </p>
            <button className="magic-modal-btn" onClick={() => setShowModal(false)}>
              Dismiss Charm
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
