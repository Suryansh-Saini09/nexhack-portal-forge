import React from 'react';

const glimpsesData = [
  { id: 1, file: 'glimpse1.jpg', alt: 'Enthusiastic wizarding hackathon participants coding together in a decorated hall' },
  { id: 2, file: 'glimpse2.JPG', alt: 'A close-up of a developer focus-typing complex algorithms on a glowing mechanical keyboard' },
  { id: 3, file: 'glimpse3.JPG', alt: 'An expert mentor explaining complex architecture ideas on a whiteboard' },
  { id: 4, file: 'glimpse4.JPG', alt: 'Hackathon team showcasing an interactive IoT hardware project with sensor modules' },
  { id: 5, file: 'glimpse5.JPG', alt: 'Team of developers smiling and celebrating their project completion' },
  { id: 6, file: 'glimpse6.JPG', alt: 'Late night coding session with developers focused on debugging screens' },
  { id: 7, file: 'glimpse7.JPG', alt: 'The main stage featuring dynamic neon lights and project code visualizations' },
  { id: 8, file: 'glimpse8.JPG', alt: 'A brainstorming session with colorful sticky notes and UI wireframes' },
  { id: 9, file: 'glimpse9.JPG', alt: 'Hackathon judges reviewing innovative code submissions at a developer desk' },
  { id: 10, file: 'glimpse10.JPG', alt: 'A large energetic crowd cheering at the opening ceremony of the hackathon' },
  { id: 11, file: 'glimpse11.JPG', alt: 'A high-performance workspace setup with neural network diagrams on screens' },
  { id: 12, file: 'glimpse12.JPG', alt: 'Winning team holding a grand trophy and prizes on the main stage' }
];

export default function About() {
  return (
    <main className="objects-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 className="section-title" style={{ marginBottom: '40px' }}>About NexHack</h1>
      <div className="objects-container" style={{ gap: '0' }}>
        <div className="object-card" style={{ maxWidth: '1100px', margin: '0 auto', float: 'none' }}>
          <div className="wand-decor" />
          <div className="object-card-content" style={{ textAlign: 'center', paddingLeft: '0' }}>
            <h2 className="object-title" style={{ fontSize: '2.8rem' }}>The Wizarding Hackathon</h2>
            <div className="object-divider" style={{ margin: '15px auto 25px auto' }} />
            <p className="object-description" style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '20px' }}>
              Welcome to NexHack 2026, the ultimate intersection of code and magic. This 24-hour hackathon gathers the most courageous developers, brilliant designers, and logical visionaries to build cutting-edge solutions for the modern world. Prepare for 24 hours of innovation to push your limits and create something extraordinary in our intense coding marathon.
            </p>
            <p className="object-description" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
              Whether you are brewing deep learning algorithms, building cryptographically secure blockchains, or sculpting immersive interactive realities, NexHack provides the resources, mentorship, and magical atmosphere to turn your ideas into functional tech-spells. Level up your skills with our expert mentors and workshops, and compete for legendary loot and epic prizes including cash rewards and exclusive tech gear.
            </p>
          </div>
        </div>
      </div>
      <div className="glimpses-section">
        <h2 className="glimpses-title">Glimpses of NexHack 1.0</h2>
        
        {/* Row 1: Rightward Scrolling (Left to Right) */}
        <div className="glimpses-marquee row-right">
          <div className="glimpses-marquee-track scroll-right">
            {/* Set 1 */}
            <div className="glimpses-set">
              {glimpsesData.map((img) => (
                <div key={`row1-set1-${img.id}`} className="glimpses-card">
                  <img src={`./images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
            {/* Set 2 (Identical duplicate for infinite seamless loop) */}
            <div className="glimpses-set">
              {glimpsesData.map((img) => (
                <div key={`row1-set2-${img.id}`} className="glimpses-card">
                  <img src={`./images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Leftward Scrolling (Right to Left) */}
        <div className="glimpses-marquee row-left">
          <div className="glimpses-marquee-track scroll-left">
            {/* Set 1 (Reversed) */}
            <div className="glimpses-set">
              {[...glimpsesData].reverse().map((img) => (
                <div key={`row2-set1-${img.id}`} className="glimpses-card">
                  <img src={`./images/glimpses/${img.file}`} alt={img.alt} className="glimpses-img" />
                </div>
              ))}
            </div>
            {/* Set 2 (Reversed identical duplicate for infinite seamless loop) */}
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
