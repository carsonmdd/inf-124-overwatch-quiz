import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { awardAchievements} from '@/types/achievements';

interface AnswerPayload{
	questionId:number;
	answerId:number;
	isCorrect:boolean;
}

export async function POST(req: Request) {
	const { userId: clerkId } = await auth();
	if (!clerkId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

	const { score, answers }: {score: number; answers: AnswerPayload[]} = await req.json();

	const dbUser = await db.user.findUnique({ where: { clerkId } });
	if (!dbUser) return Response.json({ error: 'User not found' }, { status: 404 });

	const attempt = await db.quizAttempt.create({
		data: { userId: dbUser.id, score },
	});

	await db.attemptAnswer.createMany({
		data: answers.map( a=> ({
			attemptId: attempt.id,
			questionId: a.questionId,
			answerId: a.answerId,
			isCorrect: a.isCorrect,
		})),
	});

	const newAchievementIds = await awardAchievements(dbUser.id, attempt.id);

	return Response.json({ attemptId: attempt.id, newAchievementIds });
}
