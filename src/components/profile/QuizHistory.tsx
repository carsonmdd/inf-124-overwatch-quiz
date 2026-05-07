import type { QuizAttempt } from '@/data/mockProfileData';

interface QuizHistoryProps {
	history: QuizAttempt[];
}

const difficultyColor: Record<QuizAttempt['difficulty'], string> = {
	easy: 'bg-green-500',
	medium: 'bg-ow-orange',
	hard: 'bg-red-600',
};

const QuizHistory = ({ history }: QuizHistoryProps) => {
	return (
		<section className="w-full">
			<h2 className="text-2xl font-black uppercase italic tracking-wider text-ow-dark-blue dark:text-white mb-4">
				Recent Quizzes
			</h2>
			{history.length === 0 ? (
				<p className="text-gray-500 italic">No quiz history yet.</p>
			) : (
				<div className="overflow-hidden rounded-sm border border-ow-blue/20">
					<table className="w-full text-left">
						<thead className="bg-ow-dark-blue text-white">
							<tr>
								<th className="px-4 py-2 text-xs uppercase tracking-wider">
									Quiz
								</th>
								<th className="px-4 py-2 text-xs uppercase tracking-wider">
									Difficulty
								</th>
								<th className="px-4 py-2 text-xs uppercase tracking-wider text-right">
									Score
								</th>
								<th className="px-4 py-2 text-xs uppercase tracking-wider text-right">
									Date
								</th>
							</tr>
						</thead>
						<tbody>
							{history.map((a) => (
								<tr
									key={a.id}
									className="border-t border-ow-blue/10 odd:bg-ow-blue/5"
								>
									<td className="px-4 py-3 font-bold text-ow-dark-blue dark:text-white">
										{a.quizName}
									</td>
									<td className="px-4 py-3">
										<span
											className={`px-2 py-0.5 text-xs font-black uppercase tracking-wider rounded-sm text-white ${difficultyColor[a.difficulty]}`}
										>
											{a.difficulty}
										</span>
									</td>
									<td className="px-4 py-3 text-right font-mono">
										{a.score}/{a.totalQuestions}
									</td>
									<td className="px-4 py-3 text-right text-sm text-gray-500">
										{new Date(
											a.playedAt,
										).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
};

export default QuizHistory;
