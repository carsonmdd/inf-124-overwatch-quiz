//builds QuizResult object(from types.ts) from DB after quiz is submitted

import {db} from '@/lib/db';
import type {QuizResult} from './types';

export async function buildQuizResultContext(
    userId: string,
    attemptId: string
): Promise<QuizResult> {

  const [attempt, allAttempts, allCorrectAnswers] = await Promise.all([
    db.quizAttempt.findUniqueOrThrow({
      where: { id: attemptId },
      include: {
        attemptAnswers: {
          select: {
            questionId: true,
            isCorrect:  true,
          },
        },
      },
    }),
    db.quizAttempt.findMany({
      where:  { userId },
      select: { id: true },
    }),
    db.attemptAnswer.findMany({
      where: {
        attempt:   { userId },
        isCorrect: true,
      },
      select: {
        questionId: true,
        question: {
          select: {
            overfastKey: true,
            category:    true,
          },
        },
      },
    }),
  ]);

  const questions = await db.question.findMany({
    where: {
      id: { in: attempt.attemptAnswers.map(a => a.questionId) },
    },
    select: {
      id:          true,
      overfastKey: true,
      category:    true,
    },
  });

  return {
    userId,
    attempt: {
      id:          attempt.id,
      score:       attempt.score,
      completedAt: attempt.completedAt,
    },
    attemptAnswers:    attempt.attemptAnswers,
    questions,
    allAttempts,
    allCorrectAnswers,
  };
}