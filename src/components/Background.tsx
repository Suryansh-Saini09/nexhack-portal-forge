import { useTheme } from '@/contexts/ThemeContext';
import netherBg from '@/assets/nether-bg.jpg';
import overworldBg from '@/assets/overworld-bg.jpg';

export const Background = () => {
  const { isNether } = useTheme();

  return (
    <div 
      className="floating-bg"
      style={{
        backgroundImage: `url(${isNether ? netherBg : overworldBg})`,
      }}
    />
  );
};