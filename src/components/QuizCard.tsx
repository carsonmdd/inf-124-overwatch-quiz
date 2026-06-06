import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface QuizCardProps {
	href: string;
	icon: LucideIcon;
	iconBoxed?: boolean;
	title: string;
	description: string;
	ctaText: string;
	featured?: boolean;
}

const QuizCard = ({
	href,
	icon: Icon,
	iconBoxed = false,
	title,
	description,
	ctaText,
	featured = false,
}: QuizCardProps) => (
	<Link href={href} className="contents">
		<div
			className={`group relative flex flex-col gap-5 rounded-xl p-7 cursor-pointer transition-transform duration-200 hover:-translate-y-1.5 ${
				featured
					? 'bg-ow-orange/5 border-2 border-ow-orange/50 hover:border-ow-orange'
					: 'border border-white/[0.08] hover:border-white/25'
			}`}
		>
			{featured && (
				<div className="absolute -top-px left-1/2 -translate-x-1/2">
					<span className="bg-ow-orange text-gray-900 text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-0.5 rounded-b-md block">
						Featured
					</span>
				</div>
			)}

			{iconBoxed ? (
				<div className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10">
					<Icon className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
				</div>
			) : (
				<Icon
					className={`w-10 h-10 transition-colors ${
						featured
							? 'text-ow-orange/70 group-hover:text-ow-orange'
							: 'text-ow-light-blue/70 group-hover:text-ow-light-blue'
					}`}
				/>
			)}

			<div className="flex-1">
				<h2 className="text-white text-2xl font-bold uppercase tracking-wide leading-tight mb-2.5">
					{title}
				</h2>
				<p className="text-white/35 text-[13px] leading-relaxed">
					{description}
				</p>
			</div>

			<div
				className={`flex items-center gap-1 text-[11px] font-medium tracking-widest uppercase ${
					featured
						? 'text-ow-orange'
						: 'text-white/40 opacity-50 group-hover:opacity-100 transition-opacity'
				}`}
			>
				<span>{ctaText}</span>
				<span className="text-sm">→</span>
			</div>
		</div>
	</Link>
);

export default QuizCard;
