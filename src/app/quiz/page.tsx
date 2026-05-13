const QuizHub = () => {
	return (
		<div className="flex min-h-screen w-full items-center justify-center p-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-3xl mx-auto p-6">
			{/*Quiz History*/}
				<div className="group flex flex-col gap-5 border border-white/[0.08] rounded-xl p-7 cursor-pointer transition-transform duration-200 hover:-translate-y-1.5 hover:border-white/25">
					<div className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10">
						{/*Include graphic/icon here*/} Icon
					</div>

					<div className="flex-1">
						<h2 className="text-white text-2xl font-bold uppercase tracking-wide leading-tight mb-2.5">
							Quiz History
						</h2>
						<p className="text-white/35 text-[13px] leading-relaxed transition-colors duration-200 hover:text-white/70">
							Revisit scores, review past attempts, and track your improvement.
						</p>
					</div>

					<div className="flex items-center gap-1 text-white/40 text-[11px] font-medium tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">
						<span>Open</span>
						<span className="text-sm">→</span>
					</div>
				</div>
			{/*Take Quiz*/}
				<div className="group relative flex flex-col gap-5 bg-ow-orange/5 border-2 border-ow-orange/50 rounded-xl p-7 cursor-pointer transition-transform duration-200 hover:-translate-y-1.5 hover:border-ow-orange">
					<div className="absolute -top-px left-1/2 -translate-x-1/2">
						<span className="bg-ow-orange text-ow-white text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-0.5 rounded-b-md block">
							Featured
						</span>
					</div>

					<div className="w-11 h-11 rounded-lg bg-ow-orange/15 flex items-center justify-center mt-2 transition-colors group-hover:bg-amber-400/25">
						{/*Include graphic/icon here */} Icon
					</div>

					<div className="flex-1">
						<h2 className="text-white text-2xl font-bold uppercase tracking-wide leading-tight mb-2.5">
							Take Quiz
						</h2>
						<p className="text-white/35 text-[13px] leading-relaxed transition-colors duration-200 hover:text-white/70">
							Test your knowledge of Overwatch's heroes, lore, abilities, and metas.
						</p>
					</div>

					<div className="flex items-center gap-1 text-ow-orange text-[11px] font-medium tracking-widest uppercase">
						<span>Start Quiz</span>
						<span className="text-sm">→</span>
					</div>
				</div>
			{/*Create Quiz (or a different feature we decide on)*/}
				<div className="group flex flex-col gap-5 border border-white/[0.08] rounded-xl p-7 cursor-pointer transition-transform duration-200 hover:-translate-y-1.5 hover:border-white/25">
					<div className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10">
						{/*Include graphic/icon here*/} Icon
					</div>

					<div className="flex-1">
						<h2 className="text-white text-2xl font-bold uppercase tracking-wide leading-tight mb-2.5">
							Quiz History
						</h2>
						<p className="text-white/35 text-[13px] leading-relaxed transition-colors duration-200 hover:text-white/70">
							Revisit scores, review past attempts, and track your improvement.
						</p>
					</div>

					<div className="flex items-center gap-1 text-white/40 text-[11px] font-medium tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity">
						<span>Open</span>
						<span className="text-sm">→</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuizHub;
