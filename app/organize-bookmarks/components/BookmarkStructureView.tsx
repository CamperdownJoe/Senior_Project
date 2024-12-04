import React, { useState } from 'react';
import { BookmarkStructure, Bookmark } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Folder, File, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';

interface BookmarkStructureViewProps {
  structure: BookmarkStructure;
  bookmarks: Map<string, Bookmark>;
}

const BookmarkStructureView: React.FC<BookmarkStructureViewProps> = ({ structure, bookmarks }) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryPath: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryPath)) {
        newSet.delete(categoryPath);
      } else {
        newSet.add(categoryPath);
      }
      return newSet;
    });
  };

  const countBookmarks = (category: any): number => {
    let count = category.bookmarks.length;
    Object.values(category.subcategories || {}).forEach((subCategory: any) => {
      count += countBookmarks(subCategory);
    });
    return count;
  };

  const renderBookmark = (bookmarkId: string) => {
    const bookmark = bookmarks.get(bookmarkId);
    if (!bookmark) return null;
    return (
      <li key={bookmarkId} className="ml-6 flex items-center space-x-2 py-1">
        <File className="h-4 w-4 text-blue-500" />
        <a 
          href={bookmark.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-sm hover:underline flex items-center"
        >
          {bookmark.title}
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </li>
    );
  };

  const renderCategory = (categoryName: string, category: any, path: string = '', depth: number = 0) => {
    const currentPath = path ? `${path}.${categoryName}` : categoryName;
    const isOpen = openCategories.has(currentPath);
    const bookmarkCount = countBookmarks(category);

    return (
      <li key={currentPath} className={`mt-2 ${depth > 0 ? 'ml-6' : ''}`}>
        <Button 
          variant="ghost" 
          className="w-full justify-start p-2 font-normal"
          onClick={() => toggleCategory(currentPath)}
        >
          <div className="flex items-center space-x-2">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <Folder className="h-5 w-5 text-yellow-500" />
            <span>{categoryName}</span>
            <span className="text-xs text-gray-500">({bookmarkCount})</span>
          </div>
        </Button>
        {isOpen && (
          <ul className="ml-6 space-y-1">
            {category.bookmarks.map(renderBookmark)}
            {Object.entries(category.subcategories || {}).map(([subName, subCategory]) => 
              renderCategory(subName, subCategory, currentPath, depth + 1)
            )}
          </ul>
        )}
      </li>
    );
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Bookmark Structure</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px] w-full rounded-md">
          <div className="p-4">
            <ul className="space-y-2">
              {Object.entries(structure).map(([categoryName, category]) => 
                renderCategory(categoryName, category)
              )}
            </ul>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BookmarkStructureView;