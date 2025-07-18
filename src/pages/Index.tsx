import { Background } from '@/components/Background';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ThemesSection } from '@/components/ThemesSection';
import { PrizesSection } from '@/components/PrizesSection';
import { ScheduleSection } from '@/components/ScheduleSection';
import { SponsorsSection } from '@/components/SponsorsSection';
import { TeamSection } from '@/components/TeamSection';
import { FAQSection } from '@/components/FAQSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <Background />
      
      {/* Header/Navigation */}
      <Header />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ThemesSection />
        <PrizesSection />
        <ScheduleSection />
        <SponsorsSection />
        <TeamSection />
        <FAQSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
