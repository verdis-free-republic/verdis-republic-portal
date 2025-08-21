import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import GovernanceSection from '@/components/GovernanceSection';
import CitizenshipSection from '@/components/CitizenshipSection';
import DonationSection from '@/components/DonationSection';
import DefenseSection from '@/components/DefenseSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <GovernanceSection />
      <CitizenshipSection />
      <DonationSection />
      <DefenseSection />
      <Footer />
    </div>
  );
};

export default Index;
