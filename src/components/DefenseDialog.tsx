import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Shield, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DefenseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'support' | 'partnership';
}

const DefenseDialog = ({ isOpen, onClose, type }: DefenseDialogProps) => {
  const { toast } = useToast();
  
  const bitcoinAddress = 'bc1p53vpr7getgck5d4xva8xjgm7kldkwd7m0l837v7vv79j8vutxn3s3uux47';
  const defenseEmail = 'defense@verdis.org';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(bitcoinAddress);
    toast({
      title: "Address Copied!",
      description: "Bitcoin address has been copied to your clipboard.",
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(defenseEmail);
    toast({
      title: "Email Copied!",
      description: "Defense email has been copied to your clipboard.",
    });
  };

  const isSupportDialog = type === 'support';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-montserrat text-verdis-blue flex items-center gap-2">
            {isSupportDialog ? (
              <>
                <Shield className="w-6 h-6 text-primary" />
                Support Defense Efforts
              </>
            ) : (
              <>
                <Globe className="w-6 h-6 text-primary" />
                Partnership Opportunities
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Card */}
          <Card className="verdis-card p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                {isSupportDialog ? (
                  <Shield className="w-5 h-5 text-white" />
                ) : (
                  <Globe className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold font-montserrat text-verdis-blue">
                  {isSupportDialog ? 'Defense Fund Contribution' : 'Strategic Partnerships'}
                </h3>
                <p className="text-sm font-lora text-muted-foreground">
                  {isSupportDialog 
                    ? 'Help us invest in modern defense technology and security capabilities'
                    : 'Join us in building strategic alliances for regional security'
                  }
                </p>
              </div>
            </div>
          </Card>

          {isSupportDialog ? (
            /* Bitcoin Payment for Support */
            <Card className="verdis-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold font-montserrat text-verdis-blue">
                    Defense Fund Donation
                  </h4>
                  <p className="text-sm font-lora text-muted-foreground">
                    Secure cryptocurrency contribution for defense initiatives
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-lora text-muted-foreground mb-1">
                      Bitcoin Address for Defense Fund:
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

              <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
                <CheckCircle className="w-4 h-4" />
                <span className="font-lora">All defense funds are transparently tracked</span>
              </div>

              <div className="bg-primary/10 rounded-lg p-4">
                <h5 className="font-semibold font-montserrat text-verdis-blue mb-2">
                  Your contribution supports:
                </h5>
                <ul className="text-sm font-lora text-muted-foreground space-y-1">
                  <li>• Modern defense equipment and technology</li>
                  <li>• Training programs for security personnel</li>
                  <li>• Cyber security infrastructure</li>
                  <li>• International partnership initiatives</li>
                </ul>
              </div>
            </Card>
          ) : (
            /* Partnership Contact */
            <Card className="verdis-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold font-montserrat text-verdis-blue">
                    Partnership Contact
                  </h4>
                  <p className="text-sm font-lora text-muted-foreground">
                    Connect with our defense partnership team
                  </p>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-lora text-muted-foreground mb-1">
                      Defense Partnership Email:
                    </p>
                    <p className="font-mono text-sm text-verdis-blue">
                      {defenseEmail}
                    </p>
                  </div>
                  <Button
                    variant="verdis-outline"
                    size="sm"
                    onClick={handleCopyEmail}
                    className="flex-shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4">
                <h5 className="font-semibold font-montserrat text-verdis-blue mb-2">
                  Partnership opportunities include:
                </h5>
                <ul className="text-sm font-lora text-muted-foreground space-y-1">
                  <li>• Strategic security alliances</li>
                  <li>• Defense equipment partnerships</li>
                  <li>• Training and capability development</li>
                  <li>• Intelligence sharing agreements</li>
                  <li>• Joint security operations</li>
                </ul>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {isSupportDialog ? (
              <Button 
                variant="verdis" 
                className="flex-1"
                onClick={handleCopyAddress}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Bitcoin Address
              </Button>
            ) : (
              <Button 
                variant="verdis" 
                className="flex-1"
                onClick={handleCopyEmail}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Email Address
              </Button>
            )}
            <Button 
              variant="verdis-outline" 
              onClick={onClose}
            >
              Close
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs font-lora text-muted-foreground">
              {isSupportDialog 
                ? 'Thank you for supporting Verdis defense initiatives! 🛡️'
                : 'Thank you for your interest in partnering with Verdis! 🤝'
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DefenseDialog;