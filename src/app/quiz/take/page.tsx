// quiz server component
// fetches questions from DB before page renders

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db'; // use Prisma singleton
import { buildQuiz } from '@/lib/utils';
import QuizClient from './QuizClient';

const Quiz = async () => {
    const { userId } = await auth();
    if (!userId) redirect('/quiz');

    // fetch all questions. ok since we have like 10
    const [easyq, mediumq, hardq] = await Promise.all([
        db.question.findMany({
            where:  { difficulty: 'EASY' },
            include:{ answers: { orderBy: {displayOrder: 'asc' } } },
        }),
        db.question.findMany({
            where:  { difficulty: 'MEDIUM' },
            include:{ answers: { orderBy: {displayOrder: 'asc' } } },
        }),
        db.question.findMany({
            where:  { difficulty: 'HARD' },
            include:{ answers: { orderBy: {displayOrder: 'asc' } } },
        }),
    ]);

    const questions = buildQuiz(easyq, mediumq, hardq, {
        easy: 3,
        medium: 5,
        hard: 2,
        // in the future, change to 3/4/3 split; just this for now cuz that's what we have
    })

    //TODO: better catch error if not enough questions
    if (!questions) {
        return <p> oppsies no questions! lol!</p>
    }

    return <QuizClient questions={questions} />;
};

export default Quiz;