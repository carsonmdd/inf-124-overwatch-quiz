import type { ProfileUser } from '@/data/mockProfileData';

interface ProfileStatsProps {
	user: ProfileUser;
}

const StatBlock = ({ label, value }: { label: string; value: string }) => (
	<div className="flex flex-col items-center justify-center bg-ow-blue/10 dark:bg-ow-blue/30 p-4 rounded-sm">
		<span className="text-3xl font-black italic text-ow-orange">
			{value}
		</span>
		<span className="text-xs uppercase tracking-wider font-bold text-ow-dark-blue dark:text-gray-300 mt-1 text-center">
			{label}
		</span>
	</div>
);

const ProfileStats = ({ user }: ProfileStatsProps) => {
	return (
		<section className="w-full">
			<h2 className="text-2xl font-black uppercase italic tracking-wider text-ow-dark-blue dark:text-white mb-4">
				Stats
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<StatBlock
					label="Lifetime Points"
					value={user.lifetimePoints.toLocaleString()}
				/>
				<StatBlock
					label="Quizzes Played"
					value={user.numQuizzesPlayed.toString()}
				/>
				<StatBlock
					label="Quizzes Completed"
					value={user.numQuizzesCompleted.toString()}
				/>
				<StatBlock
					label="Longest Streak"
					value={user.longestStreak.toString()}
				/>
			</div>
		</section>
	);
};

export default ProfileStats;
