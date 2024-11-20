import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bookmark } from '@/lib/types';

type DuplicateGroup = {
  url: string;
  bookmarks: Bookmark[];
};

type Props = {
  duplicateGroups: DuplicateGroup[];
  onContinue: (selectedBookmarks: Record<string, string>) => void;
};

export default function StepReview({ duplicateGroups, onContinue }: Props) {
  const [selectedBookmarks, setSelectedBookmarks] = useState<Record<string, string>>({});
  const [recommendationRule, setRecommendationRule] = useState<'short' | 'ai' | 'newest'>('short');

  const handleCheckboxChange = (url: string, id: string) => {
    setSelectedBookmarks(prev => ({
      ...prev,
      [url]: id
    }));
  };

  const handleContinue = () => {
    onContinue(selectedBookmarks);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Duplicate Bookmarks</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommendation Rule</h3>
        <RadioGroup
          defaultValue="short"
          onValueChange={(value) => setRecommendationRule(value as 'short' | 'ai' | 'newest')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="short" id="short" />
            <Label htmlFor="short">Shortest Title</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ai" id="ai" />
            <Label htmlFor="ai">AI Recommendation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="newest" id="newest" />
            <Label htmlFor="newest">Newest (by ADD_DATE)</Label>
          </div>
        </RadioGroup>
      </div>

      {duplicateGroups.map((group) => (
        <div key={group.url} className="border p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">{group.url}</h3>
          {group.bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={bookmark.id}
                checked={selectedBookmarks[group.url] === bookmark.id}
                onCheckedChange={() => handleCheckboxChange(group.url, bookmark.id)}
              />
              <label htmlFor={bookmark.id} className="text-sm">
                {bookmark.title}
              </label>
            </div>
          ))}
        </div>
      ))}

      <Button onClick={handleContinue}>Continue to Remove Invalid URLs</Button>
    </div>
  );
}