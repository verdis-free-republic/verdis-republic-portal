import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowRight, ArrowLeft, Briefcase, GraduationCap, Star } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '../CitizenshipFormWizard';

interface ProfessionalInfoStepProps {
  form: UseFormReturn<FormData>;
  onNext: () => void;
  onPrev: () => void;
}

export const ProfessionalInfoStep = ({ form, onNext, onPrev }: ProfessionalInfoStepProps) => {
  return (
    <Form {...form}>
      <div className="space-y-8">
        <Card className="verdis-card p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-verdis-blue-light rounded-full">
                <Briefcase className="w-6 h-6 text-verdis-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold font-montserrat text-verdis-blue">
                  Professional & Educational Background
                </h3>
                <p className="text-muted-foreground">
                  Tell us about your career and educational achievements
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-verdis-blue" />
                      <span>Current Occupation</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your current job title or profession" 
                        className="h-12 border-2 focus:border-verdis-blue transition-colors" 
                        {...field} 
                      />
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
                    <FormLabel className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-verdis-blue" />
                      <span>Education Level</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 border-2 focus:border-verdis-blue transition-colors">
                          <SelectValue placeholder="Select your highest education level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background border-2">
                        <SelectItem value="high-school">High School / Secondary Education</SelectItem>
                        <SelectItem value="associate">Associate Degree</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="doctorate">Doctorate / PhD</SelectItem>
                        <SelectItem value="professional">Professional Certification</SelectItem>
                        <SelectItem value="trade">Trade School / Vocational Training</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-verdis-blue" />
                    <span>Skills & Experience</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your professional skills, experience, achievements, and how you could contribute to the Verdian community. Include any special talents, languages spoken, volunteer work, or unique expertise."
                      className="min-h-[120px] border-2 focus:border-verdis-blue transition-colors resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground mt-2">
                    💡 Tip: Mention any technical skills, leadership experience, creative abilities, or community involvement
                  </p>
                </FormItem>
              )}
            />
          </div>
        </Card>

        <div className="flex justify-between">
          <Button 
            onClick={onPrev} 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 h-12 border-2 border-verdis-blue text-verdis-blue hover:bg-verdis-blue-light"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Personal Info
          </Button>
          
          <Button 
            onClick={onNext} 
            size="lg" 
            className="verdis-button-primary px-8 py-3 h-12 text-white font-semibold"
          >
            Continue to Application Details
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </Form>
  );
};