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
    label: 'NON-STOP SPRINT',
    desc: 'Nonstop coding, prototyping, and problem-solving on campus.'
  },
  {
    icon: '✦',
    number: '160+ TEAMS',
    label: '23+ STATES',
    desc: 'Pan-India builders from universities and colleges uniting to innovate.'
  },
  {
    icon: '⬡',
    number: '10 TRACKS',
    label: 'DOMAIN CHALLENGES',
    desc: 'Specialized problem statements spanning EdTech, Web3, AI, and Open Innovation.'
  },
  {
    icon: '🏆',
    number: '₹1 LAKH+',
    label: 'PRIZE POOL & SWAGS',
    desc: 'Track awards, grand cash bounties, certificates, and curated dev swags.'
  }
];

export default function About() {
  return (
    <main className="objects-section about-editorial-page" id="about">
      {/* Background Atmosphere */}
      <div className="about-ambient-glow left" />
      <div className="about-ambient-glow right" />

      {/* Centered Heading */}
      <div className="about-heading-center-wrap">
        <h1 className="about-editorial-heading">
          <span>HACK THE</span>
          <span className="heading-line-glow">NEXT</span>
          <span>DIMENSION</span>
        </h1>
      </div>

      {/* Two-Column Editorial Hero Container */}
      <div className="about-editorial-container">
        {/* Left Column: Narrative */}
        <div className="about-editorial-left">

          <p className="about-editorial-desc">
            <strong>NexHack</strong> is the national-level 24-hour hackathon of <strong>Geeta University, Panipat (Delhi NCR)</strong>, organised by <strong>Geeta Technical Hub</strong> and <strong>School of Computer Science and Engineering</strong> powered by <strong>CodeForge Society</strong>. Built around the theme <em>“Hack the Next Dimension,”</em> it brings student teams of two to four from colleges and universities across India to the Geeta University campus for nonstop coding, prototyping, and problem-solving. Tracks span <strong>EdTech, Web3, AI in agriculture, and open innovation</strong>, so participants can build real solutions, work with mentors, and present working products to industry and academic judges.
          </p>

          <p className="about-editorial-desc">
            For students searching for a student hackathon in India, a coding competition in Delhi NCR, or a technology event at Geeta University Panipat, <strong>NexHack</strong> is the flagship platform where ideas move from concept to demo in a single day. The 2025 edition drew <strong>160 plus teams from more than 23 states</strong>, with certificates, swags, and track awards for winning builds. Whether you are a first-time builder or an experienced developer, NexHack at Geeta University is where campus innovation, industry exposure, and a 24-hour build sprint come together.
          </p>
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
                  <img src={`/images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
            <div className="glimpses-set">
              {glimpsesData.map((img) => (
                <div key={`row1-set2-${img.id}`} className="glimpses-card">
                  <img src={`/images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
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
                  <img src={`/images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
            <div className="glimpses-set">
              {[...glimpsesData].reverse().map((img) => (
                <div key={`row2-set2-${img.id}`} className="glimpses-card">
                  <img src={`/images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
