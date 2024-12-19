import { Bookmark, DuplicateGroup } from '@/lib/types';

export function findDuplicates(bookmarks: Map<string, Bookmark>): DuplicateGroup[] {
  const urlMap = new Map<string, string[]>();

  bookmarks.forEach((bookmark, id) => {
    if (bookmark.type === 'link' && bookmark.url) {
      const existingIds = urlMap.get(bookmark.url) || [];
      urlMap.set(bookmark.url, [...existingIds, id]);
    }
  });

  // Filter out URLs with only one bookmark and create DuplicateGroups
  const duplicateGroups: DuplicateGroup[] = Array.from(urlMap.entries())
    .filter(([_, ids]) => ids.length > 1)
    .map(([url, bookmarkIds]) => ({ url, bookmarkIds }));

  return duplicateGroups;
}