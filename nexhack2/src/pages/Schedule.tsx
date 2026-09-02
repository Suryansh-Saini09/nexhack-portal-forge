import React, { useState, useEffect, useRef, useMemo } from 'react';

interface EventItem {
  id: number;
  day: 'Day 01' | 'Day 02';
  time: string;
  title: string;
  desc: string;
  side: 'left' | 'right' | 'center';
  isDayStart?: boolean;
  dayTitle?: string;
  daySubtitle?: string;
  stationName?: string;
}

const scheduleEventsData: EventItem[] = [
  // DAY 01
  {
    id: 1,
    day: 'Day 01',
    time: '09:00 AM',
    title: 'REGISTRATION',
    desc: 'Check-in, ID verification, hacker kit collection and welcome formalities.',
    side: 'left',
    isDayStart: true,
    dayTitle: 'DAY I',
    daySubtitle: 'THE FIRST CHAPTER',
    stationName: 'KING\'S CROSS PLATFORM'
  },
  {
    id: 2,
    day: 'Day 01',
    time: '10:00 AM',
    title: 'AUDITORIUM',
    desc: 'Grand opening ceremony, keynote addresses, track disclosures and pre-hack briefing.',
    side: 'right',
    stationName: 'GREAT HALL JUNCTION'
  },
  {
    id: 3,
    day: 'Day 01',
    time: '12:30 PM',
    title: 'HACKING ROUND 1',
    desc: 'Problem statements unlocked. The 24-hour innovation clock officially begins.',
    side: 'left',
    stationName: 'INNOVATION WAYPOINT'
  },
  {
    id: 4,
    day: 'Day 01',
    time: '02:30 PM',
    title: 'LUNCH',
    desc: 'Hot lunch served at cafeteria. Fuel up as parallel brainstorming continues.',
    side: 'right',
    stationName: 'FEAST STATION'
  },
  {
    id: 5,
    day: 'Day 01',
    time: '03:30 PM',
    title: 'HACKING ROUND 2',
    desc: 'Architecture blueprinting, API connections and core database implementation.',
    side: 'left',
    stationName: 'FOUNDRY PLATFORM'
  },
  {
    id: 6,
    day: 'Day 01',
    time: '05:00 PM',
    title: 'MENTORSHIP ROUND 1',
    desc: 'Dedicated 1-on-1 expert technical reviews and architecture validation.',
    side: 'right',
    stationName: 'GUILD OF MENTORS'
  },
  {
    id: 7,
    day: 'Day 01',
    time: '06:30 PM',
    title: 'JUDGEMENT ROUND 1',
    desc: 'Initial prototype checkpoint and progress evaluation with panel judges.',
    side: 'left',
    stationName: 'COUNCIL CHECKPOINT I'
  },
  {
    id: 8,
    day: 'Day 01',
    time: '09:00 PM',
    title: 'DINNER',
    desc: 'Full dinner banquet to recharge before the intense overnight coding sprint.',
    side: 'right',
    stationName: 'BANQUET STOP'
  },
  {
    id: 9,
    day: 'Day 01',
    time: '10:00 PM',
    title: 'JAMMING SESSION',
    desc: 'Acoustic musical break, tech trivia and mini challenges to energize hackers.',
    side: 'left',
    stationName: 'REVELLER\'S CORNER'
  },
  {
    id: 10,
    day: 'Day 01',
    time: '12:00 AM',
    title: 'HACKING ROUND 3',
    desc: 'Midnight code grind. Backend stabilization, complex logic and integrations.',
    side: 'right',
    stationName: 'MIDNIGHT COVE'
  },

  // DAY 02
  {
    id: 11,
    day: 'Day 02',
    time: '02:00 AM',
    title: 'JUDGEMENT ROUND 2',
    desc: 'Late-night technical checkpoint and live MVP workflow demonstration.',
    side: 'left',
    isDayStart: true,
    dayTitle: 'DAY II',
    daySubtitle: 'THE FINAL CHAPTER',
    stationName: 'NIGHT WATCH STATION'
  },
  {
    id: 12,
    day: 'Day 02',
    time: '03:30 AM',
    title: 'HACKING ROUND 4',
    desc: 'Feature lock-in, UI styling polish and end-to-end edge case testing.',
    side: 'right',
    stationName: 'DAWN EXPRESS WAY'
  },
  {
    id: 13,
    day: 'Day 02',
    time: '05:00 AM',
    title: 'MENTORSHIP ROUND 2',
    desc: 'Pitch presentation rehearsal, demo slide reviews and final mentoring.',
    side: 'left',
    stationName: 'SAGE\'s SANCTUM'
  },
  {
    id: 14,
    day: 'Day 02',
    time: '06:00 AM',
    title: 'HACKING ROUND 5',
    desc: 'Final sprint. GitHub repository clean-up, demo recording and submission prep.',
    side: 'right',
    stationName: 'LAST SPRINT CROSSING'
  },
  {
    id: 15,
    day: 'Day 02',
    time: '07:00 AM',
    title: 'JUDGEMENT ROUND 3',
    desc: 'Comprehensive code verification, rubric scoring and pre-selection filter.',
    side: 'left',
    stationName: 'TRIBUNAL GATE'
  },
  {
    id: 16,
    day: 'Day 02',
    time: '08:30 AM',
    title: 'ANNOUNCEMENT OF TOP 15',
    desc: 'Top 15 finalist teams revealed to pitch live on main auditorium stage.',
    side: 'right',
    stationName: 'CHAMPIONS\' ROSTER'
  },
  {
    id: 17,
    day: 'Day 02',
    time: '09:00 AM',
    title: 'BREAKFAST',
    desc: 'Morning refresh with hot beverages, breakfast and finalist briefing.',
    side: 'left',
    stationName: 'SUNRISE PARLOUR'
  },
  {
    id: 18,
    day: 'Day 02',
    time: '10:00 AM',
    title: 'FINAL PRESENTATION',
    desc: 'Top 15 finalists deliver live 5-minute demos and Q&A before grand jury.',
    side: 'right',
    stationName: 'GRAND SHOWCASE STAGE'
  },
  {
    id: 19,
    day: 'Day 02',
    time: '01:00 PM',
    title: 'LUNCH',
    desc: 'Celebratory lunch and networking with corporate mentors and sponsors.',
    side: 'left',
    stationName: 'COMMONS PLATFORM'
  },
  {
    id: 20,
    day: 'Day 02',
    time: '02:00 PM',
    title: 'ANNOUNCEMENT OF TOP 3',
    desc: 'Grand champions, runners-up, and special category winners unveiled.',
    side: 'right',
    stationName: 'VICTORY ARCH'
  },
  {
    id: 21,
    day: 'Day 02',
    time: '02:30 PM',
    title: 'CLOSURE CEREMONY',
    desc: 'Trophy handover, cash prizes, certificates and official event group photo.',
    side: 'center',
    stationName: 'TERMINUS HOGWARTS'
  }
];

