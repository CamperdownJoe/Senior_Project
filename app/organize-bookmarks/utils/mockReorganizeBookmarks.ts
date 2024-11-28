import { BookmarkMap, BookmarkStructure } from '@/lib/types';

export function mockReorganizeBookmarks(bookmarks: BookmarkMap, method: 'dewey' | 'ai'): BookmarkStructure {
  const bookmarkStructure: BookmarkStructure = {};

  // Create a simple mock structure
  if (method === 'dewey') {
    bookmarkStructure['000 - General Knowledge'] = { name: '000 - General Knowledge', bookmarks: [] };
    bookmarkStructure['100 - Philosophy & Psychology'] = { name: '100 - Philosophy & Psychology', bookmarks: [] };
    bookmarkStructure['200 - Religion'] = { name: '200 - Religion', bookmarks: [] };
    // ... add more categories as needed
  } else {
    bookmarkStructure['Work'] = { 
      name: 'Work', 
      bookmarks: [],
      subcategories: {
        'Projects': { name: 'Projects', bookmarks: [] },
        'Resources': { name: 'Resources', bookmarks: [] }
      }
    };
    bookmarkStructure['Personal'] = {
      name: 'Personal',
      bookmarks: [],
      subcategories: {
        'Hobbies': { name: 'Hobbies', bookmarks: [] },
        'Finance': { name: 'Finance', bookmarks: [] }
      }
    };
    // ... add more categories as needed
  }

  // Randomly assign bookmarks to categories
  Array.from(bookmarks.entries()).forEach(([id, bookmark]) => {
    const categories = Object.keys(bookmarkStructure);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    if (bookmarkStructure[randomCategory].subcategories) {
      const subcategories = Object.keys(bookmarkStructure[randomCategory].subcategories!);
      const randomSubcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
      bookmarkStructure[randomCategory].subcategories![randomSubcategory].bookmarks.push(id);
    } else {
      bookmarkStructure[randomCategory].bookmarks.push(id);
    }
  });

  return bookmarkStructure;
}