import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BookmarkMap, BookmarkStructure } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Icons } from "@/components/shared/icons";
import { reorganizeBookmarks } from '../utils/reorganizeBookmarks';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type Props = {
  bookmarks: BookmarkMap;
  onComplete: (method: 'dewey' | 'ai' | 'custom', reorganizedBookmarks: BookmarkStructure) => void;
};

export default function StepReorganize({ bookmarks, onComplete }: Props) {
  const [selectedMethod, setSelectedMethod] = useState<'dewey' | 'ai' | 'custom' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customPreferences, setCustomPreferences] = useState({
    structure: '',
    preferences: ''
  });

  const handleMethodSelect = (method: 'dewey' | 'ai' | 'custom') => {
    setSelectedMethod(method);
  };

  const handleCustomInputChange = (field: 'structure' | 'preferences', value: string) => {
    setCustomPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReorganize = async () => {
    if (!selectedMethod) return;

    setIsLoading(true);
    try {
      const reorganizedBookmarks = await reorganizeBookmarks(
        bookmarks, 
        selectedMethod, 
        selectedMethod === 'custom' ? customPreferences : undefined
      );
      onComplete(selectedMethod, reorganizedBookmarks);
    } catch (error) {
      console.error('Error reorganizing bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <p className="text-center text-gray-600">Choose a method to bring order to your digital library:</p>
      <div className="flex justify-center space-x-6">
        <Card 
          className={`h-96 w-72 cursor-pointer transition-all duration-300 ${
            selectedMethod === 'dewey' ? 'shadow-lg ring-2 ring-blue-500' : 'hover:shadow-md'
          }`}
          onClick={() => handleMethodSelect('dewey')}
        >
          <CardHeader className="bg-gradient-to-br from-blue-100 to-blue-200 p-6">
            <CardTitle className="flex items-center space-x-2">
              <Icons.bookOpen className="size-6 text-blue-600" />
              <span>Dewey Decimal</span>
            </CardTitle>
            <CardDescription>Classic library organization</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>Hierarchical structure</li>
              <li>Based on established system</li>
              <li>Great for academic content</li>
            </ul>
            <div className="relative mt-4 h-32 overflow-hidden rounded-md">
              <Image 
                src="/_static/examples/d.png" 
                // src="https://via.placeholder.com/1024x768"
                alt="Dewey Classification Demo" 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`h-96 w-72 cursor-pointer transition-all duration-300 ${
            selectedMethod === 'ai' ? 'shadow-lg ring-2 ring-purple-500' : 'hover:shadow-md'
          }`}
          onClick={() => handleMethodSelect('ai')}
        >
          <CardHeader className="bg-gradient-to-br from-purple-100 to-purple-200 p-6">
            <CardTitle className="flex items-center space-x-2">
              <Icons.logo className="size-6 text-purple-600" />
              <span>AI Custom</span>
            </CardTitle>
            <CardDescription>Personalized AI organization</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>Tailored to your content</li>
              <li>Adaptive categorization</li>
              <li>Discovers unique patterns</li>
            </ul>
            <div className="relative mt-4 h-32 overflow-hidden rounded-md">
              <Image 
                src="/_static/examples/AI.png" 
                // src="https://via.placeholder.com/1024x768" 
                alt="AI Classification Demo" 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className={`h-96 w-72 cursor-pointer transition-all duration-300 ${
            selectedMethod === 'custom' ? 'shadow-lg ring-2 ring-green-500' : 'hover:shadow-md'
          }`}
          onClick={() => handleMethodSelect('custom')}
        >
          <CardHeader className="bg-gradient-to-br from-green-100 to-green-200 p-6">
            <CardTitle className="flex items-center space-x-2">
              <Icons.settings className="size-6 text-green-600" />
              <span>Custom Structure</span>
            </CardTitle>
            <CardDescription>Define your own organization</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>Full control over structure</li>
              <li>Personalized categories</li>
              <li>Flexible organization</li>
            </ul>
            <div className="relative mt-4 h-32 overflow-hidden rounded-md">
              <Image 
                src="/_static/examples/AI.png"
                alt="Custom Organization Demo" 
                layout="fill" 
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedMethod === 'custom' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Desired Structure</label>
            <Textarea 
              placeholder="Describe your desired folder structure (e.g., Work/Projects/Client1)"
              value={customPreferences.structure}
              onChange={(e) => handleCustomInputChange('structure', e.target.value)}
              className="h-24"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Special Preferences</label>
            <Textarea 
              placeholder="Any specific organization preferences or rules?"
              value={customPreferences.preferences}
              onChange={(e) => handleCustomInputChange('preferences', e.target.value)}
              className="h-24"
            />
          </div>
        </div>
      )}

      {selectedMethod && (
        <div className="text-center">
          <Button 
            onClick={handleReorganize}
            disabled={isLoading || (selectedMethod === 'custom' && 
              (!customPreferences.structure.trim() || !customPreferences.preferences.trim()))}
          >
            {isLoading ? 'Reorganizing...' : 'Complete Organization'}
          </Button>
        </div>
      )}
    </div>
  );
}