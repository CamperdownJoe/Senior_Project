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
    duplicateGroups.forEach(group => {
      group.bookmarkIds.forEach(id => {
        if (id !== selectedBookmarks[group.url]) {
          toRemove.add(id);
        }
      });
    });
    setItemsToRemove(toRemove);
    setStep('invalidUrls');
    setProgress(50);
  };

  const handleInvalidUrlsComplete = (idsToRemove: string[], repairsMap: Map<string, RepairInfo>) => {
    setItemsToRemove(prev => new Set([...prev, ...idsToRemove]));
    
    console.log(idsToRemove)
    console.log(repairsMap)
    // Handle repairs
    const updatedBookmarks = new Map(bookmarks);
    repairsMap.forEach((repairInfo, id) => {
      const bookmark = updatedBookmarks.get(id);
      if (bookmark) {
        updatedBookmarks.set(id, {
          ...bookmark,
          url: repairInfo.newUrl,
          archivedDate: repairInfo.archiveDate
        });
      }
    });
    setBookmarks(updatedBookmarks);

    setStep('reorganize');
    setProgress(75);
  };

  // const handleReorganizeComplete = (newBookmarkTree: Map<string, Bookmark>) => {
  //   // Apply all removals and set the new bookmark tree
  //   const finalBookmarks = new Map(newBookmarkTree);
  //   itemsToRemove.forEach(id => finalBookmarks.delete(id));
  //   setBookmarks(finalBookmarks);
  //   localStorage.setItem('bookmarks', JSON.stringify(Object.fromEntries(finalBookmarks)));
  //   setProgress(100);
  //   toast({
  //     title: "Bookmarks organized",
  //     description: "Your bookmarks have been successfully organized.",
  //   });
  //   // Navigate to the next page or show a completion message
  // };
  const handleReorganizeComplete = (method: 'dewey' | 'ai', reorganized: BookmarkStructure) => {
    console.log("--------")
    
    setReorganizationMethod(method);
    setReorganizedBookmarks(reorganized);
    // console.log(method)
    // console.log(reorganized)

    // console.log(reorganizedBookmarks)
    setStep('review');
    setProgress(100);
  };

  const handleReviewComplete = () => {
    // Apply all removals and set the new bookmark structure
    const finalBookmarks = new Map(bookmarks);
    itemsToRemove.forEach(id => finalBookmarks.delete(id));
    setBookmarks(finalBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(Object.fromEntries(finalBookmarks)));
    toast({
      title: "Bookmarks organized",
      description: "Your bookmarks have been successfully organized.",
    });
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
      {step === 'review' && reorganizedBookmarks && <StepReview bookmarks={bookmarks} reorganizedBookmarks={reorganizedBookmarks}  onComplete={handleReviewComplete}/>}
    </div>
  );
}