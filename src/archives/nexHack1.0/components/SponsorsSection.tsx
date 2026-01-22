import xyz from "/xyz.svg";
import Give from "/Give.png";
import devfolio from "/devfolio.png";
import ethindia from "/ethindia.png";
import cblogo from "/cblogo.png";
import samatrix from "/samatrix.png";
import devdock from "/devdock.jpeg";
import hackcbs from "/hackcbs.png";
import bc from "/bc.png";
import ac from "/ac.png";
import kt from "/kt.png";
import dna from "/dna.jpeg";
import mon from "/mon.jpg";
import bx from "/bx.png";
import tri from "/tri.png";
import arena from "/arenapulse.png";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

/* ======================= */

type Sponsor = {
  name: string;
  logo: string;
  role?: string;
};

/* ======================= */

const goldSponsors: Sponsor[] = [
  { name: "Coding Blocks", logo: cblogo },
  { name: "Samatrix.io", logo: samatrix },
];

const platformSponsor: Sponsor = {
  name: "Devfolio",
  logo: devfolio,
};

const specialSponsors: Sponsor[] = [
  { name: "Domain Partner", logo: xyz, role: "Domain Partner" },
  { name: "Give My Certificate", logo: Give, role: "Certificate Partner" },
  { name: "ETHIndia", logo: ethindia, role: "Blockchain Partner" },
  { name: "DevDock", logo: devdock, role: "AI Partner" },
  { name: "BX", logo: bx, role: "Monetary Partner" },
  { name: "Tri", logo: tri, role: "Monetary Partner" },
  { name: "ArenaPulse", logo: arena, role: "Gaming Partner" },
];

const communityPartners = [
  hackcbs,
  bc,
  ac,
  kt,
  dna,
  mon,
  bx,
  tri,
  arena,
];

/* ======================= */

export function SponsorsSection(): JSX.Element {
  return (
    <section id="sponsors" className="relative w-full px-6 py-10 bg-transparent">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-14 max-w-3xl">
          <p className="font-mono text-xs tracking-[0.45em] uppercase text-muted-foreground">
            Sponsors & Partners
          </p>
          <h2 className="mt-4 font-pixel text-3xl md:text-4xl text-primary">
            POWERING NEXHACK 1.0
          </h2>
          <p className="mt-6 font-mono text-muted-foreground text-sm leading-relaxed">
            These organizations didn’t just support the event —
            they helped shape the world NexHack 1.0 was built in.
          </p>
        </div>

        {/* GOLD SPONSORS — BOSS BLOCKS */}
        <div className="mb-16">
          <h3 className="mb-10 text-center font-pixel text-xs tracking-widest uppercase text-primary">
            Gold Sponsors
          </h3>

          <div className="flex flex-wrap justify-center gap-10">
            {goldSponsors.map((s, i) => (
              <div
                key={i}
                className="
                  minecraft-card
                  relative
                  w-72 h-32
                  bg-black/70
                  border-2 border-neutral-700
                  flex items-center justify-center
                  shadow-[0_0_35px_rgba(250,204,21,0.45)]
                "
              >
                <div className="absolute inset-2 bg-white flex items-center justify-center">
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="max-h-16 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLATFORM PARTNER — CORE BEACON */}
        <div className="mb-20 text-center">
          <h3 className="mb-10 font-pixel text-xs tracking-widest uppercase text-primary">
            Platform Partner
          </h3>

          <div className="relative mx-auto w-80 h-36">
            <div className="absolute inset-0 rounded-sm bg-primary/20 blur-xl animate-pulse" />
            <div className="minecraft-card relative w-full h-full bg-black/70 border-2 border-neutral-700 flex items-center justify-center">
              <div className="absolute inset-2 bg-white flex items-center justify-center">
                <img
                  src={platformSponsor.logo}
                  alt={platformSponsor.name}
                  className="max-h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SPECIAL SPONSORS — CRAFTING GRID */}
        <div className="mb-16">
          <h3 className="mb-14 text-center font-pixel text-xs tracking-widest uppercase text-primary">
            Special Sponsors
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {specialSponsors.map((s, i) => (
              <div key={i} className="text-center">
                <div className="minecraft-card w-64 h-28 mx-auto bg-black/60 border-2 border-neutral-700 flex items-center justify-center">
                  <div className="absolute inset-2 bg-white flex items-center justify-center">
                    <img
                      src={s.logo}
                      alt={s.name}
                      className="max-h-14 object-contain"
                    />
                  </div>
                </div>

                <p className="mt-3 font-mono text-[11px] text-muted-foreground tracking-wide">
                  {s.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* COMMUNITY PARTNERS — MOB CONVEYOR */}
        <div className="mt-12">
          <h3 className="mb-10 text-center font-pixel text-xs tracking-widest uppercase text-primary">
            Community Partners
          </h3>

          <InfiniteMovingCards
            items={communityPartners.map((logo) => ({ image: logo }))}
            speed="slow"
          />
        </div>

        {/* SEAM */}
        <div className="mt-24 h-[3px] w-full bg-neutral-800" />
      </div>
    </section>
  );
}
