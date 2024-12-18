"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { Bookmark, DuplicateGroup, BookmarkStructure } from '@/lib/types';
import { findDuplicates } from '../../organize-bookmarks/utils/findDuplicates';
import { exportBookmarks } from '../../organize-bookmarks/utils/exportBookmarks';
import StepDuplicates from '../../organize-bookmarks/components/StepDuplicates';
import ExportOptions from '../../organize-bookmarks/components/ExportOptions';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileUp } from "lucide-react";
import { saveAs } from 'file-saver';
import { convertHtmlToJson, convertJsonToBookmarkStructure, convertJsonToBookMarkMap } from '@/lib/parseBookmarks';

export default function RemoveDuplicatesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<Map<string, Bookmark>>(new Map());
  const [bookmarkStructure, setBookmarkStructure] = useState<BookmarkStructure>({});
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedBookmarks, setSelectedBookmarks] = useState<Record<string, string>>({});
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
        
        const duplicates = findDuplicates(bookmarkMap);
        console.log('duplicates', duplicates);
        setDuplicateGroups(duplicates);
        setIsUploaded(true);
        toast({
          title: "File processed",
          description: `Bookmarks loaded successfully.`,
        });
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

  const handleDuplicatesSelect = (selected: Record<string, string>) => {
    setSelectedBookmarks(selected);
  };

  const handleExportAndRemove = async (format: string) => {
    setIsProcessing(true);
    const updatedBookmarks = new Map(bookmarks);

    duplicateGroups.forEach(group => {
      const selectedId = selectedBookmarks[group.url];
      group.bookmarkIds.forEach(id => {
        if (id !== selectedId) {
          updatedBookmarks.delete(id);
        }
      });
    });

    try {
      const exportedBookmarks = await exportBookmarks(bookmarkStructure, updatedBookmarks, format);
      const blob = new Blob([exportedBookmarks], { type: 'text/html;charset=utf-8' });
      saveAs(blob, `bookmarks_without_duplicates_${format}.html`);

      toast({
        title: "Duplicates removed and exported",
        description: `Your bookmarks have been updated and exported without duplicates in ${format} format.`,
      });
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

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Remove Duplicate Bookmarks</h1> */}
      
      {!isUploaded ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">How it works</h2>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Upload your bookmarks HTML file</li>
                  <li>We'll scan for duplicate bookmarks</li>
                  <li>Review and select which duplicates to keep</li>
                  <li>Download your cleaned bookmarks file</li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  This tool helps you clean up your bookmarks by identifying and removing duplicates,
                  making your bookmark collection more organized and easier to manage.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/2">
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Upload Bookmarks</h2>
                <div
                  className="border-4 border-dashed p-8 mb-4 w-full rounded-md cursor-pointer text-center transition duration-300 hover:border-primary hover:text-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileUp className="mx-auto h-16 w-16 text-gray-400" />
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
      ) : duplicateGroups.length > 0 ? (
        <StepDuplicates 
          duplicateGroups={duplicateGroups} 
          bookmarks={bookmarks} 
          onComplete={handleDuplicatesSelect}
          showExportOption={true}
          onExport={handleExportAndRemove}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="text-center">
          <p className="mb-4">No duplicate bookmarks found.</p>
          <Button onClick={() => router.push('/')} >
            Return to Home
          </Button>
        </div>
      )}

    </div>
  );
}

