import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme, isNether } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="minecraft-btn border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      aria-label={`Switch to ${isNether ? 'Overworld' : 'Nether'} theme`}
    >
      {isNether ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};