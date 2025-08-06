import { CometCard } from "@/components/comet-card";
export const TeamSection = () => {
  const team = [

    {
      name: "Nitish Chaudhary",
      role: "Lead Organizer",
      avatar: "/nitish.jpeg",
      bio: "Full-stack developer with a strong track record in building real-world web applications, leading tech communities, and winning national-level hackathon.",
      github:"https://github.com/MrZorawaR",
      linkedin: "https://www.linkedin.com/in/nitish315",
      instagram: "https://www.instagram.com/zorawar_singh_315"
    },
    {
      name: "Shravya Atrey",
      role: "Lead Organizer",
      avatar: "/shravyaaa.jpg",
      bio: "President of Innovation Forge at Geeta University, leading tech initiatives and community events with a strong foundation in Data Structures and Algorithms.",
      github:"https://github.com/shravya315",
      linkedin: "https://www.linkedin.com/in/shravyatrey315",
      instagram: "https://www.instagram.com/__shravyaaaaaaa"
    },
    {
      name: "Suryansh Saini",
      role: "Tech Lead",
      avatar: "/suryansh.jpeg",
      bio: "A passionate web developer and problem solver, leading tech strategy at CodeForge. Skilled in React.js and DSA, with a strong focus on building the student tech community.",
      github:"https://github.com/Suryansh-Saini09",
      linkedin: "https://www.linkedin.com/in/suryansh-saini-216712292/",
      instagram: "https://www.instagram.com/suryxnsh_09"
    },
    {
      name: "Harsh Kumar",
      role: "Operations Lead",
      avatar: "/harsh.jpeg",
      bio: "UX designer and community builder who ensures everyone feels welcome in our coding arena.",
      github:"https://github.com/harsh7509",
      linkedin: "https://www.linkedin.com/in/harshkumar7509",
      instagram: "https://www.instagram.com/harshxantil"
    },
    {
      name: "Sahil Bhardwaj",
      role: "Partnerships Lead",
      avatar: "/sahil.jpeg",
      bio: "Project manager extraordinaire who keeps everything running smoothly during the chaos.",
      github:"https://github.com/sahil-codesfor-fun",
      linkedin: "https://www.linkedin.com/in/sahil-bhardwaj-1b1672320/",
      instagram: "https://www.instagram.com/bhardwaj_sahil10"
    },
    {
      name: "Riya Rana",
      role: "Marketing Lead",
      avatar: "/riya.jpg",
      bio: "Digital marketing specialist who spreads the word about our epic coding adventures.",
      github:"https://github.com/riyarana9813",
      linkedin: "https://www.linkedin.com/in/riya-rana-b752a6327/",
      instagram: "https://www.instagram.com/rana_riyaaa/"
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
              <div className="space-y-4 flex flex-col items-center justify-between h-full">
                {/* Avatar */}
                <div className="w-48 h-48 mx-auto bg-primary/10 border-2 border-primary flex items-center justify-center text-4xl transition-all duration-300 group-hover:scale-110 group-hover:border-primary">
                  <img src={member.avatar} alt={`${member.name}'s avatar h-48 w-48`} />
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
                    target="_blank"
                    href={member.github}
                    className="w-8 h-8 bg-muted/20 border border-border flex items-center justify-center hover:bg-primary/50 hover:text-primary-foreground transition-all duration-200 text-xs"
                    aria-label="GitHub"
                  >
                    <lord-icon
                      part="box"
                      src="https://cdn.lordicon.com/jjxzcivr.json"
                      trigger="loop"
                      colors="primary:#ffffff,secondary:#ffffff"
                    />
                  </a>
                  <a
                    target="_blank"
                    href={member.linkedin}
                    className="w-8 h-8 bg-muted/20 border border-border flex items-center justify-center hover:bg-primary/50 hover:text-primary-foreground transition-all duration-200 text-xs"
                    aria-label="LinkedIn"
                  >
                    <lord-icon
                      part="box"
                      src="https://cdn.lordicon.com/qgebwute.json"
                      trigger="loop"
                      colors="primary:#ffffff,secondary:#ffffff"
                    />
                  </a>
                  <a
                    target="_blank"
                    href={member.instagram}
                    className="w-8 h-8 bg-muted/20 border border-border flex items-center justify-center hover:bg-primary/50 hover:text-primary-foreground transition-all duration-200 text-xs"
                    aria-label="Instagram"
                  >
                    <lord-icon
                      part="box"
                      src="https://cdn.lordicon.com/tgyvxauj.json"
                      trigger="loop"
                      colors="primary:#ffffff,secondary:#ffffff"
                    />
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
              WANT TO BECOME A MENTOR?
            </h3>
            <p className="font-mono text-sm text-muted-foreground mb-6">
              Are you an industry professional, a seasoned developer, or a design wizard? Share your expertise, guide our participants, and help shape the future of tech by mentoring at our next event.
            </p>
            <a
              href="mailto:mentors@nexhack.dev?subject=Mentor Application for NexaHack"
              className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 font-pixel text-xs uppercase tracking-wider transform transition-all duration-200 hover:scale-105 active:scale-95 border-2 inline-block"
            >
              BECOME A MENTOR →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};