import { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bookmark, DuplicateGroup } from '@/lib/types';
import { recommendBookmark } from '../utils/recommendBookmark';
import { format } from 'date-fns';
import { Check } from 'lucide-react';

type Props = {
  duplicateGroups: DuplicateGroup[];
  bookmarks: Map<string, Bookmark>;
  onComplete: (selectedBookmarks: Record<string, string>) => void;
  showExportOption?: boolean;
  onExport?: (format: string) => void;
  isProcessing?: boolean;
};

export default function StepDuplicates({ 
  duplicateGroups, 
  bookmarks, 
  onComplete, 
  showExportOption = false,
  onExport,
  isProcessing = false
}: Props) {
  const [selectedBookmarks, setSelectedBookmarks] = useState<Record<string, string>>({});
  const [recommendationRule, setRecommendationRule] = useState<'short' | 'newest'>('short');
  const [exportFormat, setExportFormat] = useState<string>('');

  useEffect(() => {
    applyRecommendations();
  }, [duplicateGroups, recommendationRule]);

  const applyRecommendations = () => {
    const newSelections = duplicateGroups.reduce((acc, group) => {
      const groupBookmarks = group.bookmarkIds
        .map(id => bookmarks.get(id))
        .filter((bookmark): bookmark is Bookmark => bookmark !== undefined);
      if (groupBookmarks.length > 0) {
        acc[group.url] = recommendBookmark(groupBookmarks, recommendationRule);
      }
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

  const handleExportAndRemove = () => {
    if (showExportOption && onExport && exportFormat) {
      onExport(exportFormat);
    } else {
      onComplete(selectedBookmarks);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Review Duplicate Bookmarks</h2>
      
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="mb-3 text-lg font-semibold">Recommendation Rule</h3>
        <RadioGroup
          value={recommendationRule}
          onValueChange={(value) => handleRecommendationChange(value as 'short' | 'newest')}
          className="flex space-x-4"
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
        <div key={group.url} className="rounded-lg border p-6 shadow-sm">
          <h3 className="mb-4 truncate text-lg font-semibold">{group.url}</h3>
          <div className="space-y-3">
            {group.bookmarkIds.map((id) => {
              const bookmark = bookmarks.get(id);
              if (!bookmark) return null; // Skip rendering if bookmark is undefined
              const isSelected = selectedBookmarks[group.url] === id;
              return (
                <div 
                  key={id} 
                  className={`flex items-center space-x-3 rounded-md p-3 transition-colors ${
                    isSelected ? 'border border-green-200 bg-green-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <Checkbox
                    id={id}
                    checked={isSelected}
                    onCheckedChange={() => handleCheckboxChange(group.url, id)}
                  />
                  <label htmlFor={id} className="grow cursor-pointer text-sm">
                    <span className="font-medium">{bookmark.title}</span>
                    {recommendationRule === 'newest' && bookmark.addDate && (
                      <span className="ml-2 text-xs text-gray-500">
                        (Added: {format(new Date(bookmark.addDate * 1000), 'PPP')})
                      </span>
                    )}
                  </label>
                  {isSelected && (
                    <Check className="size-5 text-green-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-end space-x-4">
        {showExportOption && (
          <Select onValueChange={setExportFormat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chrome">Chrome</SelectItem>
              <SelectItem value="firefox">Firefox</SelectItem>
              <SelectItem value="safari">Safari</SelectItem>
            </SelectContent>
          </Select>
        )}
        <Button 
          onClick={handleExportAndRemove} 
          className="px-6"
          disabled={showExportOption && !exportFormat}
        >
          {showExportOption ? 'Remove and Export' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}