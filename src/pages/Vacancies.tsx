import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import GovernmentStructureDialog from '@/components/GovernmentStructureDialog';

const Vacancies = () => {
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-montserrat text-verdis-blue">
              Government Vacancies
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Serve the Free Republic of Verdis. Explore available government positions and apply to make a difference in our digital nation.
            </p>
          </div>

          {/* Government Structure Component - Full Page Version */}
          <GovernmentStructureDialog isOpen={true} onClose={() => {}} isFullPage={true} />
        </div>
      </div>
    </div>
  );
};

export default Vacancies;