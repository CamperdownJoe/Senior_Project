import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { Bookmark } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const BookmarkCategorySchema = z.object({
  name: z.string(),
  bookmarks: z.array(z.string()),  // 书签ID的数组
  subcategories: z.record(z.string(), z.lazy(() => BookmarkCategorySchema)).optional(),  // 可选的子类别
});

// 定义整个AI推荐的Schema
const AIRecommendationSchema = z.object({
  categories: z.record(z.string(), BookmarkCategorySchema),  // 包含所有类别的对象
});

export async function POST(request: Request) {
  const { bookmarks, systemPrompt, userPrompt } = await request.json();

  if (!bookmarks || !Array.isArray(bookmarks)) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: zodResponseFormat(AIRecommendationSchema, "ai_recommendation"),
    });

    console.log(completion)
    console.log(completion.choices[0].message.parsed)
    const aiResponse = completion.choices[0].message;
    console.log('Raw AI response:', aiResponse);

    if (aiResponse.refusal) {
      console.log('AI refusal:', aiResponse.refusal);
      return NextResponse.json({ error: 'AI refused to respond', refusal: aiResponse.refusal }, { status: 400 });
    }

    console.log('Parsed AI response:', aiResponse.parsed);
    return NextResponse.json(aiResponse.parsed);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Error processing AI recommendation', details: error.message }, { status: 500 });
  }
}