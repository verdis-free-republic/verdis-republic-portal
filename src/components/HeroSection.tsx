import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Heart, Users } from 'lucide-react';
import danubeHero from '@/assets/danube-river-hero.jpg';
import verdisFlag from '@/assets/verdis-flag.jpg';

const HeroSection = () => {
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
              onClick={() => {
                alert('Citizenship Application Form\n\nTo apply for Verdian citizenship, please email your application to: citizenship@verdis.org\n\nInclude:\n- Full name and contact information\n- Brief statement of intent\n- Supporting documents');
              }}
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
                alert('Donate to Verdis using Bitcoin\n\nBitcoin Address:\nbc1p53vpr7getgck5d4xva8xjgm7kldkwd7m0l837v7vv79j8vutxn3s3uux47\n\nYour donation helps build our nation\'s infrastructure, institutions, and future.');
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
                alert('Settlement Maps\n\nInteractive settlement maps are currently in development. Contact us at: settlements@verdis.org for early access and pioneer opportunities.');
              }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore Settlement Maps
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-4xl font-bold font-montserrat text-primary mb-2">
                $500K+
              </div>
              <p className="text-white/80 font-lora">Raised for Development</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold font-montserrat text-primary mb-2">
                1000+
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