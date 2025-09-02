import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, Crown, Scale, Shield, Building, UserPlus, Mail, Globe, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface GovernmentStructureDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const GovernmentStructureDialog = ({ isOpen, onClose }: GovernmentStructureDialogProps) => {
  const { toast } = useToast();
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    contact: '',
    qualifications: '',
    experience: '',
    vision: ''
  });

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
    },
    {
      id: 'country-ambassador',
      title: 'Country Ambassador',
      department: 'Ministry of Foreign Affairs',
      status: 'vacant',
      description: 'Represents Verdis interests abroad, promotes diplomatic relations and cultural exchange',
      icon: Globe,
      requirements: 'Diplomatic experience, multilingual abilities, international relations background',
      term: '3 years'
    },
    {
      id: 'high-commissioner',
      title: 'High Commissioner',
      department: 'Ministry of Foreign Affairs',
      status: 'vacant',
      description: 'Senior diplomatic representative overseeing consular services and bilateral relations',
      icon: Briefcase,
      requirements: 'Senior diplomatic experience, leadership skills, regional expertise',
      term: '3 years'
    }
  ];

  const handleApplyForPosition = (position: any) => {
    setSelectedPosition(position.id);
    setShowApplicationForm(true);
  };

  const submitApplication = async (position: any) => {
    if (!applicationData.name || !applicationData.email || !applicationData.qualifications || !applicationData.experience || !applicationData.vision) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('government_applications')
        .insert({
          position_id: position.id,
          position_title: position.title,
          department: position.department,
          applicant_name: applicationData.name,
          applicant_email: applicationData.email,
          applicant_contact: applicationData.contact,
          qualifications: applicationData.qualifications,
          experience: applicationData.experience,
          vision: applicationData.vision
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: `Your application for ${position.title} has been submitted successfully.`,
      });
      
      setShowApplicationForm(false);
      setApplicationData({
        name: '',
        email: '',
        contact: '',
        qualifications: '',
        experience: '',
        vision: ''
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
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

          {/* Application Form */}
          {showApplicationForm && (
            <Card className="verdis-card p-6 bg-accent/10 border-accent/20">
              <h4 className="font-semibold font-montserrat text-verdis-blue mb-4">
                Application Form - {governmentPositions.find(p => p.id === selectedPosition)?.title}
              </h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-montserrat text-verdis-blue">Full Name *</Label>
                    <Input
                      id="name"
                      value={applicationData.name}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-montserrat text-verdis-blue">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="contact" className="font-montserrat text-verdis-blue">Contact Information</Label>
                  <Input
                    id="contact"
                    value={applicationData.contact}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, contact: e.target.value }))}
                    placeholder="Phone number or other contact"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="qualifications" className="font-montserrat text-verdis-blue">Qualifications *</Label>
                  <Textarea
                    id="qualifications"
                    value={applicationData.qualifications}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, qualifications: e.target.value }))}
                    placeholder="Describe your educational background and relevant qualifications"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="experience" className="font-montserrat text-verdis-blue">Relevant Experience *</Label>
                  <Textarea
                    id="experience"
                    value={applicationData.experience}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="Describe your relevant work experience and achievements"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="vision" className="font-montserrat text-verdis-blue">Vision for the Role *</Label>
                  <Textarea
                    id="vision"
                    value={applicationData.vision}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, vision: e.target.value }))}
                    placeholder="Describe your vision and goals for this position"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="verdis-outline"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="verdis"
                    onClick={() => submitApplication(governmentPositions.find(p => p.id === selectedPosition))}
                    className="flex-1"
                  >
                    Submit Application
                  </Button>
                </div>
              </div>
            </Card>
          )}

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