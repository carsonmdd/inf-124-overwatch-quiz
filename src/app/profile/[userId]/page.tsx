import { notFound } from 'next/navigation';
import { clerkClient } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import QuizHistory from '@/components/profile/QuizHistory';
import Achievements from '@/components/profile/Achievements';

export default async function UserProfilePage({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	const { userId } = await params;

	const [dbUser, allAchievements] = await Promise.all([
		db.user.findUnique({
			where: { clerkId: userId },
			include: {
				quizAttempts: { orderBy: { completedAt: 'desc' } },
				userAchievements: { include: { achievement: true } },
			},
		}),
		db.achievement.findMany(),
	]);

	if (!dbUser) notFound();

	const clerk = await clerkClient();
	const clerkUser = await clerk.users.getUser(userId);

	const attempts = dbUser.quizAttempts;
	const lifetimePoints = attempts.reduce((s, a) => s + a.score, 0);
	const bestScore =
		attempts.length > 0 ? Math.max(...attempts.map((a) => a.score)) : 0;

	const betterUsers = await db.quizAttempt.groupBy({
		by: ['userId'],
		_sum: { score: true },
		having: { score: { _sum: { gt: lifetimePoints } } },
	});
	const globalRank = betterUsers.length + 1;

	const earnedIds = new Set(
		dbUser.userAchievements.map((ua) => ua.achievementId),
	);
	const achievements = allAchievements.map((a) => ({
		name: a.name,
		description: a.description,
		isAchieved: earnedIds.has(a.id),
		badgeIcon: a.badgeIcon,
	}));

	const quizHistory = attempts.slice(0, 10).map((a) => ({
		id: a.id,
		score: a.score,
		completedAt: a.completedAt.toISOString(),
	}));

	return (
		<div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
			<ProfileHeader
				username={dbUser.username}
				avatarUrl={clerkUser.imageUrl}
				joinDate={dbUser.createdAt.toISOString()}
				globalRank={globalRank}
			/>
			<ProfileStats
				lifetimePoints={lifetimePoints}
				numQuizzesPlayed={attempts.length}
				bestScore={bestScore}
			/>
			<Achievements
				achievements={achievements}
				featured
				viewAllHref={`/profile/${userId}/achievements`}
			/>
			<QuizHistory history={quizHistory} />
		</div>
	);
}
