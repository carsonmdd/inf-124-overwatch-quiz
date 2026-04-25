import Link from 'next/link';

export default function Home() {
	return (
		<div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
			<div className="max-w-4xl w-full">
				<h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-ow-dark-blue dark:text-white mb-4">
					Are you a{' '}
					<span className="text-ow-orange">Grandmaster?</span>
				</h1>
				<p className="text-xl md:text-2xl text-ow-blue dark:text-gray-300 mb-12 max-w-2xl mx-auto font-bold uppercase tracking-wide">
					Test your knowledge of Overwatch heroes, maps, and lore in
					the ultimate quiz challenge.
				</p>
				<div className="flex flex-col sm:flex-row gap-6 justify-center">
					<Link
						href="/quiz"
						className="px-12 py-4 bg-ow-orange text-white text-xl font-black uppercase italic tracking-widest rounded-sm hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl"
					>
						Start Quiz
					</Link>
					<Link
						href="/leaderboard"
						className="px-12 py-4 bg-ow-blue text-white text-xl font-black uppercase italic tracking-widest rounded-sm hover:bg-ow-light-blue transition-all transform hover:scale-105 shadow-xl"
					>
						Leaderboard
					</Link>
				</div>
			</div>
		</div>
	);
}
