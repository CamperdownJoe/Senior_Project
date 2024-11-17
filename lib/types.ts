export interface BaseBookmark {
    id?: string;
    title: string;
    addDate?: number;
    type: 'link' | 'folder';
  }
  
  export interface Bookmark extends BaseBookmark {
    type: 'link';
    url: string;
  }
  
  export interface BookmarkFolder extends BaseBookmark {
    type: 'folder';
    lastModified?: number;
    children: (Bookmark | BookmarkFolder)[];
  }
  
  export type BookmarkTree = (Bookmark | BookmarkFolder)[];