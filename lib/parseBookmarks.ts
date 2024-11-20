import { Bookmark, BookmarkMap } from '@/lib/types';
import { bookmarksToJSON } from 'bookmarks-to-json';
import crypto from 'crypto';

function generateUniqueId(): string {
  return crypto.randomBytes(16).toString('hex');
}

function convertToBookmarkMap(data: any): BookmarkMap {
  if (!Array.isArray(data)) {
    console.warn('Data is not an array, returning empty map');
    return new Map();
  }

  const bookmarkMap = new Map<string, Bookmark>();

  function processItem(item: any) {
    if (!item || typeof item !== 'object') {
      console.warn('Invalid item:', item);
      return;
    }

    if (item.type === 'link') {
      const id = generateUniqueId();
      bookmarkMap.set(id, {
        id,
        title: item.title,
        url: item.url,
        addDate: item.addDate,
        type: 'link'
      });
    } else if (item.type === 'folder') {
      const id = generateUniqueId();
      bookmarkMap.set(id, {
        id,
        title: item.title,
        addDate: item.addDate,
        lastModified: item.lastModified,
        type: 'folder'
      });
      if (Array.isArray(item.children)) {
        item.children.forEach(processItem);
      }
    } else {
      console.warn('Unknown item type:', item.type);
    }
  }

  data.forEach(processItem);
  return bookmarkMap;
}

export function parseBookmarks(html: string): BookmarkMap {
  console.log("Starting parseBookmarks function");
  
  let parsedData;
  try {
    parsedData = bookmarksToJSON(html);
    console.log('Raw parsed data:', JSON.stringify(parsedData, null, 2));
  } catch (error) {
    console.error('Error parsing bookmarks:', error);
    return new Map();
  }
  
  if (typeof parsedData === 'string') {
    try {
      parsedData = JSON.parse(parsedData);
    } catch (error) {
      console.error('Error parsing JSON string:', error);
      return new Map();
    }
  }

  if (!Array.isArray(parsedData)) {
    console.warn('Parsed data is not an array, wrapping it in an array');
    parsedData = [parsedData];
  }

  const bookmarkMap = convertToBookmarkMap(parsedData);
  console.log('Final BookmarkMap:', JSON.stringify(Array.from(bookmarkMap.entries()), null, 2));
  
  return bookmarkMap;
}