import Image from 'next/image';
import Link from 'next/link';
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

	return (
		<section className="w-full">
			<div className="flex justify-between items-baseline mb-4">
				{featured && viewAllHref && (
					<Link
						href={viewAllHref}
						className="text-ow-orange font-bold uppercase text-sm hover:underline"
					>
						View All
					</Link>
				)}
			</div>
			<div className="flex flex-col items-center justify-center gap-6">
				{displayed.map((a, index) => (
					<div key={index} className="flex gap-6">
						<div
							className={`${a.isAchieved ? 'bg-green-500' : 'bg-red-500'} w-150 h-24 flex justify-between gap-4 p-6`}
						>
							<div>
								<h2 className="text-xl font-bold mb-1">
									{a.achievementName}
								</h2>
								<p className="text-lg">
									{a.achievementDescription}
								</p>
							</div>
							<Image
								width={50}
								height={50}
								src={a.badgeIcon}
								alt="Achievement image"
								className="rounded-full bg-gray-300 p-1"
							/>
						</div>
						<Image
							width={40}
							height={40}
							src="/checkMark-svgrepo.svg"
							alt="Achievement checkmark"
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default Achievements;
