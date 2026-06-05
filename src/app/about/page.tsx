import Image from 'next/image';

const About = () => {
	return (
		<div className="min-h-screen bg-ow-dark-blue text-white">
			<div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-16">
				{/* HERO */}
				<div className="flex flex-col md:flex-row items-center gap-14">
					<div className="flex-1 flex flex-col gap-6">
						<p className="text-ow-orange text-m font-medium tracking-[0.28em] uppercase">
							About The Team
						</p>
						<p className="text-white/60 text-lg leading-relaxed">
							We are a team of five undergraduate students who
							wanted to make a website which would allow Overwatch
							fans to test their knowledge of Overwatch in the
							form of a quiz game. The main purpose is to allow
							Overwatch gamers connect with the game more and show
							off their knowledge. This project was intialized,
							planned, and executed within a ten week period,
							primarily using the React library. If you have any
							questions or comments, please contact us with the
							information given below.
						</p>
					</div>
					<div className="shrink-0">
						<Image
							src="/overwatch.png"
							alt="Overwatch logo"
							width={300}
							height={300}
							className="object-contain"
						/>
					</div>
				</div>

				{/* CONTACT */}
				<div className="border border-white/8 rounded-xl p-10 flex flex-col gap-5">
					<p className="text-ow-orange text-m font-medium tracking-[0.28em] uppercase">
						Contact Information
					</p>
					<div className="flex flex-wrap gap-4">
						{[
							'aassad1@uci.edu',
							'carsonmd@uci.edu',
							'jasonbm2@uci.edu',
							'namclaug@uci.edu',
							'tapiarr@uci.edu',
						].map((email) => (
							<a
								key={email}
								href={`mailto:${email}`}
								className="text-white/60 text-base hover:text-white transition-colors"
							>
								{email}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
