import React from 'react';

export default function Home() {
  return (
    <main className="hero-section homepage-hero-bg">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="homepage-bg-img homepage-hero-video"
      >
        <source src="/hero.mp4" type="video/mp4" />
        <source src="/images/home/hero.mp4" type="video/mp4" />
        <source src="./hero.mp4" type="video/mp4" />
        <source src="./images/home/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-scrim-overlay" aria-hidden="true" />

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
