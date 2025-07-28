import { Code, Trophy, Users } from 'lucide-react';

export const AboutSection = () => {
  const features = [
    {
      icon: Code,
      title: "24 Hours of Innovation",
      description: "Push your limits and create something extraordinary in our intense coding marathon."
    },
    {
      icon: Trophy,
      title: "Legendary Loot & Prizes",
      description: "Compete for epic prizes including cash rewards and exclusive tech gear."
    },
    {
      icon: Users,
      title: "Expert Mentors & Workshops",
      description: "Learn from industry veterans and attend workshops to level up your skills."
    }
  ];

  return (
    <section id="about" className="section-spacing">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            WHAT IS NEXHACK?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mission Statement */}
          <div className="space-y-6">
            <p className="font-mono text-lg leading-relaxed text-foreground">
              NexHack is not just another hackathon – it's a portal to the future of technology. 
              Inspired by the creativity and boundless possibilities of Minecraft, we've created 
              an environment where innovation thrives and dreams become reality.
            </p>
            <p className="font-mono text-lg leading-relaxed text-muted-foreground">
              Whether you're a seasoned developer or just starting your coding journey, 
              NexHack provides the perfect arena to showcase your skills, learn new technologies, 
              and connect with like-minded builders from across the dimension.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="minecraft-card flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 border-2 border-primary flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-pixel text-sm text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};