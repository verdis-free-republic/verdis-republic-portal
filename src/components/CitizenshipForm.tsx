import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, Download, FileText, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import jsPDF from 'jspdf';

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(2, "Current nationality is required"),
  address: z.string().min(10, "Full address is required"),
  occupation: z.string().min(2, "Occupation is required"),
  education: z.string().min(1, "Education level is required"),
  motivation: z.string().min(50, "Please provide at least 50 characters explaining your motivation"),
  skills: z.string().min(20, "Please describe your skills and experience"),
  criminalRecord: z.string().min(1, "Please select an option"),
  agreeTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

type FormData = z.infer<typeof formSchema>;

interface CitizenshipFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CitizenshipForm = ({ isOpen, onClose }: CitizenshipFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [membershipId, setMembershipId] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      nationality: "",
      address: "",
      occupation: "",
      education: "",
      motivation: "",
      skills: "",
      criminalRecord: "",
      agreeTerms: false,
    },
  });

  // Generate unique membership ID using hash algorithm
  const generateMembershipId = (data: FormData): string => {
    const timestamp = Date.now().toString();
    const dataString = `${data.firstName}${data.lastName}${data.email}${timestamp}`;
    
    // Simple hash function (for production, use a more robust hash)
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      const char = dataString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    const positiveHash = Math.abs(hash);
    return `VR-${positiveHash.toString().padStart(8, '0')}`;
  };

  const onSubmit = (data: FormData) => {
    const id = generateMembershipId(data);
    setMembershipId(id);
    setSubmittedData(data);
    setCurrentStep(2);
  };

  const downloadPDF = () => {
    if (!submittedData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102); // Verdis blue
    doc.text('FREE REPUBLIC OF VERDIS', pageWidth / 2, 30, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('CITIZENSHIP APPLICATION', pageWidth / 2, 45, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setTextColor(220, 38, 127); // Primary color
    doc.text(`Membership Reservation: ${membershipId}`, pageWidth / 2, 60, { align: 'center' });
    
    // Reset color for body
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    let yPosition = 80;
    const lineHeight = 8;
    
    // Personal Information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PERSONAL INFORMATION', 20, yPosition);
    yPosition += lineHeight * 1.5;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const personalInfo = [
      ['Full Name:', `${submittedData.firstName} ${submittedData.lastName}`],
      ['Email:', submittedData.email],
      ['Phone:', submittedData.phone],
      ['Date of Birth:', submittedData.dateOfBirth],
      ['Current Nationality:', submittedData.nationality],
      ['Address:', submittedData.address],
      ['Occupation:', submittedData.occupation],
      ['Education:', submittedData.education],
    ];
    
    personalInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 20, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 80, yPosition);
      yPosition += lineHeight;
    });
    
    yPosition += lineHeight;
    
    // Motivation and Skills
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('APPLICATION DETAILS', 20, yPosition);
    yPosition += lineHeight * 1.5;
    
    doc.setFontSize(11);
    doc.text('Motivation for Citizenship:', 20, yPosition);
    yPosition += lineHeight;
    
    doc.setFont('helvetica', 'normal');
    const motivationLines = doc.splitTextToSize(submittedData.motivation, pageWidth - 40);
    doc.text(motivationLines, 20, yPosition);
    yPosition += motivationLines.length * lineHeight + lineHeight;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Skills and Experience:', 20, yPosition);
    yPosition += lineHeight;
    
    doc.setFont('helvetica', 'normal');
    const skillsLines = doc.splitTextToSize(submittedData.skills, pageWidth - 40);
    doc.text(skillsLines, 20, yPosition);
    yPosition += skillsLines.length * lineHeight + lineHeight * 2;
    
    // Status and Footer
    doc.setFont('helvetica', 'bold');
    doc.text('Criminal Record Declaration:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(submittedData.criminalRecord, 120, yPosition);
    yPosition += lineHeight * 2;
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Application submitted on: ' + new Date().toLocaleDateString(), 20, yPosition);
    doc.text('Status: Under Review', 20, yPosition + lineHeight);
    
    // Footer
    yPosition = doc.internal.pageSize.getHeight() - 30;
    doc.setTextColor(0, 51, 102);
    doc.text('Free Republic of Verdis - Ministry of Citizenship', pageWidth / 2, yPosition, { align: 'center' });
    doc.text('For inquiries: citizenship@verdis.org', pageWidth / 2, yPosition + lineHeight, { align: 'center' });
    
    doc.save(`Verdis-Citizenship-Application-${membershipId}.pdf`);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSubmittedData(null);
    setMembershipId("");
    form.reset();
  };

  if (currentStep === 2 && submittedData) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat text-verdis-blue">
              Application Submitted Successfully
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Membership ID Card */}
            <Card className="verdis-card p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="text-center">
                <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold font-montserrat text-verdis-blue mb-2">
                  Membership Reservation Number
                </h3>
                <div className="text-3xl font-bold font-montserrat text-primary mb-4">
                  {membershipId}
                </div>
                <p className="text-sm text-muted-foreground">
                  Please save this number for your records. You will need it for future correspondence.
                </p>
              </div>
            </Card>

            {/* Application Summary */}
            <Card className="verdis-card p-6">
              <h4 className="text-lg font-semibold font-montserrat text-verdis-blue mb-4">
                Application Summary
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Name:</strong> {submittedData.firstName} {submittedData.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {submittedData.email}
                </div>
                <div>
                  <strong>Phone:</strong> {submittedData.phone}
                </div>
                <div>
                  <strong>Nationality:</strong> {submittedData.nationality}
                </div>
                <div>
                  <strong>Occupation:</strong> {submittedData.occupation}
                </div>
                <div>
                  <strong>Education:</strong> {submittedData.education}
                </div>
              </div>
              
              <div className="mt-4">
                <strong>Motivation:</strong>
                <p className="text-muted-foreground mt-1">{submittedData.motivation}</p>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="verdis"
                size="lg"
                onClick={downloadPDF}
                className="group"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Application PDF
                <FileText className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
              
              <Button
                variant="verdis-outline"
                size="lg"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Submit Another Application
              </Button>
            </div>

            <Card className="verdis-card p-4 bg-blue-50 border-blue-200">
              <p className="text-sm text-verdis-blue text-center">
                <strong>Next Steps:</strong> Your application is now under review. You will receive an email 
                confirmation within 48 hours. The review process typically takes 2-4 weeks.
              </p>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat text-verdis-blue">
            Verdian Citizenship Application
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <Card className="verdis-card p-6">
              <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-4">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Nationality</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., American, British, German" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your complete address including country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            {/* Professional Information */}
            <Card className="verdis-card p-6">
              <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-4">
                Professional & Educational Background
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Occupation</FormLabel>
                      <FormControl>
                        <Input placeholder="Your current job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your education level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="associate">Associate Degree</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="doctorate">Doctorate</SelectItem>
                          <SelectItem value="other">Other/Trade School</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Skills & Experience</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your professional skills, experience, and how you could contribute to Verdis"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            {/* Application Details */}
            <Card className="verdis-card p-6">
              <h3 className="text-lg font-semibold font-montserrat text-verdis-blue mb-4">
                Application Details
              </h3>
              
              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why do you want to become a Verdian citizen?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please explain your motivation for seeking Verdian citizenship and how you align with our values of freedom, unity, and opportunity"
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="criminalRecord"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Criminal Record Declaration</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="no-record">No criminal record</SelectItem>
                        <SelectItem value="minor-offenses">Minor offenses only</SelectItem>
                        <SelectItem value="will-disclose">Will disclose details separately</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            {/* Terms Agreement */}
            <Card className="verdis-card p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  className="mt-1"
                  {...form.register('agreeTerms')}
                />
                <div>
                  <Label htmlFor="agreeTerms" className="text-sm">
                    I agree to the terms and conditions of Verdian citizenship, pledge loyalty to the 
                    Free Republic of Verdis, and confirm that all information provided is accurate and truthful.
                  </Label>
                  {form.formState.errors.agreeTerms && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.agreeTerms.message}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="verdis-outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="verdis" type="submit" size="lg" className="group">
                <UserPlus className="w-5 h-5 mr-2" />
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CitizenshipForm;