import React, { useState, useRef, useEffect } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  socials: { github: string; linkedin: string };
}

const teamData: TeamMember[] = [
  { id: 'shravya-atrey',    name: 'Shravya Atrey',    role: 'Core Lead',                                    image: './images/team/shravya.png', socials: { github: 'https://github.com/shravya315',            linkedin: 'https://www.linkedin.com/in/shravyatrey315/' } },
  { id: 'sahil-bhardwaj',   name: 'Sahil Bhardwaj',   role: 'Core Lead',                                    image: './images/team/sahil.png',   socials: { github: 'https://github.com/sahil-codesfor-fun',    linkedin: 'https://www.linkedin.com/in/sahil-bhardwajs10/' } },
  { id: 'muskan-kaushik',   name: 'Muskan Kaushik',   role: 'Technical Lead',                               image: './images/team/muskan.png',  socials: { github: 'https://github.com/kaushikmuskan29',       linkedin: 'https://www.linkedin.com/in/kaushikmuskan29' } },
  { id: 'kunal-khandelwal', name: 'Kunal Khandelwal', role: 'Outreach Head',                                image: './images/team/kunal.jpeg',  socials: { github: 'https://github.com/KunalKhandelwal-dev',   linkedin: 'https://in.linkedin.com/in/kunal-khandelwal-62a5b1311' } },
  { id: 'vinit-vashishta',  name: 'Vinit Vashishta',  role: 'Social Media & Public Relations Head',         image: './images/team/vinit.png',   socials: { github: 'https://github.com',                       linkedin: 'https://www.linkedin.com/in/vinit-vashishta-4280b8323/' } },
  { id: 'nera',             name: 'Nera',             role: 'Design and Creative Head',                     image: './images/team/nera.png',    socials: { github: 'https://github.com/nera8563',              linkedin: 'https://www.linkedin.com/in/nera123' } },
  { id: 'krishna-garg',     name: 'Krishna Garg',     role: 'Registration & Participant Relations Head',    image: './images/team/krishna.png', socials: { github: 'https://github.com/Krishna-Gupta-Git',     linkedin: 'https://www.linkedin.com/in/krishna-gupta-890147374' } },
  { id: 'lakshay',          name: 'Lakshay',          role: 'Volunteer Management Head',                    image: './images/team/lakshay.png', socials: { github: 'https://github.com/Lakshayy-y',            linkedin: 'https://www.linkedin.com/in/lakshaymittal012' } },
  { id: 'janvi',            name: 'Janvi',            role: 'Content & Documentation Head',                 image: './images/team/janvi.png',   socials: { github: 'https://github.com/JANVI2223',             linkedin: 'https://www.linkedin.com/in/janvidevi49' } },
  { id: 'drishti',          name: 'Drishti',          role: 'Marketing Head',                               image: './images/team/drishti.png', socials: { github: 'https://github.com/jaspaldrishti-droid',   linkedin: 'https://www.linkedin.com/in/drishti-jaspal12' } },
];

function TeamCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="card-wrapper" data-id={member.id}>
      <div className="card">
        <div className="card-image-container">
          {imageError ? (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a2035 0%, #0b0f19 100%)', border: '1px dashed rgba(240, 199, 94, 0.4)', borderRadius: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', fontWeight: 'bold', fontFamily: "'HarryP', 'Cinzel', serif", color: '#f0c75e', textShadow: '0 0 12px rgba(240, 199, 94, 0.5)', letterSpacing: '1px', userSelect: 'none' }}>
              {getInitials(member.name)}
            </div>
          ) : (
            <img src={member.image} alt={member.name} className="character-portrait" onError={() => setImageError(true)} />
          )}
        </div>
      </div>
      <div className="card-details-below">
        <h2 className="character-name">{member.name}</h2>
        <p className="character-role">{member.role}</p>
        <div className="team-social-links">
          <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="team-social-icon" onClick={e => e.stopPropagation()} aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          </a>
          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="team-social-icon" onClick={e => e.stopPropagation()} aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <main className="characters-section">
      <h1 className="section-title">Organizing Committee</h1>
      <div className="cards-grid team-grid">
        {teamData.map(member => <TeamCard key={member.id} member={member} />)}
      </div>
    </main>
  );
}
