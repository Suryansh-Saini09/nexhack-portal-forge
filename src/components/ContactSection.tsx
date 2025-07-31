import { useState } from 'react';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: "https://cdn.lordicon.com/ozlkyfxg.json",
      title: "Email",
      content: "nexhack@geetauniversity.edu.in",
      description: "Send us a message anytime"
    },
    {
      icon: "https://cdn.lordicon.com/zvnxzuwv.json",
      title: "Discord",
      content: "thenexhack",
      description: "Join our active community"
    },
    {
      icon: "https://cdn.lordicon.com/onmwuuox.json",
      title: "Location",
      content: "Geeta University,Naultha,Panipat",
      description: "Main Engineering Building"
    },
    {
      icon: "https://cdn.lordicon.com/vcdutftw.json",
      title: "Emergency",
      content: "9012822721",
      description: "Event day support only"
    }
  ];
  

  return (
    <section id="contact" className="section-spacing bg-muted/5">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-8">
            OPEN A COMMS CHANNEL
          </h2>
          <p className="font-mono text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to join the quest? Have questions? Want to become a sponsor? Let's establish communication!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-pixel text-xl text-foreground mb-6">
                GET IN TOUCH
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="minecraft-card flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 border-2 border-primary flex items-center justify-center">
                        <lord-icon
                            part="box"
                            src={info.icon}
                            trigger="loop"
                            colors="primary:#19E71A,secondary:#19E71A"
                          />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-pixel text-sm text-foreground mb-1">
                        {info.title}
                      </h4>
                      <p className="font-mono text-sm text-primary font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="minecraft-card bg-primary/5 border-primary">
              <h4 className="font-pixel text-sm text-primary mb-4">
                RESPONSE STATS
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="font-pixel text-lg text-primary">&lt; 24h</div>
                  <div className="font-mono text-xs text-muted-foreground">Email Response</div>
                </div>
                <div className="text-center">
                  <div className="font-pixel text-lg text-primary">24/7</div>
                  <div className="font-mono text-xs text-muted-foreground">Discord Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-pixel text-xl text-foreground mb-6">
              SEND MESSAGE
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-pixel text-xs text-foreground mb-2 block">
                    NAME *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="font-mono border-2 border-border focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-pixel text-xs text-foreground mb-2 block">
                    EMAIL *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="font-mono border-2 border-border focus:border-primary"
                    placeholder="your.email@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="font-pixel text-xs text-foreground mb-2 block">
                  SUBJECT *
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="font-mono border-2 border-border focus:border-primary"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="font-pixel text-xs text-foreground mb-2 block">
                  MESSAGE *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="font-mono border-2 border-border focus:border-primary resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <Button
                type="submit"
                className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90 w-full"
              >
                TRANSMIT MESSAGE →
              </Button>
            </form>

            <p className="font-mono text-xs text-muted-foreground mt-4">
              * Required fields. We'll get back to you within 24 hours!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};