'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';

const Navbar = () => {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	const links = [
		{ name: 'Quiz', href: '/quiz' },
		{ name: 'Leaderboard', href: '/leaderboard' },
		{ name: 'About', href: '/about' },
		{ name: 'Profile', href: '/profile' },
	];

	return (
		<nav className="bg-ow-dark-blue text-white shadow-lg sm:w-full md:w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="flex items-center">
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
					</div>
					<div className="flex items-center space-x-4 ">
						<Show when="signed-out">
							<SignInButton mode="modal">
								<button className="bg-ow-orange hover:bg-ow-orange/90 text-white px-4 py-2 rounded font-bold uppercase text-sm transition-colors">
									Sign In
								</button>
							</SignInButton>
						</Show>
						<Show when="signed-in">
							<UserButton />
						</Show>
					</div>

					{/* Menu button that shows up on smaller screens (responsive design) */}
					{/* Uses a state to track the open/closed status of the menu, uses aria-expanded */}
					{/* manually cleaned some unnecessary button tailwind css classes made by AI */}
					<div className="sm:hidden">
						<button type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}
						className="bg-ow-orange inline-flex items-center justify-center rounded-md text-white-200 focus:outline-none focus:ring-2 focus:ring-ow-white px-2 py-2">
							
							<span className="sr-only">Toggle navigation menu</span>
							{menuOpen ? 'Close' : 'Menu'}
						</button>
					</div>

				</div>

				{/* Mobile menu, uses menuOpen and a && conditional to show menu button with links */}
				{/* depending on whether screen is small */}
				{menuOpen && (
					<div className="sm:hidden px-2 pt-2 pb-3 space-y-1 bg-ow-dark-blue/95">
						{links.map((link) => {
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.href} href={link.href}
									className={`block rounded-md px-3 py-2 text-base font-bold uppercase tracking-wider transition ${
									isActive
										? 'border-l-4 border-ow-orange text-ow-orange bg-ow-blue/20'
										: 'border-transparent text-gray-300 hover:text-white hover:bg-ow-blue/10'
								}`}>
									{link.name}
								</Link>
							);
						})}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
