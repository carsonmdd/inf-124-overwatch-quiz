'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
	const pathname = usePathname();

	const links = [
		{ name: 'Quiz', href: '/quiz' },
		{ name: 'Leaderboard', href: '/leaderboard' },
		{ name: 'About', href: '/about' },
		{ name: 'Profile', href: '/profile' },
	];

	return (
		<nav className="bg-ow-dark-blue text-white shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="shrink-0">
						<Link
							href="/"
							className="text-2xl font-black uppercase tracking-tighter italic"
						>
							<span className="text-white">Overwatch</span>
							<span className="text-ow-orange"> Quiz</span>
						</Link>
					</div>
					<div className="hidden sm:block">
						<div className="ml-10 flex items-center space-x-1 h-16">
							{links.map((link) => {
								const isActive = pathname === link.href;
								return (
									<Link
										key={link.href}
										href={link.href}
										className={`px-4 h-full flex items-center text-sm font-bold uppercase tracking-wider transition-all border-b-4 ${
											isActive
												? 'border-ow-orange text-ow-orange bg-ow-blue/20'
												: 'border-transparent text-gray-300 hover:text-white hover:bg-ow-blue/10'
										}`}
									>
										{link.name}
									</Link>
								);
							})}
						</div>
					</div>
					{/* Mobile menu button (could be added later) */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
