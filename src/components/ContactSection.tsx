import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast'; // ✅ Add this

export const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!email || !message) {
      toast({
        title: 'Both email and message are required.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch('https://websitebackend-w5m9.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error('Something went wrong');

      toast({
        title: 'Message Sent ✅',
        description: "We'll reach out to you shortly!",
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast({
        title: 'Failed to send message',
        description: 'Please try again later or email us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      content: "Geeta University, Naultha, Panipat",
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
          {/* Contact Info */}
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
                      <h4 className="font-pixel text-sm text-foreground mb-1">{info.title}</h4>
                      <p className="font-mono text-sm text-primary font-medium mb-1">{info.content}</p>
                      <p className="font-mono text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
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
                  <label className="font-pixel text-xs text-foreground mb-2 block">NAME *</label>
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
                  <label className="font-pixel text-xs text-foreground mb-2 block">EMAIL *</label>
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
                <label className="font-pixel text-xs text-foreground mb-2 block">MESSAGE *</label>
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
                disabled={isSubmitting}
                className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90 w-full"
              >
                {isSubmitting ? 'Sending...' : 'TRANSMIT MESSAGE →'}
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