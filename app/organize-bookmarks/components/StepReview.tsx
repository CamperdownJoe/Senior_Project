import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, BookmarkFolder, BookmarkTree } from '@/lib/types';

interface StepReviewProps {
    originalBookmarks: BookmarkTree;
    cleanedBookmarks: BookmarkTree;
    onUndo: (path: string[]) => void;
    onRemove: (path: string[]) => void;
  }
  
  export default function StepReview({ originalBookmarks, cleanedBookmarks, onUndo, onRemove }: StepReviewProps) {
    function renderBookmarkTree(tree: BookmarkTree, path: string[] = []) {
      return (
        <ul>
          {tree.children.map((item, index) => {
            const currentPath = [...path, index.toString()];
            if ('url' in item) {
              return (
                <li key={item.id}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                  <Button variant="outline" size="sm" onClick={() => onRemove(currentPath)}>Remove</Button>
                </li>
              );
            } else {
              return (
                <li key={item.id}>
                  <h3>{item.title}</h3>
                  {renderBookmarkTree(item, currentPath)}
                </li>
              );
            }
          })}
        </ul>
      );
    }
  
    return (
      <div className="flex space-x-4">
        <ScrollArea className="h-[500px] w-1/2 rounded-md border p-4">
          <h2 className="font-semibold mb-2">Original Bookmarks</h2>
          {renderBookmarkTree(originalBookmarks)}
        </ScrollArea>
        <ScrollArea className="h-[500px] w-1/2 rounded-md border p-4">
          <h2 className="font-semibold mb-2">Cleaned Bookmarks</h2>
          {renderBookmarkTree(cleanedBookmarks)}
        </ScrollArea>
      </div>
    );
  }