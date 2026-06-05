//rule pairs achievementId with check function
//to add new achievement, add one object to achievement rules array

import type {QuizResult, AchievementRule} from './types';

//reusable function which could be used for any streak related achievements
function getBestStreak(answers: { isCorrect: boolean }[]): number {
  let streak = 0, best = 0;
  for (const a of answers) {
    streak = a.isCorrect ? streak + 1 : 0;
    best = Math.max(best, streak);
  }
  return best;
}

function gotKeyCorrect(overfastKey: string) {
  return ({ attemptAnswers, questions }: QuizResult): boolean =>
    attemptAnswers.some(a => {
      const q = questions.find(q => q.id === a.questionId);
      return a.isCorrect && q?.overfastKey === overfastKey;
    });
}

const ACHIEVEMENTS = {
  FIRST_QUIZ:            4,
  GETTING_THE_HANG:      5,
  SHARPSHOOTER:          6,
  GETTING_OUT_OF_BRONZE: 7,
  FAN_FAVORITE_MAP:      8,
} as const;

export const rules: AchievementRule[] = [
  {
    achievementId: ACHIEVEMENTS.FIRST_QUIZ,
    check: ({ allAttempts }) => allAttempts.length === 1,
  },
  {
    achievementId: ACHIEVEMENTS.GETTING_THE_HANG,
    check: ({ attempt }) => attempt.score >= 9,
  },
  {
    achievementId: ACHIEVEMENTS.SHARPSHOOTER,
    check: ({ attemptAnswers }) => getBestStreak(attemptAnswers) >= 5,
  },
  {
    achievementId: ACHIEVEMENTS.GETTING_OUT_OF_BRONZE,
    check: ({ allAttempts }) => allAttempts.length >= 10,
  },
  {
    achievementId: ACHIEVEMENTS.FAN_FAVORITE_MAP,
    check: gotKeyCorrect('kings-row'),
  },
];