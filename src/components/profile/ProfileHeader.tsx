import Image from 'next/image';
import type { ProfileUser } from '@/data/mockProfileData';

interface ProfileHeaderProps {
	user: ProfileUser;
	isOwner: boolean;
}

const ProfileHeader = ({ user, isOwner }: ProfileHeaderProps) => {
	const joined = new Date(user.joinDate).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	return (
		<header className="flex items-center gap-6 p-6 bg-ow-dark-blue text-white rounded-sm shadow-lg">
			<Image
				src={user.avatarUrl}
				alt={`${user.username} avatar`}
				width={96}
				height={96}
				className="rounded-full bg-gray-300 p-2"
			/>
			<div className="flex-1">
				<h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
					{user.username}
				</h1>
				<p className="text-sm uppercase tracking-wider text-gray-300 mt-1">
					Joined {joined} · Global Rank #{user.globalRank}
				</p>
			</div>
			{!isOwner && (
				<button className="bg-ow-orange hover:bg-ow-orange/90 text-white px-4 py-2 rounded font-bold uppercase text-sm transition-colors">
					Follow
				</button>
			)}
		</header>
	);
};

export default ProfileHeader;
