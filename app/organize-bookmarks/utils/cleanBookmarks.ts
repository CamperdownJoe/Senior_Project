import { BookmarkTree, Bookmark, BookmarkFolder } from '@/lib/types';

function deduplicateBookmarks(bookmarks: Bookmark[]): Bookmark[] {
  const uniqueBookmarks: Bookmark[] = [];
  const seenUrls = new Set<string>();

  for (const bookmark of bookmarks) {
    if (!seenUrls.has(bookmark.url)) {
      seenUrls.add(bookmark.url);
      uniqueBookmarks.push(bookmark);
    }
  }

  return uniqueBookmarks;
}

export async function cleanBookmarks(
  bookmarkTree: BookmarkTree,
  setProgress: (progress: number) => void
): Promise<BookmarkTree> {
  let totalItems = 0;
  let processedItems = 0;

  function countItems(items: BookmarkTree): number {
    return items.reduce((sum, item) => {
      if (item.type === 'folder') {
        return sum + 1 + countItems(item.children);
      }
      return sum + 1;
    }, 0);
  }

  function cleanItems(items: BookmarkTree): BookmarkTree {
    const cleanedItems: BookmarkTree = [];
    const bookmarks: Bookmark[] = [];

    for (const item of items) {
      if (item.type === 'link') {
        bookmarks.push(item);
      } else if (item.type === 'folder') {
        cleanedItems.push({
          ...item,
          children: cleanItems(item.children)
        });
      }
      processedItems++;
      setProgress(Math.round((processedItems / totalItems) * 100));
    }

    const deduplicatedBookmarks = deduplicateBookmarks(bookmarks);
    return [...cleanedItems, ...deduplicatedBookmarks];
  }

  totalItems = countItems(bookmarkTree);
  const cleanedTree = cleanItems(bookmarkTree);

  return cleanedTree;
}