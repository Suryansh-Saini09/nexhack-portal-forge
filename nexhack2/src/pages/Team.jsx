import React, { useState, useRef, useEffect } from 'react';

const teamData = [
  {
    id: 'shravya-atrey',
    name: 'Shravya Atrey',
    house: 'Gryffindor House / AI Track Lead',
    class: 'gryffindor',
    role: 'AI & Intellect Lead',
    image: './images/team/shravya.png',
    desc: 'The lead builder for the AI track at NexHack. Drawing inspiration from Gryffindor courage, this track focuses on developing state-of-the-art neural networks, generative AI agents, and custom machine learning pipelines to solve complex automation challenges.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'sahil-bhardwaj',
    name: 'Sahil Bhardwaj',
    house: 'Gryffindor House / UI Lead',
    class: 'gryffindor',
    role: 'Frontend & Design Lead',
    image: './images/team/sahil.png',
    desc: 'The frontend lead for the Gryffindor track. Focused on highly responsive interface designs, custom web structures, and wizarding animation systems. This category challenges builders to create stunning user journeys with zero loading latency.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'suryansh-saini',
    name: 'Suryansh Saini',
    house: 'Gryffindor House / Logic Expert',
    class: 'gryffindor',
    role: 'Core Algorithms Lead',
    image: './images/team/suryansh.png',
    desc: 'The supreme authority on data logic and parsing algorithms at NexHack. This track focuses on backend optimizations, search queries, database design, and algorithmic efficiency to scale wizarding applications to millions of active queries.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'muskan-kaushik',
    name: 'Muskan Kaushik',
    house: 'Hogwarts / Grand Judge',
    class: 'hogwarts',
    role: 'Open Track Director',
    image: './images/team/muskan.png',
    desc: "The chief panel organizer and final arbiter of NexHack 2026. Under Dumbledore's guidance, the Open Track welcomes any innovative software solution that breaks the mold of conventional engineering and crafts true magic.",
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'kunal-khandelwal',
    name: 'Kunal Khandelwal',
    house: 'Slytherin House / Cryptographer',
    class: 'slytherin',
    role: 'Blockchain & Security Lead',
    image: './images/team/kunal.jpeg',
    desc: 'The lead instructor for the Slytherin Cryptography track. Focused on high-security vaults, smart contract execution, distributed databases, and zero-knowledge proofs. Builders must design secure code that blocks all intrusion attempts.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'mimansha-yadav',
    name: 'Mimansha Yadav',
    house: 'Slytherin House / Red Team Lead',
    class: 'slytherin',
    role: 'Cyber Defense Advisor',
    image: './images/team/mimansha.png',
    desc: 'The ultimate adversarial simulator for our cybersecurity track. Teams will audit, reverse-engineer, and fortify critical wizarding endpoints to withstand high-volume distributed server attacks and protect the integrity of the magic system.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'vinit-vashishta',
    name: 'Vinit Vashishta',
    house: 'Slytherin House / Logistics Lead',
    class: 'slytherin',
    role: 'Logistics & Venue Director',
    image: './images/team/vinit.png',
    desc: 'Ensures the seamless coordination of transport charms, room allocations, food services, and magical hardware check-ins to make the hackathon venue safe and structured.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'krishna-garg',
    name: 'Krishna Garg',
    house: 'Gryffindor House / Marketing Lead',
    class: 'gryffindor',
    role: 'Marketing & Community Lead',
    image: './images/team/krishna.png',
    desc: 'Drives community engagement, tracks sponsor features, schedules public announcements, and ensures the magic of NexHack is shared globally through wizarding media channels.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'janvi',
    name: 'Janvi',
    house: 'Gryffindor House / Marketing Lead',
    class: 'gryffindor',
    role: 'Marketing & Community Lead',
    image: './images/team/janvi.png',
    desc: 'Drives community engagement, tracks sponsor features, schedules public announcements, and ensures the magic of NexHack is shared globally through wizarding media channels.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'lakshay',
    name: 'Lakshay',
    house: 'Gryffindor House / Marketing Lead',
    class: 'gryffindor',
    role: 'Marketing & Community Lead',
    image: './images/team/lakshay.png',
    desc: 'Drives community engagement, tracks sponsor features, schedules public announcements, and ensures the magic of NexHack is shared globally through wizarding media channels.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'drishti',
    name: 'Drishti',
    house: 'Gryffindor House / Marketing Lead',
    class: 'gryffindor',
    role: 'Marketing & Community Lead',
    image: './images/team/drishti.png',
    desc: 'Drives community engagement, tracks sponsor features, schedules public announcements, and ensures the magic of NexHack is shared globally through wizarding media channels.',
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' }
  }




];

function TeamCard({ member }) {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    const onMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const maxTilt = 15;
      const angleX = -((y - yc) / yc) * maxTilt;
      const angleY = ((x - xc) / xc) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.04, 1.04, 1.04)`;
    };

    const onMouseEnter = () => {
      card.style.transition = 'none';
    };

    const onMouseLeave = () => {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    wrapper.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('mouseenter', onMouseEnter);
    wrapper.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseenter', onMouseEnter);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="card-wrapper"
      data-id={member.id}
      data-house={member.class}
    >
      <div ref={cardRef} className="card">
        <div className="card-image-container">
          <img src={member.image} alt={member.name} className="character-portrait" />
        </div>
        <img src={member.image} alt={member.name} className="character-popout" />
      </div>
      <div className="card-details-below">
        <h2 className="character-name">{member.name}</h2>
        <p className="character-role">{member.role}</p>

        {/* Social Links Row */}
        <div className="team-social-links">
          <a
            href={member.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="team-social-icon"
            onClick={(e) => e.stopPropagation()}
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
          </a>
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="team-social-icon"
            onClick={(e) => e.stopPropagation()}
            aria-label="LinkedIn"
          >
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
        {teamData.map(member => (
          <TeamCard
            key={member.id}
            member={member}
          />
        ))}
      </div>
    </main>
  );
}
