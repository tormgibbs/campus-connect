'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import ClaimModal from './ClaimModal';
import ReportModal from './ReportModal';

interface Item {
  id: number;
  category: string;
  image: string;
  date: string;
  contact: string;
}

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimDescription, setClaimDescription] = useState('');
  const [claimContact, setClaimContact] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportImage, setReportImage] = useState<File | null>(null);
  const [reportContact, setReportContact] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [reportCategory, setReportCategory] = useState('');

  const [items, setItems] = useState<Item[]>([
    { id: 1, category: 'Computers & Electronics', image: '/images/lost-bag.jpg', date: '2024-08-10', contact: '123-456-7890' },
    { id: 2, category: 'Miscellaneous', image: '/images/lost-bag.jpg', date: '2024-08-11', contact: '098-765-4321' },
    { id: 3, category: 'Watches & Jewelry', image: '/images/lost-bag.jpg', date: '2024-08-12', contact: '111-222-3333' },
    { id: 4, category: 'Computers & Electronics', image: '/images/lost-bag.jpg', date: '2024-08-10', contact: '123-456-7890' },
    { id: 5, category: 'Miscellaneous', image: '/images/lost-bag.jpg', date: '2024-08-11', contact: '098-765-4321' },
    { id: 6, category: 'Watches & Jewelry', image: '/images/lost-bag.jpg', date: '2024-08-12', contact: '111-222-3333' },
    { id: 7, category: 'Computers & Electronics', image: '/images/lost-bag.jpg', date: '2024-08-10', contact: '123-456-7890' },
    { id: 8, category: 'Miscellaneous', image: '/images/lost-bag.jpg', date: '2024-08-11', contact: '098-765-4321' },
    { id: 9, category: 'Watches & Jewelry', image: '/images/lost-bag.jpg', date: '2024-08-12', contact: '111-222-3333' },
    // ... other initial items
  ]);

  const handleClaimItem = (item: Item) => {
    setSelectedItem(item);
    setIsClaimModalOpen(true);
  };

  const handleSubmitClaim = () => {
    // Here you would typically send the claim data to your backend
    console.log('Claim submitted:', { item: selectedItem, description: claimDescription, contact: claimContact });
    setIsClaimModalOpen(false);
    setClaimDescription('');
    setClaimContact('');
    setSelectedItem(null);
  };

  const handleReportItem = () => {
    setIsReportModalOpen(true);
  };

  const handleSubmitReport = async () => {
    if (reportImage && reportContact && reportDate && reportCategory) {
      const newItem: Item = {
        id: items.length + 1,
        category: reportCategory,
        image: URL.createObjectURL(reportImage),
        date: reportDate,
        contact: reportContact,
      };
      
      setItems(prevItems => [newItem, ...prevItems]);
      
      console.log('Report submitted:', newItem);

      try {
        const response = await fetch('/api/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: reportContact,
            message: `Your lost item report has been submitted. Category: ${reportCategory}, Date: ${reportDate}. We'll contact you if we find a match.`
          }),
        });

        if (response.ok) {
          console.log('SMS notification sent successfully');
        } else {
          console.error('Failed to send SMS notification');
        }
      } catch (error) {
        console.error('Error sending SMS notification:', error);
      }

      setIsReportModalOpen(false);
      setReportImage(null);
      setReportContact('');
      setReportDate('');
      setReportCategory('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReportImage(event.target.files[0]);
    }
  };

  // const items: Item[] = [
  //   { id: 1, category: 'Computers & Electronics', image: '/images/lost-bag.jpg' },
  //   { id: 2, category: 'Miscellaneous', image: '/images/lost-bag.jpg' },
  //   { id: 3, category: 'Watches & Jewelry', image: '/images/lost-bag.jpg' },
  //   { id: 4, category: 'Watches & Jewelry', image: '/images/lost-bag.jpg' },
  //   { id: 5, category: 'Watches & Jewelry', image: '/images/lost-bag.jpg' },
  //   { id: 6, category: 'Computers & Electronics', image: '/images/lost-bag.jpg' },
  //   { id: 7, category: 'Computers & Electronics', image: '/images/lost-bag.jpg' },
  //   { id: 8, category: 'Computers & Electronics', image: '/images/lost-bag.jpg' },
  // ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Let's find</h1>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black" onClick={handleReportItem}>Report Item</Button>
      </div>

      <div className="flex space-x-4 mb-6">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Show all categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Show all categories</SelectItem>
            <SelectItem value="computers">Computers & Electronics</SelectItem>
            <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
            <SelectItem value="watches">Watches & Jewelry</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1 flex space-x-2">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search by date" className="pl-10" />
          </div>
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="e.g. Watch, Sweater, Phone, Wallet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline"><Search /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-0">
              <img src={item.image} alt={`Item ${item.id}`} className="w-full h-48 object-cover" />
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
              <span className="text-sm text-gray-600">{item.category}</span>
              <Button variant="outline" size="sm" onClick={() => handleClaimItem(item)}>Claim Item</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        claimDescription={claimDescription}
        setClaimDescription={setClaimDescription}
        claimContact={claimContact}
        setClaimContact={setClaimContact}
        handleSubmitClaim={handleSubmitClaim}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportImage={reportImage}
        setReportImage={setReportImage}
        reportContact={reportContact}
        setReportContact={setReportContact}
        reportDate={reportDate}
        setReportDate={setReportDate}
        reportCategory={reportCategory}
        setReportCategory={setReportCategory}
        handleSubmitReport={handleSubmitReport}
      />
    </div>
  );
}

export default Page