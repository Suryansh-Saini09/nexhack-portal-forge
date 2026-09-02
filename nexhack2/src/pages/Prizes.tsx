import React, { useState, useEffect, useRef, useCallback } from 'react';

interface VaultPrize {
  id: string;
  numeral: string;
  rank: string;
  title: string;
  category: string;
  amount: string;
  image: string;
  alt: string;
  themeColor: string;
  accentGlow: string;
  borderColor: string;
  particlesType: 'feathers' | 'coins' | 'sparks';
}

const prizeVaultsData: VaultPrize[] = [
  {
    id: 'vault-1',
    numeral: 'I',
    rank: '1ST',
    title: 'THE GOLDEN SNITCH',
    category: 'GRAND CHAMPIONS · 1ST',
    amount: '₹25,000 + SWAGS',
    image: './images/prizes/new_snitch.webp',
    alt: 'The Flying Golden Snitch Trophy',
    themeColor: '#f0c030',
    accentGlow: 'rgba(240, 192, 48, 0.45)',
    borderColor: 'rgba(212, 160, 23, 0.6)',
    particlesType: 'feathers'
  },
  {
    id: 'vault-2',
    numeral: 'II',
    rank: '2ND',
    title: 'THE GRINGOTTS VAULT',
    category: 'RESERVE CHAMPIONS · 2ND',
    amount: '₹15,000 + SWAGS',
    image: './images/prizes/new_galleons.webp',
    alt: 'The Gringotts Vault Galleon Relics',
    themeColor: '#cbd5e1',
    accentGlow: 'rgba(203, 213, 225, 0.45)',
    borderColor: 'rgba(203, 213, 225, 0.6)',
    particlesType: 'coins'
  },
  {
    id: 'vault-3',
    numeral: 'III',
    rank: '3RD',
    title: 'THE ELDER WAND',
    category: 'TECHNICAL VANGUARD · 3RD',
    amount: '₹10,000 + SWAGS',
    image: './images/prizes/new_elder_wand.webp',
    alt: 'The Elder Wand Artifact',
    themeColor: '#45c7e8',
    accentGlow: 'rgba(69, 199, 232, 0.45)',
    borderColor: 'rgba(69, 199, 232, 0.55)',
    particlesType: 'sparks'
  }
];

interface ScratchCardProps {
  vault: VaultPrize;
  isRevealed: boolean;
  onReveal: (id: string) => void;
}

