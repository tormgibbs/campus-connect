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

interface Item {
  id: number;
  category: string;
  image: string;
}

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimDescription, setClaimDescription] = useState('');
  const [claimContact, setClaimContact] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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

  const items: Item[] = [
    { id: 1, category: 'Computers & Electronics', image: '/images/lost-bag.jpg' },
    { id: 2, category: 'Miscellaneous', image: '/images/lost-bag.jpg' },
    { id: 3, category: 'Watches & Jewelry', image: '/images/lost-bag.jpg' },
    { id: 4, category: 'Watches & Jewelry', image: '/images/lost-bag.jpg' },
    { id: 5, category: 'Watches & Jewelry', image: '/images/lost-bag.jpg' },
    { id: 6, category: 'Computers & Electronics', image: '/images/lost-bag.jpg' },
    { id: 7, category: 'Computers & Electronics', image: '/images/lost-bag.jpg' },
    { id: 8, category: 'Computers & Electronics', image: '/images/lost-bag.jpg' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">We found <span className="font-bold">185</span> unclaimed items.</h1>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">File A Claim</Button>
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

      <Dialog open={isClaimModalOpen} onOpenChange={setIsClaimModalOpen}>
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
            <Button variant="outline" onClick={() => setIsClaimModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitClaim}>Submit Claim</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Page