import React, { useRef, useEffect } from 'react';

const scheduleData = [
  {
    day: 'Day 1',
    date: 'Sept 20, 2026',
    subtitle: 'Registration · Ceremony · Hacking Begins',
    events: [
      {
        time: '09:00 AM',
        label: 'Registration & Check-in',
        type: 'logistics',
        desc: 'Participants arrive at the venue. ID verification, kit distribution, and team badge collection at the registration desk.'
      },
      {
        time: '09:30 AM',
        label: 'Breakfast & Networking',
        type: 'break',
        desc: 'Light breakfast served in the common area. Meet fellow participants, form teams, and spark early ideas.'
      },
      {
        time: '10:00 AM',
        label: 'Opening Ceremony',
        type: 'ceremony',
        desc: 'Welcome address by the Dean of Geeta University. Keynote from industry leaders. Introduction of tracks, mentors, and judges.'
      },
      {
        time: '11:00 AM',
        label: 'Problem Statements Revealed',
        type: 'milestone',
        desc: 'All 10 track themes officially unlocked. Teams access problem briefs and starter kits. Final team formations confirmed.'
      },
      {
        time: '11:45 AM',
        label: 'Pre-Hack Briefing',
        type: 'logistics',
        desc: 'Rules walkthrough, submission portal demo, and resource orientation. Judges and mentors introduced to participants.'
      },
      {
        time: '12:00 PM',
        label: '⚡ Hacking Begins',
        type: 'milestone',
        desc: 'The 24-hour clock starts. Teams begin building across all 10 tracks. Mentors available from the first hour.'
      },
      {
        time: '01:30 PM',
        label: 'Lunch Break',
        type: 'break',
        desc: 'Hot meals served at the cafeteria. Fuel up and get back to your stations — hacking continues during lunch.'
      },
      {
        time: '03:00 PM',
        label: 'Workshop: AI Tools for Hackers',
        type: 'workshop',
        desc: 'Hands-on session on leveraging LLMs, Copilot, and open-source AI APIs to build faster. By Geeta Technical Hub.'
      },
      {
        time: '05:00 PM',
        label: 'Mentor Round 1 — Office Hours',
        type: 'mentoring',
        desc: 'Industry mentors across tech, design, and product available at designated stations. Book a 10-min slot on the board.'
      },
      {
        time: '07:00 PM',
        label: 'Mid-Hack Check-In',
        type: 'logistics',
        desc: 'Coordinators visit each team for a progress check. Teams share prototype stage, blockers, and next steps.'
      },
      {
        time: '08:00 PM',
        label: 'Dinner',
        type: 'break',
        desc: 'Full dinner spread for all participants. Refuel and recharge before the long night grind ahead.'
      },
      {
        time: '09:30 PM',
        label: 'Workshop: Pitch Like a Pro',
        type: 'workshop',
        desc: 'Craft a winning 5-minute demo pitch. Storytelling frameworks, slide tips, and live demo coaching by our panel.'
      },
      {
        time: '11:00 PM',
        label: 'Fun Challenge: Trivia Night',
        type: 'fun',
        desc: 'Take a short break from screens. Harry Potter tech trivia with bonus prizes. Optional — hacking continues in parallel.'
      },
    ]
  },
  {
    day: 'Day 2',
    date: 'Sept 21, 2026',
    subtitle: 'Night Grind · Code Freeze · Prize Distribution',
    events: [
      {
        time: '12:00 AM',
        label: 'Midnight Snacks & Energy Station',
        type: 'break',
        desc: 'Midnight munchies — snacks, energy drinks, coffee, and tea at the central snack station. Keep the magic going.'
      },
      {
        time: '12:30 AM',
        label: 'Mentor Round 2 — Night Sessions',
        type: 'mentoring',
        desc: 'Late-night deep-dive mentoring for teams in critical build or pivot phases. Sign up at the mentor desk.'
      },
      {
        time: '02:00 AM',
        label: 'Quiet Hours & Focus Zone',
        type: 'logistics',
        desc: 'Noise levels minimal. Sleeping area available in Hall B. Silent hacking zones open for the final crunch.'
      },
      {
        time: '03:30 AM',
        label: 'Last Snack Run',
        type: 'break',
        desc: 'Final refreshment service of the night. Tea, coffee, biscuits, and energy bars. Push through to the finish.'
      },
      {
        time: '05:00 AM',
        label: 'Morning Refresh & Breakfast',
        type: 'break',
        desc: 'Freshen up and grab breakfast. Hot meals and beverages served. Final sprint begins — submissions close in 7 hours.'
      },
      {
        time: '07:00 AM',
        label: 'Mentor Round 3 — Final Check-In',
        type: 'mentoring',
        desc: 'Last mentoring opportunity. Experts available for pitch rehearsal, final debugging, and presentation polish.'
      },
      {
        time: '10:00 AM',
        label: 'Mini Challenge: UI Speed Round',
        type: 'fun',
        desc: 'Optional 30-min UI design sprint for bonus points. Open to all teams — judged on creativity and speed.'
      },
      {
        time: '11:45 AM',
        label: 'Submission Reminder — 15 Min Warning',
        type: 'milestone',
        desc: 'Final 15 minutes. Push all commits, update your README, lock in demo links. No extensions after 12 PM.'
      },
      {
        time: '12:00 PM',
        label: '🔴 Hacking Ends — Code Freeze',
        type: 'milestone',
        desc: 'All development stops. Submission portal closes at exactly 12:00 PM. 24 hours of building — officially complete.'
      },
      {
        time: '12:30 PM',
        label: 'Expo Setup & Judges Briefing',
        type: 'logistics',
        desc: 'Teams set up demo stations. Judges receive scorecards and evaluation criteria. Presentations begin in 30 minutes.'
      },
      {
        time: '01:00 PM',
        label: 'Project Presentations & Judging',
        type: 'milestone',
        desc: 'All teams demo their solutions to the jury panel. 5 minutes presentation + 3 minutes Q&A. Strictly timed.'
      },
      {
        time: '02:30 PM',
        label: 'Judges Deliberation & Lunch',
        type: 'logistics',
        desc: 'Jury deliberates final scores across Innovation, Technical Depth, Design, Impact, and Presentation.'
      },
      {
        time: '03:00 PM',
        label: 'Closing Ceremony',
        type: 'ceremony',
        desc: 'Closing address by the Chief Guest. Special recognitions, sponsor appreciation, and thank-you to all participants.'
      },
      {
        time: '03:30 PM',
        label: '🏆 Winners Announced & Prize Distribution',
        type: 'milestone',
        desc: 'Track winners, runners-up, and special awards revealed on stage. Cash prizes, trophies, and sponsor goodies distributed.'
      },
      {
        time: '04:00 PM',
        label: 'Certificate Distribution & Group Photo',
        type: 'ceremony',
        desc: 'All participants receive certificates. Official group photograph on the main stage. NexHack 2026 — officially concluded.'
      },
    ]
  }
];

