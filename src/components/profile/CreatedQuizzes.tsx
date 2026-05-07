import Link from 'next/link';
import type { CreatedQuiz } from '@/data/mockProfileData';

interface CreatedQuizzesProps {
	quizzes: CreatedQuiz[];
	isOwner: boolean;
}

const difficultyColor: Record<CreatedQuiz['difficulty'], string> = {
	easy: 'bg-green-500',
	medium: 'bg-ow-orange',
	hard: 'bg-red-600',
};

const CreatedQuizzes = ({ quizzes, isOwner }: CreatedQuizzesProps) => {
	return (
		<section className="w-full">
			<div className="flex justify-between items-baseline mb-4">
				<h2 className="text-2xl font-black uppercase italic tracking-wider text-ow-dark-blue dark:text-white">
					Created Quizzes
				</h2>
				{isOwner && (
					<Link
						href="/quiz/create"
						className="text-ow-orange font-bold uppercase text-sm hover:underline"
					>
						+ New Quiz
					</Link>
				)}
			</div>
			{quizzes.length === 0 ? (
				<p className="text-gray-500 italic">
					{isOwner
						? "You haven't created any quizzes yet."
						: 'No created quizzes to show.'}
				</p>
			) : (
				<ul className="flex flex-col gap-3">
					{quizzes.map((q) => (
						<li
							key={q.id}
							className="flex items-center justify-between bg-ow-blue/10 dark:bg-ow-blue/30 p-4 rounded-sm"
						>
							<div className="flex items-center gap-4">
								<span
									className={`px-2 py-0.5 text-xs font-black uppercase tracking-wider rounded-sm text-white ${difficultyColor[q.difficulty]}`}
								>
									{q.difficulty}
								</span>
								<div>
									<p className="font-bold text-ow-dark-blue dark:text-white">
										{q.name}
									</p>
									<p className="text-sm text-gray-500">
										{q.questionCount} questions ·{' '}
										{q.playCount.toLocaleString()} plays
									</p>
								</div>
							</div>
							<Link
								href={`/quiz/${q.id}`}
								className="text-ow-orange font-bold uppercase text-sm hover:underline"
							>
								Play
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

export default CreatedQuizzes;
