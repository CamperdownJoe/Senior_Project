// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';
// import { z } from "zod";
// import { zodResponseFormat } from "openai/helpers/zod";


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   baseURL: process.env.OPENAI_BASE_URL,
// });

// const AIRec = z.object({
//     recommendedId: z.string(),
//   });

// export async function POST(request: Request) {
//   const { bookmarks } = await request.json();

//   if (!bookmarks || !Array.isArray(bookmarks)) {
//     return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: 'gpt-4o-mini',
//       messages: [
//         { role: "system", content: "You are an AI assistant that recommends the best bookmark from a list based on title relevance and recency." },
//         { role: "user", content: `Please recommend the best bookmark from this list: ${JSON.stringify(bookmarks)}. Respond with only the ID of the recommended bookmark.` }
//       ],
//       response_format: zodResponseFormat(AIRec, "ai_recommend"),
//     });

//     console.log("AI...........")
//     console.log(response)
//     console.log(response.choices[0].message.content)

//     const recommendedId = response.choices[0].message.content?.trim();
//     return NextResponse.json({ recommendedId });
//   } catch (error) {
//     console.error('OpenAI API error:', error);
//     return NextResponse.json({ error: 'Error processing AI recommendation' }, { status: 500 });
//   }
// }


export async function GET(request: Request) {
    // Mock response
    const mockRecommendedId = 'mock_bookmark_id_123';
  
    return Response.json({ recommendedId: mockRecommendedId });
  }
  