import React from 'react';
import BookmarkManager from '@/components/bookmarkmanager/BookmarkManager';
import { Shell } from '@/components/dashboard/shell';

export const metadata = {
  title: 'Bookmark Manager',
  description: 'Manage and organize your bookmarks with AI assistance',
};

export default function BookmarkManagerPage() {
  return (
    <Shell>
      <BookmarkManager />
    </Shell>
  );
}