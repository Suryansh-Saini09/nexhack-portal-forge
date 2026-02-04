import { BackgroundBeams } from "@/components/background-beams";
import { useState } from "react";
import { SponsorDialog } from "./SponsorDialog";
import { Button } from "./ui/button";
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

export const SponsorsSection = () => {
  const sponsors = {
    netherite: [
      { name: "TechCorp", logo: "🏢" },
      { name: "InnovateLab", logo: "🚀" },
    ],
    diamond: [
      { name: "CodeBase", logo: "💎" },
      { name: "DevTools Inc", logo: "🔧" },
      { name: "CloudNet", logo: "☁️" },
    ],
    emerald: [{ name: "", logo: devfolio }],
    gold: [{ name: "", logo: cblogo }],
    general: [
      { name: "Domain Partner", logo: xyz },
      { name: "Certificate\u00A0Partner", logo: Give },
      { name: "Blockchain\u00A0Partner", logo: ethindia },
      { name: "AI Partner", logo: devdock },
      { name: "Strategic Partner", logo: bx },
      { name: "Strategic Partner", logo: tri },
      { name: "Gaming Partner", logo: arena },
    ],
  };

  const [sponsorOpen, setSponsorOpen] = useState(false);


  return (

    <section id="sponsors" className="section-spacing bg-black/60 relative">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            OUR PAST STRATEGIC ALLIES
          </h2>
          <p className="font-mono text-lg text-muted-foreground max-w-3xl mx-auto">
            Powered by industry leaders who believe in the next generation of
            innovators. Join our sponsor alliance!
          </p>
        </div>

        {/* Netherite Tier */}
        {/* <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-pixel text-xl text-gray-400 mb-2">NETHERITE TIER</h3>
            <div className="w-24 h-1 bg-gray-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {sponsors.netherite.map((sponsor, index) => (
              <div key={index} className="minecraft-card bg-netherite/10 border-2 border-gray-600 text-center p-8 hover:shadow-2xl">
                <div className="text-6xl mb-4">{sponsor.logo}</div>
                <h4 className="font-pixel text-lg text-gray-100">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div> */}

        {/* Diamond Tier */}
        {/* <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-pixel text-xl text-diamond mb-2">DIAMOND TIER</h3>
            <div className="w-24 h-1 bg-diamond mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sponsors.diamond.map((sponsor, index) => (
              <div key={index} className="minecraft-card bg-diamond/10 border-2 border-diamond text-center p-6 hover:shadow-xl">
                <div className="text-4xl mb-3">{sponsor.logo}</div>
                <h4 className="font-pixel text-sm text-diamond">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div> */}

        {/* Emerald Tier */}
        {/* <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="font-pixel text-xl text-emerald mb-2">EMERALD TIER</h3>
            <div className="w-24 h-1 bg-emerald mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {sponsors.emerald.map((sponsor, index) => (
              <div key={index} className="minecraft-card bg-emerald/10 border border-emerald text-center p-4 hover:shadow-lg">
                <div className="text-3xl mb-2">{sponsor.logo}</div>
                <h4 className="font-pixel text-xs text-emerald">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div> */}
        {/* {Gold Sponsers/} */}
        <div className="my-12">
          <div className="text-center mb-8">
            <h3 className="font-pixel text-xl text-primary mb-2">
              Gold Sponsors
            </h3>
            <div className="w-24 h-1 bg-emerald mx-auto"></div>
          </div>
          <div className="flex h-[13vh] justify-center">
            {sponsors.emerald.map((sponsor, index) => (
              <div key={index} className="flex justify-center item-center gap-10  d">
                <div className="flex justify-center items-center bg-white rounded-lg shadow-md p-6 w-72 h-32 gap-5">
                  <img src={cblogo} className="h-20" />
                </div>
                <div className="flex justify-center items-center bg-white rounded-lg shadow-md p-6 w-72 gap-10 h-32">
                  <img src={samatrix} className="h-30" />
                </div>
                <h4 className="font-pixel text-xs text-emerald">
                  {sponsor.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
        {/* Platform Partner */}
        <div className="my-12">
          <div className="text-center mb-8">
            <h3 className="font-pixel text-xl text-primary mb-2">
              Platform Partner
            </h3>
            <div className="w-24 h-1 bg-emerald mx-auto"></div>
          </div>
          <div className="flex h-[13vh] justify-center">
            {sponsors.emerald.map((sponsor, index) => (
              <div key={index} className="flex justify-center item-center ">
                <div className="flex justify-center items-center bg-white rounded-lg shadow-md p-6 w-72 h-32">
                  <img src={devfolio} className="h-30" />
                </div>
                <h4 className="font-pixel text-xs text-emerald">
                  {sponsor.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
        {/* special Sponsors */}
        {
          <div className="my-12">
            <div className="text-center mb-8">
              <h3 className="font-pixel text-primary mb-2 text-xl">Special Sponsors</h3>
              <div className="w-24 h-1 bg-blue-200 mx-auto"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[100px] max-w- mx-auto ">
              {sponsors.general.map((sponsor, index) => (
                <div className="flex flex-col gap-5 justify-center rounded-md items-center text-shadow-glow ">
                  <div
                    key={index}
                    className=" flex justify-center items-center bg-white rounded-lg shadow-md p-6 w-72 h-32 gap-20"
                  >
                    {/* <div className="text-3xl mb-2">{sponsor.logo}</div> */}
                    <img src={sponsor.logo} className="max-h-20 " />
                  </div>
                  <h4 className="font-pixel text-sm text-">{sponsor.name}</h4>
                </div>
              ))}
            </div>
            <br />
            {/* {community partner} */}
            {

              <div className="my-12">
                <div className="text-center mb-8">
                  <h3 className="font-pixel text-xl text-primary mb-2">
                    Community Partners
                  </h3>
                  <div className="w-24 h-1 bg-emerald mx-auto"></div>
                </div>
                <InfiniteMovingCards
                  items={[
                    { image: hackcbs },
                    { image: bc },
                    { image: ac },
                    { image: kt },
                    { image: dna },
                    { image: mon },
                    { image: "/hackshastra.png" },
                  ]}
                  speed="slow"
                />
              </div>
            }
          </div>

        }
        {/* Sponsor CTA */}
        <div className="text-center">
          <div className="minecraft-card bg-card/50 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="font-pixel text-lg text-primary mb-4">
              BECOME A SPONSOR
            </h3>
            <p className="font-mono text-sm text-muted-foreground mb-6">
              Partner with us to reach 500+ talented developers and showcase
              your brand to the next generation of innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setSponsorOpen(true)}
                className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 font-pixel text-xs uppercase tracking-wider transform transition-all duration-200 hover:scale-105 active:scale-95 border-2 inline-block"
              >
                SPONSOR US →
              </Button>

              {/* <button onClick={() => alert("Clicked!")}>SPONSOR US →</button> */}
            </div>
          </div>
        </div>
      </div>
      {/* <BackgroundBeams /> */}
      <SponsorDialog open={sponsorOpen} onOpenChange={setSponsorOpen} />
    </section>
  );
};
