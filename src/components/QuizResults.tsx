'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';

interface QuizResultsProps {
	score: number;
	correctCount: number;
	total: number;
	maxStreak: number;
	isGuest: boolean;
	onRequeue: () => void;
}

const getResultMessage = (score: number, total: number): string => {
	const pct = score / total;
	if (pct === 1) return 'SEXTUPLE KILL';
	if (pct >= 0.7) return 'UPHILL BATTLE';
	if (pct >= 0.4) return 'VICTORY';
	return 'DEFEAT';
};

const QuizResults = ({
	score,
	correctCount,
	total,
	maxStreak,
	isGuest,
	onRequeue,
}: QuizResultsProps) => {
	const message = getResultMessage(correctCount, total);

	return (
		<div className="flex-1 flex flex-col items-center justify-center bg-ow-dark-blue p-6 gap-8">
			<div className="text-center">
				<p className="text-ow-orange text-[11px] font-medium tracking-[0.28em] uppercase mb-3">
					{isGuest ? 'Guest Quiz Complete' : 'Quiz Complete'}
				</p>
				<h1 className="text-white font-black text-6xl uppercase tracking-tight mb-2">
					{score} <span className="text-white/30">pts</span>
				</h1>
				<p className="text-white/50 text-sm uppercase tracking-wisdest mt-1">
					{correctCount}/{total} correct · {message}
				</p>
				{maxStreak >= 3 && (
					<p className="text-ow-orange/70 text-xs tracking-widest uppercase mt-2">
						Best streak: {maxStreak}!
					</p>
				)}
			</div>

			<div className="flex flex-col items-center gap-3 w-full max-w-sm">
				{isGuest && (
					<SignInButton mode="modal">
						<button className="w-full bg-ow-orange text-white py-3 rounded font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition-colors">
							Sign In to Save Your Score
						</button>
					</SignInButton>
				)}
				<button
					onClick={onRequeue}
					className={`w-full py-3 rounded font-black uppercase text-sm tracking-widest transition-colors cursor-pointer ${
						isGuest
							? 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'
							: 'bg-ow-orange text-ow-dark-blue hover:bg-ow-orange/80'
					}`}
				>
					{isGuest ? 'Play Again' : 'Requeue'}
				</button>
				<Link
					href={isGuest ? '/' : '/quiz'}
					className="text-white/30 text-xs tracking-wider hover:text-white/60 transition-colors uppercase mt-1 flex items-center justify-center gap-2"
				>
					<ArrowLeft size={16} />
					{isGuest ? 'Back to Home' : 'Continue'}
				</Link>
			</div>
		</div>
	);
};

export default QuizResults;
