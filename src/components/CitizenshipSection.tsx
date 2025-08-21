import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserPlus, Map, Home, ArrowRight, Globe } from 'lucide-react';

const CitizenshipSection = () => {
  return (
    <section className="py-20 bg-verdis-blue-light">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-verdis-blue mb-6">
            Become a Verdian Citizen
          </h2>
          <p className="text-xl font-lora text-verdis-blue/80 max-w-4xl mx-auto leading-relaxed">
            Join our growing republic. Apply for citizenship and explore settlement mapping 
            opportunities where pioneers and visionaries can shape new communities along 
            the beautiful Danube River.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="verdis-card p-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-3">
              Full Citizenship Rights
            </h3>
            <p className="font-lora text-verdis-blue/70 text-sm">
              Voting rights, legal protection, and full participation in our democratic society.
            </p>
          </Card>

          <Card className="verdis-card p-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <Map className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-3">
              Settlement Opportunities
            </h3>
            <p className="font-lora text-verdis-blue/70 text-sm">
              Priority access to settlement mapping and land development projects.
            </p>
          </Card>

          <Card className="verdis-card p-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-3">
              Community Building
            </h3>
            <p className="font-lora text-verdis-blue/70 text-sm">
              Help shape the future of Verdis through community initiatives and programs.
            </p>
          </Card>

          <Card className="verdis-card p-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-3">
              International Recognition
            </h3>
            <p className="font-lora text-verdis-blue/70 text-sm">
              Be part of a sovereign nation with growing international presence.
            </p>
          </Card>

          <Card className="verdis-card p-6 md:col-span-2">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Map className="w-6 h-6 text-verdis-blue" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-3">
                  Interactive Settlement Maps
                </h3>
                <p className="font-lora text-verdis-blue/70 text-sm mb-4">
                  Explore our cutting-edge 3D settlement mapping system. Visualize available 
                  land, plan communities, and see how your investment contributes to Verdis' development.
                </p>
                <Button 
                  variant="verdis-outline" 
                  size="sm"
                  onClick={() => window.location.href = '#citizenship'}
                >
                  Explore Maps
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="verdis" 
              size="xl" 
              className="group"
              onClick={() => window.location.href = '#citizenship'}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Apply for Citizenship
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="verdis-secondary" 
              size="xl" 
              className="group"
              onClick={() => window.location.href = '#citizenship'}
            >
              <Map className="w-5 h-5 mr-2" />
              View Settlement Maps
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <p className="text-sm font-lora text-verdis-blue/60">
            Over 1,000 applications received. Join the growing Verdian community today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CitizenshipSection;