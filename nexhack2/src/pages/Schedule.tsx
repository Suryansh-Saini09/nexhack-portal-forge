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
    daySubtitle: 'THE FIRST CHAPTER'
  },
  {
    id: 2,
    day: 'Day 01',
    time: '10:00 AM',
    title: 'AUDITORIUM',
    desc: 'Grand opening ceremony, keynote addresses, track disclosures and pre-hack briefing.',
    side: 'right'
  },
  {
    id: 3,
    day: 'Day 01',
    time: '12:30 PM',
    title: 'HACKING ROUND 1',
    desc: 'Problem statements unlocked. The 24-hour innovation clock officially begins.',
    side: 'left'
  },
  {
    id: 4,
    day: 'Day 01',
    time: '02:30 PM',
    title: 'LUNCH',
    desc: 'Hot lunch served at cafeteria. Fuel up as parallel brainstorming continues.',
    side: 'right'
  },
  {
    id: 5,
    day: 'Day 01',
    time: '03:30 PM',
    title: 'HACKING ROUND 2',
    desc: 'Architecture blueprinting, API connections and core database implementation.',
    side: 'left'
  },
  {
    id: 6,
    day: 'Day 01',
    time: '05:00 PM',
    title: 'MENTORSHIP ROUND 1',
    desc: 'Dedicated 1-on-1 expert technical reviews and architecture validation.',
    side: 'right'
  },
  {
    id: 7,
    day: 'Day 01',
    time: '06:30 PM',
    title: 'JUDGEMENT ROUND 1',
    desc: 'Initial prototype checkpoint and progress evaluation with panel judges.',
    side: 'left'
  },
  {
    id: 8,
    day: 'Day 01',
    time: '09:00 PM',
    title: 'DINNER',
    desc: 'Full dinner banquet to recharge before the intense overnight coding sprint.',
    side: 'right'
  },
  {
    id: 9,
    day: 'Day 01',
    time: '10:00 PM',
    title: 'JAMMING SESSION',
    desc: 'Acoustic musical break, tech trivia and mini challenges to energize hackers.',
    side: 'left'
  },
  {
    id: 10,
    day: 'Day 01',
    time: '12:00 AM',
    title: 'HACKING ROUND 3',
    desc: 'Midnight code grind. Backend stabilization, complex logic and integrations.',
    side: 'right'
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
    daySubtitle: 'THE FINAL CHAPTER'
  },
  {
    id: 12,
    day: 'Day 02',
    time: '03:30 AM',
    title: 'HACKING ROUND 4',
    desc: 'Feature lock-in, UI styling polish and end-to-end edge case testing.',
    side: 'right'
  },
  {
    id: 13,
    day: 'Day 02',
    time: '05:00 AM',
    title: 'MENTORSHIP ROUND 2',
    desc: 'Pitch presentation rehearsal, demo slide reviews and final mentoring.',
    side: 'left'
  },
  {
    id: 14,
    day: 'Day 02',
    time: '06:00 AM',
    title: 'HACKING ROUND 5',
    desc: 'Final sprint. GitHub repository clean-up, demo recording and submission prep.',
    side: 'right'
  },
  {
    id: 15,
    day: 'Day 02',
    time: '07:00 AM',
    title: 'JUDGEMENT ROUND 3',
    desc: 'Comprehensive code verification, rubric scoring and pre-selection filter.',
    side: 'left'
  },
  {
    id: 16,
    day: 'Day 02',
    time: '08:30 AM',
    title: 'ANNOUNCEMENT OF TOP 15',
    desc: 'Top 15 finalist teams revealed to pitch live on main auditorium stage.',
    side: 'right'
  },
  {
    id: 17,
    day: 'Day 02',
    time: '09:00 AM',
    title: 'BREAKFAST',
    desc: 'Morning refresh with hot beverages, breakfast and finalist briefing.',
    side: 'left'
  },
  {
    id: 18,
    day: 'Day 02',
    time: '10:00 AM',
    title: 'FINAL PRESENTATION',
    desc: 'Top 15 finalists deliver live 5-minute demos and Q&A before grand jury.',
    side: 'right'
  },
  {
    id: 19,
    day: 'Day 02',
    time: '01:00 PM',
    title: 'LUNCH',
    desc: 'Celebratory lunch and networking with corporate mentors and sponsors.',
    side: 'left'
  },
  {
    id: 20,
    day: 'Day 02',
    time: '02:00 PM',
    title: 'ANNOUNCEMENT OF TOP 3',
    desc: 'Grand champions, runners-up, and special category winners unveiled.',
    side: 'right'
  },
  {
    id: 21,
    day: 'Day 02',
    time: '02:30 PM',
    title: 'CLOSURE CEREMONY',
    desc: 'Trophy handover, cash prizes, certificates and official event group photo.',
    side: 'center'
  }
];

