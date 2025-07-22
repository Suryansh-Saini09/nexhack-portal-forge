import { useTheme } from '@/contexts/ThemeContext';
import netherBg from '@/assets/nether-world.mp4';
import overworldBg from '@/assets/overworld.mp4';

export const Background = () => {
  const { isNether } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
        src={isNether ? netherBg : overworldBg}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};
