import { Bookmark } from '@/lib/types';
import NBFFConverter from 'nbff-converter';
import crypto from 'crypto';

function generateUniqueId(): string {
  return crypto.randomBytes(16).toString('hex');
}

function convertToBookmarkObject(data: any): { [key: string]: Bookmark } {
  const bookmarkObject: { [key: string]: Bookmark } = {};

  function processItem(item: any) {
    if (!item || typeof item !== 'object') {
      console.warn('Invalid item:', item);
      return;
    }

    const id = generateUniqueId();
    if (item.type === 'url') {
      bookmarkObject[id] = {
        id,
        title: item.title,
        url: item.url,
        addDate: parseInt(item.dateAdded),
        type: 'link'
      };
    } else if (item.type === 'folder') {
      bookmarkObject[id] = {
        id,
        title: item.title,
        addDate: parseInt(item.dateAdded),
        lastModified: parseInt(item.dateModified),
        type: 'folder'
      };
      if (Array.isArray(item.children)) {
        item.children.forEach(processItem);
      }
    } else {
      console.warn('Unknown item type:', item.type);
    }
  }

  if (Array.isArray(data.children)) {
    data.children.forEach(processItem);
  }

  return bookmarkObject;
}

export async function parseBookmarks(html: string): Promise<{ [key: string]: Bookmark }> {
  // console.log("Starting parseBookmarks function");
  
  try {
    const converter = new NBFFConverter();
    const parsedData = await converter.netscapeToJSON(html);
    // console.log('Raw parsed data:', JSON.stringify(parsedData, null, 2));

    const bookmarkObject = convertToBookmarkObject(parsedData);
    // console.log('Final BookmarkObject:', JSON.stringify(bookmarkObject, null, 2));
    
    return bookmarkObject;
  } catch (error) {
    console.error('Error parsing bookmarks:', error);
    throw error;
  }
}