export default function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackPathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerDimensions, setContainerDimensions] = useState({ width: 1050, height: 2950 });
  const [stationPositions, setStationPositions] = useState<{ id: number; x: number; y: number }[]>([]);
  const [trainState, setTrainState] = useState<{ x: number; y: number; angle: number }>({ x: 525, y: 195, angle: 90 });
  const [totalTrackLength, setTotalTrackLength] = useState(0);
  const [activeStationIndex, setActiveStationIndex] = useState(0);

  // Compute node coordinates along the gently winding railway line
  const updateLayout = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth || 1050;
    const isMobile = width < 768;

    // Vertical spacing: compact & balanced on both mobile & desktop
    const startY = isMobile ? 180 : 195;
    const rowGap = isMobile ? 135 : 135;
    const dayPlatformGap = isMobile ? 145 : 140;

    let currentY = startY;
    const positions: { id: number; x: number; y: number }[] = [];

    // Track coordinates:
    // Desktop: Expanded lateral track corridor for wide horizontal distance between left & right cards
    // Mobile: Left-aligned railway spine with subtle gentle wave so cards have full horizontal width
    const leftRailX = isMobile ? 36 : width * 0.34;
    const rightRailX = isMobile ? 48 : width * 0.66;
    const centerRailX = isMobile ? 42 : width * 0.5;

    scheduleEventsData.forEach((event) => {
      // Create dedicated railway platform spacing for Day II transition
      if (event.isDayStart && event.id !== 1) {
        currentY += dayPlatformGap;
      }

      let x = centerRailX;
      if (event.side === 'left') {
        x = leftRailX;
      } else if (event.side === 'right') {
        x = rightRailX;
      } else {
        x = centerRailX;
      }

      positions.push({ id: event.id, x, y: currentY });
      currentY += rowGap;
    });

    // Leave enough room for the centered closing card before the next section.
    const lastStationY = positions.length > 0 ? positions[positions.length - 1].y : currentY;
    const finalHeight = lastStationY + (isMobile ? 220 : 310);
    setContainerDimensions({ width, height: finalHeight });
    setStationPositions(positions);

    if (positions[0]) {
      setTrainState(prev => ({
        x: positions[0].x,
        y: positions[0].y,
        angle: prev.angle || 90
      }));
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Build the continuous, gently curved railway path
  // Moves strictly downward with smooth vertical tangents for authentic railway physics
  const railwayPathData = useMemo(() => {
    if (stationPositions.length === 0) return '';
    const pts = stationPositions;
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const dy = p2.y - p1.y;

      // Downward vertical control tangents create gentle, elegant train turns
      const cp1x = p1.x;
      const cp1y = p1.y + dy * 0.48;
      const cp2x = p2.x;
      const cp2y = p2.y - dy * 0.48;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    return d;
  }, [stationPositions]);

  // Measure total railway track length and position train immediately
  useEffect(() => {
    if (trackPathRef.current) {
      const len = trackPathRef.current.getTotalLength();
      setTotalTrackLength(len);
      if (len > 0 && stationPositions[0]) {
        const pt = trackPathRef.current.getPointAtLength(0);
        setTrainState(prev => ({
          x: pt.x || stationPositions[0].x,
          y: pt.y || stationPositions[0].y,
          angle: prev.angle || 90
        }));
      }
    }
  }, [railwayPathData, stationPositions]);

  // Scroll tracker: syncs railway reveal, train position & rotation, active station
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current || !trackPathRef.current || totalTrackLength <= 0) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Track scroll progress synchronized with viewport center
          const stageTop = rect.top;
          const firstStationY = stationPositions[0] ? stationPositions[0].y : 195;
          const lastStationY = stationPositions[stationPositions.length - 1] ? stationPositions[stationPositions.length - 1].y : 3600;
          const trackSpan = Math.max(lastStationY - firstStationY, 1);

          // Current screen center mapped into container coordinate system
          const screenCenterY = windowHeight * 0.5;
          const currentStageY = screenCenterY - stageTop;

          // Compute progress strictly matching user's current scroll viewport
          const rawProgress = (currentStageY - firstStationY) / trackSpan;
          const progress = Math.min(Math.max(rawProgress, 0), 1);
          setScrollProgress(progress);

          // Calculate exact position on the railway path
          const trainDist = Math.min(Math.max(progress * totalTrackLength, 0), totalTrackLength);
          const pt = trackPathRef.current.getPointAtLength(trainDist);

          // Calculate tangent angle for realistic locomotive steering
          const delta = 2.0;
          const sampleAhead = Math.min(trainDist + delta, totalTrackLength);
          const sampleBehind = Math.max(trainDist - delta, 0);
          const ptAhead = trackPathRef.current.getPointAtLength(sampleAhead);
          const ptBehind = trackPathRef.current.getPointAtLength(sampleBehind);
          const dx = ptAhead.x - ptBehind.x;
          const dy = ptAhead.y - ptBehind.y;

          // Locomotive is oriented facing downward along the track
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

          setTrainState({
            x: pt.x || (stationPositions[0] ? stationPositions[0].x : containerDimensions.width * 0.5),
            y: pt.y || firstStationY,
            angle: isNaN(angle) ? 90 : angle
          });

          // Determine current active station
          let closestIdx = 0;
          let minDiff = Infinity;
          stationPositions.forEach((pos, idx) => {
            const nodeProgress = idx / (stationPositions.length - 1);
            const diff = Math.abs(progress - nodeProgress);
            if (diff < minDiff) {
              minDiff = diff;
              closestIdx = idx;
            }
          });
          setActiveStationIndex(closestIdx);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalTrackLength, stationPositions, containerDimensions.width]);

  // Find Day I station position for the King's Cross Platform arch (dedicated top banner)
  const day1TransitionPos = useMemo(() => {
    if (stationPositions.length === 0) return null;
    const isMobile = containerDimensions.width < 768;
    return {
      x: containerDimensions.width * 0.5,
      y: isMobile ? 65 : 60
    };
  }, [stationPositions, containerDimensions.width]);

  // Find Day II transition position for the Grand Platform arch (midpoint between Day 1 end and Day 2 start)
  const day2TransitionPos = useMemo(() => {
    const day2Event = scheduleEventsData.find(e => e.isDayStart && e.id !== 1);
    if (!day2Event) return null;
    const idx = scheduleEventsData.findIndex(e => e.id === day2Event.id);
    if (idx !== -1 && stationPositions[idx] && stationPositions[idx - 1]) {
      return {
        x: containerDimensions.width * 0.5,
        y: (stationPositions[idx - 1].y + stationPositions[idx].y) / 2,
        eventIndex: idx
      };
    }
    return null;
  }, [stationPositions, containerDimensions.width]);

  return (
    <section className="schedule-hogwarts-section" id="schedule">
      {/* Hogwarts Night Atmosphere: Low-lying fog & magical ambient glows */}
      <div className="schedule-ambient-glow top" />
      <div className="schedule-ambient-glow bottom" />
      <div className="schedule-ambient-particles" />

      {/* Section Header */}
      <div className="schedule-section-header">
        <h1 className="schedule-main-title">Hogwarts Express Schedule</h1>
        <div className="schedule-track-divider">
          <div className="track-rail-line" />
          <div className="track-crest-seal">
            <span className="crest-num">5972</span>
          </div>
          <div className="track-rail-line" />
        </div>
      </div>

      {/* Connected Railway Stage */}
      <div
        ref={containerRef}
        className="schedule-railway-stage"
        style={{ height: `${containerDimensions.height}px` }}
      >
        {/* SVG Railway Track System */}
        <svg
          className="schedule-railway-svg"
          width={containerDimensions.width}
          height={containerDimensions.height}
          viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
        >
          <defs>
            {/* Gravel / Ballast Bed Filter */}
            <filter id="ballastBedGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.05  0 0 0 0 0.08  0 0 0 0 0.14  0 0 0 0.7 0" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Antique Brass / Gold Metallic Rail Gradient */}
            <linearGradient id="antiqueRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8a6c38" />
              <stop offset="30%" stopColor="#d4af37" />
              <stop offset="60%" stopColor="#f3e5ab" />
              <stop offset="85%" stopColor="#c59b27" />
              <stop offset="100%" stopColor="#6d5324" />
            </linearGradient>

            {/* Dormant / Weathered Iron Rail Gradient */}
            <linearGradient id="dormantRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c221a" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#4a3726" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2c221a" stopOpacity="0.4" />
            </linearGradient>

            {/* Active Traveled Rail Glow */}
            <filter id="railGoldenGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Headlamp Forward Beam Radial */}
            <radialGradient id="headlampBeam" cx="50%" cy="100%" r="90%">
              <stop offset="0%" stopColor="#ffeb99" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#f0c030" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f0c030" stopOpacity="0" />
            </radialGradient>
          </defs>

          {railwayPathData && (
            <>
              {/* 1. Track Bed (Ballast Ground Layer) */}
              <path
                d={railwayPathData}
                fill="none"
                stroke="rgba(8, 14, 22, 0.85)"
                strokeWidth="24"
                strokeLinecap="round"
              />

              {/* 2. Wooden Sleepers / Railroad Ties (Full Track) */}
              <path
                d={railwayPathData}
                fill="none"
                stroke="#4a301b"
                strokeWidth="18"
                strokeDasharray="3 11"
                strokeLinecap="butt"
                opacity="0.85"
              />

              {/* 3. Outer Steel & Brass Rails (Dual Track Everywhere) */}
              <path
                ref={trackPathRef}
                d={railwayPathData}
                fill="none"
                stroke="url(#antiqueRailGrad)"
                strokeWidth="11"
                strokeLinecap="round"
                filter="url(#railGoldenGlow)"
                className="revealed-rail-outer"
              />

              {/* 4. Track Center Gap (creates precision dual parallel rails) */}
              <path
                d={railwayPathData}
                fill="none"
                stroke="rgba(7, 13, 20, 0.98)"
                strokeWidth="7"
                strokeLinecap="round"
                className="revealed-rail-inner-cut"
              />

              {/* 5. Gleaming Gold Rail Heads (Twin thin high-intensity highlight lines) */}
              <path
                d={railwayPathData}
                fill="none"
                stroke="#fff1b8"
                strokeWidth="1.2"
                opacity="0.8"
              />

              {/* 7. Terminus Buffer Stop at the End of the Track */}
              {stationPositions.length > 0 && (
                <g className="railway-terminus-buffer-stop" transform={`translate(${stationPositions[stationPositions.length - 1].x}, ${stationPositions[stationPositions.length - 1].y + 12})`}>
                  {/* Heavy Timber Ground Foundation */}
                  <rect x="-24" y="0" width="48" height="8" rx="2" fill="#20150d" stroke="#d4af37" strokeWidth="0.8" />
                  {/* Crimson Buffer Stop Crossbeam */}
                  <rect x="-20" y="-8" width="40" height="9" rx="1.5" fill="#7a0e1c" stroke="#d4af37" strokeWidth="0.8" />
                  {/* Twin Steel & Brass Hydraulic Buffers */}
                  <ellipse cx="-12" cy="-3.5" rx="3.5" ry="3.5" fill="#303038" stroke="#d4af37" strokeWidth="0.6" />
                  <ellipse cx="12" cy="-3.5" rx="3.5" ry="3.5" fill="#303038" stroke="#d4af37" strokeWidth="0.6" />
                  <circle cx="-12" cy="-3.5" r="1.5" fill="#ffd700" />
                  <circle cx="12" cy="-3.5" r="1.5" fill="#ffd700" />
                  {/* Center Terminus Hogwarts Monogram Crest */}
                  <circle cx="0" cy="-3.5" r="2.8" fill="#d4af37" />
                  <circle cx="0" cy="-3.5" r="1.6" fill="#1b080c" />
                </g>
              )}
            </>
          )}
        </svg>

        {/* Day I Grand Railway Platform Header (King's Cross / Platform 9¾) */}
        {day1TransitionPos && (
          <div
            className="grand-station-platform initial-platform"
            style={{
              top: `${day1TransitionPos.y}px`,
              left: `${day1TransitionPos.x}px`
            }}
          >
            <div className="platform-station-sign">
              <div className="platform-arch-filigree-top">
                <span className="arch-flourish-left">✦</span>
                <span className="arch-crest-clock">KING'S CROSS PLATFORM 9¾</span>
                <span className="arch-flourish-right">✦</span>
              </div>
              <div className="platform-main-banner">
                <h2 className="platform-day-title">DAY I</h2>
                <div className="platform-title-divider" />
                <p className="platform-chapter-subtitle">THE FIRST CHAPTER</p>
              </div>
              <div className="platform-track-clearance">
                <span className="platform-lamp lamp-left">🏮</span>
                <span className="platform-station-code">DEPARTURE • 09:00 AM ONWARDS</span>
                <span className="platform-lamp lamp-right">🏮</span>
              </div>
            </div>
          </div>
        )}

        {/* Day II Grand Railway Platform Transition (Between Day I & Day II) */}
        {day2TransitionPos && (
          <div
            className={`grand-station-platform ${scrollProgress >= (day2TransitionPos.eventIndex / (stationPositions.length - 1)) * 0.92 ? 'active-platform' : ''}`}
            style={{
              top: `${day2TransitionPos.y}px`,
              left: `${day2TransitionPos.x}px`
            }}
          >
            {/* Ornate Victorian / Magical Station Archway */}
            <div className="platform-station-sign">
              <div className="platform-arch-filigree-top">
                <span className="arch-flourish-left">❧</span>
                <span className="arch-crest-clock">⏳ MIDNIGHT JUNCTION</span>
                <span className="arch-flourish-right">❧</span>
              </div>
              <div className="platform-main-banner">
                <h2 className="platform-day-title">DAY II</h2>
                <div className="platform-title-divider" />
                <p className="platform-chapter-subtitle">THE FINAL CHAPTER</p>
              </div>
              <div className="platform-track-clearance">
                <span className="platform-lamp lamp-left">🏮</span>
                <span className="platform-station-code">PLATFORM 9¾ • THE DAWN CODING SPRINT</span>
                <span className="platform-lamp lamp-right">🏮</span>
              </div>
            </div>
          </div>
        )}

        {/* Railway Stations (Event Cards Attached Along the Track) */}
        {stationPositions.map((pos, index) => {
          const item = scheduleEventsData[index];
          const nodeProgress = index / (scheduleEventsData.length - 1);

          // Station states based on train's progression
          const isVisited = scrollProgress >= nodeProgress * 0.93;
          const isActiveStation = index === activeStationIndex;

          return (
            <React.Fragment key={item.id}>
              {/* Station Stop Marker on the Railway Track */}
              <div
                className={`railway-station-stop ${isVisited ? 'visited' : ''} ${isActiveStation ? 'active-stop' : ''}`}
                style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
              >
                {/* Station Track Milestone Ring */}
                <div className="station-track-ring" />
                <div className="station-center-lantern" />

                {/* Miniature Vintage Platform Lamp Post */}
                <div className={`station-lamp-bracket side-${item.side}`}>
                  <div className="lamp-lantern-glow" />
                </div>
              </div>

              {/* Station Event Card */}
              <div
                className={`railway-card-wrapper side-${item.side} ${isVisited ? 'visited' : 'upcoming'} ${isActiveStation ? 'focal-station' : ''}`}
                style={{
                  top: `${pos.y}px`,
                  left: `${pos.x}px`
                }}
              >
                <div className="railway-event-card">
                  {/* Antique Top Brass Rim Shimmer */}
                  <div className="station-card-top-shimmer" />

                  {/* Station Number & Time Badge */}
                  <div className="station-meta-badge">
                    <span className="station-tag">
                      STN {String(item.id).padStart(2, '0')}
                    </span>
                    <span className="station-bullet">•</span>
                    <span className="station-day-tag">{item.day}</span>
                    <span className="station-bullet">•</span>
                    <span className="station-time-tag">{item.time}</span>
                  </div>

                  {/* Event Title */}
                  <h2 className="station-event-title">{item.title}</h2>

                  {/* Event Description */}
                  <p className="station-event-desc">{item.desc}</p>

                  {/* Station Platform Name Tag */}
                  {item.stationName && (
                    <div className="station-platform-tag">
                      <span className="platform-loc-icon">⚓</span>
                      <span className="platform-loc-text">{item.stationName}</span>
                    </div>
                  )}

                  {/* Ornate Corner Filigrees */}
                  <div className="station-corner tl" />
                  <div className="station-corner tr" />
                  <div className="station-corner bl" />
                  <div className="station-corner br" />
                </div>
              </div>
            </React.Fragment>
          );
        })}

        <div
          className="hogwarts-express-train"
          style={{
            transform: `translate3d(${trainState.x}px, ${trainState.y}px, 0) rotate(${trainState.angle + 90}deg)`,
            opacity: 1
          }}
        >
          {/* Forward Headlamp Glowing Light Beam */}
          <div className="train-headlamp-beam" />

          {/* Compact Hogwarts Express SVG (Engine + Tender + Coach) */}
          <svg
            className="train-locomotive-svg"
            width="28"
            height="114"
            viewBox="0 0 58 236"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Engine Scarlet Red Gradient */}
              <linearGradient id="hogwartsScarlet58" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#550710" />
                <stop offset="25%" stopColor="#9e1625" />
                <stop offset="50%" stopColor="#c82436" />
                <stop offset="75%" stopColor="#9e1625" />
                <stop offset="100%" stopColor="#550710" />
              </linearGradient>

              {/* Boiler Barrel Cylindrical Highlight */}
              <linearGradient id="boilerCylinder58" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#48050d" />
                <stop offset="20%" stopColor="#8d1320" />
                <stop offset="45%" stopColor="#c02032" />
                <stop offset="60%" stopColor="#dc354a" />
                <stop offset="80%" stopColor="#8d1320" />
                <stop offset="100%" stopColor="#48050d" />
              </linearGradient>

              {/* Polished Brass Gold Gradient */}
              <linearGradient id="brassGold58" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#947124" />
                <stop offset="35%" stopColor="#ffd700" />
                <stop offset="60%" stopColor="#fff2a8" />
                <stop offset="85%" stopColor="#e5b838" />
                <stop offset="100%" stopColor="#8c6818" />
              </linearGradient>

              {/* Smokebox Anthracite Gradient */}
              <linearGradient id="smokeboxSteel58" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#101014" />
                <stop offset="50%" stopColor="#282930" />
                <stop offset="100%" stopColor="#101014" />
              </linearGradient>

              {/* Coal Bed Gradient */}
              <linearGradient id="coalBed58" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#141416" />
                <stop offset="50%" stopColor="#24252c" />
                <stop offset="100%" stopColor="#0a0a0c" />
              </linearGradient>
            </defs>

            {/* Ground Shadow Under Train */}
            <ellipse cx="29" cy="118" rx="26" ry="112" fill="rgba(0,0,0,0.7)" filter="blur(4px)" />

            {/* Firebox Underbody Amber Light Spill */}
            <ellipse cx="29" cy="86" rx="18" ry="10" fill="rgba(255, 110, 20, 0.45)" filter="blur(5px)" />

            {/* ========================================================
                SECTION 1: TENDER (COAL CAR - REAR) [Y: 102 to 156]
                ======================================================== */}
            <g className="train-tender-assembly">
              {/* Tender Chassis Underframe */}
              <rect x="9" y="102" width="40" height="52" rx="4" fill="#111114" />

              {/* Tender Side Wheels */}
              <rect x="7" y="106" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="48" y="106" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="7" y="122" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="48" y="122" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="7" y="138" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="48" y="138" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />

              {/* Scarlet Red Tender Body */}
              <rect x="10" y="103" width="38" height="49" rx="3.5" fill="url(#hogwartsScarlet58)" stroke="#1a0407" strokeWidth="1" />

              {/* Gold Pinstriping on Tender */}
              <rect x="12" y="105" width="34" height="45" rx="2" fill="none" stroke="url(#brassGold58)" strokeWidth="0.8" opacity="0.9" />
              <rect x="14" y="107" width="30" height="41" rx="1.5" fill="none" stroke="#fff1b8" strokeWidth="0.4" opacity="0.65" />

              {/* Coal Bunker Well */}
              <rect x="15" y="108" width="28" height="25" rx="2.5" fill="url(#coalBed58)" stroke="#09090b" strokeWidth="1" />

              {/* High-Definition Coal Mound */}
              <path d="M 16 110 Q 20 107 24 110 Q 29 106 34 109 Q 39 107 42 111 Q 40 117 42 123 Q 37 129 29 126 Q 20 130 16 122 Z" fill="#18181c" />
              <circle cx="19" cy="113" r="2.8" fill="#26262e" />
              <circle cx="24" cy="112" r="3.2" fill="#1c1c22" />
              <circle cx="30" cy="111" r="3.5" fill="#2a2a33" />
              <circle cx="36" cy="113" r="2.8" fill="#1e1e24" />
              <circle cx="20" cy="119" r="3.2" fill="#18181c" />
              <circle cx="27" cy="118" r="3.8" fill="#2d2d38" />
              <circle cx="34" cy="119" r="3.4" fill="#1d1d23" />
              <circle cx="39" cy="118" r="2.5" fill="#272730" />
              <circle cx="24" cy="124" r="3" fill="#22222a" />
              <circle cx="32" cy="124" r="2.8" fill="#17171d" />

              {/* Glistening Coal Facets */}
              <circle cx="29" cy="117" r="1.1" fill="#6b6b80" />
              <circle cx="22" cy="111" r="0.9" fill="#6b6b80" />
              <circle cx="35" cy="118" r="0.9" fill="#6b6b80" />

              {/* Water Filler Dome & Tool Box on Tender Deck */}
              <rect x="19" y="137" width="20" height="10" rx="2" fill="#520710" stroke="url(#brassGold58)" strokeWidth="0.6" />
              <circle cx="29" cy="142" r="2.5" fill="url(#brassGold58)" />

              {/* Rear Buffer Beam on Tender */}
              <rect x="10" y="152" width="38" height="3" rx="0.6" fill="#80101a" stroke="#111" strokeWidth="0.6" />
            </g>

            {/* COUPLING: Tender → Carriage 1 [Y: 156-165] */}
            <g>
              <rect x="22" y="156" width="14" height="9" fill="#161619" />
              <line x1="24" y1="156" x2="24" y2="165" stroke="#444" strokeWidth="1.2" />
              <line x1="34" y1="156" x2="34" y2="165" stroke="#444" strokeWidth="1.2" />
              <circle cx="29" cy="160.5" r="1.5" fill="url(#brassGold58)" />
            </g>

            {/* CARRIAGE 1: Passenger Coach with Illuminated Windows [Y: 165-228] */}
            <g>
              <rect x="9" y="165" width="40" height="60" rx="4" fill="#111114" />
              <rect x="7" y="170" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="48" y="170" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="7" y="186" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="48" y="186" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="7" y="202" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="48" y="202" width="3" height="10" rx="1.5" fill="#202026" stroke="#d4af37" strokeWidth="0.6" />
              <rect x="10" y="166" width="38" height="57" rx="3.5" fill="url(#hogwartsScarlet58)" stroke="#1a0407" strokeWidth="1" />
              <rect x="12" y="168" width="34" height="53" rx="2" fill="none" stroke="url(#brassGold58)" strokeWidth="0.8" opacity="0.9" />
              <rect x="11" y="166" width="36" height="7" rx="3" fill="#580812" />
              {/* Row 1 Windows */}
              <rect x="13" y="176" width="7" height="8.5" rx="1.8" fill="#ffb300" />
              <rect x="13.7" y="176.7" width="5.6" height="7.1" rx="1.2" fill="#ffe082" />
              <rect x="23" y="176" width="7" height="8.5" rx="1.8" fill="#ffb300" />
              <rect x="23.7" y="176.7" width="5.6" height="7.1" rx="1.2" fill="#ffe082" />
              <rect x="33" y="176" width="7" height="8.5" rx="1.8" fill="#ffb300" />
              <rect x="33.7" y="176.7" width="5.6" height="7.1" rx="1.2" fill="#ffe082" />
              {/* Row 2 Windows */}
              <rect x="13" y="190" width="7" height="8.5" rx="1.8" fill="#ffb300" />
              <rect x="13.7" y="190.7" width="5.6" height="7.1" rx="1.2" fill="#ffe082" />
              <rect x="23" y="190" width="7" height="8.5" rx="1.8" fill="#ffb300" />
              <rect x="23.7" y="190.7" width="5.6" height="7.1" rx="1.2" fill="#ffe082" />
              <rect x="33" y="190" width="7" height="8.5" rx="1.8" fill="#ffb300" />
              <rect x="33.7" y="190.7" width="5.6" height="7.1" rx="1.2" fill="#ffe082" />
              {/* Coach Door / Panel */}
              <rect x="24" y="204" width="10" height="12" rx="1.5" fill="#7a0e1c" stroke="url(#brassGold58)" strokeWidth="0.6" />
              <circle cx="28" cy="210" r="0.9" fill="url(#brassGold58)" />
              {/* Rear Coach Buffer & Red Tail Lamp */}
              <rect x="10" y="222" width="38" height="3" rx="0.6" fill="#80101a" stroke="#111" strokeWidth="0.6" />
              <circle cx="15" cy="225" r="1.6" fill="#1c1c22" stroke="url(#brassGold58)" strokeWidth="0.5" />
              <circle cx="43" cy="225" r="1.6" fill="#1c1c22" stroke="url(#brassGold58)" strokeWidth="0.5" />
              <circle cx="29" cy="225" r="1.8" fill="#d32f2f" className="train-tail-lamp" />
            </g>

            {/* ========================================================
                SECTION 2: COUPLING GANGWAY [Y: 93 to 102]
                ======================================================== */}
            <g className="train-coupling">
              <rect x="22" y="93" width="14" height="9" fill="#161619" />
              <line x1="24" y1="93" x2="24" y2="102" stroke="#444" strokeWidth="1.2" />
              <line x1="34" y1="93" x2="34" y2="102" stroke="#444" strokeWidth="1.2" />
              <circle cx="29" cy="97.5" r="1.5" fill="url(#brassGold58)" />
            </g>

            {/* ========================================================
                SECTION 3: LOCOMOTIVE ENGINE [Y: 2 to 93]
                ======================================================== */}
            <g className="train-locomotive-body">
              {/* Black Heavy Underframe & Running Boards */}
              <rect x="5.5" y="16" width="47" height="77" rx="3" fill="#121216" />

              {/* Driving Wheel Splashers & Rods (Left Side) */}
              <rect x="4" y="30" width="3.2" height="14" rx="1.5" fill="#1e1e24" stroke="url(#brassGold58)" strokeWidth="0.7" />
              <rect x="4" y="48" width="3.2" height="15" rx="1.5" fill="#1e1e24" stroke="url(#brassGold58)" strokeWidth="0.7" />
              <rect x="4" y="66" width="3.2" height="14" rx="1.5" fill="#1e1e24" stroke="url(#brassGold58)" strokeWidth="0.7" />
              {/* Silver Connecting Side Rod */}
              <line x1="5.5" y1="35" x2="5.5" y2="73" stroke="#e0e0e8" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="5.5" cy="36" r="1.5" fill="url(#brassGold58)" />
              <circle cx="5.5" cy="55" r="1.8" fill="url(#brassGold58)" />
              <circle cx="5.5" cy="73" r="1.5" fill="url(#brassGold58)" />

              {/* Driving Wheel Splashers & Rods (Right Side) */}
              <rect x="50.8" y="30" width="3.2" height="14" rx="1.5" fill="#1e1e24" stroke="url(#brassGold58)" strokeWidth="0.7" />
              <rect x="50.8" y="48" width="3.2" height="15" rx="1.5" fill="#1e1e24" stroke="url(#brassGold58)" strokeWidth="0.7" />
              <rect x="50.8" y="66" width="3.2" height="14" rx="1.5" fill="#1e1e24" stroke="url(#brassGold58)" strokeWidth="0.7" />
              {/* Silver Connecting Side Rod */}
              <line x1="52.5" y1="35" x2="52.5" y2="73" stroke="#e0e0e8" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="52.5" cy="36" r="1.5" fill="url(#brassGold58)" />
              <circle cx="52.5" cy="55" r="1.8" fill="url(#brassGold58)" />
              <circle cx="52.5" cy="73" r="1.5" fill="url(#brassGold58)" />

              {/* Front Heavy Steam Cylinders */}
              <rect x="5" y="18" width="5.5" height="13" rx="2" fill="#1a1a20" stroke="url(#brassGold58)" strokeWidth="0.75" />
              <rect x="47.5" y="18" width="5.5" height="13" rx="2" fill="#1a1a20" stroke="url(#brassGold58)" strokeWidth="0.75" />

              {/* Locomotive Driver's Cab */}
              <g className="train-cab">
                <rect x="8" y="68" width="42" height="25" rx="3.5" fill="url(#hogwartsScarlet58)" stroke="#1a0407" strokeWidth="1" />
                <rect x="10" y="70" width="38" height="21" rx="2" fill="none" stroke="url(#brassGold58)" strokeWidth="0.8" opacity="0.9" />
                <rect x="12" y="72" width="34" height="18" rx="4" fill="#580812" />
                {/* Cab Windows with Warm Firebox Glow */}
                <rect x="13.5" y="74" width="7" height="8.5" rx="2" fill="#ffb300" className="train-window-glow" />
                <rect x="14.2" y="74.7" width="5.6" height="7.1" rx="1.5" fill="#ffe082" className="train-window-glow" />
                <rect x="37.5" y="74" width="7" height="8.5" rx="2" fill="#ffb300" className="train-window-glow" />
                <rect x="38.2" y="74.7" width="5.6" height="7.1" rx="1.5" fill="#ffe082" className="train-window-glow" />
                <rect x="24" y="76" width="10" height="6" rx="1.5" fill="#38040b" stroke="url(#brassGold58)" strokeWidth="0.6" />
                <rect x="8" y="84" width="2.5" height="5" rx="0.6" fill="url(#brassGold58)" />
                <rect x="47.5" y="84" width="2.5" height="5" rx="0.6" fill="url(#brassGold58)" />
              </g>

              {/* Locomotive Cylindrical Boiler Barrel */}
              <rect x="13" y="22" width="32" height="47" rx="5" fill="url(#boilerCylinder58)" stroke="#2b0408" strokeWidth="1" />

              {/* 4 Polished Brass Boiler Straps */}
              <line x1="13" y1="30" x2="45" y2="30" stroke="url(#brassGold58)" strokeWidth="1.5" />
              <line x1="13" y1="41" x2="45" y2="41" stroke="url(#brassGold58)" strokeWidth="1.5" />
              <line x1="13" y1="52" x2="45" y2="52" stroke="url(#brassGold58)" strokeWidth="1.5" />
              <line x1="13" y1="63" x2="45" y2="63" stroke="url(#brassGold58)" strokeWidth="1.5" />

              {/* Polished Brass Steam Dome */}
              <ellipse cx="29" cy="35" rx="5.5" ry="4.2" fill="url(#brassGold58)" stroke="#fff" strokeWidth="0.4" />
              <ellipse cx="28" cy="34" rx="2.5" ry="1.5" fill="#fff7cc" opacity="0.85" />

              {/* Brass Safety Valve Housing & Twin Whistles */}
              <ellipse cx="29" cy="57" rx="4.5" ry="3.2" fill="url(#brassGold58)" stroke="#fff" strokeWidth="0.4" />
              <circle cx="26.5" cy="57" r="1.3" fill="#580812" />
              <circle cx="31.5" cy="57" r="1.3" fill="#580812" />
              <rect x="28" y="53" width="2" height="2.5" fill="url(#brassGold58)" />

              {/* Smokebox Front Chamber */}
              <rect x="14" y="12" width="30" height="13" rx="4" fill="url(#smokeboxSteel58)" stroke="#0e0e11" strokeWidth="1" />
              <path d="M 15 12 Q 29 7 43 12 Z" fill="#18181d" />

              {/* Flared Chimney / Smokestack */}
              <circle cx="29" cy="17" r="4.6" fill="#141418" stroke="url(#brassGold58)" strokeWidth="1.1" />
              <circle cx="29" cy="17" r="2.8" fill="#09090b" />
              <circle cx="29" cy="17" r="1.5" fill="#1f1f26" />

              {/* Front Buffer Beam */}
              <rect x="7" y="4" width="44" height="6" rx="1.5" fill="#a01825" stroke="#1a0407" strokeWidth="1" />
              <circle cx="10" cy="7" r="0.8" fill="url(#brassGold58)" />
              <circle cx="48" cy="7" r="0.8" fill="url(#brassGold58)" />

              {/* Buffers */}
              <rect x="11.5" y="1" width="5" height="3.8" rx="0.6" fill="#202026" />
              <ellipse cx="14" cy="1" rx="3.6" ry="1.5" fill="#30303a" stroke="url(#brassGold58)" strokeWidth="0.5" />
              <rect x="41.5" y="1" width="5" height="3.8" rx="0.6" fill="#202026" />
              <ellipse cx="44" cy="1" rx="3.6" ry="1.5" fill="#30303a" stroke="url(#brassGold58)" strokeWidth="0.5" />
              <rect x="27.8" y="1" width="2.4" height="4.5" fill="#1a1a1f" stroke="#d4af37" strokeWidth="0.4" />

              {/* Headboard Disc ("5972") */}
              <circle cx="29" cy="11.5" r="6" fill="#18181d" stroke="#d4af37" strokeWidth="0.6" />
              <circle cx="29" cy="11.5" r="4.8" fill="#9e1625" stroke="url(#brassGold58)" strokeWidth="0.75" />
              <circle cx="29" cy="11.5" r="2.8" fill="#7a0e1c" />
              <text x="29" y="12.9" textAnchor="middle" fontSize="3.5" fontWeight="bold" fill="#ffd700" fontFamily="serif">5972</text>

              {/* Golden Front Steam Lantern */}
              <g className="train-golden-headlamp">
                <rect x="26.5" y="2.2" width="5" height="4.8" rx="1.2" fill="url(#brassGold58)" stroke="#523908" strokeWidth="0.5" />
                <circle cx="29" cy="4.5" r="2.2" fill="#ffffff" className="train-headlamp-bulb" />
                <circle cx="29" cy="4.5" r="3" fill="none" stroke="#ffd700" strokeWidth="0.6" />
              </g>
            </g>
          </svg>

          {/* Billowing Steam Clouds from Smokestack */}
          <div className="train-steam-container">
            <span className="steam-puff puff-1" />
            <span className="steam-puff puff-2" />
            <span className="steam-puff puff-3" />
            <span className="steam-puff puff-4" />
            <span className="steam-puff puff-5" />
          </div>

          {/* Glowing Golden Magical Embers */}
          <div className="train-magical-embers">
            <span className="ember ember-1" />
            <span className="ember ember-2" />
            <span className="ember ember-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
