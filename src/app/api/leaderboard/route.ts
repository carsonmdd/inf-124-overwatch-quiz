import { db } from '@/lib/db';

type UserWithAttempts = {
  id: string;
  username: string;
  quizAttempts: { score: number }[];
};

export async function GET() {
  const topUsers: UserWithAttempts[] = await db.user.findMany({
    select: {
      id: true,
      username: true,
      quizAttempts: {
        select: { score: true },
      },
    },
  });

  const leaderboard = topUsers
    .map((user) => ({
      id: user.id,
      username: user.username,
      totalScore: user.quizAttempts.reduce((sum, a) => sum + a.score, 0),
    }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 100)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  return Response.json(leaderboard);
}