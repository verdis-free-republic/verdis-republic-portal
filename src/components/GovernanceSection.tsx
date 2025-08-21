import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Vote, Users, Scale, ArrowRight } from 'lucide-react';

const GovernanceSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-verdis-blue mb-6">
            Government & Democracy
          </h2>
          <p className="text-xl font-lora text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Verdis functions as a Direct Democracy under a Republic, where every citizen 
            has a voice in shaping the nation. Our governance model prioritizes transparency, 
            participation, and accountability.
          </p>
        </div>

        {/* Governance Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="verdis-card p-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Vote className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold font-montserrat text-verdis-blue mb-4">
              Direct Democracy
            </h3>
            <p className="font-lora text-muted-foreground">
              Every citizen participates directly in legislative decisions through 
              our digital voting platform and regular referendums.
            </p>
          </Card>

          <Card className="verdis-card p-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold font-montserrat text-verdis-blue mb-4">
              Citizen Participation
            </h3>
            <p className="font-lora text-muted-foreground">
              Open forums, community councils, and citizen-led initiatives 
              ensure everyone's voice is heard in our democratic process.
            </p>
          </Card>

          <Card className="verdis-card p-8 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold font-montserrat text-verdis-blue mb-4">
              Transparent Justice
            </h3>
            <p className="font-lora text-muted-foreground">
              Our judicial system operates with complete transparency, 
              ensuring fair and equitable treatment for all citizens.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="verdis-card max-w-3xl mx-auto p-8">
            <h3 className="text-2xl font-bold font-montserrat text-verdis-blue mb-4">
              Learn More About Our Government
            </h3>
            <p className="font-lora text-muted-foreground mb-6 text-lg">
              Discover how Verdis is pioneering a new model of democratic governance 
              for the modern age. Explore our constitution, laws, and democratic processes.
            </p>
            <Button variant="verdis" size="lg" className="group">
              Government Structure
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;