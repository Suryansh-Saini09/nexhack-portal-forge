import { Crown, Award, Medal } from 'lucide-react';

export const PrizesSection = () => {
  const prizes = [
    {
      place: "1st Place",
      icon: Crown,
      title: "NETHERITE TIER",
      amount: "25,000",
      description: "Cash prize + Exclusive tech bundle",
      color: "bg-netherite border-gray-600 text-gray-100",
      highlight: "border-yellow-400 shadow-yellow-400/50"
    },
    {
      place: "2nd Place",
      icon: Award,
      title: "DIAMOND TIER",
      amount: "₹15,000",
      description: "Cash prize + Mentorship program ",
      color: "bg-sky-900/80 border-sky-500 ",
      highlight: "border-blue-400 shadow-blue-400/50"
    },
    {
      place: "3rd Place",
      icon: Medal,
      title: "EMERALD TIER",
      amount: "₹10,000",
      description: "Cash prize + Tech accessories bundle",
      color: "bg-emerald-900/80 border-emerald-500 text-emerald-200",
      highlight: "border-green-400 shadow-green-400/50"
    }
  ];

  const specialPrizes = [
    "All Girls Team - 5,000",
    "Best AI Innovation - 3,000"
  ];

  return (
    <section id="prizes" className="section-spacing">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            THE TREASURE AWAITS
          </h2>
          <p className="font-mono text-lg text-muted-foreground max-w-3xl mx-auto">
            Epic rewards for legendary builders. Over 1,20,000 in total prizes plus exclusive opportunities to launch your career.
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
                  <span className="font-pixel text-xs">GRAND CHAMPION</span>
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
        <div className="bg-[#2E2E2E]/60 border-4 border-[#5D4037] rounded-md backdrop-blur-sm shadow-[8px_8px_0_#1B1B1B] p-6 mx-auto max-w-3xl space-t-10 hover:scale-105 animate-in ease-in-out transition-all">
          <div className="text-center space-y-6">
            <h3 className="text-2xl text-[#FFD700] font-['Press_Start_2P'] animate-glow drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
               SPECIAL CATEGORY PRIZES 
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {specialPrizes.map((prize, index) => (
                <div
                  key={index}
                  className="font-['Press_Start_2P'] text-xs text-[#F5F5DC] bg-[#3E2723]/80 border-2 border-[#8D6E63] p-4 rounded shadow-[4px_4px_0_#000] transition-all duration-300 ease-in-out animate-softPulse hover:-translate-y-1 hover:border-[#FFD700] hover:shadow-[6px_6px_0_#000] hover:brightness-110"
                >
                  🏆 {prize}
                </div>
              ))}
            </div>

            <p className="font-['Press_Start_2P'] text-[10px] text-[#BBBBBB] italic animate-blink">
              * Swag, certificates & epic networking for all players!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};