function VaultScratchCard({ vault, isRevealed, onReveal }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const strokeCount = useRef(0);
  const hasTriggeredReveal = useRef(false);
  const [isBreaking, setIsBreaking] = useState(false);

  // Initialize canvas with compact enchanted wax / rune seal pattern
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (width === 0 || height === 0) return;

    canvas.width = width;
    canvas.height = height;

    // Dark midnight obsidian background
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height) / 1.1);
    bgGrad.addColorStop(0, '#0c1626');
    bgGrad.addColorStop(0.65, '#07101c');
    bgGrad.addColorStop(1, '#03070d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle border overlay matching vault theme
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Outer enchanted runic circle
    const centerX = width / 2;
    const centerY = height * 0.43;
    const radius = Math.min(width, height) * 0.25;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = vault.themeColor;
    ctx.globalAlpha = 0.4;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 3]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 5, 0, Math.PI * 2);
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.stroke();
    ctx.restore();

    // Central wax crest
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.62, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(14, 25, 42, 0.92)';
    ctx.fill();
    ctx.strokeStyle = vault.themeColor;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Vault Roman Numeral in the seal center
    ctx.save();
    ctx.fillStyle = vault.themeColor;
    ctx.font = `bold ${Math.round(radius * 0.52)}px 'Cinzel', serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(vault.numeral, centerX, centerY);
    ctx.restore();

    // Top Header
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = `600 9.5px 'Cinzel', serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`✦ ENCHANTED VAULT ✦`, centerX, centerY - radius - 10);

    // Single Elegant Bottom Prompt: "✦ SCRATCH TO REVEAL ✦"
    const bannerW = Math.min(width * 0.82, 190);
    const bannerH = 24;
    const bannerY = height - 32;
    const bannerX = (width - bannerW) / 2;

    ctx.save();
    ctx.fillStyle = 'rgba(10, 18, 30, 0.85)';
    ctx.strokeStyle = vault.themeColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f0c030';
    ctx.font = `bold 9.5px 'Cinzel', serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`✦ SCRATCH TO REVEAL ✦`, centerX, bannerY + bannerH / 2);
    ctx.restore();
  }, [vault.numeral, vault.themeColor]);

  useEffect(() => {
    if (!isRevealed) {
      const t = setTimeout(initCanvas, 50);
      window.addEventListener('resize', initCanvas);
      return () => {
        clearTimeout(t);
        window.removeEventListener('resize', initCanvas);
      };
    }
  }, [isRevealed, initCanvas]);

  // Check cleared percentage
  const checkClearedPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasTriggeredReveal.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    const sampleStep = 8;
    const imgData = ctx.getImageData(0, 0, width, height);
    const pixels = imgData.data;
    let transparentCount = 0;
    let totalSampled = 0;

    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const index = (y * width + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha < 64) {
          transparentCount++;
        }
        totalSampled++;
      }
    }

    const clearedRatio = transparentCount / totalSampled;

    if (clearedRatio >= 0.24 && !hasTriggeredReveal.current) {
      hasTriggeredReveal.current = true;
      setIsBreaking(true);
      setTimeout(() => {
        onReveal(vault.id);
        setIsBreaking(false);
      }, 400);
    }
  }, [onReveal, vault.id]);

  // Scratch / Erase drawing
  const scratch = (clientX: number, clientY: number) => {
    if (hasTriggeredReveal.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();

    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.lineWidth = 36;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    const radial = ctx.createRadialGradient(x, y, 3, x, y, 18);
    radial.addColorStop(0, 'rgba(0,0,0,1)');
    radial.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    lastPoint.current = { x, y };

    strokeCount.current++;
    if (strokeCount.current % 4 === 0) {
      checkClearedPercentage();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    document.body.classList.add('is-scratching');
    lastPoint.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    document.body.classList.remove('is-scratching');
    lastPoint.current = null;
    checkClearedPercentage();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      isDrawing.current = true;
      document.body.classList.add('is-scratching');
      lastPoint.current = null;
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isDrawing.current && e.touches.length > 0) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
    document.body.classList.remove('is-scratching');
    lastPoint.current = null;
    checkClearedPercentage();
  };

  const triggerInstantUnlock = () => {
    if (hasTriggeredReveal.current || isRevealed) return;
    hasTriggeredReveal.current = true;
    document.body.classList.remove('is-scratching');
    setIsBreaking(true);
    setTimeout(() => {
      onReveal(vault.id);
      setIsBreaking(false);
    }, 400);
  };

  const handleCardMouseEnter = () => {
    document.body.classList.add('hovering-prize-card');
  };

  const handleCardMouseLeave = () => {
    document.body.classList.remove('hovering-prize-card');
    document.body.classList.remove('is-scratching');
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('hovering-prize-card');
      document.body.classList.remove('is-scratching');
    };
  }, []);

  return (
    <div
      className={`enchanted-vault-box ${isRevealed ? 'vault-unsealed' : 'vault-sealed'}`}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      style={{
        '--vault-color': vault.themeColor,
        '--vault-glow': vault.accentGlow,
        '--vault-border': vault.borderColor
      } as React.CSSProperties}
    >
      {/* Top Vault Crest Numeral */}
      <div className="vault-top-banner">
        <span className="vault-numeral-tag">VAULT {vault.numeral}</span>
        <span className="vault-rank-pill">{vault.rank}</span>
      </div>

      {/* Internal Prize Showcase Chamber */}
      <div className="vault-chamber">
        {/* Ambient Halo behind Artifact */}
        <div
          className="vault-chamber-halo"
          style={{ background: `radial-gradient(circle, ${vault.accentGlow} 0%, transparent 70%)` }}
        />

        {/* Revealed Artifact & Details */}
        <div className="vault-artifact-display">
          <div className="artifact-image-halo">
            <img src={vault.image} alt={vault.alt} className="artifact-img" />
          </div>

          <div className="artifact-text-group">
            <span className="artifact-category-text">{vault.category}</span>
            <h3 className="artifact-title-text">{vault.title}</h3>
            <div className="artifact-bounty-badge">
              <span className="bounty-sparkle">✦</span>
              <span className="bounty-amount">{vault.amount}</span>
              <span className="bounty-sparkle">✦</span>
            </div>
          </div>
        </div>

        {/* Interactive Scratch Canvas Mask (Active when sealed) */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className={`vault-scratch-canvas ${isBreaking ? 'breaking-seal' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleCardMouseEnter}
          />
        )}
      </div>

      {/* Vault Footer Action / Status */}
      <div className="vault-footer-area">
        {!isRevealed ? (
          <button
            onClick={triggerInstantUnlock}
            className="vault-unlock-action-btn"
            title="Click to automatically break the magical seal"
          >
            <span>✦ UNSEAL ✦</span>
          </button>
        ) : (
          <div className="vault-unlocked-status-badge">
            <span className="status-gem" />
            <span>VAULT UNSEALED</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface PrizesProps {
  onUnlockStatusChange?: (allUnlocked: boolean) => void;
  showBarrierAlert?: boolean;
}

export default function Prizes({ onUnlockStatusChange, showBarrierAlert }: PrizesProps) {
  const [revealedVaults, setRevealedVaults] = useState<{ [id: string]: boolean }>({
    'vault-1': false,
    'vault-2': false,
    'vault-3': false
  });

  const handleReveal = (vaultId: string) => {
    setRevealedVaults((prev) => {
      const next = { ...prev, [vaultId]: true };
      const allDone = Object.values(next).filter(Boolean).length === 3;
      if (allDone && onUnlockStatusChange) {
        onUnlockStatusChange(true);
      }
      return next;
    });
  };

  const unsealAllVaults = () => {
    const all = {
      'vault-1': true,
      'vault-2': true,
      'vault-3': true
    };
    setRevealedVaults(all);
    if (onUnlockStatusChange) {
      onUnlockStatusChange(true);
    }
  };

  const openedCount = Object.values(revealedVaults).filter(Boolean).length;
  const allOpened = openedCount === 3;

  useEffect(() => {
    if (allOpened && onUnlockStatusChange) {
      onUnlockStatusChange(true);
    }
  }, [allOpened, onUnlockStatusChange]);

  return (
    <main className="objects-section enchanted-rewards-section" id="prizes">
      {/* Background Atmosphere */}
      <div className="rewards-ambient-aura top" />
      <div className="rewards-ambient-aura bottom" />

      <div className="enchanted-rewards-container">
        {/* Section Header */}
        <div className="rewards-section-header">
          <h1 className="rewards-main-title">Nexhack Rewards</h1>
 
          {/* Progression Counter */}
          <div className="vaults-progress-tracker">
            <span className="progress-counter-text">
              {openedCount} / 3 VAULTS OPENED
            </span>
            <div className="progress-dots-row">
              <span className={`tracker-dot dot-1 ${revealedVaults['vault-1'] ? 'filled' : ''}`} />
              <span className={`tracker-dot dot-2 ${revealedVaults['vault-2'] ? 'filled' : ''}`} />
              <span className={`tracker-dot dot-3 ${revealedVaults['vault-3'] ? 'filled' : ''}`} />
            </div>
          </div>
        </div>

        {/* 3 Interactive Sealed Vaults */}
        <div className="enchanted-vaults-grid">
          {prizeVaultsData.map((vault) => (
            <VaultScratchCard
              key={vault.id}
              vault={vault}
              isRevealed={revealedVaults[vault.id]}
              onReveal={handleReveal}
            />
          ))}
        </div>

        {/* Magical Scroll Barrier & Progression Gate */}
        {!allOpened ? (
          <div className={`prizes-barrier-notice ${showBarrierAlert ? 'barrier-shake-alert' : ''}`}>
            <div className="barrier-shield-icon">🔒</div>
            <div className="barrier-text-wrap">
              <h4 className="barrier-title">ANCIENT SEAL ACTIVE</h4>
              <p className="barrier-desc">
                Unseal all 3 prize vaults ({openedCount}/3 unlocked) to proceed down the tracks to the Schedule & beyond.
              </p>
            </div>
            <button onClick={unsealAllVaults} className="barrier-quick-unlock-btn" title="Click to instantly unseal all 3 vaults">
              <span>✦ UNSEAL ALL ✦</span>
            </button>
          </div>
        ) : (
          <div className="all-vaults-unlocked-banner visible">
            <div className="unlocked-banner-glow" />
            <span className="unlocked-banner-sparkle">✦</span>
            <h2 className="unlocked-banner-title">ALL VAULTS UNSEALED • PATHWAY UNLOCKED</h2>
            <span className="unlocked-banner-sparkle">✦</span>
          </div>
        )}
      </div>
    </main>
  );
}
