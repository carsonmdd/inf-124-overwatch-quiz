// will make this a client component when interactivity is implemented
// currently just a proof of concept
import QuizGame from '@/components/QuizGame'

const Quiz = () => {
    // temporary hardcoded values
    const currQuestion = 1;
    const totalQuestions = 10;
    const score = 0;
    const questionType = "Abilities";
    const questionText = "What is the name of Cassidy's ability with this description: Roll in the direction you're moving and reload.";
    const answers = [
        { letter: 'A', text: "Combat Roll" },
        { letter: 'B', text: "Spurs" },
        { letter: 'C', text: "Tumble" },
        { letter: 'D', text: "Get Out Of Dodge" },
    ];

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

            {/* QUESTION */}
            <div className="flex-1 grid grid-cols-3 gap-6 items-stretch">
                {/*Question text*/}
                <div className="col-span-2 flex flex-col gap-3 justify-center">
                    <p className="text-ow-orange text-[10px] font-medium tracking-[0.28em] uppercase">
                        {questionType} {/*HARDCODED*/}
                    </p>
                    <h1 className="text-white font-black text-3xl uppercase leading-tight tracking-wide">
                        {questionText}
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
        </div>
    );
};

export default Quiz;