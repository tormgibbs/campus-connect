import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportImage: File | null;
  setReportImage: React.Dispatch<React.SetStateAction<File | null>>;
  reportContact: string;
  setReportContact: React.Dispatch<React.SetStateAction<string>>;
  reportDate: string;
  setReportDate: React.Dispatch<React.SetStateAction<string>>;
  reportCategory: string;
  setReportCategory: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitReport: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  reportImage,
  setReportImage,
  reportContact,
  setReportContact,
  reportDate,
  setReportDate,
  reportCategory,
  setReportCategory,
  handleSubmitReport,
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReportImage(event.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Lost Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" onChange={handleImageUpload} />
          </div>
          <div>
            <Label htmlFor="reportContact">Contact Number</Label>
            <Input
              id="reportContact"
              placeholder="Your contact number"
              value={reportContact}
              onChange={(e) => setReportContact(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="reportDate">Date Lost</Label>
            <Input
              id="reportDate"
              type="date"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="reportCategory">Category</Label>
            <Select value={reportCategory} onValueChange={setReportCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="computers">Computers & Electronics</SelectItem>
                <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                <SelectItem value="watches">Watches & Jewelry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmitReport}>Submit Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
