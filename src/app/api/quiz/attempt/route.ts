import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
	const { userId: clerkId } = await auth();
	if (!clerkId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

	const { score } = await req.json();

	const dbUser = await db.user.findUnique({ where: { clerkId } });
	if (!dbUser) return Response.json({ error: 'User not found' }, { status: 404 });

	const attempt = await db.quizAttempt.create({
		data: { userId: dbUser.id, score },
	});

	return Response.json({ attemptId: attempt.id });
}
