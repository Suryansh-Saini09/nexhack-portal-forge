import React from 'react';

const grandPrizes = [
  {
    id: 'snitch',
    rank: '1st',
    title: 'The Golden Snitch',
    subtitle: 'Grand Champions (1st)',
    image: './images/prizes/new_snitch.png',
    alt: 'Flying Golden Snitch',
    glowColor: 'rgba(238, 185, 57, 0.45)',
    borderColor: 'rgba(238, 185, 57, 0.35)',
    hoverBorderColor: 'rgba(238, 185, 57, 0.85)',
    badgeBg: 'linear-gradient(135deg, #f5c75d 0%, #eeb939 100%)',
    badgeColor: '#030305',
    lootColor: '#f5c75d',
    loot: '₹25,000 + Swags'
  },
  {
    id: 'galleons',
    rank: '2nd',
    title: 'The Gringotts Vault',
    subtitle: 'Reserve Champions (2nd)',
    image: './images/prizes/new_galleons.png',
    alt: 'Golden Galleon Coins',
    glowColor: 'rgba(192, 192, 192, 0.35)',
    borderColor: 'rgba(192, 192, 192, 0.3)',
    hoverBorderColor: 'rgba(192, 192, 192, 0.8)',
    badgeBg: 'rgba(192, 192, 192, 0.15)',
    badgeColor: '#c0c0c0',
    loot: '₹15,000 + Swags'
  },
  {
    id: 'wand',
    rank: '3rd',
    title: 'The Elder Wand',
    subtitle: 'Technical Vanguard (3rd)',
    image: './images/prizes/new_elder_wand.png',
    alt: 'The Elder Wand',
    glowColor: 'rgba(184, 115, 51, 0.35)',
    borderColor: 'rgba(184, 115, 51, 0.3)',
    hoverBorderColor: 'rgba(184, 115, 51, 0.8)',
    badgeBg: 'rgba(184, 115, 51, 0.15)',
    badgeColor: '#b87333',
    loot: '₹10,000 + Swags'
  }
];

function PrizeCard({ obj }) {
  return (
    <div
      className="simple-prize-card"
      style={{
        '--border-color': obj.borderColor,
        '--hover-border-color': obj.hoverBorderColor,
        '--glow-color': obj.glowColor,
        '--badge-color': obj.badgeColor,
        '--loot-color': obj.lootColor || obj.badgeColor
      }}
    >
      {/* Background Glow */}
      <div
        className="simple-prize-card-glow"
        style={{
          background: `radial-gradient(circle, ${obj.glowColor} 0%, rgba(0, 0, 0, 0) 70%)`
        }}
      />

      {/* Floating Sparkles Embers */}
      <div className="simple-prize-sparkles">
        <span className="sparkle s1"></span>
        <span className="sparkle s2"></span>
        <span className="sparkle s3"></span>
      </div>

      {/* Left Column: Image & Badge */}
      <div className="simple-prize-left-col">
        {/* Concentric Rotating Magic Circles */}
        <div className="simple-prize-image-ring" />
        <div className="simple-prize-image-ring-inner" />

        <div className="simple-prize-image-wrapper">
          <img
            src={obj.image}
            alt={obj.alt}
            className="simple-prize-image"
          />
        </div>
        
        <div
          className="simple-prize-badge"
          style={{
            background: obj.badgeBg,
            color: obj.badgeColor,
            borderColor: obj.borderColor
          }}
        >
          {obj.rank}
        </div>
      </div>

      {/* Right Column: Title, Subtitle, & Loot Badge */}
      <div className="simple-prize-right-col">
        <div>
          <h3 className="simple-prize-title">{obj.title}</h3>
          <p className="simple-prize-subtitle">{obj.subtitle}</p>
        </div>
        
        <div className="simple-prize-loot-badge">
          {obj.loot}
        </div>
      </div>
    </div>
  );
}

export default function Prizes() {
  return (
    <main className="objects-section">
      <div className="prizes-container">
        <h1 className="section-title">NexHack Rewards</h1>
        <p className="prizes-section-subtitle">
          Brew your algorithms and sculpt your code. Legendary loot and epic accolades await the finest tech sorcerers.
        </p>

        {/* Grand Prizes Section */}
        <h2 className="prizes-grid-title">Grand Prizes</h2>
        <div className="prizes-simple-grid grand-prizes-grid">
          {grandPrizes.map((prize) => (
            <PrizeCard key={prize.id} obj={prize} />
          ))}
        </div>
      </div>
    </main>
  );
}
