import React, { useState } from 'react';

interface Track {
  id: string;
  num: string;
  category: 'all' | 'ai' | 'security' | 'web3' | 'hardware' | 'open';
  spell: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

const tracksData: Track[] = [
  {
    id: 'forensic-tech',
    num: '01',
    category: 'security',
    spell: 'Aparecium',
    icon: '🔍',
    title: 'Forensic Tech',
    desc: 'Uncover hidden digital footprints, extract encrypted artifacts, and deploy automated forensics to investigate and mitigate cyber incidents.',
    tags: ['Memory Forensics', 'Deepfake Detection', 'Malware Triage']
  },
  {
    id: 'edtech',
    num: '02',
    category: 'open',
    spell: 'Lumos',
    icon: '💡',
    title: 'EdTech',
    desc: 'Transform educational paradigms with intelligent tutoring, immersive classroom tools, gamified curricula, and adaptive knowledge networks.',
    tags: ['Adaptive Learning', 'AI Tutoring', 'Virtual Labs']
  },
  {
    id: 'open-innovation',
    num: '03',
    category: 'open',
    spell: 'Alohomora',
    icon: '🔓',
    title: 'Open Innovation',
    desc: 'Break conventional boundaries in a limitless track where cross-domain engineering, moonshot experiments, and raw creative hacking collide.',
    tags: ['Multidisciplinary', 'Moonshots', 'Creative Tech']
  },
  {
    id: 'web3',
    num: '04',
    category: 'web3',
    spell: 'Decentralia',
    icon: '⛓️',
    title: 'Web3 & Blockchain',
    desc: 'Forge tamper-proof smart contracts, decentralized ledgers, zero-knowledge privacy layers, tokenized economies, and sovereign digital identity.',
    tags: ['Smart Contracts', 'ZK-Rollups', 'DeFi Protocols']
  },
  {
    id: 'ai-agri',
    num: '05',
    category: 'ai',
    spell: 'Herbivicus',
    icon: '🌿',
    title: 'AI in Agriculture',
    desc: 'Leverage computer vision for crop diagnostics, predictive meteorology, automated precision yield optimization, and soil health monitoring.',
    tags: ['Crop Diagnostics', 'Soil Telemetry', 'Yield Prediction']
  },
  {
    id: 'generative-ai',
    num: '06',
    category: 'ai',
    spell: 'Conjurus',
    icon: '⚡',
    title: 'Generative AI',
    desc: 'Empower human ingenuity with autonomous agentic workflows, neural synthesizers, multimodal reasoning, and real-time generation engines.',
    tags: ['Agentic AI', 'Multimodal LLMs', 'Diffusion Models']
  },
  {
    id: 'robotics',
    num: '07',
    category: 'hardware',
    spell: 'Locomotor',
    icon: '🤖',
    title: 'Robotics & Automation',
    desc: 'Design intelligent physical automata, real-time spatial pathfinding, embedded sensor telemetry, and collaborative human-robot interfaces.',
    tags: ['Embedded Systems', 'Autonomous Drones', 'Spatial Robotics']
  },
  {
    id: 'cybersecurity',
    num: '08',
    category: 'security',
    spell: 'Cave Inimicum',
    icon: '🛡️',
    title: 'Cybersecurity',
    desc: 'Fortify digital perimeters with impenetrable cryptographic barriers, real-time anomaly detection, threat hunting, and zero-trust defenses.',
    tags: ['Zero-Trust', 'Threat Intelligence', 'Cryptography']
  },
  {
    id: 'fintech',
    num: '09',
    category: 'web3',
    spell: 'Gringotts',
    icon: '💰',
    title: 'FinTech',
    desc: 'Re-engineer transactions with microsecond algorithmic settlements, fraud-resistant financial pipelines, decentralized escrow, and automated trading.',
    tags: ['Algorithmic Trading', 'Fraud Prevention', 'Open Banking']
  },
  {
    id: 'campus-solutions',
    num: '10',
    category: 'open',
    spell: 'Hogwarts',
    icon: '🏰',
    title: 'Campus Solutions',
    desc: 'Build frictionless utilities for university life: intelligent resource dispatch, student safety telemetry, automated administration, and community hubs.',
    tags: ['Smart Campus', 'Resource Dispatch', 'Student Portals']
  }
];

export default function Themes() {
  return (
    <section className="objects-section themes-section" id="themes">
      {/* Grand Arcane Section Header */}
      <div className="themes-grand-header">
        <h1 className="section-title themes-title">Hacking Themes</h1>
      </div>

      {/* Main 10-Chambers Showcase Grid */}
      <div className="themes-showcase-grid">
        {tracksData.map(track => (
          <div key={track.id} className="theme-chamber-card">
            {/* Ambient Background Aura */}
            <div className="chamber-ambient-aura" />

            {/* Top Card Meta Row */}
            <div className="chamber-meta-row">
              <span className="chamber-num-badge">TRACK // {track.num}</span>
              <span className="chamber-spell-pill">
                <span className="spell-wand-icon">🪄</span> {track.spell}
              </span>
            </div>

            {/* Icon + Title */}
            <div className="chamber-title-wrap">
              <div className="chamber-icon-orb">
                <span className="chamber-icon-glyph">{track.icon}</span>
              </div>
              <h3 className="chamber-card-title">{track.title}</h3>
            </div>

            {/* Description */}
            <p className="chamber-card-desc">{track.desc}</p>

            {/* Problem Space / Focus Tags */}
            <div className="chamber-tags-strip">
              {track.tags.map((tag, idx) => (
                <span key={idx} className="chamber-tag-chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
