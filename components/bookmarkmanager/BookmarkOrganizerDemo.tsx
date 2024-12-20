"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { BookmarkIcon, GlobeIcon, SearchIcon, ChevronRightIcon } from "lucide-react"

const initialBookmarks = [
  { id: 1, title: "How to make sourdough bread", color: "text-red-500" },
  { id: 2, title: "Best JavaScript frameworks 2023", color: "text-blue-500" },
  { id: 3, title: "Cute cat videos compilation", color: "text-green-500" },
  { id: 4, title: "Advanced quantum physics explained", color: "text-yellow-500" },
  { id: 5, title: "10 easy DIY home decor ideas", color: "text-purple-500" },
  { id: 6, title: "How to start a successful blog", color: "text-pink-500" },
  { id: 7, title: "Understanding blockchain technology", color: "text-indigo-500" },
  { id: 8, title: "Top 50 places to visit before you die", color: "text-orange-500" },
  { id: 9, title: "Beginner's guide to oil painting", color: "text-teal-500" },
  { id: 10, title: "How to train for a marathon", color: "text-cyan-500" },
]

const stage2Bookmarks = [
  { id: 1, title: "Work", color: "text-blue-500", bookmarks: [] },
  { id: 2, title: "Learning", color: "text-green-500", bookmarks: [] },
  { id: 3, title: "Entertainment", color: "text-purple-500", bookmarks: [
    "Cute cat videos compilation",
    "Top 50 movies of all time",
    "Best albums of 2023",
    "Classical music for concentration"
  ] },
]

const stage3Bookmarks = [
  { 
    id: 1, 
    title: "Productivity", 
    color: "text-blue-500", 
    items: [
      { title: "Work", bookmarks: ["How to start a successful blog", "Best project management tools 2023"] },
      { title: "Personal", bookmarks: ["Time management techniques", "Goal setting strategies"] }
    ] 
  },
  { 
    id: 2, 
    title: "Learning", 
    color: "text-green-500", 
    items: [
      { title: "Science", bookmarks: ["Advanced quantum physics explained", "Introduction to astrophysics"] },
      { title: "Technology", bookmarks: ["Understanding blockchain technology", "Machine learning basics"] }
    ] 
  },
  { 
    id: 3, 
    title: "Entertainment", 
    color: "text-purple-500", 
    items: [
      { title: "Videos", bookmarks: ["Cute cat videos compilation", "Top 50 movies of all time"] },
      { title: "Music", bookmarks: ["Best albums of 2023", "Classical music for concentration"] }
    ] 
  },
]

interface BookmarkOrganizerDemoProps {
  stage: number;
  setStage: (stage: number) => void;
}

