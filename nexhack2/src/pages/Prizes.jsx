import React from 'react';

const grandPrizes = [
  {
    id: 'snitch',
    rank: '1st',
    title: 'Golden Snitch',
    subtitle: '1st Prize',
    description: 'Ultimate champions.',
    image: '/nexhack2/images/prizes/new_snitch.png',
    alt: 'Flying Golden Snitch',
    glowColor: 'rgba(238, 185, 57, 0.45)',
    borderColor: 'rgba(238, 185, 57, 0.35)',
    hoverBorderColor: 'rgba(238, 185, 57, 0.85)',
    badgeBg: 'linear-gradient(135deg, #f5c75d 0%, #eeb939 100%)',
    badgeColor: '#030305',
    loot: '₹35,000 + Gear'
  },
  {
    id: 'galleons',
    rank: '2nd',
    title: 'Galleon Pool',
    subtitle: '2nd Prize',
    description: 'Runner-up team.',
    image: '/nexhack2/images/prizes/new_galleons.png',
    alt: 'Golden Galleon Coin',
    glowColor: 'rgba(192, 192, 192, 0.35)',
    borderColor: 'rgba(192, 192, 192, 0.3)',
    hoverBorderColor: 'rgba(192, 192, 192, 0.8)',
    badgeBg: 'rgba(192, 192, 192, 0.15)',
    badgeColor: '#c0c0c0',
    loot: '₹25,000 + Swag'
  },
  {
    id: 'wand',
    rank: '3rd',
    title: 'Elder Wand',
    subtitle: '3rd Prize',
    description: 'Technical mastery.',
    image: '/nexhack2/images/prizes/new_elder_wand.png',
    alt: 'The Elder Wand',
    glowColor: 'rgba(184, 115, 51, 0.35)',
    borderColor: 'rgba(184, 115, 51, 0.3)',
    hoverBorderColor: 'rgba(184, 115, 51, 0.8)',
    badgeBg: 'rgba(184, 115, 51, 0.15)',
    badgeColor: '#b87333',
    loot: '₹15,000 + Perks'
  }
];

const specialPrizes = [
  {
    id: 'girls-team',
    rank: 'Track',
    title: 'Best Girls Team',
    subtitle: "Hermione's Choice",
    description: 'Top female project.',
    image: '/nexhack2/images/prizes/time_turner.png',
    alt: 'Time Turner Medal',
    glowColor: 'rgba(138, 43, 226, 0.4)',
    borderColor: 'rgba(138, 43, 226, 0.3)',
    hoverBorderColor: 'rgba(138, 43, 226, 0.85)',
    badgeBg: 'rgba(138, 43, 226, 0.15)',
    badgeColor: '#dca4ff',
    loot: '₹10,000 + Swag'
  },
  {
    id: 'ai-innovation',
    rank: 'Track',
    title: 'Best AI Innovation',
    subtitle: "Sorting Hat's Pick",
    description: 'Top AI implementation.',
    image: '/nexhack2/images/prizes/sorting_hat_ai.png',
    alt: 'AI Sorting Hat',
    glowColor: 'rgba(0, 206, 209, 0.4)',
    borderColor: 'rgba(0, 206, 209, 0.3)',
    hoverBorderColor: 'rgba(0, 206, 209, 0.85)',
    badgeBg: 'rgba(0, 206, 209, 0.15)',
    badgeColor: '#4ee2ec',
    loot: '₹10,000 + Credits'
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
        '--badge-color': obj.badgeColor
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

      {/* Right Column: Title, Subtitle, Description & Loot Badge */}
      <div className="simple-prize-right-col">
        <div>
          <h3 className="simple-prize-title">{obj.title}</h3>
          <p className="simple-prize-subtitle">{obj.subtitle}</p>
        </div>
        
        <p className="simple-prize-description">{obj.description}</p>

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

        {/* Special Recognition Tracks Section */}
        <h2 className="prizes-grid-title" style={{ marginTop: '50px' }}>Special Recognition Tracks</h2>
        <div className="prizes-simple-grid special-tracks-grid">
          {specialPrizes.map((prize) => (
            <PrizeCard key={prize.id} obj={prize} />
          ))}
        </div>
      </div>
    </main>
  );
}
