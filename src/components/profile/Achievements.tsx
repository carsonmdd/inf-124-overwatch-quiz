import Image from 'next/image';
import Link from 'next/link';
import { Check, Lock, Trophy } from 'lucide-react';
import type { Achievement } from '@/data/mockProfileData';

interface AchievementsProps {
	achievements: Achievement[];
	featured?: boolean;
	viewAllHref?: string;
}

const Achievements = ({
	achievements,
	featured = false,
	viewAllHref,
}: AchievementsProps) => {
	const displayed = featured ? achievements.slice(0, 3) : achievements;
	const earnedCount = achievements.filter((a) => a.isAchieved).length;

	return (
		<section className="w-full">
			<div className="flex justify-between items-baseline mb-4">
				<div className="flex items-center gap-3 text-ow-dark-blue dark:text-white">
					<Trophy className="w-5 h-5" />
					<h2 className="text-2xl font-black uppercase italic tracking-wider">
						Achievements
					</h2>
					<span className="text-sm font-bold uppercase tracking-wider text-ow-orange">
						{earnedCount}/{achievements.length}
					</span>
				</div>
				{featured && viewAllHref && (
					<Link
						href={viewAllHref}
						className="text-ow-orange font-bold uppercase text-sm hover:underline"
					>
						View All
					</Link>
				)}
			</div>

			<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{displayed.map((a, index) => (
					<li
						key={index}
						className={`relative flex items-center gap-4 p-4 rounded-sm border-l-4 transition ${
							a.isAchieved
								? 'bg-ow-dark-blue text-white border-ow-orange shadow-md'
								: 'bg-ow-blue/5 dark:bg-ow-blue/20 text-gray-500 dark:text-gray-400 border-gray-400/40'
						}`}
					>
						<div
							className={`shrink-0 relative w-14 h-14 rounded-full flex items-center justify-center ${
								a.isAchieved
									? 'bg-ow-orange/20'
									: 'bg-gray-400/20'
							}`}
						>
							<Image
								width={40}
								height={40}
								src={a.badgeIcon}
								alt=""
								className={`rounded-full ${a.isAchieved ? '' : 'grayscale opacity-50'}`}
							/>
						</div>

						<div className="flex-1 min-w-0">
							<h3
								className={`font-black uppercase tracking-wide text-base mb-0.5 ${
									a.isAchieved
										? 'text-white'
										: 'text-gray-600 dark:text-gray-300'
								}`}
							>
								{a.achievementName}
							</h3>
							<p
								className={`text-sm ${a.isAchieved ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}
							>
								{a.achievementDescription}
							</p>
						</div>

						<span
							aria-label={a.isAchieved ? 'Earned' : 'Locked'}
							className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
								a.isAchieved
									? 'bg-green-500 text-white'
									: 'bg-gray-400/30 text-gray-500'
							}`}
						>
							{a.isAchieved ? (
								<Check className="w-4 h-4" strokeWidth={3} />
							) : (
								<Lock className="w-4 h-4" />
							)}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Achievements;
