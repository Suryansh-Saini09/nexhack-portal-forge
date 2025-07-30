import { Github, Twitter, Instagram, Mail, MessageCircle } from 'lucide-react';
import {BackgroundBeamsWithCollision} from '@/components/background-beams-with-collision'
export const Footer = () => {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Themes', href: '#themes' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'FAQ', href: '#faq' },
  ];

  const socialLinks = [
    { name: 'Discord', icon: MessageCircle, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@nexhack.dev' },
  ];

  return (
    <BackgroundBeamsWithCollision>
    <footer className=" border-t border-border">
      <div className="container-max section-spacing">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <h3 className="font-pixel text-lg text-primary">
              NEXHACK
            </h3>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              The nexus of innovation where the next generation of builders, coders, and dreamers unite to hack the next dimension.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-pixel text-sm text-foreground">
              QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <a
                key={link.name}
                href={link.href}
                className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-pixel text-sm text-foreground">
              CONNECT WITH US
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-muted/20 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110"
                aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Join our Discord for real-time updates and community discussions!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-mono text-xs text-muted-foreground">
              © 2025 Geeta University. A Nexus for the Next Generation of Builders.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
</BackgroundBeamsWithCollision>
  );
};