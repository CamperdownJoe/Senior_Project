export interface Bookmark {
  id: string;
  title: string;
  addDate?: number;
  type: 'link' | 'folder';
  url?: string;
  lastModified?: number;
}

export type BookmarkMap = Map<string, Bookmark>;

export interface BookmarkCategory {
  name: string;
  subcategories?: {
    [key: string]: BookmarkCategory;
  };
  bookmarks: string[]; // Array of bookmark IDs
}

export type BookmarkStructure = {
  [key: string]: BookmarkCategory;
};

export type DuplicateGroup = {
  url: string;
  bookmarkIds: string[];
};