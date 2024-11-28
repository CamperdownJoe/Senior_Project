import { BookmarkMap, BookmarkStructure } from '@/lib/types';

type Props = {
  bookmarks: BookmarkMap;
  reorganizedBookmarks: BookmarkStructure;
};

export default function StepReview({ bookmarks, reorganizedBookmarks }: Props) {

  if (!reorganizedBookmarks) {
    console.log('reorganizedBookmarks is null or undefined');
    return <div>No reorganized bookmarks available.</div>;
  }

  if (Object.keys(reorganizedBookmarks).length === 0) {
    console.log('reorganizedBookmarks is an empty object');
    return <div>Reorganized bookmarks structure is empty.</div>;
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Review Reorganized Bookmarks</h2>
      {Object.entries(reorganizedBookmarks).map(([categoryName, category]) => (
        <div key={categoryName} className="mb-4">
          <h3 className="text-xl font-semibold">{category.name}</h3>
          <ul className="ml-4">
            {category.bookmarks.map(bookmarkId => (
              <li key={bookmarkId}>{bookmarks.get(bookmarkId)?.title || `Unknown Bookmark (${bookmarkId})`}</li>
            ))}
          </ul>
          {category.subcategories && (
            <div className="ml-4">
              {Object.entries(category.subcategories).map(([subCategoryName, subCategory]) => (
                <div key={subCategoryName} className="mb-2">
                  <h4 className="text-lg font-medium">{subCategory.name}</h4>
                  <ul className="ml-4">
                    {subCategory.bookmarks.map(bookmarkId => (
                      <li key={bookmarkId}>{bookmarks.get(bookmarkId)?.title || `Unknown Bookmark (${bookmarkId})`}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}