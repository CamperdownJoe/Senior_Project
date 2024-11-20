import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bookmark, DuplicateGroup } from '@/lib/types';
import { recommendBookmark } from '../utils/recommendBookmark';
import { format } from 'date-fns';

type Props = {
  duplicateGroups: DuplicateGroup[];
  bookmarks: Map<string, Bookmark>;
  onComplete: (selectedBookmarks: Record<string, string>) => void;
};

export default function StepDuplicates({ duplicateGroups, bookmarks, onComplete }: Props) {
  const [selectedBookmarks, setSelectedBookmarks] = useState<Record<string, string>>({});
  const [recommendationRule, setRecommendationRule] = useState<'short' | 'newest'>('short');

  useEffect(() => {
    applyRecommendations();
  }, [duplicateGroups, recommendationRule]);

  const applyRecommendations = () => {
    const newSelections = duplicateGroups.reduce((acc, group) => {
      const groupBookmarks = group.bookmarkIds.map(id => bookmarks.get(id)!);
      acc[group.url] = recommendBookmark(groupBookmarks, recommendationRule);
      return acc;
    }, {} as Record<string, string>);
    setSelectedBookmarks(newSelections);
  };

  const handleCheckboxChange = (url: string, id: string) => {
    setSelectedBookmarks(prev => ({
      ...prev,
      [url]: id
    }));
  };

  const handleRecommendationChange = (rule: 'short' | 'newest') => {
    setRecommendationRule(rule);
  };

  const handleContinue = () => {
    onComplete(selectedBookmarks);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Duplicate Bookmarks</h2>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommendation Rule</h3>
        <RadioGroup
          value={recommendationRule}
          onValueChange={(value) => handleRecommendationChange(value as 'short' | 'newest')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="short" id="short" />
            <Label htmlFor="short">Shortest Title</Label>
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
          {group.bookmarkIds.map((id) => {
            const bookmark = bookmarks.get(id)!;
            return (
              <div key={id} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={id}
                  checked={selectedBookmarks[group.url] === id}
                  onCheckedChange={() => handleCheckboxChange(group.url, id)}
                />
                <label htmlFor={id} className="text-sm">
                  {bookmark.title}
                  {recommendationRule === 'newest' && bookmark.addDate && (
                    <span className="ml-2 text-xs text-gray-500">
                      (Added: {format(new Date(bookmark.addDate * 1000), 'PPP')})
                    </span>
                  )}
                </label>
              </div>
            );
          })}
        </div>
      ))}

      <Button onClick={handleContinue}>Continue to Remove Invalid URLs</Button>
    </div>
  );
}