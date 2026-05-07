import Achievements from '@/components/Achievements';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import PersonalBests from '@/components/profile/PersonalBests';
import CreatedQuizzes from '@/components/profile/CreatedQuizzes';
import QuizHistory from '@/components/profile/QuizHistory';
import { getCurrentMockUser } from '@/data/mockProfileData';

const Profile = () => {
	const user = getCurrentMockUser();

	return (
		<div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
			<ProfileHeader user={user} isOwner={true} />
			<ProfileStats user={user} />
			<PersonalBests personalBests={user.personalBests} />
			<Achievements
				achievements={user.achievements}
				featured
				viewAllHref={`/profile/${user.id}/achievements`}
			/>
			<CreatedQuizzes quizzes={user.createdQuizzes} isOwner={true} />
			<QuizHistory history={user.quizHistory} />
		</div>
	);
};

export default Profile;
