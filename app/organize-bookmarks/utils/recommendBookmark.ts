import { Bookmark } from '@/lib/types';

type RecommendationRule = 'short' | 'newest';

export function recommendBookmark(bookmarks: Bookmark[], rule: RecommendationRule): string {
  switch (rule) {
    case 'short':
      return bookmarks.reduce((shortest, current) => 
        current.title.length < shortest.title.length ? current : shortest
      ).id;
    case 'newest':
      return bookmarks.reduce((newest, current) => 
        (current.addDate || 0) > (newest.addDate || 0) ? current : newest
      ).id;
    default:
      console.warn('Unknown recommendation rule, defaulting to first bookmark');
      return bookmarks[0].id;
  }
}