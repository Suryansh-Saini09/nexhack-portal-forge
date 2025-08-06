import { Code, Trophy, Users } from 'lucide-react';
import logo from '/logo.png'
export const AboutSection = () => {
  const features = [
    {
      iconLink: "https://cdn.lordicon.com/gvtjlyjf.json",
      title: "24 Hours of Innovation",
      description: "Push your limits and create something extraordinary in our intense coding marathon.",
      color:{
        primary:"#1AFF1A",
        secondary:"#152121"
      }
    },
    {
      iconLink: "https://cdn.lordicon.com/kezeezyg.json",
      title: "Legendary Loot & Prizes",
      description: "Compete for epic prizes including cash rewards and exclusive tech gear.",
      color:{
        primary:"#1AFF1A",
        secondary:"#1AFF1A"
      }
    },
    {
      iconLink: "https://cdn.lordicon.com/shcfcebj.json",
      title: "Expert Mentors & Workshops",
      description: "Learn from industry veterans and attend workshops to level up your skills.",
      color:{
        primary:"#1AFF1A",
        secondary:"#1AFF1A"
      }
    }
  ];

  return (
    <section id="about" className="section-spacing bg-black">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            WHAT IS NEXHACK?
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Mission Statement */}
          <div className='hidden md:inline'>
            <img src={logo} alt="" />
          </div>
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
                className="minecraft-card bg-transparent backdrop-blur-lg flex items-start space-x-4 shadow-primary/10 shadow-xl"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-black/10 border-2 border-primary flex items-center justify-center">
                    {/* <feature.icon className="w-6 h-6 text-primary" /> */}
                    <lord-icon part="box" class='regs' src={`${feature.iconLink}`} trigger="loop" colors={`primary:${feature.color.primary},secondary:${feature.color.secondary}`}/>
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