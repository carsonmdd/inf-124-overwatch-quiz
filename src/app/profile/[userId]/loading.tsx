const Skeleton = ({ className }: { className?: string }) => (
	<div
		className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded-sm ${className ?? ''}`}
	/>
);

export default function ProfileLoading() {
	return (
		<div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
			{/* Header */}
			<div className="flex items-center gap-6 p-6 bg-ow-dark-blue rounded-sm shadow-lg">
				<Skeleton className="w-24 h-24 rounded-full shrink-0" />
				<div className="flex-1 flex flex-col gap-3">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-64" />
				</div>
			</div>

			{/* Stats */}
			<div className="flex flex-col gap-4">
				<Skeleton className="h-7 w-20" />
				<div className="grid grid-cols-3 gap-4">
					{[0, 1, 2].map((i) => (
						<Skeleton key={i} className="h-24" />
					))}
				</div>
			</div>

			{/* Achievements */}
			<div className="flex flex-col gap-4">
				<Skeleton className="h-7 w-36" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{[0, 1, 2].map((i) => (
						<Skeleton key={i} className="h-20" />
					))}
				</div>
			</div>

			{/* Quiz history */}
			<div className="flex flex-col gap-4">
				<Skeleton className="h-7 w-36" />
				<Skeleton className="h-48" />
			</div>
		</div>
	);
}
