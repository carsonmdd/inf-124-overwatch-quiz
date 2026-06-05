//receives previous quiz information from buildQuizResultContext
//and determines if user has received any new achievements, if so
//add to userAchievements in DB


import {db} from '@/lib/db';
import {buildQuizResultContext} from './context';
import {rules} from './rules';

export async function awardAchievements(
  userId: string,
  attemptId: string
): Promise<number[]> {

  //call context.ts and get user's attempt information
  const ctx = await buildQuizResultContext(userId, attemptId);

  //avoid awarding duplicate achievements
  const alreadyEarned = await db.userAchievement.findMany({
    where:  { userId },
    select: { achievementId: true },
  });
  const earnedIds = new Set(alreadyEarned.map(a => a.achievementId));

  const newlyEarned = rules.filter(
    r => !earnedIds.has(r.achievementId) && r.check(ctx)
  );

  if (newlyEarned.length === 0) return [];

  //add achievement into userachievement
  await db.userAchievement.createMany({
    data: newlyEarned.map(r => ({
      userId,
      achievementId: r.achievementId,
      earnedAt:      new Date(),
    })),
    skipDuplicates: true,
  });

  //return achievementId of new achievements
  return newlyEarned.map(r => r.achievementId);
}