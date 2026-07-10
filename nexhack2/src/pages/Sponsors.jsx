import React from 'react';

/* Replace src values with actual logo image paths when available */
const sponsorTiers = [
  {
    tier: 'Gold Sponsors',
    icon: '✦',
    accentColor: '#eeb939',
    size: 'large',
    sponsors: [
      { id: 'gringotts',  src: './images/sponsors/sponsor1.png', role: 'Title Sponsor' },
      { id: 'ollivanders', src: './images/sponsors/sponsor1.png', role: 'Hardware Sponsor' },
    ]
  },
  {
    tier: 'Platform Partner',
    icon: '◈',
    accentColor: '#c084fc',
    size: 'medium',
    sponsors: [
      { id: 'ministry', src: './images/sponsors/sponsor1.png', role: 'Cloud Partner' },
      { id: 'flourish',  src: './images/sponsors/sponsor1.png', role: 'Platform Partner' },
    ]
  },
  {
    tier: 'Special Sponsors',
    icon: '⬡',
    accentColor: '#38bdf8',
    size: 'medium',
    sponsors: [
      { id: 'weasleys',  src: './images/sponsors/sponsor1.png', role: 'Creativity Sponsor' },
      { id: 'honeyduke', src: './images/sponsors/sponsor1.png', role: 'Food Sponsor' },
      { id: 'quidditch', src: './images/sponsors/sponsor1.png', role: 'Sports-Tech Sponsor' },
    ]
  },
];

const communityPartners = [
  { id: 'prophet',    src: './images/sponsors/sponsor1.png' },
  { id: 'hogsmead',   src: './images/sponsors/sponsor1.png' },
  { id: 'sorting',    src: './images/sponsors/sponsor1.png' },
  { id: 'three-b',    src: './images/sponsors/sponsor1.png' },
  { id: 'divination', src: './images/sponsors/sponsor1.png' },
  { id: 'patronus',   src: './images/sponsors/sponsor1.png' },
  { id: 'leaky',      src: './images/sponsors/sponsor1.png' },
  { id: 'floo',       src: './images/sponsors/sponsor1.png' },
];

function LogoCard({ sponsor, size, accentColor }) {
  return (
    <div className="sponsor-card-wrap">
      <a
        href="#"
        className={`sponsor-logo-card sponsor-logo-card--${size}`}
        style={{ '--accent': accentColor }}
      >
        {sponsor.src
          ? <img src={sponsor.src} alt="sponsor logo" className="sponsor-logo-img" />
          : <div className="sponsor-logo-placeholder" />
        }
      </a>
      {sponsor.role && (
        <p className="sponsor-role-label">{sponsor.role}</p>
      )}
    </div>
  );
}

function TierSection({ tier }) {
  return (
    <div className="sponsor-tier">
      <div className="sponsor-tier-header">
        <span className="sponsor-tier-icon" style={{ color: tier.accentColor }}>{tier.icon}</span>
        <h2 className="sponsor-tier-title" style={{ color: tier.accentColor }}>{tier.tier}</h2>
        <div className="sponsor-tier-line" style={{ background: `linear-gradient(90deg, ${tier.accentColor}50, transparent)` }} />
      </div>

      <div className={`sponsor-tier-grid sponsor-tier-grid--${tier.size}`}>
        {tier.sponsors.map(s => (
          <LogoCard key={s.id} sponsor={s} size={tier.size} accentColor={tier.accentColor} />
        ))}
      </div>
    </div>
  );
}

function CommunityMarquee() {
  const accentColor = '#34d399';
  const row1 = [...communityPartners, ...communityPartners];
  const row2 = [...communityPartners, ...communityPartners].reverse();

  return (
    <div className="sponsor-tier">
      <div className="sponsor-tier-header">
        <span className="sponsor-tier-icon" style={{ color: accentColor }}>○</span>
        <h2 className="sponsor-tier-title" style={{ color: accentColor }}>Community Partners</h2>
        <div className="sponsor-tier-line" style={{ background: `linear-gradient(90deg, ${accentColor}50, transparent)` }} />
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track marquee-track--left">
          {row1.map((p, i) => (
            <a key={i} href="#" className="marquee-logo-card" style={{ '--accent': accentColor }}>
              {p.src
                ? <img src={p.src} alt="partner logo" className="sponsor-logo-img" />
                : <div className="sponsor-logo-placeholder" />
              }
            </a>
          ))}
        </div>

        <div className="marquee-track marquee-track--right">
          {row2.map((p, i) => (
            <a key={i} href="#" className="marquee-logo-card" style={{ '--accent': accentColor }}>
              {p.src
                ? <img src={p.src} alt="partner logo" className="sponsor-logo-img" />
                : <div className="sponsor-logo-placeholder" />
              }
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Sponsors() {
  return (
    <main className="objects-section sponsors-page">
      {/* Header */}
      <div className="themes-header" style={{ marginBottom: '70px' }}>
        <h1 className="section-title" style={{ marginBottom: '16px' }}>Sponsors</h1>
        <p className="themes-subheading">
          The wizarding world behind NexHack 2026 — organisations that believe in the next generation of builders.
        </p>
        <div className="themes-header-divider" />
      </div>

      {/* Tier sections */}
      <div className="sponsors-tiers-wrapper">
        {sponsorTiers.map((tier, i) => (
          <TierSection key={i} tier={tier} />
        ))}
        <CommunityMarquee />
      </div>

      {/* ── Become a Sponsor CTA ── */}
      <div className="sponsor-cta-block">
        {/* Animated bg orbs */}
        <div className="cta-orb cta-orb--gold" />
        <div className="cta-orb cta-orb--purple" />

        <p className="themes-eyebrow" style={{ marginBottom: '12px' }}>
          ✦ &nbsp;Join the Magic
        </p>
        <h2 className="sponsor-cta-title">Become a Sponsor</h2>
        <p className="sponsor-cta-desc">
          Partner with NexHack 2026 to showcase your brand, connect with top-tier developer talent, and fuel the next wave of wizarding innovation.
        </p>

        {/* Actions */}
        <div className="sponsor-cta-actions">
          <a href="mailto:sponsors@nexhack.in" className="register-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Contact Us
          </a>
          <a href="#" className="sponsor-cta-link">Download Sponsorship Kit →</a>
        </div>
      </div>
    </main>
  );
}

