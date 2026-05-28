'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignInButton, useAuth } from '@clerk/nextjs';
import type { GuestQuestion } from '@/types/question';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Phase = 'loading' | 'error' | 'quiz' | 'results';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function GuestQuiz() {
	const { isSignedIn, isLoaded } = useAuth();
	const router = useRouter();

	const [phase, setPhase] = useState<Phase>('loading');
	const [questions, setQuestions] = useState<GuestQuestion[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [hasAnswered, setHasAnswered] = useState(false);
	const [score, setScore] = useState(0);
	const [fetchKey, setFetchKey] = useState(0);

	useEffect(() => {
		if (isLoaded && isSignedIn) {
			router.replace('/quiz/take');
		}
	}, [isLoaded, isSignedIn, router]);

	useEffect(() => {
		if (!isLoaded || isSignedIn) return;

		let cancelled = false;
		(async () => {
			try {
				const res = await fetch('/api/quiz/guest');
				if (!res.ok) throw new Error();
				const data = await res.json();
				if (!cancelled) {
					setQuestions(data.questions);
					setPhase('quiz');
				}
			} catch {
				if (!cancelled) setPhase('error');
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [isLoaded, isSignedIn, fetchKey]);

	// Bump fetchKey to fetch new questions
	function handlePlayAgain() {
		setPhase('loading');
		setCurrentIndex(0);
		setSelectedIndex(null);
		setHasAnswered(false);
		setScore(0);
		setFetchKey((k) => k + 1);
	}

	function handleSelectAnswer(index: number) {
		if (hasAnswered) return;
		setSelectedIndex(index);
		setHasAnswered(true);
		if (questions[currentIndex].answers[index].isCorrect) {
			setScore((s) => s + 1);
		}
	}

	function handleNext() {
		if (currentIndex < questions.length - 1) {
			setCurrentIndex((i) => i + 1);
			setSelectedIndex(null);
			setHasAnswered(false);
		} else {
			setPhase('results');
		}
	}

	if (phase === 'loading') {
		return (
			<div className="flex-1 flex items-center justify-center bg-ow-dark-blue">
				<p className="text-white/40 text-sm tracking-widest uppercase animate-pulse">
					Loading questions...
				</p>
			</div>
		);
	}

	if (phase === 'error') {
		return (
			<div className="flex-1 flex flex-col items-center justify-center bg-ow-dark-blue gap-4">
				<p className="text-white/60 text-sm">
					Could not load questions. Please try again.
				</p>
				<button
					onClick={handlePlayAgain}
					className="bg-ow-orange text-white px-6 py-2 rounded font-bold uppercase text-sm hover:bg-orange-600 transition-colors"
				>
					Try Again
				</button>
			</div>
		);
	}

	if (phase === 'results') {
		const total = questions.length;
		const pct = Math.round((score / total) * 100);
		const message =
			score === total
				? 'PERFECT SCORE!'
				: score >= 3
					? 'NICE WORK!'
					: 'KEEP PRACTICING!';
		return (
			<div className="flex-1 flex flex-col items-center justify-center bg-ow-dark-blue p-6 gap-8">
				<div className="text-center">
					<p className="text-ow-orange text-[11px] font-medium tracking-[0.28em] uppercase mb-3">
						Guest Quiz Complete
					</p>
					<h1 className="text-white font-black text-6xl uppercase tracking-tight mb-2">
						{score} <span className="text-white/30">/ {total}</span>
					</h1>
					<p className="text-white/50 text-sm uppercase tracking-widest mt-1">
						{pct}% correct — {message}
					</p>
				</div>

				<div className="flex flex-col items-center gap-3 w-full max-w-sm">
					<SignInButton mode="modal">
						<button className="w-full bg-ow-orange text-white py-3 rounded font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition-colors">
							Sign In to Save Your Score
						</button>
					</SignInButton>
					<button
						onClick={handlePlayAgain}
						className="w-full border border-white/20 text-white/60 py-3 rounded font-bold uppercase text-sm tracking-widest hover:text-white hover:border-white/40 transition-colors"
					>
						Play Again
					</button>
					<Link
						href="/"
						className="text-white/30 text-xs tracking-wider hover:text-white/60 transition-colors uppercase mt-1 flex items-center justify-center gap-2"
					>
						<ArrowLeft size={16} />
						Back to Home
					</Link>
				</div>
			</div>
		);
	}

	const question = questions[currentIndex];
	const total = questions.length;

	return (
		<div className="flex-1 flex flex-col bg-ow-dark-blue p-6 gap-5">
			{/* Header */}
			<div className="flex items-center justify-between">
				<span className="text-white/40 text-[11px] font-medium tracking-[0.22em] uppercase">
					Question {currentIndex + 1} / {total}
				</span>
				<span className="text-ow-orange text-[11px] font-semibold tracking-[0.22em] uppercase">
					Score: {score}
				</span>
			</div>

			{/* Progress bar */}
			<div className="h-0.5 bg-white/[0.07] rounded-full">
				<div
					className="h-full bg-ow-orange rounded-full transition-all duration-500"
					style={{
						width: `${((currentIndex + (hasAnswered ? 1 : 0)) / total) * 100}%`,
					}}
				/>
			</div>

			{/* Question */}
			<div className="flex-1 grid grid-cols-3 gap-6 items-stretch">
				<div className="col-span-2 flex flex-col gap-3 justify-center">
					<p className="text-ow-orange text-[10px] font-medium tracking-[0.28em] uppercase">
						{question.category}
					</p>
					<h2 className="text-white font-black text-2xl uppercase leading-tight tracking-wide">
						{question.text}
					</h2>
				</div>

				<div className="relative rounded-xl overflow-hidden border border-white/[0.09] bg-ow-blue/30 min-h-[170px]">
					{question.imageUrl ? (
						<img
							src={question.imageUrl}
							alt="Question image"
							className="absolute inset-0 w-full h-full object-cover"
						/>
					) : (
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
								No Image
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Answers */}
			<div className="grid grid-cols-2 gap-3">
				{question.answers.map((answer, i) => {
					let btnClass =
						'group flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-200 min-h-[62px] ';
					let letterClass =
						'w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-bold transition-colors duration-200 ';

					if (!hasAnswered) {
						btnClass +=
							'border-ow-blue/50 bg-ow-blue/10 hover:bg-ow-light-blue/10 hover:border-ow-light-blue/45 cursor-pointer';
						letterClass +=
							'bg-ow-blue/40 text-white/45 group-hover:bg-ow-light-blue/20 group-hover:text-ow-light-blue';
					} else if (answer.isCorrect) {
						btnClass +=
							'border-green-500/60 bg-green-500/10 cursor-default';
						letterClass += 'bg-green-500/30 text-green-400';
					} else if (i === selectedIndex) {
						btnClass +=
							'border-red-500/60 bg-red-500/10 cursor-default';
						letterClass += 'bg-red-500/30 text-red-400';
					} else {
						btnClass +=
							'border-white/10 bg-white/[0.03] opacity-40 cursor-default';
						letterClass += 'bg-white/10 text-white/30';
					}

					return (
						<button
							key={i}
							onClick={() => handleSelectAnswer(i)}
							disabled={hasAnswered}
							className={btnClass}
						>
							<span className={letterClass}>{LETTERS[i]}</span>
							<span className="text-white/82 text-sm font-medium leading-snug">
								{answer.text}
							</span>
						</button>
					);
				})}
			</div>

			{/* Next button */}
			<button
				onClick={handleNext}
				disabled={!hasAnswered}
				className={`flex items-center justify-center gap-2 bg-ow-orange text-white py-3 rounded font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition-colors ${!hasAnswered && 'invisible'}`}
			>
				{currentIndex < total - 1 ? 'Next Question' : 'See Results'}
				<ArrowRight size={16} />
			</button>
		</div>
	);
}
