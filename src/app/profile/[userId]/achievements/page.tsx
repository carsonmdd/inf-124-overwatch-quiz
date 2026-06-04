import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import Achievements from '@/components/profile/Achievements';

export default async function AchievementsPage({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	const { userId } = await params;

	const dbUser = await prisma.user.findUnique({
		where: { id: userId },
		include: {
			userAchievements: { include: { achievement: true } },
		},
	});

	if (!dbUser) notFound();

	const allAchievements = await prisma.achievement.findMany();
	const earnedIds = new Set(dbUser.userAchievements.map((ua) => ua.achievementId));
	const achievements = allAchievements.map((a) => ({
		name: a.name,
		description: a.description,
		isAchieved: earnedIds.has(a.id),
		badgeIcon: a.badgeIcon,
	}));

	return (
		<div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
			<h1 className="text-3xl font-black uppercase italic tracking-wider text-ow-dark-blue dark:text-white">
				Achievements
			</h1>
			<Achievements achievements={achievements} />
		</div>
	);
}
