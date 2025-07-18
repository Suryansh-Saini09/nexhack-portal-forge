import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isNether } = useTheme();

  const navItems = [
    'ABOUT',
    'THEMES', 
    'PRIZES',
    'SCHEDULE',
    'SPONSORS',
    'TEAM',
    'FAQ',
    'CONTACT'
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-minecraft border-b border-border">
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="font-pixel text-lg text-primary text-shadow-glow">
              NEXHACK
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="font-mono text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90">
              REGISTER NOW →
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="minecraft-btn border-primary text-primary"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border backdrop-blur-minecraft">
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="font-mono text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 text-left"
                >
                  {item}
                </button>
              ))}
              <Button className="minecraft-btn bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
                REGISTER NOW →
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};