import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  let isBroken = false;
  let errorCode = 0;
  let errorMessage = '';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // console.log(`Response for ${url}:`, {
    //   status: response.status,
    //   statusText: response.statusText,
    //   headers: Object.fromEntries(response.headers),
    // });

    if (!response.ok) {
      isBroken = true;
      errorCode = response.status;
      errorMessage = response.statusText;
    }
  } catch (error) {
    console.error(`Error checking URL ${url}:`, error);
    isBroken = true;
    if (error.name === 'AbortError') {
      errorCode = 408; // Request Timeout
      errorMessage = 'Request timed out';
    } else if (error.code === 'ENOTFOUND') {
      errorCode = 404; // Not Found
      errorMessage = 'Domain not found';
    } else {
      errorCode = 500; // Internal Server Error
      errorMessage = error instanceof Error ? error.message : 'Unknown error';
    }
  }

  return NextResponse.json({ isBroken, errorCode, errorMessage });
}