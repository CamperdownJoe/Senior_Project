import React from 'react';
import { Button } from "@/components/ui/button";
import BookmarkStructureView from './BookmarkStructureView';
import { BookmarkMap, BookmarkStructure } from '@/lib/types';

type Props = {
  bookmarks: BookmarkMap;
  reorganizedBookmarks: BookmarkStructure;
  onComplete: () => void;
};

export default function StepReview({ bookmarks, reorganizedBookmarks, onComplete }: Props) {
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
        <Button onClick={onComplete}>Confirm and Save</Button>
      </div>
    </div>
  );
}