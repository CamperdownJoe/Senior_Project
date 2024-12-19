import { BookmarkStructure, BookmarkMap, Bookmark, BookmarkCategory } from '@/lib/types';
import NBFFConverter from 'nbff-converter';

function convertToNBFFFormat(structure: BookmarkStructure, bookmarks: BookmarkMap): any {
  function convertCategory(category: BookmarkCategory): any {
    const result: any = {
      type: 'folder',
      title: category.name,
      children: []
    };

    // Add bookmarks
    category.bookmarks.forEach(id => {
      const bookmark = bookmarks.get(id);
      if (bookmark) {
        result.children.push({
          type: 'url',
          title: bookmark.title,
          url: bookmark.url,
          dateAdded: bookmark.addDate?.toString(),
          dateModified: bookmark.lastModified?.toString()
        });
      }
    });

    // Recursively process subcategories
    if (category.subcategories) {
      Object.values(category.subcategories).forEach(subcat => {
        result.children.push(convertCategory(subcat));
      });
    }

    return result;
  }

  const root = {
    type: 'folder',
    title: 'Bookmarks',
    children: Object.values(structure).map(convertCategory)
  };

  return root;
}


export async function exportBookmarks(
  reorganizedBookmarks: BookmarkStructure, 
  finalBookmarks: BookmarkMap, 
  format: string
): Promise<string> {
  switch (format) {
    case 'chrome':
      return exportForChrome(reorganizedBookmarks, finalBookmarks);
    case 'firefox':
      return exportForFirefox(reorganizedBookmarks, finalBookmarks);
    case 'arc':
      return exportForArc(reorganizedBookmarks, finalBookmarks);
    case 'raindrop':
      return exportForRaindrop(reorganizedBookmarks, finalBookmarks);
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

async function exportForChrome(reorganizedBookmarks: BookmarkStructure, finalBookmarks: BookmarkMap): Promise<string> {
  try {
    // Convert our bookmark structure to NBFFConverter format
    const nbffJson = convertToNBFFFormat(reorganizedBookmarks, finalBookmarks);

    // Create NBFFConverter instance
    const converter = new NBFFConverter();

    // Convert to Netscape Bookmark format (which is the same as Chrome's format)
    const { nbffStr } = await converter.jsonToNetscape(nbffJson);

    return nbffStr;
  } catch (error) {
    console.error('Error exporting bookmarks for Chrome:', error);
    throw new Error('Failed to export bookmarks for Chrome');
  }
}

async function exportForFirefox(reorganizedBookmarks: BookmarkStructure, finalBookmarks: BookmarkMap): Promise<string> {
  try {
    const nbffJson = convertToNBFFFormat(reorganizedBookmarks, finalBookmarks);
    const converter = new NBFFConverter();
    const { nbffStr } = await converter.jsonToNetscape(nbffJson);

    return nbffStr;
  } catch (error) {
    console.error('Error exporting bookmarks for Firefox:', error);
    throw new Error('Failed to export bookmarks for Firefox');
  }
}

async function exportForArc(reorganizedBookmarks: BookmarkStructure, finalBookmarks: BookmarkMap): Promise<string> {
  try {
    const nbffJson = convertToNBFFFormat(reorganizedBookmarks, finalBookmarks);
    const converter = new NBFFConverter();
    const { nbffStr } = await converter.jsonToNetscape(nbffJson);

    return nbffStr;
  } catch (error) {
    console.error('Error exporting bookmarks for Arc:', error);
    throw new Error('Failed to export bookmarks for Arc');
  }
}

async function exportForRaindrop(reorganizedBookmarks: BookmarkStructure, finalBookmarks: BookmarkMap): Promise<string> {
  try {
    const nbffJson = convertToNBFFFormat(reorganizedBookmarks, finalBookmarks);
    const converter = new NBFFConverter();
    const { nbffStr } = await converter.jsonToNetscape(nbffJson);

    return nbffStr;
  } catch (error) {
    console.error('Error exporting bookmarks for Raindrop:', error);
    throw new Error('Failed to export bookmarks for Raindrop');
  }
}
