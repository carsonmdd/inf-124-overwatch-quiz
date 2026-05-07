import type { PersonalBest } from '@/data/mockProfileData';

interface PersonalBestsProps {
	personalBests: PersonalBest[];
}

const difficultyColor: Record<PersonalBest['difficulty'], string> = {
	easy: 'bg-green-500',
	medium: 'bg-ow-orange',
	hard: 'bg-red-600',
};

const PersonalBests = ({ personalBests }: PersonalBestsProps) => {
	return (
		<section className="w-full">
			<h2 className="text-2xl font-black uppercase italic tracking-wider text-ow-dark-blue dark:text-white mb-4">
				Personal Bests
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{personalBests.map((pb) => (
					<div
						key={pb.difficulty}
						className="bg-ow-dark-blue text-white p-5 rounded-sm shadow"
					>
						<span
							className={`inline-block px-3 py-1 text-xs font-black uppercase tracking-wider rounded-sm ${difficultyColor[pb.difficulty]}`}
						>
							{pb.difficulty}
						</span>
						<div className="mt-3 flex items-baseline gap-2">
							<span className="text-4xl font-black italic">
								{pb.bestScore}%
							</span>
							<span className="text-sm uppercase text-gray-300">
								best score
							</span>
						</div>
						<p className="text-sm uppercase tracking-wider text-gray-300 mt-1">
							Streak: {pb.bestStreak}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default PersonalBests;
