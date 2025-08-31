import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import GovernanceSection from '@/components/GovernanceSection';
import CitizenshipSection from '@/components/CitizenshipSection';
import DonationSection from '@/components/DonationSection';
import DefenseSection from '@/components/DefenseSection';
import Footer from '@/components/Footer';
import AdminLogin from "@/components/AdminLogin";
import { Shield } from "lucide-react";

const Index = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <GovernanceSection />
      <CitizenshipSection data-section="settlements" />
      <DonationSection data-section="donations" />
      <DefenseSection />
      <Footer />
      
      {/* Hidden Admin Access - Triple Click */}
      <div 
        className="fixed bottom-4 right-4 w-8 h-8 opacity-0 cursor-pointer"
        onClick={(e) => {
          if (e.detail === 3) { // Triple click
            setShowAdminLogin(true);
          }
        }}
      >
        <Shield className="w-8 h-8" />
      </div>

      <AdminLogin 
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />
    </div>
  );
};

export default Index;
