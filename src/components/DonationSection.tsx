import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Building, GraduationCap, Shield, ArrowRight, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DonationDialog from './DonationDialog';

const DonationSection = () => {
  const [donationDialog, setDonationDialog] = useState<{
    isOpen: boolean;
    category: string;
    description: string;
  }>({ isOpen: false, category: '', description: '' });

  const trackDonation = async (category: string) => {
    try {
      await supabase
        .from('donations')
        .insert({
          category,
        });
    } catch (error) {
      console.error('Error tracking donation:', error);
    }
  };

  const donationCategories = [
    {
      title: "General Development",
      description: "Support overall nation-building initiatives and administrative development",
      icon: Building,
      color: "bg-primary",
    },
    {
      title: "Infrastructure",
      description: "Roads, utilities, and essential infrastructure for our growing communities",
      icon: Building,
      color: "bg-primary",
    },
    {
      title: "Education & Social Programs", 
      description: "Schools, healthcare, and social services for all Verdian citizens",
      icon: GraduationCap,
      color: "bg-accent",
    },
    {
      title: "Defense & Security",
      description: "Military equipment, technology, and security partnerships to protect our sovereignty",
      icon: Shield,
      color: "bg-secondary",
    },
  ];

  return (
    <section className="py-20 bg-background" data-section="donations">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-verdis-blue mb-6">
            Support Verdis – Build the Future With Us
          </h2>
          
          {/* Progress Highlight */}
          <div className="inline-flex items-center bg-primary/20 px-6 py-3 rounded-full mb-6">
            <TrendingUp className="w-5 h-5 text-primary mr-2" />
            <span className="font-semibold font-montserrat text-verdis-blue-dark">
              We have already raised over $50,000 for infrastructure and development
            </span>
          </div>
          
          <p className="text-xl font-lora text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Every contribution brings Verdis closer to a strong, self-sustaining future. 
            Choose from specific funding categories below or make a general donation to support 
            our nation-building efforts where they're needed most.
          </p>
        </div>

        {/* Donation Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {donationCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="verdis-card p-8 hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold font-montserrat text-verdis-blue mb-4">
                  {category.title}
                </h3>
                
                <p className="font-lora text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <Button 
                  variant="verdis-outline" 
                  className="group"
                  onClick={async () => {
                    await trackDonation(category.title);
                    setDonationDialog({
                      isOpen: true,
                      category: category.title,
                      description: category.description
                    });
                  }}
                >
                  Donate Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Main Donation CTA */}
        <div className="text-center">
          <Card className="verdis-card max-w-4xl mx-auto p-8 lg:p-12">
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold font-montserrat text-verdis-blue mb-4">
                Make a General Donation
              </h3>
              
              <p className="text-lg font-lora text-muted-foreground mb-8 max-w-2xl mx-auto">
                Support Verdis with a flexible donation that allows us to direct funds 
                where they're needed most. Your contribution helps build our nation's 
                infrastructure, institutions, and future.
              </p>
            </div>

            <div className="space-y-4">
              <Button 
                variant="verdis-secondary" 
                size="xl" 
                className="group text-xl px-12 py-6"
                onClick={async () => {
                  await trackDonation('General Donation');
                  setDonationDialog({
                    isOpen: true,
                    category: 'General Donation',
                    description: 'Support Verdis with a flexible donation that allows us to direct funds where they\'re needed most'
                  });
                }}
              >
                <Heart className="w-6 h-6 mr-3" />
                Donate to Verdis
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-sm font-lora text-muted-foreground">
                Secure Bitcoin donations • Address automatically copied when you click donate
              </p>
            </div>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold font-montserrat text-primary mb-2">
              $50K+
            </div>
            <p className="font-lora text-muted-foreground">Total Funds Raised</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold font-montserrat text-primary mb-2">
              150+
            </div>
            <p className="font-lora text-muted-foreground">Contributing Supporters</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold font-montserrat text-primary mb-2">
              5
            </div>
            <p className="font-lora text-muted-foreground">Active Projects Funded</p>
          </div>
        </div>
      </div>

      {/* Donation Dialog */}
      <DonationDialog 
        isOpen={donationDialog.isOpen}
        onClose={() => setDonationDialog({ ...donationDialog, isOpen: false })}
        category={donationDialog.category}
        description={donationDialog.description}
      />
    </section>
  );
};

export default DonationSection;