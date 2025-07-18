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
    emerald: [
      { name: "StartupHub", logo: "💼" },
      { name: "TechVenture", logo: "📱" },
      { name: "DataFlow", logo: "📊" },
      { name: "WebCraft", logo: "🌐" },
    ]
  };

  return (
    <section id="sponsors" className="section-spacing bg-muted/5">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            OUR STRATEGIC ALLIES
          </h2>
          <p className="font-mono text-lg text-muted-foreground max-w-3xl mx-auto">
            Powered by industry leaders who believe in the next generation of innovators. Join our sponsor alliance!
          </p>
        </div>

        {/* Netherite Tier */}
        <div className="mb-16">
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
        </div>

        {/* Diamond Tier */}
        <div className="mb-16">
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
        </div>

        {/* Emerald Tier */}
        <div className="mb-12">
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
        </div>

        {/* Sponsor CTA */}
        <div className="text-center">
          <div className="minecraft-card bg-card/50 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="font-pixel text-lg text-primary mb-4">
              BECOME A SPONSOR
            </h3>
            <p className="font-mono text-sm text-muted-foreground mb-6">
              Partner with us to reach 500+ talented developers and showcase your brand to the next generation of innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:sponsors@nexhack.dev"
                className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 font-pixel text-xs uppercase tracking-wider transform transition-all duration-200 hover:scale-105 active:scale-95 border-2 inline-block"
              >
                SPONSOR US →
              </a>
              <a
                href="#"
                className="minecraft-btn border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 font-pixel text-xs uppercase tracking-wider transform transition-all duration-200 hover:scale-105 active:scale-95 border-2 inline-block"
              >
                VIEW PACKAGE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};