"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

import { parseBookmarks } from '@/lib/parseBookmarks';
const NBFFConverter = require('nbff-converter');

export default function HeroLanding() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === "text/html") {
      setFile(file);
      toast({
        title: "File selected",
        description: `Selected file: ${file.name}`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an HTML file",
        variant: "destructive",
      });
    }
  };

  const handleOrganizeBookmarks = async () => {
    if (!file) {
      toast({
        title: "Please upload a file first",
        description: "Select a bookmark HTML file to continue",
        variant: "destructive",
      });
      return;
    }
  
    toast({
      title: "Uploading file",
      description: "Please wait...",
    });

    try {
      const content = await file.text();

      const bookmarks = await parseBookmarks(content);

      // console.log(bookmarks);
      
      // Store bookmarks in localStorage or state management solution
      // localStorage.setItem('bookmarks', JSON.stringify(Object.fromEntries(bookmarks)));
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

      // Navigate to organize-bookmarks page
      router.push('/organize-bookmarks');
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    }
  };

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Organize Your Bookmarks Effortlessly
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Upload your bookmarks and let our AI-powered system remove duplicates, clean up dead links, and create a logical structure for easy navigation.
              </p>
              <Card className="w-full max-w-xl mx-auto">
                <CardContent className="p-6">
                  <div
                    className={`border-4 border-dashed p-6 mb-4 w-full rounded-md cursor-pointer text-center transition duration-300 ${
                      dragActive
                        ? "border-primary bg-primary/10"
                        : "border-gray-300 hover:border-primary hover:text-primary"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm font-medium">
                      {file ? file.name : "Click or drag to upload bookmarks"}
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".html"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <Button
                    className="w-full"
                    onClick={handleOrganizeBookmarks}
                  >
                    Organize Bookmarks
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Toaster />
    </ToastProvider>
  );
}