import { NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function rateLimit(limit: number = 5, windowMs: number = 60 * 1000) {
  return async (req: Request) => {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const key = `${ip}:${req.url}`;
    const now = Date.now();

    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
    } else if (store[key].resetTime <= now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
    } else {
      store[key].count++;
      if (store[key].count > limit) {
        return NextResponse.json({ error: 'Too many requests, please try again later.' }, { status: 429 });
      }
    }

    return null;
  };
}