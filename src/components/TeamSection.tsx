export const TeamSection = () => {
  const team = [
    {
      name: "Alex Chen",
      role: "Event Director",
      avatar: "👨‍💻",
      bio: "Full-stack developer and hackathon veteran with 5+ years of experience building developer communities."
    },
    {
      name: "Sarah Johnson", 
      role: "Technical Lead",
      avatar: "👩‍🔬",
      bio: "AI/ML engineer at TechCorp, passionate about mentoring the next generation of builders."
    },
    {
      name: "Mike Rodriguez",
      role: "Partnerships Director", 
      avatar: "👨‍💼",
      bio: "Business development expert who connects startups with talent and opportunities."
    },
    {
      name: "Emily Zhang",
      role: "Community Manager",
      avatar: "👩‍🎨", 
      bio: "UX designer and community builder who ensures everyone feels welcome in our coding arena."
    },
    {
      name: "David Kim",
      role: "Operations Lead",
      avatar: "👨‍🏭",
      bio: "Project manager extraordinaire who keeps everything running smoothly during the chaos."
    },
    {
      name: "Lisa Patel",
      role: "Marketing Director",
      avatar: "👩‍💻",
      bio: "Digital marketing specialist who spreads the word about our epic coding adventures."
    }
  ];

  return (
    <section id="team" className="section-spacing">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            MEET THE ARCHITECTS
          </h2>
          <p className="font-mono text-lg text-muted-foreground max-w-3xl mx-auto">
            The masterminds behind NexHack. Our team of passionate builders, organizers, and mentors who make the magic happen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="minecraft-card text-center group hover:shadow-xl">
              <div className="space-y-4">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto bg-primary/10 border-2 border-primary flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 group-hover:border-primary">
                  {member.avatar}
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="font-pixel text-lg text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="font-mono text-sm text-primary font-medium">
                    {member.role}
                  </p>
                </div>

                {/* Bio */}
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center space-x-3 pt-2">
                  <a
                    href="#"
                    className="w-8 h-8 bg-muted/20 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs"
                    aria-label="GitHub"
                  >
                    🐙
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-muted/20 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs"
                    aria-label="LinkedIn"
                  >
                    💼
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-muted/20 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs"
                    aria-label="Twitter"
                  >
                    🐦
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <div className="minecraft-card bg-card/50 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="font-pixel text-lg text-primary mb-4">
              WANT TO JOIN THE TEAM?
            </h3>
            <p className="font-mono text-sm text-muted-foreground mb-6">
              We're always looking for passionate individuals to help organize future events. Join our mission to empower the next generation of builders!
            </p>
            <a
              href="mailto:team@nexhack.dev"
              className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 font-pixel text-xs uppercase tracking-wider transform transition-all duration-200 hover:scale-105 active:scale-95 border-2 inline-block"
            >
              JOIN THE TEAM →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};