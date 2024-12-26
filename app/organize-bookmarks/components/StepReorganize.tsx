import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BookmarkMap, BookmarkStructure } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Icons } from "@/components/shared/icons";
import { reorganizeBookmarks } from '../utils/reorganizeBookmarks';

type Props = {
  bookmarks: BookmarkMap;
  onComplete: (method: 'dewey' | 'ai', reorganizedBookmarks: BookmarkStructure) => void;
};

export default function StepReorganize({ bookmarks, onComplete }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<'dewey' | 'ai' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMethodSelect = (method: 'dewey' | 'ai') => {
    setSelectedMethod(method);
  };

  const handleReorganize = async () => {
    if (!selectedMethod) return;

    setIsLoading(true);
    try {
      const reorganizedBookmarks = await reorganizeBookmarks(bookmarks, selectedMethod);
      // console.log('AI API Response:', reorganizedBookmarks);
      onComplete(selectedMethod, reorganizedBookmarks);
    } catch (error) {
      console.error('Error reorganizing bookmarks:', error);
      // Handle error (e.g., show a toast notification)
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="space-y-8">
      {/* <h2 className="text-3xl font-bold text-center">Reorganize Your Bookmarks</h2> */}
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
                src="/_static/examples/d.png" 
                // src="https://via.placeholder.com/1024x768"
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
                src="/_static/examples/AI.png" 
                // src="https://via.placeholder.com/1024x768" 
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
            onClick={handleReorganize}
            disabled={isLoading}
          >
            {isLoading ? 'Reorganizing...' : 'Complete Organization'}
          </Button>
        </div>
      )}
    </div>
  );
}