// Centralize backend-specific types and functions

import type { Prisma } from '@prisma/client';

// generates TS types from schema, in this case Questions with their Answers as a nested field
export type QuestionWithAnswers = Prisma.QuestionGetPayload<{
  include: { answers: true };
}>;

export const shuffleArray = <T>(array: T[]) : T[] => {
    // takes an array of n objects & randomly shuffles them
    // generic; can be used for many types of shuffling (questions, answers, etc)
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export const selectRandom = <T>(pool: T[], count: number) :T[] | null => {
    // randomly selects "count" items from an array "pool"
    if (pool.length < count) return null;
    return shuffleArray(pool).slice(0, count);
};

export const buildQuiz = (
    easyPool: QuestionWithAnswers[],
    mediumPool: QuestionWithAnswers[],
    hardPool: QuestionWithAnswers[],
    counts = {easy: 3, medium: 5, hard: 2}
): QuestionWithAnswers[] | null => {
    // chooses 10 questions from 3 difficulty "pools"
    // a pool is all the questions of a difficulty
    // final array is shuffled (so quizzes don't go easy qs -> med qs -> hard qs)
    const easy = selectRandom(easyPool, counts.easy);
    const medium = selectRandom(mediumPool, counts.medium);
    const hard = selectRandom(hardPool, counts.hard);

    if (!easy || !medium || !hard) return null;
    return shuffleArray([...easy, ...medium,...hard]);
}