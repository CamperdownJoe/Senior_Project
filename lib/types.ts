export interface Bookmark {
  id: string;
  title: string;
  addDate?: number;
  type: 'link' | 'folder';
  url?: string;
  lastModified?: number;
}

export type BookmarkMap = Map<string, Bookmark>;

export type DuplicateGroup = {
  url: string;
  bookmarkIds: string[];
};