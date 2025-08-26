import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, User, FileText, Gavel, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { ProfessionalInfoStep } from './steps/ProfessionalInfoStep';
import { ApplicationDetailsStep } from './steps/ApplicationDetailsStep';
import { ApplicationSummary } from './ApplicationSummary';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

export type FormData = z.infer<typeof formSchema>;

interface CitizenshipFormWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: 1,
    title: "Personal Information",
    description: "Basic details and contact information",
    icon: User,
  },
  {
    id: 2,
    title: "Professional Background",
    description: "Education and career information",
    icon: FileText,
  },
  {
    id: 3,
    title: "Application Details",
    description: "Motivation and final declarations",
    icon: Gavel,
  },
];

export const CitizenshipFormWizard = ({ isOpen, onClose }: CitizenshipFormWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const generateMembershipId = (data: FormData): string => {
    const timestamp = Date.now().toString();
    const dataString = `${data.firstName}${data.lastName}${data.email}${timestamp}`;
    
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
      const char = dataString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    const positiveHash = Math.abs(hash);
    return `VR-${positiveHash.toString().padStart(8, '0')}`;
  };

  const onSubmit = (data: FormData) => {
    const id = generateMembershipId(data);
    setMembershipId(id);
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const nextStep = async () => {
    const currentStepFields = getCurrentStepFields();
    const isStepValid = await form.trigger(currentStepFields);
    
    if (isStepValid) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        const formData = form.getValues();
        onSubmit(formData);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentStepFields = (): (keyof FormData)[] => {
    switch (currentStep) {
      case 1:
        return ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'nationality', 'address'];
      case 2:
        return ['occupation', 'education', 'skills'];
      case 3:
        return ['motivation', 'criminalRecord', 'agreeTerms'];
      default:
        return [];
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setSubmittedData(null);
    setMembershipId("");
    form.reset();
  };

  if (isSubmitted && submittedData) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <ApplicationSummary
            data={submittedData}
            membershipId={membershipId}
            onClose={onClose}
            onReset={resetForm}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-2">
            <DialogTitle className="text-xl sm:text-3xl font-bold font-montserrat text-verdis-blue">
              Verdian Citizenship Application
            </DialogTitle>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              Join the Free Republic of Verdis - A community built on freedom, unity, and opportunity
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center overflow-x-auto px-4">
            <div className="flex items-center space-x-4 sm:space-x-8 min-w-max">
              {steps.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const StepIcon = step.icon;

                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300",
                          isCompleted
                            ? "bg-verdis-blue border-verdis-blue text-white"
                            : isCurrent
                            ? "border-verdis-blue text-verdis-blue bg-verdis-blue-light"
                            : "border-muted text-muted-foreground"
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                        ) : (
                          <StepIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                        )}
                      </div>
                      <div className="text-center">
                        <p
                          className={cn(
                            "text-xs sm:text-sm font-semibold",
                            isCurrent || isCompleted ? "text-verdis-blue" : "text-muted-foreground"
                          )}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-muted-foreground max-w-[80px] sm:max-w-[120px] hidden sm:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={cn(
                          "w-8 sm:w-16 h-0.5 mx-2 sm:mx-4 transition-all duration-300",
                          isCompleted ? "bg-verdis-blue" : "bg-border"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <Badge variant="outline" className="text-verdis-blue border-verdis-blue">
              Step {currentStep} of {steps.length}
            </Badge>
          </div>
        </DialogHeader>

        <div className="mt-8">
          {currentStep === 1 && (
            <PersonalInfoStep form={form} onNext={nextStep} />
          )}
          {currentStep === 2 && (
            <ProfessionalInfoStep form={form} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 3 && (
            <ApplicationDetailsStep form={form} onNext={nextStep} onPrev={prevStep} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};