export default function BookmarkOrganizerDemo({ stage, setStage }: BookmarkOrganizerDemoProps) {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openSubcategory, setOpenSubcategory] = useState<string | null>("Personal");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 3000),
      setTimeout(() => setStage(2), 7000),
      setTimeout(() => setStage(3), 11000)
    ]

    return () => timers.forEach(clearTimeout)
  }, [setStage])

  const handleCategoryClick = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenSubcategory(null);
  }

  const handleSubcategoryClick = (title: string) => {
    setOpenSubcategory(openSubcategory === title ? null : title);
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden rounded-lg shadow-inner">
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-4 bg-gray-100"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Messy Bookmarks</h2>
            <ScrollArea className="h-[calc(100vh-100px)]">
              <motion.div className="space-y-2">
                {initialBookmarks.map((bookmark, index) => (
                  <motion.div
                    key={bookmark.id}
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotate: Math.random() * 10 - 5,
                      transition: { delay: index * 0.1 }
                    }}
                    className="flex items-center space-x-2 p-2 bg-white rounded-md shadow-md transform hover:scale-105 transition-transform duration-200"
                  >
                    <BookmarkIcon className={`h-4 w-4 ${bookmark.color}`} />
                    <span className="text-sm truncate">{bookmark.title}</span>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollArea>
          </motion.div>
        )}
        {stage === 1 && (
          <motion.div
            key="organizing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
          >
            <div className="text-center">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="h-2 bg-blue-500 mb-4 rounded-full"
              />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-gray-800"
              >
                Organizing bookmarks...
              </motion.p>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                className="mt-8"
              >
                <BookmarkIcon className="h-16 w-16 text-blue-500 mx-auto animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        )}
        {stage === 2 && (
          <motion.div
            key="organized"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-4 bg-gradient-to-br from-green-50 to-emerald-100"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Organized Bookmarks</h2>
            <ScrollArea className="h-[calc(100vh-100px)]">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                {stage2Bookmarks.map((category, index) => (
                  <motion.div 
                    key={category.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div 
                      className="flex items-center space-x-2 p-2 bg-white rounded-md shadow-md"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <BookmarkIcon className={`h-4 w-4 ${category.color}`} />
                      <span className="text-sm font-medium">{category.title}</span>
                    </motion.div>
                    {index === 2 && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="ml-6 mt-2 space-y-2"
                      >
                        {category.bookmarks.map((bookmark, bookmarkIndex) => (
                          <motion.div
                            key={bookmarkIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: bookmarkIndex * 0.1 + 0.6 }}
                            className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md"
                          >
                            <BookmarkIcon className={`h-3 w-3 ${category.color}`} />
                            <span className="text-xs truncate">{bookmark}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </ScrollArea>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="browser"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 bg-white flex flex-col"
          >
            <div className="bg-gray-200 p-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="flex-1 bg-white rounded-md p-2 flex items-center">
                <GlobeIcon className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-700">https://www.example.com</span>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-100 p-1 pb-1 flex items-center space-x-2 overflow-x-auto">
                {stage3Bookmarks.map((category, index) => (
                  <div key={category.id} className="relative">
                    <button
                      onClick={() => handleCategoryClick(index)}
                      className={`flex items-center space-x-1 bg-white rounded-t px-2 py-1 shadow-sm ${index === openCategory ? 'z-10' : ''}`}
                    >
                      <BookmarkIcon className={`w-4 h-4 ${category.color}`} />
                      <span className="text-sm whitespace-nowrap">{category.title}</span>
                    </button>
                  </div>
                ))}
              </div>
              {openCategory !== null && (
                <div className="absolute left-1 top-[calc(100%-1px)] z-50 bg-white rounded-b-md shadow-lg p-2 space-y-1">
                  {stage3Bookmarks[openCategory].items.map((item, itemIndex) => (
                    <div key={itemIndex} className="relative">
                      <button
                        onClick={() => handleSubcategoryClick(item.title)}
                        className="flex items-center justify-between space-x-2 p-1 hover:bg-gray-100 rounded whitespace-nowrap w-full"
                      >
                        <div className="flex items-center space-x-2">
                          <BookmarkIcon className={`w-3 h-3 ${stage3Bookmarks[openCategory].color}`} />
                          <span className="text-xs">{item.title}</span>
                        </div>
                        <ChevronRightIcon className="w-3 h-3" />
                      </button>
                      {openSubcategory === item.title && (
                        <div className="absolute left-full top-0 ml-2 bg-white rounded-md shadow-lg p-2 space-y-1 min-w-[200px]">
                          {item.bookmarks.map((bookmark, bookmarkIndex) => (
                            <div key={bookmarkIndex} className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded whitespace-nowrap">
                              <BookmarkIcon className={`w-2 h-2 ${stage3Bookmarks[openCategory].color}`} />
                              <span className="text-xs">{bookmark}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 p-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("_static/illustrations/infinity-3747434.webp")'}}>
              <div className="max-w-2xl mx-auto flex flex-col items-center justify-center h-full bg-black bg-opacity-40 rounded-lg p-8">
                <div className="relative mb-8 w-full max-w-lg">
                  <Input
                    type="text"
                    placeholder=""
                    className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}