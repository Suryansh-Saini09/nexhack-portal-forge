import React, { useState } from 'react';

export default function Contact() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <main className="objects-section owl-post-section" id="contact" style={{ padding: '40px 20px 70px' }}>
      {/* Grand Header */}
      {/* Section Header */}
      <div className="owl-post-grand-header" style={{ marginBottom: '28px' }}>
        <h1 className="editorial-main-title" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.6rem)', margin: '0 0 10px' }}>
          Get in Touch
        </h1>
      </div>

      {/* Wide Majestic Enchanted Contact Card */}
      <div className="owl-vault-container" style={{ maxWidth: '980px' }}>
        <div className="owl-sanctum-card wide-card">
          {/* Ambient Lighting & Top Hairline */}
          <div className="decree-ambient-aura" />
          <div className="decree-top-hairline" />

          {/* ── TOP ROW: PRIMARY CONTACT DESKS (2 COLUMNS) ── */}
          <div className="owl-primary-grid">
            {/* Email Box */}
            <div className="owl-primary-card">
              <div className="primary-card-top">
                <div className="primary-icon-badge">✉️</div>
                <div className="primary-meta">
                  <span className="primary-tag">OFFICIAL DESK</span>
                  <h3 className="primary-title">OWL POST (EMAIL)</h3>
                </div>
              </div>
              <p className="primary-subtext">
                For alliances, sponsorships, query resolutions & participant assistance.
              </p>
              <div className="primary-action-wrap">
                <a
                  href="mailto:nexhack@geetauniversity.edu.in"
                  className="primary-val-link"
                  title="Send Email"
                >
                  <span>nexhack@geetauniversity.edu.in</span>
                  <span className="tile-arrow">↗</span>
                </a>
                <button
                  onClick={() => handleCopy('nexhack@geetauniversity.edu.in', 'email')}
                  className="primary-copy-btn"
                  title="Copy email to clipboard"
                >
                  {copiedId === 'email' ? 'COPIED ✦' : 'COPY'}
                </button>
              </div>
            </div>

            {/* Phone Box */}
            <div className="owl-primary-card">
              <div className="primary-card-top">
                <div className="primary-icon-badge">📜</div>
                <div className="primary-meta">
                  <span className="primary-tag">DIRECT HOTLINE</span>
                  <h3 className="primary-title">HOWLER TRANSMISSION</h3>
                </div>
              </div>
              <p className="primary-subtext">
                Direct telephonic contact with student convenors & faculty coordinators.
              </p>
              <div className="primary-action-wrap">
                <a
                  href="tel:+919053709750"
                  className="primary-val-link"
                  title="Call Hotline"
                >
                  <span>+91 9053709750</span>
                  <span className="tile-arrow">↗</span>
                </a>
                <button
                  onClick={() => handleCopy('+919053709750', 'phone')}
                  className="primary-copy-btn"
                  title="Copy phone number"
                >
                  {copiedId === 'phone' ? 'COPIED ✦' : 'COPY'}
                </button>
              </div>
            </div>
          </div>

          {/* ── BOTTOM ROW: SOCIALS & VENUE (3 COLUMNS) ── */}
          <div className="owl-secondary-grid">
            {/* Discord */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="owl-secondary-tile"
              title="Join Discord Sanctum"
            >
              <div className="secondary-icon-bubble">💬</div>
              <div className="secondary-content">
                <span className="secondary-label">COMMUNITY</span>
                <span className="secondary-val">DISCORD SANCTUM ↗</span>
                <span className="secondary-sub">discord.gg/thenexhack</span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/thenexhack"
              target="_blank"
              rel="noopener noreferrer"
              className="owl-secondary-tile"
              title="Follow Instagram Scroll"
            >
              <div className="secondary-icon-bubble">📸</div>
              <div className="secondary-content">
                <span className="secondary-label">CHRONICLES</span>
                <span className="secondary-val">INSTAGRAM SCROLL ↗</span>
                <span className="secondary-sub">@thenexhack</span>
              </div>
            </a>

            {/* Venue */}
            <a
              href="https://maps.google.com/?q=Geeta+University+Panipat"
              target="_blank"
              rel="noopener noreferrer"
              className="owl-secondary-tile"
              title="View on Google Maps"
            >
              <div className="secondary-icon-bubble">📍</div>
              <div className="secondary-content">
                <span className="secondary-label">PHYSICAL REALM</span>
                <span className="secondary-val">GEETA UNIVERSITY ↗</span>
                <span className="secondary-sub">Panipat, Delhi-NCR</span>
              </div>
            </a>
          </div>

          {/* Corner Filigree Brackets */}
          <div className="seal-corner tl" />
          <div className="seal-corner tr" />
          <div className="seal-corner bl" />
          <div className="seal-corner br" />
        </div>
      </div>
    </main>
  );
}
