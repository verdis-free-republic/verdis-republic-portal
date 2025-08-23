import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowRight, User, Mail, Phone, Calendar, Globe, MapPin } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '../CitizenshipFormWizard';

interface PersonalInfoStepProps {
  form: UseFormReturn<FormData>;
  onNext: () => void;
}

export const PersonalInfoStep = ({ form, onNext }: PersonalInfoStepProps) => {
  return (
    <Form {...form}>
      <div className="space-y-8">
        <Card className="verdis-card p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-verdis-blue-light rounded-full">
                <User className="w-6 h-6 text-verdis-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold font-montserrat text-verdis-blue">
                  Personal Information
                </h3>
                <p className="text-muted-foreground">
                  Let's start with your basic information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-verdis-blue" />
                      <span>First Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your first name" 
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-verdis-blue" />
                      <span>Last Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your last name" 
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-verdis-blue" />
                      <span>Email Address</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your.email@example.com" 
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-verdis-blue" />
                      <span>Phone Number</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+1 (555) 123-4567" 
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-verdis-blue" />
                      <span>Date of Birth</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
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
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-verdis-blue" />
                      <span>Current Nationality</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., American, British, German" 
                        className="h-12 border-2 focus:border-verdis-blue transition-colors" 
                        {...field} 
                      />
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
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-verdis-blue" />
                    <span>Full Address</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your complete address including street, city, state/province, postal code, and country" 
                      className="min-h-[100px] border-2 focus:border-verdis-blue transition-colors resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button 
            onClick={onNext} 
            size="lg" 
            className="verdis-button-primary px-8 py-3 h-12 text-white font-semibold"
          >
            Continue to Professional Info
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </Form>
  );
};