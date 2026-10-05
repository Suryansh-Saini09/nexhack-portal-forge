import React, { useState } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  socials: { github?: string; linkedin?: string };
  organization?: string;
  quote?: string;
}

// 🏛️ FACULTY ADVISORY — The High Council (Council of Arch-Mages)
const facultyTeam: TeamMember[] = [
  {
    id: 'pankaj-bajaj',
    name: 'Mr. Pankaj Bajaj',
    role: 'Chief Operating Officer, Geeta Technical Hub',
    organization: 'Geeta University',
    image: './images/team/pankaj.webp',
    socials: {
      github: '',
      linkedin: 'https://www.linkedin.com/in/pankajbajaj4u'
    },
    quote: 'NexHack is where Geeta University turns 24 hours of coding into solutions industry can actually use. As Convener, I built it so every student team leaves with a working product, not just an idea. EdTech, Web3, AI in agriculture, or open innovation one night on campus, and the build is real.'
  }
];

// ⚡ CORE OPERATIONS
const coreOperationsTeam: TeamMember[] = [
  {
    id: 'pranshul-threja',
    name: 'Pranshul Threja',
    role: 'Core Operations',
    image: './images/team/pranshul.webp',
    socials: {
      github: 'https://github.com/pranshulcse',
      linkedin: 'https://www.linkedin.com/in/pranshul132001'
    }
  },
  {
    id: 'khushi-saini',
    name: 'Khushi Saini',
    role: 'Core Operations',
    image: './images/team/khushi.webp',
    socials: {
      github: '',
      linkedin: 'https://www.linkedin.com/in/khushi-saini-84b87b263'
    }
  },
  {
    id: 'garima-malik',
    name: 'Garima Malik',
    role: 'Core Operations',
    image: './images/team/garima.webp',
    socials: {
      github: 'https://github.com/garima-m14',
      linkedin: 'https://www.linkedin.com/in/garima-malik-5b2842291'
    }
  }
];

