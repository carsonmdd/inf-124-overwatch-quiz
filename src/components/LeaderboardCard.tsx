import React from 'react';

type Props = {
	id: string;
	rank: number;
	username: string;
	totalScore: number;
};

const LeaderboardCard = ({ id, rank, username, totalScore }: Props) => {
	let specialStyling =
		'bg-ow-blue/5 dark:bg-ow-blue/10 text-gray-400 border-gray-600/30';
	let rankTextStyling = 'text-gray-500';

	if (rank === 1) {
		specialStyling =
			'bg-yellow-500/10 border-yellow-400 text-white shadow-[0_0_15px_rgba(250,204,21,0.15)]';
		rankTextStyling = 'text-yellow-400';
	} else if (rank === 2) {
		specialStyling =
			'bg-gray-300/10 border-gray-300 text-white shadow-[0_0_15px_rgba(209,213,219,0.1)]';
		rankTextStyling = 'text-gray-300';
	} else if (rank === 3) {
		specialStyling =
			'bg-amber-600/10 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.1)]';
		rankTextStyling = 'text-amber-500';
	}

	return (
		<li
			key={id}
			aria-label={`Rank ${rank}, ${username}, Score ${totalScore.toLocaleString()} points`}
			className={`relative z-0 hover:z-10 focus:z-10 focus:outline-none focus:ring-2 focus:ring-ow-orange focus:scale-[1.02] focus:shadow-lg flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-sm border-l-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${specialStyling}`}
		>
			{/* Rank number */}
			<div className="w-8 sm:w-16 flex justify-center items-center shrink-0">
				<span
					className={`font-black text-xl sm:text-3xl italic ${rankTextStyling}`}
					aria-hidden="true"
				>
					{rank}
				</span>
			</div>

			{/* Username */}
			<div className="flex-1 min-w-0">
				<h3
					className={`font-black uppercase tracking-wider text-sm sm:text-xl truncate ${rank <= 3 ? 'text-white' : 'text-gray-300'}`}
					aria-hidden="true"
				>
					{username}
				</h3>
			</div>

			{/* Score */}
			<div
				className="shrink-0 font-black italic tracking-wider text-base sm:text-2xl pr-1 sm:pr-4"
				aria-hidden="true"
			>
				<span className={rank <= 3 ? 'text-white' : 'text-gray-300'}>
					{totalScore.toLocaleString()}
				</span>
				<span className="text-xs sm:text-sm text-ow-orange ml-1 opacity-80">
					PTS
				</span>
			</div>
		</li>
	);
};

export default LeaderboardCard;
