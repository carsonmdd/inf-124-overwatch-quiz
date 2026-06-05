import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query')?.trim() ?? '';

  // use contains filter to find usernames that contain query string
  // select chooses the columns, id and username
  const users = await db.user.findMany({
    where: query
      ? { username: { contains: query, mode: 'insensitive' } }
      : undefined,
    select: { id: true, username: true, clerkId: true },
    orderBy: { username: 'asc' },
  });

  return NextResponse.json({ users });
}
