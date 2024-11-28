import { Bookmark, BookmarkStructure } from '@/lib/types';

export async function fetchAIRecommendation(
  bookmarks: Bookmark[],
  type: 'categorize',
  systemPrompt: string,
  userPrompt: string
): Promise<{ categories: BookmarkStructure }> {
  const response = await fetch('/api/ai-recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bookmarks,
      systemPrompt,
      userPrompt,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('AI API error:', data);
    throw new Error(data.error || 'Failed to fetch AI recommendation');
  }

  if (data.rawResponse) {
    console.log('Raw AI response:', data.rawResponse);
    throw new Error('AI response was not in the expected format');
  }

  return data as { categories: BookmarkStructure };
}