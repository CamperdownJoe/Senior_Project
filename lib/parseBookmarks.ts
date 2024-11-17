import { BookmarkTree, BookmarkFolder, Bookmark } from '@/lib/types';
import { bookmarksToJSON } from 'bookmarks-to-json';

function convertToBookmarkTree(data: any): BookmarkTree {
  if (!Array.isArray(data)) {
    console.warn('Data is not an array, returning empty array');
    return [];
  }

  return data.map(item => {
    if (!item || typeof item !== 'object') {
      console.warn('Invalid item:', item);
      return null;
    }

    if (item.type === 'link') {
      return {
        id: item.url,
        title: item.title,
        url: item.url,
        addDate: item.addDate,
        type: 'link'
      } as Bookmark;
    } else if (item.type === 'folder') {
      return {
        id: item.title,
        title: item.title,
        addDate: item.addDate,
        lastModified: item.lastModified,
        type: 'folder',
        children: convertToBookmarkTree(item.children || [])
      } as BookmarkFolder;
    } else {
      console.warn('Unknown item type:', item.type);
      return null;
    }
  }).filter((item): item is Bookmark | BookmarkFolder => item !== null);
}

export function parseBookmarks(html: string): BookmarkTree {
  console.log("Starting parseBookmarks function");
  
  let parsedData;
  try {
    parsedData = bookmarksToJSON(html);
    console.log('Raw parsed data:', JSON.stringify(parsedData, null, 2));
  } catch (error) {
    console.error('Error parsing bookmarks:', error);
    return [];
  }
  
  if (typeof parsedData === 'string') {
    try {
      parsedData = JSON.parse(parsedData);
    } catch (error) {
      console.error('Error parsing JSON string:', error);
      return [];
    }
  }

  if (!Array.isArray(parsedData)) {
    console.warn('Parsed data is not an array, wrapping it in an array');
    parsedData = [parsedData];
  }

  const bookmarkTree = convertToBookmarkTree(parsedData);
  console.log('Final BookmarkTree:', JSON.stringify(bookmarkTree, null, 2));
  
  return bookmarkTree;
}