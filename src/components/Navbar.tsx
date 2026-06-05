'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Show, SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { Search, Menu, X } from 'lucide-react';

type SearchUser = {
	id: string;
	clerkId: string;
	username: string;
};

const Navbar = () => {
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const { userId } = useAuth();

	const [query, setQuery] = useState('');
	const [results, setResults] = useState<SearchUser[]>([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

	const links = [
		{ name: 'Quiz', href: '/quiz' },
		{ name: 'Leaderboard', href: '/leaderboard' },
		{ name: 'About', href: '/about' },
		...(userId ? [{ name: 'Profile', href: `/profile/${userId}` }] : []),
	];

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(e.target as Node)
			) {
				setShowDropdown(false);
			}
		};
		document.addEventListener('mouseup', handleClickOutside);
		return () =>
			document.removeEventListener('mouseup', handleClickOutside);
	}, []);

	// Search as you type
	useEffect(() => {
		if (!query.trim()) {
			setResults([]);
			setShowDropdown(false);
			return;
		}

		const timeout = setTimeout(async () => {
			const res = await fetch(
				`/api/users?query=${encodeURIComponent(query)}`,
			);
			const data = await res.json();
			setResults(data.users);
			setShowDropdown(true);
		}, 300); // wait 300ms after typing stops

		return () => clearTimeout(timeout);
	}, [query]);

	return (
		<nav className="bg-ow-dark-blue text-white shadow-lg w-full">
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
						<div className="hidden lg:block">
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

					{/* Right side: search + auth */}
					<div className="hidden lg:flex items-center space-x-4">
						{/* Search bar */}
						{userId && (
							<div ref={searchRef} className="relative">
								<div className="flex items-center bg-ow-blue/20 border border-gray-600 rounded px-3 py-1.5 gap-2 focus-within:border-ow-orange transition-colors">
									<Search className="w-4 h-4 text-gray-400 shrink-0" />
									<input
										type="text"
										value={query}
										onChange={(e) =>
											setQuery(e.target.value)
										}
										onFocus={() =>
											results.length > 0 &&
											setShowDropdown(true)
										}
										placeholder="Search users..."
										className="bg-transparent text-white text-sm w-40 focus:outline-none placeholder-gray-500"
									/>
								</div>

								{/* Dropdown results */}
								{showDropdown && (
									<div className="absolute right-0 top-full mt-1 w-56 bg-ow-dark-blue border border-gray-600 rounded shadow-lg z-50">
										{results.length === 0 ? (
											<p className="px-4 py-3 text-sm text-gray-400">
												No users found
											</p>
										) : (
											<ul>
												{results.map((user) => (
													<li key={user.id}>
														<Link
															href={`/profile/${user.clerkId}`}
															onClick={() => {
																setQuery('');
																setShowDropdown(
																	false,
																);
																setMenuOpen(
																	false,
																);
															}}
															onTouchEnd={() => {
																setQuery('');
																setShowDropdown(
																	false,
																);
																setMenuOpen(
																	false,
																);
															}}
															className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-ow-blue/20 transition-colors"
														>
															{user.username}
														</Link>
													</li>
												))}
											</ul>
										)}
									</div>
								)}
							</div>
						)}

						<Show when="signed-out">
							<SignInButton mode="modal">
								<button className="bg-ow-orange hover:bg-ow-orange/90 text-gray-900 px-4 py-2 rounded font-bold uppercase text-sm transition-colors">
									Sign In
								</button>
							</SignInButton>
						</Show>
						<Show when="signed-in">
							<UserButton />
						</Show>
					</div>

					{/* Mobile menu button */}
					<div className="lg:hidden flex items-center gap-3">
						<Show when="signed-in">
							<UserButton />
						</Show>
						<button
							type="button"
							aria-expanded={menuOpen}
							onClick={() => setMenuOpen((open) => !open)}
						>
							<span className="sr-only">
								Toggle navigation menu
							</span>
							{menuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu — fixed overlay so it doesn't push content down */}
			{menuOpen && (
				<div className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-ow-dark-blue border-t border-white/[0.08] shadow-xl">
					<div className="px-4 py-3 flex flex-col gap-1">
						{links.map((link) => {
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setMenuOpen(false)}
									className={`px-3 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider transition-colors ${
										isActive
											? 'text-ow-orange bg-ow-blue/20'
											: 'text-white/60 hover:text-white hover:bg-ow-blue/10'
									}`}
								>
									{link.name}
								</Link>
							);
						})}

						{/* Mobile search */}
						{userId && (
							<div className="pt-2 pb-1">
								<div className="flex items-center bg-ow-blue/20 border border-white/10 rounded px-3 py-2 gap-2 focus-within:border-ow-orange transition-colors">
									<Search className="w-4 h-4 text-white/30 shrink-0" />
									<input
										type="text"
										value={query}
										onChange={(e) =>
											setQuery(e.target.value)
										}
										placeholder="Search users..."
										className="bg-transparent text-white text-sm w-full focus:outline-none placeholder-white/30"
									/>
								</div>
								{showDropdown && results.length > 0 && (
									<ul className="mt-1 border border-white/10 rounded bg-ow-dark-blue">
										{results.map((user) => (
											<li key={user.id}>
												<Link
													href={`/profile/${user.clerkId}`}
													onClick={() => {
														setQuery('');
														setShowDropdown(false);
														setMenuOpen(false);
													}}
													className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-ow-blue/20 transition-colors"
												>
													{user.username}
												</Link>
											</li>
										))}
									</ul>
								)}
							</div>
						)}

						<div className="border-t border-white/[0.08] pt-3 mt-1">
							<Show when="signed-out">
								<SignInButton mode="modal">
									<button className="w-full bg-ow-orange hover:bg-ow-orange/90 text-gray-900 px-4 py-2 rounded font-bold uppercase text-sm transition-colors">
										Sign In
									</button>
								</SignInButton>
							</Show>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
