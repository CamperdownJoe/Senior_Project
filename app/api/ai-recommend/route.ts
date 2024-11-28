import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { Bookmark } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function POST(request: Request) {
  const { bookmarks, systemPrompt, userPrompt } = await request.json();

  if (!bookmarks || !Array.isArray(bookmarks)) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message;

    if (aiResponse.refusal) {
      console.log('AI refusal:', aiResponse.refusal);
      return NextResponse.json({ error: 'AI refused to respond', refusal: aiResponse.refusal }, { status: 400 });
    }

    if (aiResponse.content) {
      const parsedContent = JSON.parse(aiResponse.content);
      return NextResponse.json(parsedContent);
    } else {
      return NextResponse.json({ error: 'Empty AI response' }, { status: 400 });
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Error processing AI recommendation', details: error.message }, { status: 500 });
  }
}