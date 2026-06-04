import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { buildQuiz } from '@/lib/utils';
import QuizClient from '../take/QuizClient';

export default async function GuestQuizPage() {
	const { userId } = await auth();
	if (userId) redirect('/quiz/take');

	const [easyq, mediumq, hardq] = await Promise.all([
		db.question.findMany({
			where: { difficulty: 'EASY' },
			include: { answers: { orderBy: { displayOrder: 'asc' } } },
		}),
		db.question.findMany({
			where: { difficulty: 'MEDIUM' },
			include: { answers: { orderBy: { displayOrder: 'asc' } } },
		}),
		db.question.findMany({
			where: { difficulty: 'HARD' },
			include: { answers: { orderBy: { displayOrder: 'asc' } } },
		}),
	]);

	const questions = buildQuiz(easyq, mediumq, hardq, { easy: 2, medium: 2, hard: 1 });

	if (!questions)
		return (
			<div className="flex-1 flex items-center justify-center bg-ow-dark-blue">
				<p className="text-white/60 text-sm uppercase tracking-widest">
					Not enough questions available.
				</p>
			</div>
		);

	return <QuizClient questions={questions} isGuest />;
}
