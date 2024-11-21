import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BookmarkMap } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Icons } from "@/components/shared/icons";

type Props = {
  bookmarks: BookmarkMap | null;
  onComplete: (newBookmarkMap: BookmarkMap) => void;
};

export default function StepReorganize({ bookmarks, onComplete }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<'dewey' | 'ai' | null>(null);

  const handleMethodSelect = (method: 'dewey' | 'ai') => {
    setSelectedMethod(method);
    // Here you would call the AI or Dewey classification function
    // and then call onComplete with the result
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Reorganize Your Bookmarks</h2>
      <p className="text-center text-gray-600">Choose a method to bring order to your digital library:</p>
      <div className="flex space-x-6 justify-center">
        <Card 
          className={`w-72 h-96 transition-all duration-300 cursor-pointer ${
            selectedMethod === 'dewey' ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
          }`}
          onClick={() => handleMethodSelect('dewey')}
        >
          <CardHeader className="bg-gradient-to-br from-blue-100 to-blue-200 p-6">
            <CardTitle className="flex items-center space-x-2">
              <Icons.bookOpen className="w-6 h-6 text-blue-600" />
              <span>Dewey Decimal</span>
            </CardTitle>
            <CardDescription>Classic library organization</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Hierarchical structure</li>
              <li>Based on established system</li>
              <li>Great for academic content</li>
            </ul>
            <div className="mt-4 relative h-32 overflow-hidden rounded-md">
              <Image 
                // src="/images/dewey-demo.png" 
                src="https://via.placeholder.com/1024x768" 
                alt="Dewey Classification Demo" 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-300 transform hover:scale-110"
              />
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`w-72 h-96 transition-all duration-300 cursor-pointer ${
            selectedMethod === 'ai' ? 'ring-2 ring-purple-500 shadow-lg' : 'hover:shadow-md'
          }`}
          onClick={() => handleMethodSelect('ai')}
        >
          <CardHeader className="bg-gradient-to-br from-purple-100 to-purple-200 p-6">
            <CardTitle className="flex items-center space-x-2">
              <Icons.logo className="w-6 h-6 text-purple-600" />
              <span>AI Custom</span>
            </CardTitle>
            <CardDescription>Personalized AI organization</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Tailored to your content</li>
              <li>Adaptive categorization</li>
              <li>Discovers unique patterns</li>
            </ul>
            <div className="mt-4 relative h-32 overflow-hidden rounded-md">
              <Image 
                // src="/images/ai-demo.png" 
                src="https://via.placeholder.com/1024x768" 
                alt="AI Classification Demo" 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-300 transform hover:scale-110"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      {selectedMethod && (
        <div className="text-center">
          <Button 
            onClick={() => onComplete(bookmarks!)}
            // className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-300"
          >
            Complete Organization
          </Button>
        </div>
      )}
    </div>
  );
}