const typeColors = {
  milestone: '#eeb939',
  ceremony:  '#c084fc',
  workshop:  '#38bdf8',
  mentoring: '#34d399',
  break:     '#94a3b8',
  fun:       '#fb923c',
  logistics: '#64748b',
};

const typeLabels = {
  milestone: 'Milestone',
  ceremony:  'Ceremony',
  workshop:  'Workshop',
  mentoring: 'Mentoring',
  break:     'Break',
  fun:       'Fun',
  logistics: 'Logistics',
};

function TimelineEvent({ event, isLast }) {
  const color = typeColors[event.type] || '#eeb939';
  return (
    <div className="schedule-event">
      <div className="schedule-connector">
        <div className="schedule-dot" style={{ background: color, boxShadow: `0 0 8px ${color}55` }} />
        {!isLast && <div className="schedule-line" style={{ background: `linear-gradient(to bottom, ${color}50, transparent)` }} />}
      </div>

      <div className="schedule-event-card">
        <div className="schedule-event-meta">
          <span className="schedule-time">{event.time}</span>
        </div>
        <h3 className="schedule-event-title">{event.label}</h3>
        <p className="schedule-event-desc">{event.desc}</p>
      </div>
    </div>
  );
}

export default function Schedule() {
  return (
    <main className="objects-section schedule-page">
      {/* Header */}
      <div className="themes-header" style={{ marginBottom: '60px' }}>
        <p className="themes-eyebrow">The Event Chronicle</p>
        <h1 className="section-title" style={{ marginBottom: '16px' }}>Schedule</h1>
        <p className="themes-subheading">
          24 hours of relentless innovation — from the opening ceremony to the grand prize reveal.
        </p>
        <div className="themes-header-divider" />
      </div>

      {/* Days */}
      <div className="schedule-days-wrapper">
        {scheduleData.map((day, di) => (
          <div key={di} className="schedule-day-block">
            <div className="schedule-day-header">
              <div className="schedule-day-badge">{day.day}</div>
              <div>
                <p className="schedule-day-date">{day.date}</p>
                <p className="schedule-day-subtitle">{day.subtitle}</p>
              </div>
            </div>

            <div className="schedule-events-list">
              {day.events.map((event, ei) => (
                <TimelineEvent
                  key={ei}
                  event={event}
                  isLast={ei === day.events.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