export default function Schedule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerDimensions, setContainerDimensions] = useState({ width: 1050, height: 2600 });
  const [nodePositions, setNodePositions] = useState<{ id: number; x: number; y: number }[]>([]);
  const [sparkPos, setSparkPos] = useState({ x: 525, y: 0 });
  const [totalPathLength, setTotalPathLength] = useState(0);

  // Compute node coordinates directly at the connected edge of each event card
  const updateLayout = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth || 1050;
    const isMobile = width < 768;

    const startY = 40;
    const rowGap = isMobile ? 145 : 125;
    const dayExtraGap = isMobile ? 65 : 55;

    let currentY = startY;
    const positions: { id: number; x: number; y: number }[] = [];

    // Central corridor channel width:
    // Left card node is at the right edge of left card (e.g. 44% width)
    // Right card node is at the left edge of right card (e.g. 56% width)
    const leftNodeX = isMobile ? width * 0.44 : width * 0.44;
    const rightNodeX = isMobile ? width * 0.56 : width * 0.56;
    const centerNodeX = width * 0.5;

    scheduleEventsData.forEach((event) => {
      if (event.isDayStart && event.id !== 1) {
        currentY += dayExtraGap;
      }

      let x = centerNodeX;
      if (event.side === 'left') {
        x = leftNodeX;
      } else if (event.side === 'right') {
        x = rightNodeX;
      } else {
        x = centerNodeX;
      }

      positions.push({ id: event.id, x, y: currentY });
      currentY += rowGap;
    });

    const finalHeight = currentY + 50;
    setContainerDimensions({ width, height: finalHeight });
    setNodePositions(positions);
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Build the SVG path that directly connects from Node 1 -> Node 2 -> Node 3 ...
  const pathData = useMemo(() => {
    if (nodePositions.length === 0) return '';
    const points = nodePositions;
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dy = p2.y - p1.y;

      // Downward vertical tangent control points for a smooth, natural connection
      const cp1x = p1.x;
      const cp1y = p1.y + dy * 0.5;
      const cp2x = p2.x;
      const cp2y = p2.y - dy * 0.5;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    return d;
  }, [nodePositions]);

  // Track path length
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setTotalPathLength(len);
    }
  }, [pathData]);

  // Scroll tracking & wand spark marker movement
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          const start = rect.top - windowHeight * 0.7;
          const totalDistance = rect.height;
          const current = -start;
          const progress = Math.min(Math.max(current / totalDistance, 0), 1);
          setScrollProgress(progress);

          if (pathRef.current && totalPathLength > 0) {
            const distance = progress * totalPathLength;
            const pt = pathRef.current.getPointAtLength(distance);
            setSparkPos({ x: pt.x, y: pt.y });
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalPathLength]);

  return (
    <section className="schedule-connected-section" id="schedule">
      {/* Ambient Atmospheric Backdrop Glows */}
      <div className="schedule-ambient-glow top" />
      <div className="schedule-ambient-glow bottom" />

      {/* Section Header */}
      <div className="schedule-section-header">
        <span className="schedule-pre-tag">THE JOURNEY UNFOLDS</span>
        <h1 className="schedule-main-title">The Schedule</h1>
        <p className="schedule-main-subtitle">
          24 hours of relentless innovation — follow the magical trail from opening ceremony to the grand finale.
        </p>
        <div className="schedule-header-divider" />
      </div>

      {/* Connected Timeline Stage */}
      <div
        ref={containerRef}
        className="schedule-connected-stage"
        style={{ height: `${containerDimensions.height}px` }}
      >
        {/* SVG Path Layer Directly Connecting All Event Nodes */}
        <svg
          className="schedule-connected-svg"
          width={containerDimensions.width}
          height={containerDimensions.height}
          viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
        >
          <defs>
            {/* Subtle Ghost Base Path */}
            <linearGradient id="connectedBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4a017" stopOpacity="0.16" />
              <stop offset="50%" stopColor="#45c7e8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#d4a017" stopOpacity="0.16" />
            </linearGradient>

            {/* Glowing Active Trail Gradient */}
            <linearGradient id="connectedActiveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4a017" />
              <stop offset="35%" stopColor="#45c7e8" />
              <stop offset="70%" stopColor="#f0c030" />
              <stop offset="100%" stopColor="#d4a017" />
            </linearGradient>

            {/* Restrained Soft Glow */}
            <filter id="connectedGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Inactive Ghost Path */}
          {pathData && (
            <path
              d={pathData}
              fill="none"
              stroke="url(#connectedBaseGrad)"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="connected-ghost-path"
            />
          )}

          {/* Active Revealing Magical Trail */}
          {pathData && (
            <path
              ref={pathRef}
              d={pathData}
              fill="none"
              stroke="url(#connectedActiveGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#connectedGlow)"
              strokeDasharray={totalPathLength || 1000}
              strokeDashoffset={(totalPathLength || 1000) * (1 - scrollProgress)}
              className="connected-active-path"
            />
          )}
        </svg>

        {/* Small Wand Spark Marker */}
        {totalPathLength > 0 && (
          <div
            className="connected-wand-spark"
            style={{
              transform: `translate3d(${sparkPos.x}px, ${sparkPos.y}px, 0)`,
              opacity: scrollProgress > 0.01 ? 1 : 0
            }}
          >
            <div className="spark-core-dot" />
            <div className="spark-halo-ring" />
          </div>
        )}

        {/* Waypoint Nodes and Attached Event Cards */}
        {nodePositions.map((pos, index) => {
          const item = scheduleEventsData[index];
          const nodeProgress = index / (scheduleEventsData.length - 1);
          const isRevealed = scrollProgress >= nodeProgress * 0.94;
          const isFocal = Math.abs(scrollProgress - nodeProgress * 0.94) < 0.055;

          return (
            <React.Fragment key={item.id}>
              {/* Day Transition Chapter Header */}
              {item.isDayStart && (
                <div
                  className={`connected-day-separator ${isRevealed ? 'revealed' : ''}`}
                  style={{
                    top: `${pos.y - 48}px`,
                    left: `${containerDimensions.width * 0.5}px`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="day-separator-badge">
                    <span className="day-num-label">{item.dayTitle}</span>
                    <span className="day-chapter-label">{item.daySubtitle}</span>
                  </div>
                </div>
              )}

              {/* Event Connection Node — Exact endpoint on the card border */}
              <div
                className={`connected-node-point ${isRevealed ? 'active' : ''} ${isFocal ? 'focal' : ''}`}
                style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
              >
                <div className="node-outer-halo" />
                <div className="node-center-gem" />
              </div>

              {/* Event Card attached directly to its Node */}
              <div
                className={`connected-card-wrapper card-side-${item.side} ${isRevealed ? 'revealed' : 'hidden'} ${isFocal ? 'focal-event' : ''
                  }`}
                style={{
                  top: `${pos.y}px`,
                  left: `${pos.x}px`
                }}
              >
                <div className="connected-event-card">
                  <div className="card-top-shimmer" />

                  {/* Header Row: Day • Time */}
                  <div className="event-meta-badge">
                    <span className="event-day-tag">{item.day}</span>
                    <span className="event-bullet">•</span>
                    <span className="event-time-tag">{item.time}</span>
                  </div>

                  {/* Event Title */}
                  <h2 className="event-title-text">{item.title}</h2>

                  {/* Event Description */}
                  <p className="event-desc-text">{item.desc}</p>

                  {/* Filigree Corner Accents */}
                  <div className="card-corner tl" />
                  <div className="card-corner tr" />
                  <div className="card-corner bl" />
                  <div className="card-corner br" />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
