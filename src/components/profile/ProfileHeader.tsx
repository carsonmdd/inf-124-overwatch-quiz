import Image from 'next/image';

interface ProfileHeaderProps {
	username: string;
	avatarUrl: string;
	joinDate: string;
	globalRank: number;
	isOwner: boolean;
}

const ProfileHeader = ({ username, avatarUrl, joinDate, globalRank, isOwner }: ProfileHeaderProps) => {
	const joined = new Date(joinDate).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	return (
		<header className="flex items-center gap-6 p-6 bg-ow-dark-blue text-white rounded-sm shadow-lg">
			<Image
				src={avatarUrl}
				alt={`${username} avatar`}
				width={96}
				height={96}
				className="rounded-full bg-gray-300 p-2"
			/>
			<div className="flex-1">
				<h1 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
					{username}
				</h1>
				<p className="text-sm uppercase tracking-wider text-gray-300 mt-1">
					Joined {joined} · Global Rank #{globalRank}
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
