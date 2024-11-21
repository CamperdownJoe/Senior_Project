import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bookmark } from '@/lib/types';
import { checkSingleUrlViaAPI, UrlCheckResult } from '../utils/urlUtils';
import { PlayCircle, StopCircle, ArrowRight, AlertCircle } from 'lucide-react';

type InvalidBookmark = {
  id: string;
  title: string;
  url: string;
  errorCode: number;
};

type RepairableBookmark = {
  id: string;
  title: string;
  url: string;
  archiveDate: string;
};

type RepairInfo = {
  newUrl: string;
  archiveDate: string;
};

type Props = {
  bookmarks: Map<string, Bookmark>;
  itemsToRemove: Set<string>;
  onComplete: (idsToRemove: string[], repairsMap: Map<string, RepairInfo>) => void;
};

export default function StepInvalidUrls({ bookmarks, itemsToRemove, onComplete }: Props) {
  const [finalBrokenBookmarks, setFinalBrokenBookmarks] = useState<Record<number, InvalidBookmark[]>>({});
  const [repairableBookmarks, setRepairableBookmarks] = useState<RepairableBookmark[]>([]);
  const [selectedForRemoval, setSelectedForRemoval] = useState<Set<string>>(new Set());
  const [selectedForRepair, setSelectedForRepair] = useState<Set<string>>(new Set());
  const [checkingProgress, setCheckingProgress] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [allUrlsChecked, setAllUrlsChecked] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isCheckingRef = useRef(false);

  useEffect(() => {
    if (bookmarks.size > 0 && !isCheckingRef.current) {
      startUrlCheck();
    }
  }, [bookmarks]);

  const startUrlCheck = async () => {
    if (isCheckingRef.current) return;
    isCheckingRef.current = true;
    setIsChecking(true);
    setAllUrlsChecked(false);
    abortControllerRef.current = new AbortController();
    await checkUrls(bookmarks);
    setIsChecking(false);
    setAllUrlsChecked(true);
    isCheckingRef.current = false;
  };

  const stopUrlCheck = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsChecking(false);
    isCheckingRef.current = false;
  };

  const checkUrls = async (bookmarks: Map<string, Bookmark>) => {
    setAllUrlsChecked(false);
    const bookmarksArray = Array.from(bookmarks.entries());
    const totalChecks = bookmarksArray.length;
    let checkedCount = 0;

    const updateProgress = () => {
      checkedCount++;
      setCheckingProgress((checkedCount / totalChecks) * 100);
    };

    for (const [id, bookmark] of bookmarksArray) {
      if (abortControllerRef.current?.signal.aborted) {
        break;
      }
      if (bookmark.type === 'link' && !itemsToRemove.has(id)) {
        try {
          const result = await checkSingleUrlViaAPI(bookmark.url!, abortControllerRef.current?.signal);
          handleUrlCheckResult(id, bookmark, result);
        } catch (error) {
          if (error.name === 'AbortError') {
            console.error(`Error checking ${bookmark.url}: ${error.message}`);
            break;
          }
        }
      }
      updateProgress();
    }
    setAllUrlsChecked(true);
  };

  const handleUrlCheckResult = (id: string, bookmark: Bookmark, result: UrlCheckResult) => {
    if (result.isBroken) {
      if (result.isRepairable) {
        setRepairableBookmarks(prev => {
          const existingIndex = prev.findIndex(item => item.id === id);
          if (existingIndex >= 0) {
            return prev; // Bookmark already exists, don't add it again
          }
          return [...prev, { 
            id, 
            title: bookmark.title, 
            url: bookmark.url!, 
            archiveDate: result.archiveDate! 
          }];
        });
        setSelectedForRepair(prev => new Set(prev).add(id));
      } else {
        setFinalBrokenBookmarks(prev => {
          const newBroken = { ...prev };
          if (!newBroken[result.errorCode]) newBroken[result.errorCode] = [];
          const existingIndex = newBroken[result.errorCode].findIndex(item => item.id === id);
          if (existingIndex >= 0) {
            return prev; // Bookmark already exists, don't add it again
          }
          newBroken[result.errorCode].push({ 
            id, 
            title: bookmark.title, 
            url: bookmark.url!, 
            errorCode: result.errorCode 
          });
          return newBroken;
        });
        setSelectedForRemoval(prev => new Set(prev).add(id));
      }
    }
  };

  const handleRemovalSelection = (id: string) => {
    setSelectedForRemoval(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleRepairSelection = (id: string) => {
    setSelectedForRepair(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleContinue = () => {
    const idsToRemove = Array.from(selectedForRemoval) as string[];
    const repairsMap = new Map<string, RepairInfo>();
    
    selectedForRepair.forEach(id => {
      const bookmark = repairableBookmarks.find(b => b.id === id);
      if (bookmark) {
        repairsMap.set(id, {
          newUrl: `https://web.archive.org/web/${bookmark.archiveDate}/${bookmark.url}`,
          archiveDate: bookmark.archiveDate
        });
      }
    });

    onComplete(idsToRemove, repairsMap);
  };

  const isAnythingSelected = selectedForRemoval.size > 0 || selectedForRepair.size > 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Review Invalid URLs</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={isChecking ? stopUrlCheck : startUrlCheck}
              disabled={allUrlsChecked}
            >
              {isChecking ? <StopCircle className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
            </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isChecking ? 'Stop checking' : 'Start checking'} URLs</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {isChecking && (
        <div className="space-y-2">
          <Progress value={checkingProgress} className="w-full" />
          <p className="text-sm text-gray-500">Checking URLs: {Math.round(checkingProgress)}%</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span>Final Broken Bookmarks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {Object.entries(finalBrokenBookmarks).map(([errorCode, bookmarks]) => (
                <div key={errorCode} className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Error {errorCode} ({bookmarks.length})</h4>
                  <ul className="space-y-1">
                    {bookmarks.map(bookmark => (
                      <li key={bookmark.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`remove-${bookmark.id}`}
                          checked={selectedForRemoval.has(bookmark.id)}
                          onCheckedChange={() => handleRemovalSelection(bookmark.id)}
                        />
                        <label 
                          htmlFor={`remove-${bookmark.id}`} 
                          className="text-sm text-gray-700 truncate flex-1" 
                          title={bookmark.url}
                        >
                          {bookmark.title}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PlayCircle className="h-5 w-5 text-green-500" />
              <span>Repairable Bookmarks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
            {repairableBookmarks.map(bookmark => (
              <div key={bookmark.id} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={`repair-${bookmark.id}`}
                  checked={selectedForRepair.has(bookmark.id)}
                  onCheckedChange={() => handleRepairSelection(bookmark.id)}
                />
                <label 
                  htmlFor={`repair-${bookmark.id}`} 
                  className="text-sm text-gray-700 truncate flex-1" 
                  title={bookmark.url}
                >
                  {bookmark.title}
                  <span className="text-xs text-gray-500 ml-2">
                    (Archived: {bookmark.archiveDate ? new Date(bookmark.archiveDate).toLocaleDateString() : 'Unknown'})
                  </span>
                </label>
              </div>
            ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleContinue} 
          disabled={isChecking}
          variant={isAnythingSelected ? "default" : "secondary"}
          className="flex items-center space-x-2"
        >
          <span>{isAnythingSelected ? "Continue to Reorganize" : "Continue without Changes"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}