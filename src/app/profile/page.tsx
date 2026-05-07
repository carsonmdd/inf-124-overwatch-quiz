import Achievements from '@/components/Achievements';
import { getCurrentMockUser } from '@/data/mockProfileData';

const Profile = () => {
	const user = getCurrentMockUser();

	return (
		<div className="flex-1 flex items-center justify-center">
			<Achievements achievements={user.achievements}></Achievements>
		</div>
	);
};

export default Profile;