// ⚡ CORE COMMITTEE — Order of the Phoenix (Leads, Executives, Department Heads & Sub-Core)
const coreTeam: TeamMember[] = [
  { id: 'shravya-atrey', name: 'Shravya Atrey', role: 'Core Lead', image: './images/team/shravya.webp', socials: { github: 'https://github.com/shravya315', linkedin: 'https://www.linkedin.com/in/shravyatrey315/' } },
  { id: 'gagan-thakur', name: 'Gagan Thakur', role: 'Core Lead', image: './images/team/gagan.webp', socials: { github: 'https://github.com/Gaganthakur0101', linkedin: 'https://www.linkedin.com/in/gagan-singh0101/' } },
  { id: 'sahil-bhardwaj', name: 'Sahil Bhardwaj', role: 'Core Lead', image: './images/team/sahil.webp', socials: { github: 'https://github.com/sahil-codesfor-fun', linkedin: 'https://www.linkedin.com/in/sahil-bhardwajs10/' } },
  { id: 'muskan-kaushik', name: 'Muskan Kaushik', role: 'Core Executive', image: './images/team/muskan.webp', socials: { github: 'https://github.com/kaushikmuskan29', linkedin: 'https://www.linkedin.com/in/kaushikmuskan29' } },
  { id: 'riya-rana', name: 'Riya Rana', role: 'Core Executive', image: './images/team/riya.webp', socials: { github: 'https://github.com/riyarana9813', linkedin: 'https://www.linkedin.com/in/riya-rana-b752a6327/' } },
  { id: 'pratyaksh-goel', name: 'Pratyaksh Goel', role: 'Outreach Head', image: './images/team/pratyaksh.webp', socials: { github: 'https://github.com/Pratyaksh12134', linkedin: 'https://www.linkedin.com/in/partyksh-goel-15781b323?utm_source=share_via&utm_content=profile&utm_medium=member_ios' } },
  { id: 'nera-shyoran', name: 'Nera Shyoran', role: 'Design and Creative Head', image: './images/team/nera.webp', socials: { github: 'https://github.com/nera8563', linkedin: 'https://www.linkedin.com/in/nera123' } },
  { id: 'kunal-khandelwal', name: 'Kunal Khandelwal', role: 'Logistics Head', image: './images/team/kunal.webp', socials: { github: 'https://github.com/KunalKhandelwal-dev', linkedin: 'https://in.linkedin.com/in/kunal-khandelwal-62a5b1311' } },
  { id: 'vinit-vashishta', name: 'Vinit Vashishta', role: 'Social Media & Public Relations Head', image: './images/team/vinit.webp', socials: { github: 'https://github.com', linkedin: 'https://www.linkedin.com/in/vinit-vashishta-4280b8323/' } },
  { id: 'krishna-gupta', name: 'Krishna Gupta', role: 'Registration & Participant Relations Head', image: './images/team/krishna.webp', socials: { github: 'https://github.com/Krishna-Gupta-Git', linkedin: 'https://www.linkedin.com/in/krishna-gupta-890147374' } },
  { id: 'lakshay-mittal', name: 'Lakshay Mittal', role: 'Volunteer Management Head', image: './images/team/lakshay.webp', socials: { github: 'https://github.com/Lakshayy-y', linkedin: 'https://www.linkedin.com/in/lakshaymittal012' } },
  { id: 'janvi-devi', name: 'Janvi Devi', role: 'Content & Documentation Head', image: './images/team/janvi.webp', socials: { github: 'https://github.com/JANVI2223', linkedin: 'https://www.linkedin.com/in/janvidevi49' } },
  { id: 'drishti-jaspal', name: 'Drishti Jaspal', role: 'Marketing Head', image: './images/team/drishti.webp', socials: { github: 'https://github.com/jaspaldrishti-droid', linkedin: 'https://www.linkedin.com/in/drishti-jaspal12' } },
  { id: 'vanshika-gulia', name: 'Vanshika Gulia', role: 'Outreach', image: './images/team/vanshika.webp', socials: { github: 'https://github.com/vanshikagulia2007-rgb', linkedin: 'https://www.linkedin.com/in/vanshika-gulia7' } },
  { id: 'urmika-sharma', name: 'Urmika Sharma', role: 'Outreach', image: './images/team/urmika.webp', socials: { github: '', linkedin: '' } },
  { id: 'krish-garg', name: 'Krish Garg', role: 'Outreach', image: './images/team/krish.webp', socials: { github: 'https://github.com/072Krish', linkedin: 'https://www.linkedin.com/in/garg-krish0001/' } },
  { id: 'keshav-jindal', name: 'Keshav Jindal', role: 'Social Media', image: './images/team/keshav.webp', socials: { github: 'https://github.com/keshavjindal012', linkedin: 'https://www.linkedin.com/in/keshavjindal012' } },
];

function FacultyCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="faculty-card-wrapper" data-id={member.id}>
      <div className="faculty-card-inner">
        {/* Subtle ambient lighting inside card */}
        <div className="faculty-card-glow" />

        {/* Portrait container */}
        <div className="faculty-portrait-box">
          {imageError ? (
            <div className="faculty-portrait-fallback">
              {getInitials(member.name)}
            </div>
          ) : (
            <img src={member.image} alt={member.name} className="faculty-portrait-img" onError={() => setImageError(true)} />
          )}
        </div>

        {/* Content details with exact same wording */}
        <div className="faculty-details">
          <div className="faculty-header-row">
            <div className="faculty-title-group">
              <h2 className="faculty-name">{member.name}</h2>
              <p className="faculty-role">{member.role}</p>
              {member.organization && <p className="faculty-org">{member.organization}</p>}
            </div>

            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="faculty-linkedin-btn"
                aria-label={`${member.name} LinkedIn`}
                title="Connect on LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
          </div>

          <div className="faculty-divider" />

          {member.quote && (
            <p className="faculty-quote">
              “{member.quote}”
            </p>
          )}
        </div>

        {/* Decorative filigree corners */}
        <div className="stat-corner tl" />
        <div className="stat-corner tr" />
        <div className="stat-corner bl" />
        <div className="stat-corner br" />
      </div>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="card-wrapper" data-id={member.id}>
      <div className="card">
        <div className="card-image-container">
          {imageError ? (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a2035 0%, #0b0f19 100%)', border: '1px dashed rgba(240, 199, 94, 0.4)', borderRadius: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', fontWeight: 'bold', fontFamily: "'HarryP', 'Cinzel', serif", color: '#f0c030', textShadow: '0 0 12px rgba(240, 199, 94, 0.5)', letterSpacing: '1px', userSelect: 'none' }}>
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
          {member.socials.github && member.socials.github !== '#' && (
            <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="team-social-icon" onClick={e => e.stopPropagation()} aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
            </a>
          )}
          {member.socials.linkedin && member.socials.linkedin !== '#' && (
            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="team-social-icon" onClick={e => e.stopPropagation()} aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <main className="characters-section">
      <h1 className="section-title">Organizing Committee</h1>
      <p className="team-main-subtitle">The Sorcerers, Enchanters & Guild Masters Guiding the Realm</p>

      {/* 🏛️ SECTION 1: THE HIGH COUNCIL (Faculty Advisory Board) */}
      <section className="team-chamber-section">
        <div className="team-chamber-header">
          <div className="team-crest-badge core-badge">
            <span className="badge-spark">✦</span>
            <span>COUNCIL OF ARCH-MAGES</span>
          </div>
          <h2 className="team-chamber-title">The High Council</h2>
          <p className="team-chamber-subtitle">Faculty Leadership & Advisory Board</p>
          <div className="team-chamber-ornament">
            <span className="ornament-line" />
            <span className="ornament-glyph">❖</span>
            <span className="ornament-line" />
          </div>
        </div>

        <div className="faculty-cards-container">
          {facultyTeam.map(member => (
            <FacultyCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Decorative Divider Between Chambers */}
      <div className="team-chamber-divider">
        <div className="divider-line" />
        <div className="divider-sigil">✦</div>
        <div className="divider-line" />
      </div>

      {/* ⚡ SECTION 2: CORE OPERATIONS */}
      <section className="team-chamber-section">
        <div className="team-chamber-header">
          <div className="team-crest-badge subcore-badge">
            <span className="badge-spark">✦</span>
            <span>OPERATIONS GUILD</span>
          </div>
          <h2 className="team-chamber-title">Core Operations</h2>
          <p className="team-chamber-subtitle">Operations & Strategic Execution</p>
          <div className="team-chamber-ornament">
            <span className="ornament-line" />
            <span className="ornament-glyph">❖</span>
            <span className="ornament-line" />
          </div>
        </div>

        <div className="high-council-rows-container">
          <div className="team-row team-row-3">
            {coreOperationsTeam.map(member => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Decorative Divider Between Chambers */}
      <div className="team-chamber-divider">
        <div className="divider-line" />
        <div className="divider-sigil">✦</div>
        <div className="divider-line" />
      </div>

      {/* ⚡ SECTION 3: CORE COMMITTEE (Student Leads, Executives, Department Heads & Sub-Core) */}
      <section className="team-chamber-section">
        <div className="team-chamber-header">
          <div className="team-crest-badge core-badge">
            <span className="badge-spark">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
              </svg>
            </span>
            <span>ORDER OF THE PHOENIX</span>
          </div>
          <h2 className="team-chamber-title">Core Committee</h2>
          <p className="team-chamber-subtitle">Student Leads, Department Heads & Operations Team</p>
          <div className="team-chamber-ornament">
            <span className="ornament-line" />
            <span className="ornament-glyph">❖</span>
            <span className="ornament-line" />
          </div>
        </div>

        <div className="high-council-rows-container">
          {/* Row 1: 3 Core Leads */}
          <div className="team-row team-row-3">
            {coreTeam.slice(0, 3).map(member => <TeamCard key={member.id} member={member} />)}
          </div>

          {/* Row 2: 2 Core Executives */}
          <div className="team-row team-row-2">
            {coreTeam.slice(3, 5).map(member => <TeamCard key={member.id} member={member} />)}
          </div>

          {/* Row 3: 4 Department Heads */}
          <div className="team-row team-row-4">
            {coreTeam.slice(5, 9).map(member => <TeamCard key={member.id} member={member} />)}
          </div>

          {/* Row 4: 4 Department Heads */}
          <div className="team-row team-row-4">
            {coreTeam.slice(9, 13).map(member => <TeamCard key={member.id} member={member} />)}
          </div>

          {/* Row 5: 4 Members (Outreach & Social Media) */}
          <div className="team-row team-row-4">
            {coreTeam.slice(13).map(member => <TeamCard key={member.id} member={member} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
