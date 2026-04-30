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

const Achievement = () => {
	// useEffect(() => {
	// 	// Pull achievement data from database
	// }, []);

	return (
		// Achievement box
		<div className="bg-red-400 w-[400px] h-[100px] ml-[575px] mb-[300px]">
			<div className="achievement-name">
				{achievementList[1].achievementName}
			</div>

			<div>{achievementList[1].achievementDescription}</div>

			{/* Achievement image */}
			<div className="ml-[350px] mt-[5px] rounded-[10px] bg-gray-500 w-fit">
				<Image
					width={50}
					height={50}
					src="/hat.png"
					alt="Achievement image"
				/>
			</div>

			{/* Achievement checkmark */}
			{achievementList[1].isAchieved && (
				<div className="ml-[350px]">
					<Image
						width={30}
						height={30}
						src="/checkMark-svgrepo.svg"
						alt="Achievement checkmark"
					/>
				</div>
			)}
		</div>
	);
};

export default Achievement;
