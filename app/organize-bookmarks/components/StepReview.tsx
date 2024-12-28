import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import BookmarkStructureView from './BookmarkStructureView';
import { BookmarkMap, BookmarkStructure } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FirefoxIcon, ChromeIcon, ArcIcon } from "./BrowserIcons"


type Props = {
  bookmarks: BookmarkMap;
  reorganizedBookmarks: BookmarkStructure;
  onComplete: (format: string) => void;
};

export default function StepReview({ bookmarks, reorganizedBookmarks, onComplete }: Props) {
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!reorganizedBookmarks || Object.keys(reorganizedBookmarks).length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Review Your Organized Bookmarks</h2>
        <p>No reorganized bookmarks available.</p>
      </div>
    );
  }

  const totalBookmarks = bookmarks.size;
  const totalCategories = Object.keys(reorganizedBookmarks).length;

  const handleConfirmAndSave = () => {
    setIsDialogOpen(true);
  };

  const handleExport = () => {
    onComplete(selectedFormat);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Review Your Organized Bookmarks</h2>
        <p className="text-muted-foreground">Check the new structure of your bookmarks below</p>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Total Bookmarks: {totalBookmarks}</span>
          <span>Total Categories: {totalCategories}</span>
        </div>
      </div>
      
      <div className="min-h-0 grow">
        <BookmarkStructureView structure={reorganizedBookmarks} bookmarks={bookmarks} />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="invisible">
          <Button variant="outline">Edit Categories</Button>
        </div>
        <Button onClick={handleConfirmAndSave}>Confirm and Download</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Export Format</DialogTitle>
          </DialogHeader>
          <Select onValueChange={setSelectedFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Select a browser or service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chrome">
                <div className="flex items-center">
                  {/* <ChromeIcon className="mr-2 h-4 w-4" /> */}
                  Chrome
                </div>
              </SelectItem>
              <SelectItem value="edge">
                <div className="flex items-center">
                  {/* <EdgeIcon className="mr-2 h-4 w-4" /> */}
                  Edge
                </div>
              </SelectItem>
              <SelectItem value="firefox">
                <div className="flex items-center">
                  {/* <FirefoxIcon className="mr-2 h-4 w-4" /> */}
                  Firefox
                </div>
              </SelectItem>
              <SelectItem value="arc">
                <div className="flex items-center">
                  {/* <ArcIcon className="mr-2 h-4 w-4" /> */}
                  Arc
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} disabled={!selectedFormat}>
            Export
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}