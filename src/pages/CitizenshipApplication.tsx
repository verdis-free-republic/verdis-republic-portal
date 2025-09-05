import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Globe, Users, Briefcase, Shield } from 'lucide-react';
import { CitizenshipFormWizard } from '@/components/citizenship/CitizenshipFormWizard';

const CitizenshipApplication = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCitizenshipType, setSelectedCitizenshipType] = useState('');

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
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat text-verdis-blue">
              Verdian Citizenship & Residency
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Choose the path that best suits your needs and become part of the Free Republic of Verdis - 
              A digital nation built on freedom, innovation, and opportunity.
            </p>
          </div>

          {/* Citizenship Types */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-verdis-blue" 
                  onClick={() => setSelectedCitizenshipType('full')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-verdis-blue-light rounded-full w-fit">
                  <Users className="w-8 h-8 text-verdis-blue" />
                </div>
                <CardTitle className="text-verdis-blue">Full Citizenship</CardTitle>
                <CardDescription>Complete citizenship with all rights and privileges</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Full voting rights</li>
                  <li>• Digital passport</li>
                  <li>• Government positions eligibility</li>
                  <li>• Full diplomatic protection</li>
                  <li>• All citizen services</li>
                </ul>
                <Button 
                  className="w-full mt-4" 
                  variant={selectedCitizenshipType === 'full' ? 'verdis' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCitizenshipType('full');
                    setIsFormOpen(true);
                  }}
                >
                  Apply for Full Citizenship
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-verdis-green" 
                  onClick={() => setSelectedCitizenshipType('eresidency')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-verdis-green-light rounded-full w-fit">
                  <Globe className="w-8 h-8 text-verdis-green" />
                </div>
                <CardTitle className="text-verdis-green">E-Residency</CardTitle>
                <CardDescription>Digital residency for global entrepreneurs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Digital identity</li>
                  <li>• Business registration</li>
                  <li>• Banking services access</li>
                  <li>• Digital document signing</li>
                  <li>• Online government services</li>
                </ul>
                <Button 
                  className="w-full mt-4" 
                  variant={selectedCitizenshipType === 'eresidency' ? 'verdis' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCitizenshipType('eresidency');
                    setIsFormOpen(true);
                  }}
                >
                  Apply for E-Residency
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-verdis-blue-dark" 
                  onClick={() => setSelectedCitizenshipType('investment')}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-verdis-blue-light rounded-full w-fit">
                  <Briefcase className="w-8 h-8 text-verdis-blue-dark" />
                </div>
                <CardTitle className="text-verdis-blue-dark">Investment Citizenship</CardTitle>
                <CardDescription>Citizenship through economic contribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Fast-track processing</li>
                  <li>• Premium support</li>
                  <li>• Investment opportunities</li>
                  <li>• Business networking</li>
                  <li>• All citizenship benefits</li>
                </ul>
                <Button 
                  className="w-full mt-4" 
                  variant={selectedCitizenshipType === 'investment' ? 'verdis' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCitizenshipType('investment');
                    setIsFormOpen(true);
                  }}
                >
                  Apply for Investment Citizenship
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-verdis-blue mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Requirements & Process
              </h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Complete online application</li>
                <li>• Identity verification</li>
                <li>• Background check</li>
                <li>• Review period (3-14 days)</li>
                <li>• Digital ceremony</li>
                <li>• Document issuance</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-verdis-blue mb-4">Why Choose Verdis?</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Progressive digital governance</li>
                <li>• Innovation-friendly policies</li>
                <li>• Global community network</li>
                <li>• Sustainable development focus</li>
                <li>• Transparent decision-making</li>
              </ul>
            </div>
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