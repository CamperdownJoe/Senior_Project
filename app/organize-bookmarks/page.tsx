"use client";

import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import ProgressBar from './components/ProgressBar';
import StepInitial from './components/StepInitial';
import StepCleaning from './components/StepCleaning';
import StepReview from './components/StepReview';
import { Bookmark, BookmarkFolder, BookmarkTree } from '@/lib/types';
import { cleanBookmarks } from './utils/cleanBookmarks';

export default function OrganizeBookmarksPage() {
    const [originalBookmarks, setOriginalBookmarks] = useState<BookmarkTree | null>(null);
    const [cleanedBookmarks, setCleanedBookmarks] = useState<BookmarkTree | null>(null);
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState<'initial' | 'cleaning' | 'review'>('initial');
    const { toast } = useToast();

    useEffect(() => {
        setOriginalBookmarks([
            {
                id: 'root',
                title: 'Bookmarks',
                type: 'folder',
                children: []
            }
        ]);
    }, []);

    const handleCleanCollections = async () => {
        if (!originalBookmarks) return;
        setStep('cleaning');
        const cleaned = await cleanBookmarks(originalBookmarks, setProgress);
        setCleanedBookmarks(cleaned);
        setStep('review');
    };

    const handleSkip = () => {
        setStep('review');
        setCleanedBookmarks(originalBookmarks);
    };

    const handleUndo = (path: string[]) => {
        setCleanedBookmarks(prev => {
        if (!prev) return null;
        // Implement logic to undo based on path
        // This is a placeholder and needs to be implemented
        return prev;
        });
    };
  
    const handleRemove = (path: string[]) => {
        setCleanedBookmarks(prev => {
        if (!prev) return null;
        // Implement logic to remove based on path
        // This is a placeholder and needs to be implemented
        return prev;
        });
    };
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Organize Bookmarks</h1>
      <ProgressBar value={progress} />

      {step === 'initial' && (
        <StepInitial onClean={handleCleanCollections} onSkip={handleSkip} />
      )}

      {step === 'cleaning' && (
        <StepCleaning progress={progress} />
      )}

    {step === 'review' && originalBookmarks && cleanedBookmarks && (
        <StepReview
        originalBookmarks={originalBookmarks}
        cleanedBookmarks={cleanedBookmarks}
        onUndo={handleUndo}
        onRemove={handleRemove}
        />
     )}
    </div>
  );
}