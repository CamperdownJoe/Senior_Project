"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { Bookmark, BookmarkStructure } from '@/lib/types';
import { exportBookmarks } from '../../organize-bookmarks/utils/exportBookmarks';
import StepInvalidUrls from '../../organize-bookmarks/components/StepInvalidUrls';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileUp } from "lucide-react";
import { saveAs } from 'file-saver';
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { convertHtmlToJson, convertJsonToBookmarkStructure, convertJsonToBookMarkMap } from '@/lib/parseBookmarks';

export default function RemoveBrokenBookmarksPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<Map<string, Bookmark>>(new Map());
  const [bookmarkStructure, setBookmarkStructure] = useState<BookmarkStructure>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (file.type === "text/html") {
      setFile(file);
      try {
        const content = await file.text();
        const jsonData = await convertHtmlToJson(content);
        const bookmarkStructure = await convertJsonToBookmarkStructure(jsonData);
        const bookmarkMap = await convertJsonToBookMarkMap(jsonData);

        setBookmarkStructure(bookmarkStructure);
        setBookmarks(bookmarkMap);
        setIsUploaded(true);

      } catch (error) {
        console.error('Error processing file:', error);
        toast({
          title: "Error processing file",
          description: "Please try again or contact support",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an HTML file",
        variant: "destructive",
      });
    }
  };

  const handleExportAndFix = async (format: string, idsToRemove: string[], repairsMap: Map<string, { newUrl: string; archiveDate: string }>) => {
    setIsProcessing(true);
    const updatedBookmarks = new Map(bookmarks);

    idsToRemove.forEach(id => {
      updatedBookmarks.delete(id);
    });

    repairsMap.forEach((repairInfo, id) => {
      const bookmark = updatedBookmarks.get(id);
      if (bookmark) {
        updatedBookmarks.set(id, {
          ...bookmark,
          url: repairInfo.newUrl,
        });
      }
    });

    try {
      const exportedBookmarks = await exportBookmarks(bookmarkStructure, updatedBookmarks, format);
      const blob = new Blob([exportedBookmarks], { type: 'text/html;charset=utf-8' });
      saveAs(blob, `bookmarks_fixed_urls_${format}.html`);

      // router.push('/');
    } catch (error) {
      console.error('Error exporting bookmarks:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting your bookmarks. Please try again.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  const handleComplete = (idsToRemove: string[], repairsMap: Map<string, { newUrl: string; archiveDate: string }>) => {
    // 处理非导出情况的逻辑（如果需要的话）
    console.log("Completed without export");
  };

  return (
    <ToastProvider>
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Check and Fix Invalid URLs</h1> */}
      
      {!isUploaded ? (
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-1/2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="mb-4 text-2xl font-semibold">How it works</h2>
                <ol className="list-inside list-decimal space-y-2">
                  <li>Upload your bookmarks HTML file</li>
                  <li>We&apos;ll scan for invalid URLs</li>
                  <li>Review and select which URLs to fix or remove</li>
                  <li>Download your cleaned bookmarks file</li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  This tool helps you clean up your bookmarks by identifying and fixing or removing invalid URLs,
                  making your bookmark collection more reliable and up-to-date.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="mb-4 text-2xl font-semibold">Upload Bookmarks</h2>
                <div
                  className="mb-4 w-full cursor-pointer rounded-md border-4 border-dashed p-8 text-center transition duration-300 hover:border-primary hover:text-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileUp className="mx-auto size-16 text-gray-400" />
                  <p className="mt-4 text-lg font-medium">
                    {file ? file.name : "Click or drag to upload bookmarks"}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Supports HTML files exported from most browsers
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".html"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : isUploaded && (
        <StepInvalidUrls 
          bookmarks={bookmarks} 
          itemsToRemove={new Set()} 
          onComplete={handleComplete}
          showExportOption={true}
          onExport={handleExportAndFix}
          isProcessing={isProcessing}
          standalone={true}
        />
      )}
    </div>
    <Toaster />
    </ToastProvider>
  );
}