import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const items = [
  { id: 1, category: 'Computers & Electronics', image: '/api/placeholder/400/300' },
  { id: 2, category: 'Miscellaneous', image: '/api/placeholder/400/300' },
  { id: 3, category: 'Watches & Jewelry', image: '/api/placeholder/400/300' },
  { id: 4, category: 'Watches & Jewelry', image: '/api/placeholder/400/300' },
  { id: 5, category: 'Watches & Jewelry', image: '/api/placeholder/400/300' },
  { id: 6, category: 'Computers & Electronics', image: '/api/placeholder/400/300' },
  { id: 7, category: 'Computers & Electronics', image: '/api/placeholder/400/300' },
  { id: 8, category: 'Computers & Electronics', image: '/api/placeholder/400/300' },
]

const page = () => {
  return (
    <div>
      <h1 className=''></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-0">
              <img src={item.image} alt={`Item ${item.id}`} className="w-full h-48 object-cover" />
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4">
              <span className="text-sm text-gray-600">{item.category}</span>
              <Button variant="outline" size="sm">Claim Item</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default page