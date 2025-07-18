import { Crown, Award, Medal } from 'lucide-react';

export const PrizesSection = () => {
  const prizes = [
    {
      place: "1st Place",
      icon: Crown,
      title: "NETHERITE TIER",
      amount: "$5,000",
      description: "Cash prize + Premium internship opportunities + Exclusive tech bundle",
      color: "bg-netherite border-gray-600 text-gray-100",
      highlight: "border-yellow-400 shadow-yellow-400/50"
    },
    {
      place: "2nd Place", 
      icon: Award,
      title: "DIAMOND TIER",
      amount: "$3,000",
      description: "Cash prize + Mentorship program + Professional development package",
      color: "bg-diamond/20 border-diamond text-diamond",
      highlight: "border-blue-400 shadow-blue-400/50"
    },
    {
      place: "3rd Place",
      icon: Medal,
      title: "EMERALD TIER", 
      amount: "$1,500",
      description: "Cash prize + Online course credits + Tech accessories bundle",
      color: "bg-emerald/20 border-emerald text-emerald",
      highlight: "border-green-400 shadow-green-400/50"
    }
  ];

  const specialPrizes = [
    "Best AI Innovation - $1,000",
    "Most Creative Solution - $750", 
    "Best Beginner Project - $500",
    "People's Choice Award - $500"
  ];

  return (
    <section id="prizes" className="section-spacing">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            THE TREASURE AWAITS
          </h2>
          <p className="font-mono text-lg text-muted-foreground max-w-3xl mx-auto">
            Epic rewards for legendary builders. Over $15,000 in total prizes plus exclusive opportunities to launch your career.
          </p>
        </div>

        {/* Main Prizes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {prizes.map((prize, index) => (
            <div 
              key={index}
              className={`minecraft-card ${prize.color} ${prize.highlight} relative overflow-hidden border-4 shadow-2xl`}
            >
              {index === 0 && (
                <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-black text-center py-1">
                  <span className="font-pixel text-xs">👑 GRAND CHAMPION</span>
                </div>
              )}
              
              <div className="text-center space-y-4 pt-2">
                <div className="flex items-center justify-center space-x-2">
                  <prize.icon className="w-8 h-8" />
                  <span className="font-pixel text-xs">{prize.place}</span>
                </div>
                
                <h3 className="font-pixel text-lg">
                  {prize.title}
                </h3>
                
                <div className="text-4xl font-pixel text-shadow-glow">
                  {prize.amount}
                </div>
                
                <p className="font-mono text-sm opacity-90">
                  {prize.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Special Category Prizes */}
        <div className="minecraft-card bg-card/50 backdrop-blur-sm">
          <div className="text-center space-y-6">
            <h3 className="font-pixel text-xl text-primary">
              SPECIAL CATEGORY PRIZES
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {specialPrizes.map((prize, index) => (
                <div 
                  key={index}
                  className="font-mono text-sm text-foreground bg-muted/20 p-3 border border-border"
                >
                  🏆 {prize}
                </div>
              ))}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              * Plus swag, certificates, and networking opportunities for all participants
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};