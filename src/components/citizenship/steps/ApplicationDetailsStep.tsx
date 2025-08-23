import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Heart, Shield, UserPlus, Flag } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '../CitizenshipFormWizard';

interface ApplicationDetailsStepProps {
  form: UseFormReturn<FormData>;
  onNext: () => void;
  onPrev: () => void;
}

export const ApplicationDetailsStep = ({ form, onNext, onPrev }: ApplicationDetailsStepProps) => {
  return (
    <Form {...form}>
      <div className="space-y-8">
        <Card className="verdis-card p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-verdis-blue-light rounded-full">
                <Heart className="w-6 h-6 text-verdis-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold font-montserrat text-verdis-blue">
                  Application Details
                </h3>
                <p className="text-muted-foreground">
                  Share your motivation and complete the final requirements
                </p>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Flag className="w-4 h-4 text-verdis-blue" />
                    <span>Why do you want to become a Verdian citizen?</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please explain your motivation for seeking Verdian citizenship. Share why you align with our values of freedom, unity, and opportunity. What draws you to our community? How do you envision contributing to our nation?"
                      className="min-h-[140px] border-2 focus:border-verdis-blue transition-colors resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground mt-2">
                    💭 Think about: What are your hopes for being part of Verdis? How do our values resonate with you?
                  </p>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="criminalRecord"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-verdis-blue" />
                    <span>Criminal Record Declaration</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-2 focus:border-verdis-blue transition-colors">
                        <SelectValue placeholder="Please select your declaration..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background border-2">
                      <SelectItem value="no-record">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>No criminal record</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="minor-offenses">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span>Minor offenses only (traffic violations, etc.)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="will-disclose">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>I will disclose details in a separate communication</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground mt-2">
                    🔒 All information is kept confidential and reviewed case-by-case
                  </p>
                </FormItem>
              )}
            />
          </div>
        </Card>

        {/* Terms and Conditions */}
        <Card className="verdis-card p-8 border-2 border-verdis-blue-light">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-verdis-blue-light rounded-full">
                <Shield className="w-5 h-5 text-verdis-blue" />
              </div>
              <h4 className="text-lg font-semibold font-montserrat text-verdis-blue">
                Citizenship Pledge & Agreement
              </h4>
            </div>
            
            <FormField
              control={form.control}
              name="agreeTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1 border-2 border-verdis-blue data-[state=checked]:bg-verdis-blue"
                    />
                  </FormControl>
                  <div className="space-y-2 leading-relaxed">
                    <FormLabel className="text-base cursor-pointer">
                      I hereby pledge my loyalty to the Free Republic of Verdis and agree to:
                    </FormLabel>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>Uphold the values of freedom, unity, and opportunity</li>
                      <li>Respect the laws and constitution of Verdis</li>
                      <li>Contribute positively to the Verdian community</li>
                      <li>Support the peaceful and democratic ideals of our nation</li>
                      <li>Confirm that all information provided is accurate and truthful</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3">
                      By checking this box, I acknowledge that I have read, understood, and agree to these terms.
                    </p>
                  </div>
                  <FormMessage />
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
            Back to Professional Info
          </Button>
          
          <Button 
            onClick={onNext} 
            size="lg" 
            className="verdis-button-primary px-8 py-3 h-12 text-white font-semibold group"
          >
            <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Submit Application
          </Button>
        </div>
      </div>
    </Form>
  );
};