import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Heart, Users } from 'lucide-react';
import danubeHero from '@/assets/danube-river-hero.jpg';
import verdisFlag from '@/assets/verdis-flag.jpg';
import { CitizenshipFormWizard } from '@/components/citizenship/CitizenshipFormWizard';

const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${danubeHero})` }}
      >
        <div className="absolute inset-0 verdis-hero-bg opacity-80"></div>
      </div>

      {/* Floating Flag */}
      <div className="absolute top-20 right-10 verdis-flag-wave verdis-float hidden lg:block">
        <img 
          src={verdisFlag} 
          alt="Flag of the Free Republic of Verdis"
          className="w-32 h-20 object-cover rounded-lg shadow-2xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <h1 className="text-5xl lg:text-7xl font-bold font-montserrat tracking-tight">
            Welcome to the{' '}
            <span className="block text-gradient-blue font-lora italic">
              Free Republic of Verdis
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl font-lora text-white/90 max-w-3xl mx-auto leading-relaxed">
            A Sovereign Land of Freedom, Unity, and Opportunity
          </p>

          {/* Description */}
          <p className="text-lg text-white/80 max-w-2xl mx-auto font-montserrat">
            Born from history, shaped by hope. Between Croatia and Serbia along the Danube, 
            we are building a nation of peace, fairness, and democracy.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <Button 
              variant="verdis" 
              size="xl" 
              className="group"
              onClick={() => setIsFormOpen(true)}
            >
              <Users className="w-5 h-5 mr-2" />
              Apply for Citizenship
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="verdis-secondary" 
              size="xl" 
              className="group"
              onClick={() => {
                const donationSection = document.querySelector('[data-section="donations"]');
                if (donationSection) {
                  donationSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Heart className="w-5 h-5 mr-2" />
              Donate to Verdis
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="verdis-outline" 
              size="xl" 
              className="group border-white text-white hover:bg-white hover:text-verdis-blue-dark"
              onClick={() => {
                const settlementSection = document.querySelector('[data-section="settlements"]');
                if (settlementSection) {
                  settlementSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore Settlement Maps
            </Button>
          </div>

          {/* Admin Link */}
          <div className="mt-8">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white text-sm underline"
              onClick={() => window.location.href = '/admin'}
            >
              Admin Dashboard
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-4xl font-bold font-montserrat text-primary mb-2">
                $50K+
              </div>
              <p className="text-white/80 font-lora">Total Funds Raised</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold font-montserrat text-primary mb-2">
                500+
              </div>
              <p className="text-white/80 font-lora">Citizenship Applications</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold font-montserrat text-primary mb-2">
                2019
              </div>
              <p className="text-white/80 font-lora">Proclamation of Independence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Citizenship Form Modal */}
      <CitizenshipFormWizard 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;