export function MinecraftChunkBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Chunk grid (primary) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(60,60,60,0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(60,60,60,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Secondary sub-grid (block feel) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(30,30,30,0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(30,30,30,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "12px 12px",
          opacity: 0.35,
        }}
      />

      {/* Cave depth shading */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
    </div>
  );
}
