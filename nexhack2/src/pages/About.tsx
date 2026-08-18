import React from 'react';

interface GlimpseItem {
  id: number;
  file: string;
  alt: string;
}

const glimpsesData: GlimpseItem[] = [
  { id: 1, file: 'glimpse1.webp', alt: 'Enthusiastic wizarding hackathon participants coding together in a decorated hall' },
  { id: 2, file: 'glimpse2.webp', alt: 'A close-up of a developer focus-typing complex algorithms on a glowing mechanical keyboard' },
  { id: 3, file: 'glimpse3.webp', alt: 'An expert mentor explaining complex architecture ideas on a whiteboard' },
  { id: 4, file: 'glimpse4.webp', alt: 'Hackathon team showcasing an interactive IoT hardware project with sensor modules' },
  { id: 5, file: 'glimpse5.webp', alt: 'Team of developers smiling and celebrating their project completion' },
  { id: 6, file: 'glimpse6.webp', alt: 'Late night coding session with developers focused on debugging screens' },
  { id: 7, file: 'glimpse7.webp', alt: 'The main stage featuring dynamic neon lights and project code visualizations' },
  { id: 8, file: 'glimpse8.webp', alt: 'A brainstorming session with colorful sticky notes and UI wireframes' },
  { id: 9, file: 'glimpse9.webp', alt: 'Hackathon judges reviewing innovative code submissions at a developer desk' },
  { id: 10, file: 'glimpse10.webp', alt: 'A large energetic crowd cheering at the opening ceremony of the hackathon' },
  { id: 11, file: 'glimpse11.webp', alt: 'A high-performance workspace setup with neural network diagrams on screens' },
  { id: 12, file: 'glimpse12.webp', alt: 'Winning team holding a grand trophy and prizes on the main stage' },
];

interface StatBlock {
  icon: string;
  number: string;
  label: string;
  desc: string;
}

const statsData: StatBlock[] = [
  {
    icon: '⚡',
    number: '24 HRS',
    label: 'NON-STOP HACKING',
    desc: 'Around-the-clock building, live mentorship, and collaborative innovation.'
  },
  {
    icon: '✦',
    number: '1,000+',
    label: 'HACKERS EXPECTED',
    desc: 'Top student developers, sorcerers, and creators uniting from across the nation.'
  },
  {
    icon: '⬡',
    number: '10 TRACKS',
    label: 'DOMAIN CHALLENGES',
    desc: 'Specialized problem statements spanning AI, Web3, Cyber, and Open Innovation.'
  },
  {
    icon: '🏆',
    number: '₹1 LAKH+',
    label: 'PRIZE POOL & SWAGS',
    desc: 'Grand cash bounties, sponsor grants, dev tooling, and exclusive accolades.'
  }
];

const thematicTags = [
  'AI & INNOVATION',
  'OPEN INNOVATION',
  'BUILDERS WELCOME',
  'BEGINNER FRIENDLY'
];

export default function About() {
  return (
    <main className="objects-section about-editorial-page" id="about">
      {/* Background Atmosphere */}
      <div className="about-ambient-glow left" />
      <div className="about-ambient-glow right" />

      {/* Two-Column Editorial Hero Container */}
      <div className="about-editorial-container">
        {/* Left Column: Heading, Narrative, Tags */}
        <div className="about-editorial-left">
          <h1 className="about-editorial-heading">
            <span>HACK THE</span>
            <span className="heading-line-glow">NEXT</span>
            <span>DIMENSION</span>
          </h1>

          <p className="about-editorial-desc">
            A 24-hour hackathon uniting courageous developers, designers, and innovators to build cutting-edge solutions, collaborate with expert mentors, and compete for legendary prizes.
          </p>

          {/* Enchanted Thematic Labels */}
          <div className="about-tags-collection">
            {thematicTags.map((tag, i) => (
              <div key={i} className="about-editorial-tag">
                <span className="tag-sparkle">✦</span>
                <span className="tag-text">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 2x2 Stat Blocks */}
        <div className="about-editorial-right">
          <div className="about-stats-grid">
            {statsData.map((stat, idx) => (
              <div key={idx} className="about-stat-card">
                <div className="stat-card-top">
                  <span className="stat-card-icon">{stat.icon}</span>
                  <span className="stat-card-number">{stat.number}</span>
                </div>
                <h2 className="stat-card-label">{stat.label}</h2>
                <p className="stat-card-desc">{stat.desc}</p>

                {/* Decorative Filigree Corners */}
                <div className="stat-corner tl" />
                <div className="stat-corner tr" />
                <div className="stat-corner bl" />
                <div className="stat-corner br" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glimpses of NexHack 1.0 Photo Marquee */}
      <div className="glimpses-section">
        <h2 className="glimpses-title">Glimpses of NexHack 1.0</h2>
        <div className="glimpses-marquee row-right">
          <div className="glimpses-marquee-track scroll-right">
            <div className="glimpses-set">
              {glimpsesData.map((img) => (
                <div key={`row1-set1-${img.id}`} className="glimpses-card">
                  <img src={`./images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
            <div className="glimpses-set">
              {glimpsesData.map((img) => (
                <div key={`row1-set2-${img.id}`} className="glimpses-card">
                  <img src={`./images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="glimpses-marquee row-left">
          <div className="glimpses-marquee-track scroll-left">
            <div className="glimpses-set">
              {[...glimpsesData].reverse().map((img) => (
                <div key={`row2-set1-${img.id}`} className="glimpses-card">
                  <img src={`./images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
            <div className="glimpses-set">
              {[...glimpsesData].reverse().map((img) => (
                <div key={`row2-set2-${img.id}`} className="glimpses-card">
                  <img src={`./images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
