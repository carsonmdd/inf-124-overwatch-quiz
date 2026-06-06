'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import LeaderboardCard from '@/components/LeaderboardCard';

type Player = {
	id: string;
	rank: number;
	username: string;
	totalScore: number;
};

const Leaderboard = () => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		fetch('/api/leaderboard')
			.then((res) => res.json())
			.then((data) => {
				setPlayers(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	const totalPages = Math.max(1, Math.ceil(players.length / itemsPerPage));
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentPlayers = players.slice(startIndex, startIndex + itemsPerPage);

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};
	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	if (loading) {
		return (
			<div className="flex-1 w-full max-w-4xl mx-auto px-4 py-10 flex items-center justify-center">
				<p className="text-gray-400 text-lg italic font-bold uppercase tracking-widest animate-pulse">
					Loading Leaderboard...
				</p>
			</div>
		);
	}

	return (
		<div className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-10 flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-center gap-3 sm:gap-5 border-b border-gray-700/50 pb-4">
				<Image
					src="/top500.png"
					alt="Top 500"
					width={60}
					height={60}
					className="drop-shadow-md object-contain shrink-0 sm:w-20 sm:h-20"
				/>
				<h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase italic tracking-normal sm:tracking-wide lg:tracking-widest leading-tight bg-gradient-to-r from-yellow-400 via-ow-orange to-red-500 bg-clip-text text-transparent pb-1 pr-2">
					Top 500 Leaderboard
				</h1>
			</div>

			{players.length === 0 ? (
				<p className="text-gray-400 text-center italic">
					No scores yet. Be the first!
				</p>
			) : (
				<ol className="flex flex-col gap-3">
					{currentPlayers.map((player, i) => (
						<LeaderboardCard
							key={i}
							id={player.id}
							rank={player.rank}
							username={player.username}
							totalScore={player.totalScore}
						/>
					))}
				</ol>
			)}

			{/* Pagination */}
			<nav
				aria-label="Leaderboard Pagination"
				className="flex justify-between items-center mt-2 p-3 sm:p-4 bg-ow-blue/5 rounded-sm border border-gray-700/30"
			>
				<button
					onClick={handlePrev}
					disabled={currentPage === 1}
					aria-label="Go to previous page"
					className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-ow-dark-blue text-white hover:bg-ow-orange focus:outline-none focus:ring-2 focus:ring-ow-orange disabled:opacity-40 disabled:hover:bg-ow-dark-blue rounded-sm uppercase italic font-bold tracking-wider transition-colors text-sm sm:text-base"
				>
					<ChevronLeft
						className="w-4 h-4 sm:w-5 sm:h-5"
						aria-hidden="true"
					/>{' '}
					Prev
				</button>

				<span
					aria-live="polite"
					className="font-black text-base sm:text-xl italic tracking-widest text-gray-400"
				>
					{currentPage}{' '}
					<span
						className="text-ow-orange mx-1 sm:mx-2"
						aria-hidden="true"
					>
						/
					</span>{' '}
					{totalPages}
				</span>

				<button
					onClick={handleNext}
					disabled={currentPage === totalPages}
					aria-label="Go to next page"
					className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-ow-dark-blue text-white hover:bg-ow-orange focus:outline-none focus:ring-2 focus:ring-ow-orange disabled:opacity-40 disabled:hover:bg-ow-dark-blue rounded-sm uppercase italic font-bold tracking-wider transition-colors text-sm sm:text-base"
				>
					Next{' '}
					<ChevronRight
						className="w-4 h-4 sm:w-5 sm:h-5"
						aria-hidden="true"
					/>
				</button>
			</nav>
		</div>
	);
};

export default Leaderboard;
