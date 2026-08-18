import React, { useState } from 'react';
import { postApi } from '../utils/api';

interface SponsorFormData {
  company: string;
  contactName: string;
  email: string;
  tier: string;
  message: string;
}

const sponsorPillars = [
  {
    icon: '⚡',
    tag: 'TALENT & REACH',
    title: '1,000+ Elite Builders',
    desc: 'Connect directly with high-caliber developers, designers, and AI creators from 50+ premier institutions.'
  },
  {
    icon: '🔮',
    tag: 'PRODUCT SPOTLIGHT',
    title: 'Custom Tracks & Bounties',
    desc: 'Empower hackers to build real-world solutions powered by your APIs, SDKs, dev tools, and cloud platforms.'
  },
  {
    icon: '📜',
    tag: 'HIRING PIPELINE',
    title: 'Direct Talent Access',
    desc: 'Fast-track recruitment with curated participant resumes, live project demonstrations, and interview access.'
  },
  {
    icon: '🏛️',
    tag: 'BRAND IMMERSION',
    title: 'Keynote & Booth Presence',
    desc: 'Claim the main stage for keynote addresses, interactive workshops, branded booth stalls, and mentor desks.'
  }
];

export default function Sponsors() {
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [isKeyTurning, setIsKeyTurning] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [formData, setFormData] = useState<SponsorFormData>({
    company: '',
    contactName: '',
    email: '',
    tier: 'Gold Ally',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCloseModal = () => {
    if (isKeyTurning || isModalClosing) return;
    setIsKeyTurning(true);
    // Key mechanically turns 180deg with a gold glint, then modal smoothly vanishes
    setTimeout(() => {
      setIsModalClosing(true);
      setTimeout(() => {
        setShowSponsorModal(false);
        setIsKeyTurning(false);
        setIsModalClosing(false);
        setSubmitted(false);
      }, 320);
    }, 380);
  };

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await postApi('/api/sponsor', formData);
      if (data && data.success) {
        setSubmitted(true);
        setFormData({ company: '', contactName: '', email: '', tier: 'Gold Ally', message: '' });
      } else {
        alert(data?.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      alert((err as Error).message || 'A network error occurred. Please try again.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 16px',
    borderRadius: '10px',
    background: 'rgba(10, 16, 28, 0.85)',
    border: '1px solid rgba(212, 175, 55, 0.35)',
    color: '#ffffff',
    fontFamily: 'Spectral, serif',
    fontSize: '0.96rem',
    outline: 'none',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.6)',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    cursor: 'text'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.74rem',
    color: '#f0c030',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    fontFamily: 'Cinzel, serif'
  };

  return (
    <main className="objects-section sponsors-page" id="sponsors">
      {/* Grand Section Header */}
      <div className="sponsors-grand-header">
        <div className="sponsors-eyebrow-badge">
          <span className="eyebrow-sparkle">✦</span>
          <span className="eyebrow-text">THE MINISTRY OF ALLIANCES & PATRONAGE</span>
          <span className="eyebrow-sparkle">✦</span>
        </div>
        <h1 className="section-title">Become a Sponsor</h1>
        <div className="themes-header-divider" style={{ margin: '14px auto 0' }} />
      </div>

      {/* Main Patronage Showcase Container */}
      <div className="sponsors-showcase-container">

        {/* 4 Patronage Impact Pillars */}
        <div className="sponsor-pillars-grid">
          {sponsorPillars.map((pillar, idx) => (
            <div key={idx} className="sponsor-pillar-card">
              <div className="pillar-header-row">
                <div className="pillar-icon-badge">{pillar.icon}</div>
                <span className="pillar-tag-pill">{pillar.tag}</span>
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
              <div className="pillar-corner-filigree" />
            </div>
          ))}
        </div>

        {/* Central Grand Alliance Decree Card */}
        <div className="sponsor-decree-card">
          <div className="decree-ambient-aura" />
          <div className="decree-top-hairline" />

          <div className="decree-seal-header">
            <div className="decree-wax-seal">
              <span className="wax-crest-icon">🛡️</span>
            </div>
            <div className="decree-header-text">
              <h3 className="decree-heading">Patronage Alliances Available</h3>
              <p className="decree-sub">Custom tiers crafted to amplify your brand presence and hiring goals.</p>
            </div>
          </div>

          <div className="decree-tiers-strip">
            <span className="tier-tag gold">✦ Gold Ally</span>
            <span className="tier-bullet">•</span>
            <span className="tier-tag platform">✦ Platform Ally</span>
            <span className="tier-bullet">•</span>
            <span className="tier-tag special">✦ Special Category</span>
            <span className="tier-bullet">•</span>
            <span className="tier-tag custom">✦ Custom / In-Kind</span>
          </div>

        {/* Action Controls */}
          <div className="decree-action-controls">
          <button
            onClick={() => setShowSponsorModal(true)}
            className="alliance-primary-btn"
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span className="btn-icon">🦉</span>
            <span>DISPATCH OWL INQUIRY</span>
          </button>

          <a
            href="./images/sponsors/NexHack_2.0_Sponsorship_Prospectus.pdf"
            download
            className="alliance-secondary-btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <span className="btn-icon">📜</span>
            <span>DOWNLOAD PROSPECTUS</span>
          </a>
        </div>

          {/* Ornate Corner Brackets */}
          <div className="alliance-corner-bracket tl" />
          <div className="alliance-corner-bracket tr" />
          <div className="alliance-corner-bracket bl" />
          <div className="alliance-corner-bracket br" />
        </div>
      </div>

      {/* Widened & Sleek Dispatch Owl Inquiry Vault Modal Card */}
      {showSponsorModal && (
        <div
          className="magic-modal-overlay"
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999999,
            background: 'rgba(3, 6, 14, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            opacity: isModalClosing ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <div
            className="owl-inquiry-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '740px',
              background: 'linear-gradient(155deg, rgba(16, 24, 40, 0.98) 0%, rgba(9, 14, 25, 0.99) 60%, rgba(6, 9, 16, 1) 100%)',
              border: '1.8px solid rgba(212, 175, 55, 0.65)',
              borderRadius: '22px',
              padding: '26px 38px 22px',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.96), 0 0 40px rgba(212, 175, 55, 0.22), inset 0 1px 2px rgba(255, 235, 160, 0.25)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              transform: isModalClosing ? 'scale(0.93) translateY(15px)' : 'scale(1) translateY(0)',
              filter: isModalClosing ? 'blur(5px)' : 'none',
              opacity: isModalClosing ? 0 : 1,
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Gilded Shimmer Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '12%',
                right: '12%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, #f0c030 50%, transparent 100%)',
                boxShadow: '0 0 10px rgba(240, 192, 48, 0.85)'
              }}
            />

            {/* Turning Golden Vault Key Close Button */}
            <button
              onClick={handleCloseModal}
              title="Turn Key to Close"
              aria-label="Turn key to close card"
              style={{
                position: 'absolute',
                top: '14px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(14, 23, 38, 0.95)',
                border: '1.2px solid rgba(212, 175, 55, 0.65)',
                color: '#f0c030',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 30,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6), 0 0 10px rgba(240, 192, 48, 0.25)',
                transition: 'all 0.3s ease',
                padding: 0
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isKeyTurning ? 'rotate(-180deg) scale(1.15)' : 'rotate(0deg) scale(1)',
                  filter: isKeyTurning ? 'drop-shadow(0 0 20px #ffd700) brightness(1.8)' : 'drop-shadow(0 0 4px #ffd700)',
                  transition: 'transform 0.4s cubic-bezier(0.3, 0, 0.2, 1), filter 0.35s ease'
                }}
              >
                <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </button>

            {submitted ? (
              <div style={{ padding: '16px 10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>✉️</div>
                <h2 style={{ fontFamily: 'HarryP, serif', fontSize: '2.4rem', color: '#ffffff', letterSpacing: '2px', margin: 0, textShadow: '0 0 14px rgba(240, 192, 48, 0.4)' }}>
                  Inquiry Dispatched!
                </h2>
                <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #f0c030, transparent)', margin: '8px auto' }} />
                <p style={{ fontFamily: 'Spectral, serif', fontSize: '0.94rem', color: 'rgba(245, 230, 200, 0.9)', lineHeight: 1.5, maxWidth: '420px', margin: '6px auto' }}>
                  Your alliance proposal has been sealed and dispatched! Our owl messenger is winging its way to the committee, and we will reply post-haste.
                </p>
                <button className="alliance-primary-btn" onClick={handleCloseModal} style={{ marginTop: '12px', padding: '10px 26px', fontSize: '0.82rem' }}>
                  <span>Mischief Managed ✦</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSponsorSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '2px', filter: 'drop-shadow(0 0 6px rgba(240, 192, 48, 0.4))' }}>🤝</div>
                  <h2 style={{ fontFamily: 'HarryP, serif', fontSize: '2.4rem', color: '#ffffff', letterSpacing: '2px', textShadow: '0 0 14px rgba(240, 192, 48, 0.35)', margin: 0, lineHeight: 1 }}>
                    Forge an Alliance
                  </h2>
                  <div style={{ width: '60px', height: '1.5px', background: 'linear-gradient(90deg, transparent, #f0c030, transparent)', margin: '6px auto 6px', boxShadow: '0 0 5px rgba(240, 192, 48, 0.6)' }} />
                  <p style={{ fontFamily: 'Spectral, serif', fontSize: '0.84rem', color: 'rgba(245, 230, 200, 0.82)', margin: '0 0 10px 0' }}>
                    Share your organization details to partner with <strong>NexHack 2.0</strong>.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <label style={labelStyle}>ORGANIZATION / COMPANY NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gringotts Bank"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>CONTACT PERSON NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Griphook"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <label style={labelStyle}>OWL ADDRESS (EMAIL)</label>
                    <input
                      type="email"
                      required
                      placeholder="partner@gringotts.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>INTEREST TIER</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      style={{ ...inputStyle, background: '#0a101c', cursor: 'pointer' }}
                    >
                      <option value="Gold Ally">Gold Ally</option>
                      <option value="Platform Ally">Platform Ally</option>
                      <option value="Special Ally">Special Ally</option>
                      <option value="Custom / In-Kind Ally">Custom / In-Kind Ally</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={labelStyle}>OWL POST MESSAGE / DETAILS</label>
                  <textarea
                    rows={2}
                    placeholder="Tell us how you would like to support our hackathon..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  className="alliance-primary-btn"
                  style={{
                    width: '100%',
                    padding: '11px 24px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    letterSpacing: '1.3px',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #f0c030 0%, #d4a017 100%)',
                    boxShadow: '0 0 20px rgba(240, 192, 48, 0.4)',
                    color: '#0a0d14',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginTop: '2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>SEND OWL MESSAGE 🦉</span>
                </button>
              </form>
            )}

            {/* Corner Filigree Brackets */}
            <div className="alliance-corner tl" />
            <div className="alliance-corner tr" />
            <div className="alliance-corner bl" />
            <div className="alliance-corner br" />
          </div>
        </div>
      )}
    </main>
  );
}
