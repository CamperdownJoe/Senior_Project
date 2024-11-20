import { BookmarkMap } from '@/lib/types';

export type InvalidUrl = {
  url: string;
  errorCode: number;
};

export type RepairableUrl = {
  url: string;
  archiveDate: string;
};

export type UrlCheckResult = {
  isBroken: boolean;
  errorCode: number;
  errorMessage: string;
  isRepairable: boolean;
  archiveDate: string | null;
};

export function extractUrls(bookmarks: BookmarkMap): string[] {
  return Array.from(bookmarks.values())
    .filter(bookmark => bookmark.type === 'link')
    .map(bookmark => bookmark.url!);
}

export async function checkSingleUrlViaAPI(url: string, signal?: AbortSignal): Promise<UrlCheckResult> {
  try {
    const response = await fetch(`/api/check-url?url=${encodeURIComponent(url)}`, { signal });
    const result = await response.json();
    console.log(`API result for ${url}:`, result);

    if (result.isBroken) {
      const archiveResult = await checkWebArchive(url, signal);
      return { 
        ...result,
        isRepairable: archiveResult.isRepairable,
        archiveDate: archiveResult.archiveDate
      };
    } else {
      return {
        ...result,
        isRepairable: false,
        archiveDate: null
      };
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error(`Error checking URL ${url}:`, error);
    return { 
      isBroken: true, 
      errorCode: 0, 
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      isRepairable: false, 
      archiveDate: null 
    };
  }
}

export async function checkWebArchive(url: string, signal?: AbortSignal) {
  try {
    const archiveResponse = await fetch(`http://archive.org/wayback/available?url=${url}`, { signal });
    const archiveData = await archiveResponse.json();
    if (archiveData.archived_snapshots.closest) {
      const timestamp = archiveData.archived_snapshots.closest.timestamp;
      // Convert timestamp to a valid date format (assuming it's in the format YYYYMMDDHHMMSS)
      const formattedDate = `${timestamp.slice(0,4)}-${timestamp.slice(4,6)}-${timestamp.slice(6,8)}`;
      return { 
        isRepairable: true, 
        archiveDate: formattedDate
      };
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error(`Error checking Web Archive for ${url}:`, error);
  }
  return { isRepairable: false, archiveDate: null };
}