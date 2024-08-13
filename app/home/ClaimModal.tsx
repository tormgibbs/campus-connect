import React from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimDescription: string;
  setClaimDescription: React.Dispatch<React.SetStateAction<string>>;
  claimContact: string;
  setClaimContact: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitClaim: () => void;
}


const ClaimModal: React.FC<ClaimModalProps> = ({
  isOpen,
  onClose,
  claimDescription,
  setClaimDescription,
  claimContact,
  setClaimContact,
  handleSubmitClaim,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of the item..."
              value={claimDescription}
              onChange={(e) => setClaimDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contact">Contact Information</Label>
            <Input
              id="contact"
              placeholder="Your email or phone number"
              value={claimContact}
              onChange={(e) => setClaimContact(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmitClaim}>Submit Claim</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimModal;