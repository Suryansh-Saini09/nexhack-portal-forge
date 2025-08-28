import { Cpu, Gamepad2, Heart, Shield, Zap, Globe, Wifi, ShieldCheckIcon, Lightbulb, Power, RocketIcon } from 'lucide-react';

export const ThemesSection = () => {
  const themes = [
    {
      icon: Cpu,
      title: "WordPress",
      description: "Crafting powerful websites and digital experiences with open-source tools",
      color: "bg-primary/10 border-primary text-primary"
    },
    {
      icon: Gamepad2,
      title: "EdTech",
      description: "Transforming education through technology-driven solutions.",
      color: "bg-secondary/10 border-secondary text-secondary"
    },
    {
      icon: Heart,
      title: "Open Innovation",
      description: "Breaking barriers with creative, cross-domain problem-solving.",
      color: "bg-emerald/10 border-emerald text-emerald"
    },
    {
      icon: Shield,
      title: "Web3",
      description: " Building decentralized and trustless systems of the future.",
      color: "bg-diamond/10 border-diamond text-diamond"
    },
    {
      icon: Zap,
      title: "AI in Agriculture",
      description: "Leveraging AI for smarter, sustainable farming practices.",
      color: "bg-accent/10 border-accent text-accent"
    },
    {
      icon: Lightbulb,
      title: "Generative AI",
      description: "Unlocking creativity with next-gen AI capabilities.",
      color: "bg-diamond/10 border-diamond text-diamond"
    },
     {
      icon: RocketIcon,
      title: "Robotics",
      description: " Designing intelligent, autonomous, and human-assistive machines.",
      color: "bg-secondary/10 border-secondary text-secondary"
    },
    {
      icon: ShieldCheckIcon,
      title: "Cybersecurity",
      description: " Protecting the digital world with secure and resilient systems.",
      color: "bg-diamond/10 border-diamond text-diamond"
    },
     {
      icon: Globe,
      title: "FinTech",
      description: "  Redefining financial services with digital innovation.",
      color: "bg-secondary/10 border-secondary text-secondary"
    },
    {
      icon: Wifi,
      title: "Campus Solutions ",
      description: " Innovating for smarter, connected, and future-ready campuses.",
      color: "bg-accent/10 border-accent text-accent"
    },
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
              className="minecraft-card group hover:shadow-xl"
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
        </div>
      </div>
    </section>
  );
};