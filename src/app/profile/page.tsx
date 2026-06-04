import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import Achievements from '@/components/profile/Achievements';
import QuizHistory from '@/components/profile/QuizHistory';

export default async function ProfilePage() {
	const { userId: clerkId } = await auth();
	if (!clerkId) redirect('/sign-in');

	const clerkUser = await currentUser();

	const dbUser = await prisma.user.findUnique({
		where: { clerkId },
		include: {
			quizAttempts: { orderBy: { completedAt: 'desc' } },
			userAchievements: { include: { achievement: true } },
		},
	});

	const attempts = dbUser?.quizAttempts ?? [];
	const lifetimePoints = attempts.reduce((s, a) => s + a.score, 0);
	const bestScore =
		attempts.length > 0 ? Math.max(...attempts.map((a) => a.score)) : 0;

	const betterUsers = await prisma.quizAttempt.groupBy({
		by: ['userId'],
		_sum: { score: true },
		having: { score: { _sum: { gt: lifetimePoints } } },
	});
	const globalRank = betterUsers.length + 1;

	const allAchievements = await prisma.achievement.findMany();
	const earnedIds = new Set(
		dbUser?.userAchievements.map((ua) => ua.achievementId) ?? [],
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
				username={dbUser?.username ?? clerkUser?.username ?? 'Player'}
				avatarUrl={clerkUser?.imageUrl ?? ''}
				joinDate={(dbUser?.createdAt ?? new Date()).toISOString()}
				globalRank={globalRank}
				isOwner={true}
			/>
			<ProfileStats
				lifetimePoints={lifetimePoints}
				numQuizzesPlayed={attempts.length}
				bestScore={bestScore}
			/>
			<Achievements
				achievements={achievements}
				featured
				viewAllHref={
					dbUser ? `/profile/${dbUser.id}/achievements` : undefined
				}
			/>
			<QuizHistory history={quizHistory} />
		</div>
	);
}
