import type { QuizAttempt } from '@/types/profile';

interface QuizHistoryProps {
	history: QuizAttempt[];
}

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
									<td className="px-4 py-3 font-mono font-bold text-ow-dark-blue dark:text-white">
										{a.score} pts
									</td>
									<td className="px-4 py-3 text-right text-sm text-gray-500">
										{new Date(a.completedAt).toLocaleDateString()}
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
