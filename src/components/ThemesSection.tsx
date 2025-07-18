import { Cpu, Gamepad2, Heart, Shield, Zap, Globe } from 'lucide-react';

export const ThemesSection = () => {
  const themes = [
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      description: "Build intelligent systems that can learn, adapt, and solve complex problems.",
      color: "bg-primary/10 border-primary text-primary"
    },
    {
      icon: Gamepad2,
      title: "Gaming & Entertainment",
      description: "Create immersive experiences that captivate and engage users.",
      color: "bg-secondary/10 border-secondary text-secondary"
    },
    {
      icon: Heart,
      title: "Healthcare & Wellness",
      description: "Develop solutions that improve lives and promote well-being.",
      color: "bg-emerald/10 border-emerald text-emerald"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Protect the digital realm with innovative security solutions.",
      color: "bg-diamond/10 border-diamond text-diamond"
    },
    {
      icon: Zap,
      title: "Sustainability & Environment",
      description: "Build for a greener future with eco-friendly technologies.",
      color: "bg-accent/10 border-accent text-accent"
    },
    {
      icon: Globe,
      title: "Open Innovation",
      description: "Think outside the box and create something completely new.",
      color: "bg-muted/10 border-muted-foreground text-muted-foreground"
    }
  ];

  return (
    <section id="themes" className="section-spacing bg-muted/5">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            CHOOSE YOUR QUEST
          </h2>
          <p className="font-mono text-lg text-muted-foreground max-w-3xl mx-auto">
            Select your adventure path and build solutions that matter. Each quest offers unique challenges and opportunities to make an impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <div 
              key={index}
              className="minecraft-card group cursor-pointer hover:shadow-xl"
            >
              <div className="text-center space-y-4">
                <div className={`w-16 h-16 mx-auto ${theme.color} flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110`}>
                  <theme.icon className="w-8 h-8" />
                </div>
                <h3 className="font-pixel text-sm text-foreground">
                  {theme.title}
                </h3>
                <p className="font-mono text-sm text-muted-foreground">
                  {theme.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-mono text-sm text-muted-foreground">
            💡 Can't decide? Teams can combine multiple themes for hybrid solutions!
          </p>
        </div>
      </div>
    </section>
  );
};