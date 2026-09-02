import React, { useEffect, useRef } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handled safely in low-power/data-saver mode
        });
      }
    }
  }, []);

  return (
    <main className="hero-section homepage-hero-bg">
      {/* Desktop Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        poster="/images/home/hero_poster.webp"
        className="homepage-bg-img homepage-hero-video desktop-only-hero-video"
      >
        <source src="/images/home/hero.webm" type="video/webm" />
        <source src="./images/home/hero.webm" type="video/webm" />
        <source src="/images/home/hero.mp4" type="video/mp4" />
        <source src="./images/home/hero.mp4" type="video/mp4" />
      </video>

      {/* Mobile-Only Static Poster Background (prevents iPhone video play button overlay) */}
      <img
        src="/images/home/hero_poster.webp"
        alt="NexHack 2.0 Castle"
        className="homepage-bg-img homepage-hero-poster-img mobile-only-hero-img"
        loading="eager"
      />

      <div className="hero-scrim-overlay" aria-hidden="true" />

      {/* Hero Content Positioned Centered over Background */}
      <div className="hero-content-container hero-center-content">
        <div className="hero-content-copy">
          <h1 className="hero-brand-heading">
            <span className="brand-word">NEXHACK</span>
            <span className="brand-tag">2.0</span>
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
