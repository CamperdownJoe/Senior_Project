import { Bookmark, BookmarkMap, BookmarkStructure, BookmarkCategory } from '@/lib/types';
import NBFFConverter from 'nbff-converter';
import crypto from 'crypto';

function generateUniqueId(): string {
  return crypto.randomBytes(16).toString('hex');
}

function convertIdsToString(data: any): any {
  if (Array.isArray(data)) {
    return data.map(item => convertIdsToString(item));
  } else if (typeof data === 'object' && data !== null) {
    const newObj: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === 'id') {
        newObj[key] = (value as number).toString(); // Convert ID to string
      } else if (key === 'children') {
        newObj[key] = convertIdsToString(value);
      } else {
        newObj[key] = value;
      }
    }
    return newObj;
  }
  return data;
}

export async function convertHtmlToJson(html: string): Promise<any> {
  try {
    const converter = new NBFFConverter();
    const parsedData = await converter.netscapeToJSON(html);
    const dataWithUniqueIds = convertIdsToString(parsedData);
    console.log('Parsed data with unique IDs:', dataWithUniqueIds);
    return dataWithUniqueIds;
  } catch (error) {
    console.error('Error parsing bookmarks:', error);
    throw error;
  }
}


export async function convertJsonToBookmarkStructure(json: any): Promise<BookmarkStructure> {
  const bookmarkStructure: BookmarkStructure = {};

  function processNode(node: any, parentCategory: BookmarkCategory | null = null): void {
    if (node.type === 'folder') {
      const category: BookmarkCategory = {
        name: node.title,
        subcategories: {},
        bookmarks: []
      };

      if (parentCategory) {
        parentCategory.subcategories![node.id] = category;
      } else {
        bookmarkStructure[node.id] = category;
      }

      if (Array.isArray(node.children)) {
        node.children.forEach((child: any) => processNode(child, category));
      }
    } else if (node.type === 'url') {
      if (parentCategory) {
        parentCategory.bookmarks.push(node.id);
      } else {
        console.warn('Bookmark found outside of any folder:', node);
      }
    }
  }

  if (Array.isArray(json.children)) {
    json.children.forEach((child: any) => processNode(child));
  } else if (typeof json === 'object' && json !== null) {
    processNode(json);
  }

  return bookmarkStructure;
}

// export async function parseBookmarks(html: string): Promise<{ [key: string]: Bookmark }> {
//   // console.log("Starting parseBookmarks function");
  
//   try {
//     const converter = new NBFFConverter();
//     const parsedData = await converter.netscapeToJSON(html);
//     // console.log('Raw parsed data:', JSON.stringify(parsedData, null, 2));

//     const bookmarkObject = convertToBookmarkObject(parsedData);
//     // console.log('Final BookmarkObject:', JSON.stringify(bookmarkObject, null, 2));
    
//     return bookmarkObject;
//   } catch (error) {
//     console.error('Error parsing bookmarks:', error);
//     throw error;
//   }
// }

// export async function convertJsonToBookMarkMap(json: any): Promise<BookmarkMap> {
//   const bookmarkMap: BookmarkMap = new Map();

//   function processItem(item: any) {
//     if (!item || typeof item !== 'object') {
//       console.warn('Invalid item:', item);
//       return;
//     }

//     // const id = generateUniqueId();
//     const id = item.id;

//     if (item.type === 'url') {
//       bookmarkMap[id] = {
//         id,
//         title: item.title,
//         url: item.url,
//         addDate: parseInt(item.dateAdded),
//         type: 'link'
//       };
//     } else if (item.type === 'folder') {
//       bookmarkMap[id] = {
//         id,
//         title: item.title,
//         addDate: parseInt(item.dateAdded),
//         lastModified: parseInt(item.dateModified),
//         type: 'folder'
//       };
//       if (Array.isArray(item.children)) {
//         item.children.forEach(processItem);
//       }
//     } else {
//       console.warn('Unknown item type:', item.type);
//     }
//   }

//   if (Array.isArray(json.children)) {
//     json.children.forEach(processItem);
//   }

//   return bookmarkMap;
// }
      
      
export async function convertJsonToBookMarkMap(json: any): Promise<BookmarkMap> {
  const bookmarkMap: BookmarkMap = new Map();

  function processItem(item: any) {
    if (!item || typeof item !== 'object') {
      console.warn('Invalid item:', item);
      return;
    }

    const id = item.id;

    if (item.type === 'url') {
      bookmarkMap.set(id, {
        id,
        title: item.title,
        url: item.url,
        addDate: parseInt(item.dateAdded),
        type: 'link'
      });
    } else if (item.type === 'folder') {
      bookmarkMap.set(id, {
        id,
        title: item.title,
        addDate: parseInt(item.dateAdded),
        lastModified: parseInt(item.dateModified),
        type: 'folder'
      });
      if (Array.isArray(item.children)) {
        item.children.forEach(processItem);
      }
    } else {
      console.warn('Unknown item type:', item.type);
    }
  }

  if (Array.isArray(json.children)) {
    json.children.forEach(processItem);
  }

  return bookmarkMap;
}