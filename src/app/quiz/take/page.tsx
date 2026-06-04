// will make this a client component when interactivity is implemented
// currently just a proof of concept
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

//import { useState, useEffect } from 'react';
type Phase = 'loading' | 'error' | 'quiz' | 'results';
const LETTERS = ['A', 'B', 'C', 'D'];

//this will become export default function UserQuiz() {...}
const Quiz = () => {
    // temporary hardcoded values
    const currQuestion = 1;
    const totalQuestions = 10;
    const score = 0;
    const questionType = "Abilities";
    const questionText1 = "What is the name of Cassidy's ability with this description:";
    const questionText2 = "Roll in the direction you're moving and reload.";
    const answers = [
        { letter: 'A', text: "Combat Roll" },
        { letter: 'B', text: "Spurs" },
        { letter: 'C', text: "Tumble" },
        { letter: 'D', text: "Get Out Of Dodge" },
    ];

    //for client side interactivity, should be similar to guest quiz, but scores are saved for user
    //and tracks logic for achievments (like consecutive correct answers, etc)
    //const { isSignedIn, isLoaded } = useAuth();
	//const router = useRouter();

	//const [phase, setPhase] = useState<Phase>('loading'); //state to represent loading, error, quiz, and results phases all in one page
	//const [questions, setQuestions] = useState<UserQuestion[]>([]); //want to use prisma for pulling questions, figure out the appropriate type
	//const [currentIndex, setCurrentIndex] = useState(0);
	//const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	//const [hasAnswered, setHasAnswered] = useState(false);
	//const [score, setScore] = useState(0);
	//const [fetchKey, setFetchKey] = useState(0);

    /* 
    functions and use effect, should be somewhat similar to guest quiz

    function handlePlayAgain() {
		setPhase('loading');
		setCurrentIndex(0);
		setSelectedIndex(null);
		setHasAnswered(false);
		setScore(0);
		setFetchKey((k) => k + 1);
	}
    
    function handleSelectAnswer(index: number) {
		if (hasAnswered) return;
		setSelectedIndex(index);
		setHasAnswered(true);
		if (questions[currentIndex].answers[index].isCorrect) {
			setScore((s) => s + 1);
            //update a streak here.
		}
        else {//reset streak variable to 0}
	}

	function handleNext() {
		if (currentIndex < questions.length - 1) {
			setCurrentIndex((i) => i + 1);
			setSelectedIndex(null);
			setHasAnswered(false);
		} else {
			setPhase('results');
		}
	}

    if (phase === 'loading') {
		return (
			<div className="flex-1 flex items-center justify-center bg-ow-dark-blue">
				<p className="text-white/40 text-sm tracking-widest uppercase animate-pulse">
					Loading questions...
				</p>
			</div>
		);
	}

	if (phase === 'error') {
		return (
			<div className="flex-1 flex flex-col items-center justify-center bg-ow-dark-blue gap-4">
				<p className="text-white/60 text-sm">
					Could not load questions. Please try again.
				</p>
				<button
					onClick={handlePlayAgain}
					className="bg-ow-orange text-white px-6 py-2 rounded font-bold uppercase text-sm hover:bg-orange-600 transition-colors"
				>
					Try Again
				</button>
			</div>
		);
	}
    

    if (phase === 'results') {
		const total = questions.length;
		const pct = Math.round((score / total) * 100);
		const message =
			score === total
				? 'PERFECT SCORE!'
				: score >= 3
					? 'NICE WORK!'
					: 'KEEP PRACTICING!';
		//update lifetime score of the user here
        //update number of quizzes completed here

        //if user's number of completed quizzes == 1, award achievement for first quiz completed
        //if user's quiz percent score < 10% and has not achieved it, award achievment for poor perforamnce 10% or less
        
        return (
			<div className="flex-1 flex flex-col items-center justify-center bg-ow-dark-blue p-6 gap-8">
				<div className="text-center">
					<p className="text-ow-orange text-[11px] font-medium tracking-[0.28em] uppercase mb-3">
						Guest Quiz Complete
					</p>
					<h1 className="text-white font-black text-6xl uppercase tracking-tight mb-2">
						{score} <span className="text-white/30">/ {total}</span>
					</h1>
					<p className="text-white/50 text-sm uppercase tracking-widest mt-1">
						{pct}% correct — {message}
					</p>
				</div>

				<div className="flex flex-col items-center gap-3 w-full max-w-sm">
					
					<button className="w-full border border-white/20 text-white/60 py-3 rounded font-bold uppercase text-sm tracking-widest hover:text-white hover:border-white/40 transition-colors"
                    onClick={handlePlayAgain}>
						Play Again
					</button>
					<Link
						href="/"
						className="text-white/30 text-xs tracking-wider hover:text-white/60 transition-colors uppercase mt-1 flex items-center justify-center gap-2"
					>
						<ArrowLeft size={16} />
						Back to Home
					</Link>
				</div>
			</div>
		);
	}
    */

    //const question = questions[currentIndex];
	//const total = questions.length;

    return (
        <div className="flex-1 flex flex-col bg-ow-dark-blue p-6 gap-5">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <span className="text-white/40 text-[11px] font-medium tracking-[0.22em] uppercase">
                    Question {currQuestion} / {totalQuestions} {/*NOTE: USING HARDCODED VALUES*/}
                </span>
                <span className="text-ow-orange text-[11px] font-semibold tracking-[0.22em] uppercase">
                    Score: {score} {/*HARDCODED*/}
                </span>
            </div>
            {/* Progress Bar */}
            <div className="h-0.5 bg-whtie/[0.07] rounded-full">
                <div
                    className="h-full bg-ow-orange rounded-full transition-all duration-500"
                    style={{ width: `${currQuestion / totalQuestions * 100}`}}
                />
            </div>

            {/* QUESTION (to do, have questions be pulled from database appropriately with our new schema prisma) */}
            <div className="flex-1 grid grid-cols-3 gap-6 items-stretch">
                {/*Question text*/}
                <div className="col-span-2 flex flex-col gap-3 justify-center">
                    <p className="text-ow-orange text-[10px] font-medium tracking-[0.28em] uppercase">
                        {questionType} {/*HARDCODED*/}
                    </p>
                    <h2 className="text-ow-light-blue italic font-black uppercase leading-tight tracking-wide">
                        {questionText1}
                    </h2>
                    <h1 className="text-white font-black text-3xl uppercase leading-tight tracking-wide">
                        {questionText2}
                    </h1>
                </div>
                {/*Picture. Replace all ts with actual pictures*/}
                <div className="relative rounded-xl overflow-hidden border border-white/[0.09] bg-ow-blue/30 min-h-[170px]">

                    {/* Decorative rings — purely visual, removed once real portrait is added */}
                    <div className="absolute -bottom-7 -right-7 w-32 h-32 rounded-full border border-ow-light-blue/10" />
                    <div className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full border border-ow-light-blue/[0.05]" />
                    <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full border border-ow-orange/[0.07]" />

                    {/* Placeholder content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className="w-11 h-11 rounded-full border border-ow-light-blue/25 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full border border-ow-light-blue/40" />
                        </div>
                        <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
                            Hero Portrait
                        </span>
                    </div>
                </div>
            </div>

            {/*ANSWERS*/}
            <div className="grid grid-cols-2 gap-3">
                {answers.map(({ letter, text}) => (
                    <button
                        key={letter}
                        className="
                            group flex items-center gap-4 p-4 rounded-xl text-left
                            border border-ow-blue/50 bg-ow-blue/10
                            hover:bg-ow-light-blue/10 hover:border-ow-light-blue/45
                            transition-all duration-200 cursor-pointer
                            min-h-[62px]
                        ">
                        <span className="
                            w-8 h-8 rounded-lg flex-shrink-0
                            flex items-center justify-center
                            bg-ow-blue/40 text-white/45 text-sm font-bold
                            group-hover:bg-ow-light-blue/20 group-hover:text-ow-light-blue
                            transition-colors duration-200
                        ">
                            {letter}
                        </span>
                        <span className="text-white/82 text-sm font-medium leading-snug">
                            {text}
                        </span>
                    </button>
                ))}
            </div>

            {/*
			<button
				onClick={handleNext}
				disabled={!hasAnswered}
				className={`flex items-center justify-center gap-2 bg-ow-orange text-white py-3 rounded font-black uppercase text-sm tracking-widest hover:bg-orange-600 transition-colors ${!hasAnswered && 'invisible'}`}
			>
				{currentIndex < total - 1 ? 'Next Question' : 'See Results'}
				<ArrowRight size={16} />
			</button>
                Next button 
            */}
        </div>
    );
};

export default Quiz;