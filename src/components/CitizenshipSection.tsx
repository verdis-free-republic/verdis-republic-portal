import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, Map, Home, ArrowRight, Globe, MapPin, Users } from 'lucide-react';
import { CitizenshipFormWizard } from './citizenship/CitizenshipFormWizard';

const CitizenshipSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);

  return (
    <section className="py-20 bg-verdis-blue-light" data-section="settlements">
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
                <MapPin className="w-6 h-6 text-verdis-blue" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-3">
                  Interactive Settlement Maps
                </h3>
                <p className="font-lora text-verdis-blue/70 text-sm mb-4">
                  Explore our cutting-edge 3D settlement mapping system. Visualize available 
                  land, plan communities, and see how your investment contributes to Verdis' development. 
                  Priority access for citizens and early settlers.
                </p>
                <Button 
                  variant="verdis-outline" 
                  size="sm"
                  onClick={() => setIsMapDialogOpen(true)}
                  className="group"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Explore Settlement Maps
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
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
              onClick={() => setIsFormOpen(true)}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Apply for Citizenship
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="verdis-secondary" 
              size="xl" 
              className="group"
              onClick={() => setIsMapDialogOpen(true)}
            >
              <Map className="w-5 h-5 mr-2" />
              View Settlement Maps
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <p className="text-sm font-lora text-verdis-blue/60">
            Over 500 applications received. Join the growing Verdian community today.
          </p>
        </div>
      </div>

      {/* Citizenship Application Form */}
      <CitizenshipFormWizard 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />

      {/* Settlement Maps Dialog */}
      <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat text-verdis-blue">
              Verdis Settlement Mapping System
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <Card className="verdis-card p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-montserrat text-verdis-blue mb-3">
                    Interactive 3D Settlement Maps
                  </h3>
                  <p className="font-lora text-muted-foreground mb-4">
                    Our cutting-edge settlement mapping system allows you to explore available land 
                    along the Danube River, visualize community layouts, and see development opportunities 
                    in real-time 3D environments.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="verdis-card p-4">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-semibold font-montserrat text-verdis-blue mb-2">
                  Pioneer Communities
                </h4>
                <p className="text-sm text-muted-foreground">
                  Join planned settlements designed for early citizens and investors.
                </p>
              </Card>

              <Card className="verdis-card p-4">
                <Globe className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-semibold font-montserrat text-verdis-blue mb-2">
                  Land Development
                </h4>
                <p className="text-sm text-muted-foreground">
                  Participate in sustainable development projects along the river.
                </p>
              </Card>
            </div>

            <Card className="verdis-card p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold font-montserrat text-verdis-blue mb-3">
                  Early Access Program
                </h4>
                <p className="text-sm font-lora text-muted-foreground mb-6">
                  The interactive settlement mapping system is currently in development. 
                  Citizens and early supporters get priority access to beta testing and settlement opportunities.
                </p>
                <div className="bg-white/50 rounded-lg p-4 mb-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-verdis-blue">
                      Contact our Settlement Planning Team:
                    </p>
                    <p className="text-sm font-mono text-verdis-blue">
                      📧 settlements@verdis.org
                    </p>
                    <p className="text-xs font-lora text-muted-foreground">
                      🗺️ Request access to beta maps and pioneer opportunities
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center gap-4">
              <Button 
                variant="verdis-outline"
                size="lg"
                onClick={() => setIsMapDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="verdis" 
                size="lg"
                onClick={() => {
                  navigator.clipboard.writeText('settlements@verdis.org');
                  // Create a professional mailto link
                  const subject = "Early Access Request - Settlement Mapping System";
                  const body = `Dear Settlement Planning Team,

I am interested in requesting early access to the Verdis Settlement Mapping System.

Please provide me with information about:
• Beta testing opportunities
• Pioneer settlement programs
• Available land plots along the Danube River
• Community development initiatives

I am a [Verdian Citizen/Interested Applicant] and would like to contribute to the development of our nation.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Contact Information]`;
                  
                  const mailtoLink = `mailto:settlements@verdis.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.open(mailtoLink);
                }}
                className="group"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Request Early Access
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CitizenshipSection;