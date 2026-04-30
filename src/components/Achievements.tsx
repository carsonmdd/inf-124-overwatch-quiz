import Image from 'next/image';

// Hardcoded achievements for now; will pull from database later
const achievementList = [
	{
		achievementName: 'Just Getting Started!',
		achievementDescription:
			'Earn a total of 1000 lifetime points in Overwatch Quiz Game.',
		isAchieved: false,
		badgeIcon: 'src here',
	},
	{
		achievementName: 'Hat Trick',
		achievementDescription: 'Get 3 questions correct in a row.',
		isAchieved: true,
		badgeIcon: 'src here',
	},
	{
		achievementName: 'My First Quiz!',
		achievementDescription: 'Complete your very first overwatch quiz!',
		isAchieved: true,
		badgeIcon: 'src here',
	},
	{
		achievementName: 'Quite Poor Performance',
		achievementDescription:
			'Earn a 10% score or less in a single Overwatch Quiz.',
		isAchieved: false,
		badgeIcon: 'src here',
	},
];

const Achievements = () => {
	// useEffect(() => {
	// 	// Pull achievement data from database
	// }, []);

	return (
		<div className="flex flex-col items-center justify-center gap-6 p-8">
			{achievementList.map((a, index) => (
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
							src="/hat.png"
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
	);
};

export default Achievements;
