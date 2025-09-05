import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CitizenshipFormWizard } from '@/components/citizenship/CitizenshipFormWizard';

const CitizenshipApplication = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-verdis-blue-light via-white to-verdis-green-light">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-verdis-blue hover:text-verdis-blue-dark">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat text-verdis-blue">
              Apply for Verdian Citizenship
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Join the Free Republic of Verdis - A community built on freedom, unity, and opportunity. 
              Start your journey to become a citizen of our digital nation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-verdis-blue mb-4">Benefits of Citizenship</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Digital passport and official documentation</li>
                <li>• Voting rights in national decisions</li>
                <li>• Access to exclusive citizen services</li>
                <li>• Community networking opportunities</li>
                <li>• Diplomatic protection and support</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-verdis-blue mb-4">Application Process</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Complete the online application form</li>
                <li>• Provide required documentation</li>
                <li>• Application review (5-10 business days)</li>
                <li>• Digital citizenship ceremony</li>
                <li>• Receive your digital passport</li>
              </ul>
            </div>
          </div>

          <div className="pt-8">
            <Button
              variant="verdis"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => setIsFormOpen(true)}
            >
              Start Your Application
            </Button>
          </div>
        </div>
      </div>

      {/* Citizenship Form Wizard */}
      <CitizenshipFormWizard
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default CitizenshipApplication;