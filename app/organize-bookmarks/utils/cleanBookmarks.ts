import { Bookmark, BookmarkFolder, BookmarkTree } from '@/lib/types';

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

  function countItems(item: BookmarkFolder | Bookmark): number {
    if ('url' in item) return 1;
    return 1 + item.children.reduce((sum, child) => sum + countItems(child), 0);
  }

  function cleanFolder(folder: BookmarkFolder): BookmarkFolder {
    const cleanedChildren: (Bookmark | BookmarkFolder)[] = [];
    const bookmarks: Bookmark[] = [];

    for (const child of folder.children) {
      if ('url' in child) {
        bookmarks.push(child);
      } else {
        cleanedChildren.push(cleanFolder(child));
      }
      processedItems++;
      setProgress(Math.round((processedItems / totalItems) * 100));
    }

    const deduplicatedBookmarks = deduplicateBookmarks(bookmarks);
    cleanedChildren.push(...deduplicatedBookmarks);

    return { ...folder, children: cleanedChildren };
  }

  totalItems = countItems(bookmarkTree);
  const cleanedTree = cleanFolder(bookmarkTree);

  return cleanedTree;
}