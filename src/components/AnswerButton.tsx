interface AnswerButtonProps {
	answerText: string;
	letter: string;
	answerClass: string;
	letterClass: string;
	onClick: () => void;
}

const AnswerButton = ({
	answerText,
	letter,
	answerClass,
	letterClass,
	onClick,
}: AnswerButtonProps) => (
	<button
		onClick={onClick}
		className={`
            group flex items-center gap-4 p-4 rounded-xl text-left
            border transition-all duration-200 min-h-[62px]
            disabled:opacity-100
            ${answerClass}
        `}
	>
		<span
			className={`
                w-8 h-8 rounded-lg flex-shrink-0
                flex items-center justify-center
                text-sm font-bold transition-colors duration-200
                ${letterClass}
            `}
		>
			{letter}
		</span>
		<span className="text-white/85 text-sm font-medium leading-snug">
			{answerText}
		</span>
	</button>
);

export default AnswerButton;
