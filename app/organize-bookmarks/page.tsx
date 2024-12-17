"use client";

import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ProgressBar from './components/ProgressBar';
import StepInitial from './components/StepInitial';
import StepDuplicates from './components/StepDuplicates';
import StepInvalidUrls from './components/StepInvalidUrls';
import StepReorganize from './components/StepReorganize';
import StepReview from './components/StepReview';
import { Bookmark, DuplicateGroup, BookmarkStructure } from '@/lib/types';
import { findDuplicates } from './utils/findDuplicates';
import { reorganizeBookmarks } from './utils/reorganizeBookmarks';
import { saveAs } from 'file-saver';
import { exportBookmarks } from './utils/exportBookmarks'; 


type Step = 'initial' | 'duplicates' | 'invalidUrls' | 'reorganize' | 'review';

type RepairInfo = {
  newUrl: string;
  archiveDate: string;
};

export default function OrganizeBookmarksPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<Map<string, Bookmark>>(new Map());
  const [step, setStep] = useState<Step>('initial');
  const [progress, setProgress] = useState(0);
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [invalidUrls, setInvalidUrls] = useState<string[]>([]);
  const [itemsToRemove, setItemsToRemove] = useState<Set<string>>(new Set());
  const [reorganizationMethod, setReorganizationMethod] = useState<'dewey' | 'ai' | null>(null);
  const [reorganizedBookmarks, setReorganizedBookmarks] = useState<BookmarkStructure | null>(null);



  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      const parsedBookmarks = JSON.parse(storedBookmarks);
      setBookmarks(new Map(Object.entries(parsedBookmarks)));
    } else {
      router.push('/');
      toast({
        title: "No bookmarks found",
        description: "Please upload your bookmarks file first.",
        variant: "destructive",
      });
    }
  }, []);

  const handleStartOrganizing = async () => {
    if (bookmarks.size === 0) return;

    setStep('duplicates');
    setProgress(25);
    const duplicates = findDuplicates(bookmarks);
    setDuplicateGroups(duplicates);
  };

  const handleSkip = () => {
    // TODO: Implement skip logic
  };

  const handleDuplicatesComplete = (selectedBookmarks: Record<string, string>) => {
    const toRemove = new Set<string>();
    const updatedBookmarks = new Map(bookmarks);

    duplicateGroups.forEach(group => {
      const selectedId = selectedBookmarks[group.url];
      group.bookmarkIds.forEach(id => {
        if (id !== selectedId) {
          toRemove.add(id);
          updatedBookmarks.delete(id);
        }
      });
    });
    
    setItemsToRemove(prev => new Set([...prev, ...toRemove]));
    setBookmarks(updatedBookmarks);
    

    setStep('invalidUrls');
    setProgress(50);
  };

  const handleInvalidUrlsComplete = (idsToRemove: string[], repairsMap: Map<string, RepairInfo>) => {
    setItemsToRemove(prev => new Set([...prev, ...idsToRemove]));

    
    const updatedBookmarks = new Map(bookmarks);

    idsToRemove.forEach(id => {
      updatedBookmarks.delete(id);
    });

    // Handle repairs
    repairsMap.forEach((repairInfo, id) => {
      const bookmark = updatedBookmarks.get(id);
      if (bookmark) {
        updatedBookmarks.set(id, {
          ...bookmark,
          url: repairInfo.newUrl,
          // archivedDate: repairInfo.archiveDate
        });
      }
    });
    setBookmarks(updatedBookmarks);

    setStep('reorganize');
    setProgress(75);
  };

  const handleReorganizeComplete = (method: 'dewey' | 'ai', reorganized: BookmarkStructure) => {
    
    setReorganizationMethod(method);
    setReorganizedBookmarks(reorganized);
    // console.log(method)
    // console.log(reorganized)

    // console.log(reorganizedBookmarks)
    setStep('review');
    setProgress(100);
  };

  const handleReviewComplete = async (format: string) => {
    // Apply all removals and set the new bookmark structure
    const finalBookmarks = new Map(bookmarks);
    // itemsToRemove.forEach(id => finalBookmarks.delete(id));
    // setBookmarks(finalBookmarks);

    // Export bookmarks in the selected format

    try {
      // Export bookmarks in the selected format
      const exportedBookmarks = await exportBookmarks(reorganizedBookmarks, finalBookmarks, format);
  
      // Download the file
      const blob = new Blob([exportedBookmarks], { type: 'text/html;charset=utf-8' });
      saveAs(blob, 'bookmarks.html');
  
      toast({
        title: "Bookmarks exported",
        description: `Your bookmarks have been successfully exported in ${format} format.`,
      });
    } catch (error) {
      console.error('Error exporting bookmarks:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your bookmarks. Please try again.",
        variant: "destructive",
      });
    }

    // Navigate to the next page or show a completion message
    router.push('/bookmark-manager'); // Adjust this as needed
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Organize Bookmarks</h1>
      <ProgressBar value={progress} />

      {step === 'initial' && <StepInitial onClean={handleStartOrganizing} onSkip={handleSkip} />}
      {step === 'duplicates' && <StepDuplicates duplicateGroups={duplicateGroups} bookmarks={bookmarks} onComplete={handleDuplicatesComplete} />}
      {step === 'invalidUrls' && <StepInvalidUrls bookmarks={bookmarks} itemsToRemove={itemsToRemove} onComplete={handleInvalidUrlsComplete} />}
      {step === 'reorganize' && <StepReorganize bookmarks={bookmarks} onComplete={handleReorganizeComplete} />}
      {step === 'review' && reorganizedBookmarks && (
        <StepReview 
          bookmarks={bookmarks} 
          reorganizedBookmarks={reorganizedBookmarks}  
          onComplete={handleReviewComplete}
        />
      )}
    </div>
  );
}