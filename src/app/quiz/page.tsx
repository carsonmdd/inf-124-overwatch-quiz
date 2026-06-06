import { Brain, History, User } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import QuizCard from '@/components/QuizCard';

const QuizHub = async () => {
	const { userId } = await auth();
	const isSignedIn = !!userId;

	return (
		<div className="flex min-h-screen w-full items-center justify-center p-6">
			<div
				className={`grid grid-cols-1 gap-5 w-full max-w-3xl mx-auto p-6 ${isSignedIn ? 'md:grid-cols-2' : ''}`}
			>
				{isSignedIn && (
					<QuizCard
						href={`/profile/${userId}`}
						icon={History}
						title="Quiz History"
						description="Revisit scores, review past attempts, and track your improvement."
						ctaText="Open"
					/>
				)}
				{isSignedIn && (
					<QuizCard
						href="/quiz/take"
						icon={Brain}
						title="Take Quiz"
						description="Test your knowledge of Overwatch's heroes, lore, abilities, and metas."
						ctaText="Start Quiz"
						featured
					/>
				)}
				{!isSignedIn && (
					<QuizCard
						href="/quiz/guest"
						icon={User}
						iconBoxed
						title="Play as Guest"
						description="Try 5 dynamic questions without an account. No score saved."
						ctaText="Play Now"
					/>
				)}
			</div>
		</div>
	);
};

export default QuizHub;
