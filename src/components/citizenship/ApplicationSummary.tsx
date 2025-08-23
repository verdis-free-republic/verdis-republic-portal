import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, ArrowLeft, FileText, Sparkles, Calendar, Mail, Phone, MapPin, Briefcase, GraduationCap, Heart, Shield } from 'lucide-react';
import { FormData } from './CitizenshipFormWizard';
import jsPDF from 'jspdf';

interface ApplicationSummaryProps {
  data: FormData;
  membershipId: string;
  onClose: () => void;
  onReset: () => void;
}

export const ApplicationSummary = ({ data, membershipId, onClose, onReset }: ApplicationSummaryProps) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header with Verdis branding
    doc.setFontSize(24);
    doc.setTextColor(0, 51, 102);
    doc.text('FREE REPUBLIC OF VERDIS', pageWidth / 2, 30, { align: 'center' });
    
    doc.setFontSize(18);
    doc.text('CITIZENSHIP APPLICATION', pageWidth / 2, 45, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(33, 150, 243);
    doc.text(`Membership ID: ${membershipId}`, pageWidth / 2, 60, { align: 'center' });
    
    // Application date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Application Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, 72, { align: 'center' });
    
    // Reset color for body
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    let yPosition = 90;
    const lineHeight = 8;
    const sectionSpacing = 16;
    
    // Personal Information Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PERSONAL INFORMATION', 20, yPosition);
    yPosition += lineHeight * 1.5;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const personalInfo = [
      ['Full Name:', `${data.firstName} ${data.lastName}`],
      ['Email:', data.email],
      ['Phone:', data.phone],
      ['Date of Birth:', data.dateOfBirth],
      ['Current Nationality:', data.nationality],
      ['Address:', data.address],
    ];
    
    personalInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 20, yPosition);
      doc.setFont('helvetica', 'normal');
      const wrappedValue = doc.splitTextToSize(value, pageWidth - 100);
      doc.text(wrappedValue, 80, yPosition);
      yPosition += lineHeight * Math.max(1, wrappedValue.length);
    });
    
    yPosition += sectionSpacing;
    
    // Professional Information Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PROFESSIONAL BACKGROUND', 20, yPosition);
    yPosition += lineHeight * 1.5;
    
    doc.setFontSize(11);
    const professionalInfo = [
      ['Occupation:', data.occupation],
      ['Education Level:', data.education],
    ];
    
    professionalInfo.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 20, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 80, yPosition);
      yPosition += lineHeight;
    });
    
    yPosition += lineHeight;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Skills & Experience:', 20, yPosition);
    yPosition += lineHeight;
    
    doc.setFont('helvetica', 'normal');
    const skillsLines = doc.splitTextToSize(data.skills, pageWidth - 40);
    doc.text(skillsLines, 20, yPosition);
    yPosition += skillsLines.length * lineHeight + sectionSpacing;
    
    // Application Details Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('APPLICATION DETAILS', 20, yPosition);
    yPosition += lineHeight * 1.5;
    
    doc.setFontSize(11);
    doc.text('Motivation for Citizenship:', 20, yPosition);
    yPosition += lineHeight;
    
    doc.setFont('helvetica', 'normal');
    const motivationLines = doc.splitTextToSize(data.motivation, pageWidth - 40);
    doc.text(motivationLines, 20, yPosition);
    yPosition += motivationLines.length * lineHeight + lineHeight;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Criminal Record Declaration:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(data.criminalRecord, 120, yPosition);
    yPosition += lineHeight * 2;
    
    // Status Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(33, 150, 243);
    doc.text('APPLICATION STATUS', 20, yPosition);
    yPosition += lineHeight * 1.5;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 128, 0);
    doc.text('✓ Application Submitted Successfully', 20, yPosition);
    yPosition += lineHeight;
    
    doc.setTextColor(100, 100, 100);
    doc.text('Status: Under Review by Ministry of Citizenship', 20, yPosition);
    yPosition += lineHeight;
    doc.text('Expected Review Time: 2-4 weeks', 20, yPosition);
    
    // Footer
    yPosition = doc.internal.pageSize.getHeight() - 40;
    doc.setTextColor(0, 51, 102);
    doc.setFontSize(10);
    doc.text('Free Republic of Verdis - Ministry of Citizenship', pageWidth / 2, yPosition, { align: 'center' });
    doc.text('For inquiries: citizenship@verdis.org', pageWidth / 2, yPosition + lineHeight, { align: 'center' });
    doc.text('Official Document - Please retain for your records', pageWidth / 2, yPosition + lineHeight * 2, { align: 'center' });
    
    doc.save(`Verdis-Citizenship-Application-${membershipId}.pdf`);
  };

  return (
    <>
      <DialogHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <DialogTitle className="text-3xl font-bold font-montserrat text-verdis-blue">
          Application Submitted Successfully!
        </DialogTitle>
        <p className="text-muted-foreground">
          Welcome to the Verdian community! Your citizenship application has been received and is under review.
        </p>
      </DialogHeader>

      <div className="space-y-8 mt-8">
        {/* Membership ID Card */}
        <Card className="verdis-card p-8 bg-gradient-to-br from-verdis-blue-light to-white border-2 border-verdis-blue relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Sparkles className="w-6 h-6 text-verdis-blue opacity-50" />
          </div>
          <div className="text-center space-y-4">
            <FileText className="w-16 h-16 text-verdis-blue mx-auto" />
            <div>
              <h3 className="text-xl font-semibold font-montserrat text-verdis-blue mb-2">
                Membership Reservation Number
              </h3>
              <div className="text-4xl font-bold font-montserrat text-verdis-blue-dark mb-4 tracking-wider">
                {membershipId}
              </div>
              <Badge variant="outline" className="text-verdis-blue border-verdis-blue bg-white/50">
                Status: Under Review
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Please save this number for your records. You will need it for all future correspondence regarding your application.
            </p>
          </div>
        </Card>

        {/* Application Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Info Summary */}
          <Card className="verdis-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-verdis-blue-light rounded-full">
                <Mail className="w-5 h-5 text-verdis-blue" />
              </div>
              <h4 className="text-lg font-semibold font-montserrat text-verdis-blue">
                Personal Information
              </h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="font-medium">Name:</span>
                <span>{data.firstName} {data.lastName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{data.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{data.dateOfBirth}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-xs">{data.address}</span>
              </div>
            </div>
          </Card>

          {/* Professional Info Summary */}
          <Card className="verdis-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-verdis-blue-light rounded-full">
                <Briefcase className="w-5 h-5 text-verdis-blue" />
              </div>
              <h4 className="text-lg font-semibold font-montserrat text-verdis-blue">
                Professional Background
              </h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span>{data.occupation}</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                <span>{data.education}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span>{data.criminalRecord}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Motivation Summary */}
        <Card className="verdis-card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-verdis-blue-light rounded-full">
              <Heart className="w-5 h-5 text-verdis-blue" />
            </div>
            <h4 className="text-lg font-semibold font-montserrat text-verdis-blue">
              Your Motivation
            </h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.motivation}</p>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={downloadPDF}
            size="lg"
            className="verdis-button-primary px-8 py-3 h-12 text-white font-semibold group"
          >
            <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Download Application PDF
            <FileText className="w-4 h-4 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              onReset();
              onClose();
            }}
            className="px-8 py-3 h-12 border-2 border-verdis-blue text-verdis-blue hover:bg-verdis-blue-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Submit Another Application
          </Button>
        </div>

        {/* Next Steps Info */}
        <Card className="verdis-card p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-verdis-blue-dark">📧 What happens next?</h4>
            <p className="text-sm text-verdis-blue-dark leading-relaxed">
              <strong>Email Confirmation:</strong> You'll receive a confirmation email within 48 hours.<br />
              <strong>Review Process:</strong> Our Ministry of Citizenship will review your application (2-4 weeks).<br />
              <strong>Status Updates:</strong> We'll keep you informed throughout the process via email.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};