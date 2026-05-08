import { notFound } from 'next/navigation';
import Achievements from '@/components/profile/Achievements';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import PersonalBests from '@/components/profile/PersonalBests';
import CreatedQuizzes from '@/components/profile/CreatedQuizzes';
import { CURRENT_USER_ID, getUserById } from '@/data/mockProfileData';

export default async function UserProfilePage({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	const { userId } = await params;
	const user = getUserById(userId);

	if (!user) notFound();

	const isOwner = user.id === CURRENT_USER_ID;

	return (
		<div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
			<ProfileHeader user={user} isOwner={isOwner} />
			<ProfileStats user={user} />
			<PersonalBests personalBests={user.personalBests} />
			<Achievements
				achievements={user.achievements}
				featured
				viewAllHref={`/profile/${user.id}/achievements`}
			/>
			<CreatedQuizzes quizzes={user.createdQuizzes} isOwner={isOwner} />
		</div>
	);
}
