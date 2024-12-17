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
    <div className="flex flex-col h-full space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Review Your Organized Bookmarks</h2>
        <p className="text-muted-foreground">Check the new structure of your bookmarks below</p>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Total Bookmarks: {totalBookmarks}</span>
          <span>Total Categories: {totalCategories}</span>
        </div>
      </div>
      
      <div className="flex-grow min-h-0">
        <BookmarkStructureView structure={reorganizedBookmarks} bookmarks={bookmarks} />
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <Button variant="outline">Edit Categories</Button>
        <Button onClick={handleConfirmAndSave}>Confirm and Save</Button>
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
              <SelectItem value="chrome">Chrome</SelectItem>
              <SelectItem value="firefox">Firefox</SelectItem>
              <SelectItem value="arc">Arc</SelectItem>
              <SelectItem value="raindrop">Raindrop</SelectItem>
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