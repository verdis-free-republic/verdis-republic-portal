import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Crown, Scale, Shield, Building, UserPlus, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GovernmentStructureDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const GovernmentStructureDialog = ({ isOpen, onClose }: GovernmentStructureDialogProps) => {
  const { toast } = useToast();
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const governmentPositions = [
    {
      id: 'president',
      title: 'President',
      department: 'Executive Office',
      status: 'occupied',
      description: 'Head of State and Government, oversees national policy and international relations',
      icon: Crown,
      requirements: 'Verdian citizen for 5+ years, proven leadership experience',
      term: '4 years'
    },
    {
      id: 'foreign-minister',
      title: 'Minister of Foreign Affairs',
      department: 'Ministry of Foreign Affairs',
      status: 'vacant',
      description: 'Manages international relations, diplomatic missions, and foreign policy',
      icon: Users,
      requirements: 'Diplomatic experience, international relations background',
      term: '4 years'
    },
    {
      id: 'justice-minister',
      title: 'Minister of Justice',
      department: 'Ministry of Justice',
      status: 'vacant',
      description: 'Oversees legal system, courts, and law enforcement coordination',
      icon: Scale,
      requirements: 'Legal background, judicial experience preferred',
      term: '4 years'
    },
    {
      id: 'defense-minister',
      title: 'Minister of Defense',
      department: 'Ministry of Defense',
      status: 'vacant',
      description: 'National security, military coordination, and defense policy',
      icon: Shield,
      requirements: 'Military or security background, strategic planning experience',
      term: '4 years'
    },
    {
      id: 'development-minister',
      title: 'Minister of Development',
      department: 'Ministry of Development',
      status: 'vacant',
      description: 'Infrastructure, economic development, and public works projects',
      icon: Building,
      requirements: 'Engineering, economics, or urban planning background',
      term: '4 years'
    },
    {
      id: 'parliament-speaker',
      title: 'Speaker of Parliament',
      department: 'Verdian Parliament',
      status: 'vacant',
      description: 'Presides over parliamentary sessions and legislative procedures',
      icon: Users,
      requirements: 'Parliamentary experience, strong communication skills',
      term: '2 years'
    }
  ];

  const handleApplyForPosition = (position: any) => {
    const applicationEmail = `applications@verdis.org`;
    const subject = `Application for ${position.title}`;
    const body = `Dear Verdian Government Selection Committee,

I am writing to express my interest in applying for the position of ${position.title} within the ${position.department}.

Position Details:
- Title: ${position.title}
- Department: ${position.department}
- Term: ${position.term}

I believe I meet the requirements: ${position.requirements}

Please find my qualifications below:
[Please describe your relevant experience and qualifications]

I am committed to serving the Free Republic of Verdis and contributing to our nation's growth and development.

Thank you for considering my application.

Best regards,
[Your Name]
[Your Contact Information]
[Your Current Role/Background]`;

    // Copy email to clipboard
    navigator.clipboard.writeText(applicationEmail);
    
    // Create mailto link
    const mailtoLink = `mailto:${applicationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    
    toast({
      title: "Application Email Prepared!",
      description: `Email address copied to clipboard. Application template opened in your email client.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat text-verdis-blue flex items-center gap-2">
            <Building className="w-6 h-6 text-primary" />
            Government Structure & Positions
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Info */}
          <Card className="verdis-card p-6 bg-primary/5 border-primary/20">
            <div className="text-center">
              <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-2">
                Free Republic of Verdis Government
              </h3>
              <p className="font-lora text-muted-foreground">
                Democratic republic with direct citizen participation. Several key positions are currently vacant and open for qualified applications.
              </p>
            </div>
          </Card>

          {/* Positions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {governmentPositions.map((position) => {
              const IconComponent = position.icon;
              return (
                <Card 
                  key={position.id} 
                  className={`verdis-card p-6 transition-all duration-200 hover:scale-105 cursor-pointer ${
                    selectedPosition === position.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedPosition(selectedPosition === position.id ? null : position.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      position.status === 'occupied' ? 'bg-green-100' : 'bg-primary'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        position.status === 'occupied' ? 'text-green-600' : 'text-white'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold font-montserrat text-verdis-blue">
                          {position.title}
                        </h4>
                        <Badge 
                          variant={position.status === 'occupied' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {position.status === 'occupied' ? 'Occupied' : 'Vacant'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm font-lora text-muted-foreground mb-2">
                        {position.department}
                      </p>
                      
                      <p className="text-xs font-lora text-muted-foreground">
                        {position.description}
                      </p>
                      
                      {selectedPosition === position.id && (
                        <div className="mt-4 pt-4 border-t border-border space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-verdis-blue mb-1">Requirements:</p>
                            <p className="text-xs font-lora text-muted-foreground">{position.requirements}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-verdis-blue mb-1">Term Length:</p>
                            <p className="text-xs font-lora text-muted-foreground">{position.term}</p>
                          </div>
                          
                          {position.status === 'vacant' && (
                            <Button
                              variant="verdis"
                              size="sm"
                              className="w-full mt-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApplyForPosition(position);
                              }}
                            >
                              <UserPlus className="w-4 h-4 mr-2" />
                              Apply for Position
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Application Process */}
          <Card className="verdis-card p-6 bg-accent/10 border-accent/20">
            <div className="text-center">
              <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
              <h4 className="font-semibold font-montserrat text-verdis-blue mb-2">
                Application Process
              </h4>
              <p className="text-sm font-lora text-muted-foreground mb-4">
                To apply for any vacant government position, click "Apply for Position" above. 
                An email template will be prepared with the position details. Please include your qualifications, 
                experience, and vision for the role.
              </p>
              <div className="text-xs font-lora text-muted-foreground">
                <p>📧 Applications Email: applications@verdis.org</p>
                <p>⏱️ Application Review: 2-4 weeks</p>
                <p>🗳️ Final Selection: Democratic vote by citizens</p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button variant="verdis-outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GovernmentStructureDialog;