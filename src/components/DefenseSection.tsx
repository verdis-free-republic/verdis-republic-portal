import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Users, Globe, ArrowRight, Lock } from 'lucide-react';

const DefenseSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-white mb-6">
            Protecting Our Freedom
          </h2>
          <p className="text-xl font-lora text-white/90 max-w-4xl mx-auto leading-relaxed">
            As a sovereign nation, Verdis ensures the safety of its citizens. We are building 
            a modern defense structure and welcome partnerships, equipment support, and 
            security collaborations to protect our independence and democratic values.
          </p>
        </div>

        {/* Defense Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold font-montserrat text-white mb-4">
              National Security
            </h3>
            <p className="font-lora text-white/80">
              Comprehensive security framework protecting our territorial integrity 
              and citizen safety through modern defense systems.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold font-montserrat text-white mb-4">
              International Partnerships
            </h3>
            <p className="font-lora text-white/80">
              Building strategic alliances and security partnerships with allied 
              nations to ensure regional stability and mutual protection.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 text-center hover:bg-white/20 transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold font-montserrat text-white mb-4">
              Cyber Security
            </h3>
            <p className="font-lora text-white/80">
              Advanced cyber defense capabilities protecting our digital infrastructure 
              and citizen data in the modern threat landscape.
            </p>
          </Card>
        </div>

        {/* Defense Priorities */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
            <h3 className="text-2xl font-bold font-montserrat text-white mb-6 text-center">
              Our Defense Priorities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat text-white mb-2">
                    Modern Equipment & Technology
                  </h4>
                  <p className="font-lora text-white/80 text-sm">
                    Investing in cutting-edge defense technology and equipment to ensure 
                    effective protection of our territory and citizens.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat text-white mb-2">
                    Training & Preparedness
                  </h4>
                  <p className="font-lora text-white/80 text-sm">
                    Comprehensive training programs for our defense forces and 
                    emergency preparedness for all citizens.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat text-white mb-2">
                    Diplomatic Security
                  </h4>
                  <p className="font-lora text-white/80 text-sm">
                    Building diplomatic relationships that enhance our security 
                    through international cooperation and mutual respect.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold font-montserrat text-white mb-2">
                    Economic Security
                  </h4>
                  <p className="font-lora text-white/80 text-sm">
                    Ensuring economic stability and resilience as a foundation 
                    for long-term national security.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold font-montserrat text-white mb-6">
            Support Our Defense Efforts
          </h3>
          <p className="font-lora text-white/90 mb-8 max-w-2xl mx-auto">
            Help us build a strong, secure future for Verdis. Your support enables us 
            to invest in the technology, partnerships, and capabilities needed to 
            protect our sovereignty and democratic values.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="verdis-secondary" 
              size="xl" 
              className="group"
              onClick={() => window.location.href = '#donations'}
            >
              <Shield className="w-5 h-5 mr-2" />
              Support Defense Efforts
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="verdis-outline" 
              size="xl" 
              className="border-white text-white hover:bg-white hover:text-verdis-blue-dark group"
              onClick={() => window.location.href = '#partnerships'}
            >
              <Globe className="w-5 h-5 mr-2" />
              Partnership Opportunities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefenseSection;