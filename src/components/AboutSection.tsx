import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Users, Flag } from 'lucide-react';

const AboutSection = () => {
  const milestones = [
    {
      year: "2019",
      title: "Pocket-3 Discovery",
      description: "Identification of unclaimed territory between Croatia and Serbia",
      icon: MapPin,
    },
    {
      year: "2019",
      title: "Proclamation of Independence",
      description: "Official establishment of the Free Republic of Verdis on May 30th",
      icon: Flag,
    },
    {
      year: "2020-2023",
      title: "Foundation Building",
      description: "Development of governance structure and citizenship framework",
      icon: Users,
    },
    {
      year: "2024-Present",
      title: "Infrastructure Development",
      description: "Settlement planning and infrastructure investment programs",
      icon: Calendar,
    },
  ];

  return (
    <section className="py-20 bg-verdis-blue-light">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-verdis-blue mb-6">
            Our Story
          </h2>
          <p className="text-xl font-lora text-verdis-blue/80 max-w-4xl mx-auto leading-relaxed">
            Born from history, shaped by hope. Between Croatia and Serbia along the Danube, 
            what was once unclaimed land became the Free Republic of Verdis on 30 May 2019. 
            Today, Verdis is a nation of peace, fairness, and democracy.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <Card 
                  key={index} 
                  className="verdis-card p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-2xl font-bold font-montserrat text-primary mb-2">
                    {milestone.year}
                  </div>
                  
                  <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-3">
                    {milestone.title}
                  </h3>
                  
                  <p className="text-sm font-lora text-verdis-blue/70 leading-relaxed">
                    {milestone.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mt-20 text-center">
          <Card className="verdis-card max-w-4xl mx-auto p-8">
            <h3 className="text-2xl font-bold font-montserrat text-verdis-blue mb-4">
              Our Vision for the Future
            </h3>
            <p className="text-lg font-lora text-verdis-blue/80 leading-relaxed">
              Verdis represents a new model of governance where transparency, sustainability, 
              and citizen participation form the foundation of our society. We are committed 
              to building a nation that serves as an example of how modern democracy can 
              thrive in the 21st century.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;