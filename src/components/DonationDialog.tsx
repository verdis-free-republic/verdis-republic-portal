import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Heart, Bitcoin, Shield, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
  description?: string;
}

const DonationDialog = ({ isOpen, onClose, category = "General Donation", description }: DonationDialogProps) => {
  const { toast } = useToast();
  
  const bitcoinAddress = 'bc1p53vpr7getgck5d4xva8xjgm7kldkwd7m0l837v7vv79j8vutxn3s3uux47';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    toast({
      title: "Address Copied!",
      description: "Bitcoin address has been copied to your clipboard.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat text-verdis-blue flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Donate to Verdis
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Donation Category */}
          <Card className="verdis-card p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold font-montserrat text-verdis-blue">
                  {category}
                </h3>
                {description && (
                  <p className="text-sm font-lora text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Bitcoin Payment */}
          <Card className="verdis-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bitcoin className="w-8 h-8 text-orange-500" />
              <div>
                <h4 className="font-semibold font-montserrat text-verdis-blue">
                  Bitcoin Payment
                </h4>
                <p className="text-sm font-lora text-muted-foreground">
                  Secure cryptocurrency donation
                </p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-lora text-muted-foreground mb-1">
                    Bitcoin Address:
                  </p>
                  <p className="font-mono text-sm text-verdis-blue break-all">
                    {bitcoinAddress}
                  </p>
                </div>
                <Button
                  variant="verdis-outline"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="font-lora">Address automatically copied when you copy</span>
            </div>
          </Card>

          {/* Security & Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="verdis-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-primary" />
                <h4 className="font-semibold font-montserrat text-verdis-blue text-sm">
                  Secure & Transparent
                </h4>
              </div>
              <p className="text-xs font-lora text-muted-foreground">
                All donations are tracked on the blockchain for complete transparency
              </p>
            </Card>

            <Card className="verdis-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-6 h-6 text-primary" />
                <h4 className="font-semibold font-montserrat text-verdis-blue text-sm">
                  Direct Impact
                </h4>
              </div>
              <p className="text-xs font-lora text-muted-foreground">
                Your contribution directly funds nation-building initiatives
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="verdis" 
              className="flex-1"
              onClick={handleCopyAddress}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Bitcoin Address
            </Button>
            <Button 
              variant="verdis-outline" 
              onClick={onClose}
            >
              Close
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs font-lora text-muted-foreground">
              Thank you for supporting the Free Republic of Verdis! 🇻🇩
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;