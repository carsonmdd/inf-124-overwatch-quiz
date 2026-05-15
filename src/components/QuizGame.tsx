'use client'
import { BasicQuiz } from "@/data/basicQuiz"
import {useState} from "react"

const QuizGame = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<Number | null>(null); //use a number to track which answer button is selected

    return (
        <>
            <div className = "question-title flex-center text-2xl font-bold py-10 px-5">
                <h1>{BasicQuiz[0].questionTitle}</h1>
            </div>
            
            <div className = "answer-choices flex-center mt-10">
                {BasicQuiz[0].answerChoices.map((choice) => (
                    <button onClick = {() => setSelectedAnswer(choice.choiceID)} className = "answer-button bg-blue-300 px-6 mx-5 border border-white-300">
                        {choice.answerText}
                    </button>
                ))}
            </div>

            <div className = "question-result">

            </div>

            <div className = "question-footer px-6 py-10 flex-center flex-col gap-5">
                <button className = "bg-orange-500 submit-button px-5 mx-5 flex-center text-lg font-bold" onClick = {() => {
                    if (BasicQuiz[0].answerChoices[selectedAnswer as number - 1].isCorrect)
                    {
                        document.getElementsByClassName("question-result")[0].innerHTML = "${BasicQuiz[0].answerChoices[selectedAnswer as number - 1].answerText} is Correct!";
                        alert("Correct!");
                    }
                    else
                    {
                        document.getElementsByClassName("question-result")[0].innerHTML = 
                        "${BasicQuiz[0].answerChoices[selectedAnswer as number - 1].answerText} is wrong! The correct answer is ${BasicQuiz[0].answerChoices.find((choice) => choice.isCorrect)?.answerText}";
                        alert("Wrong!");
                    }
                }}>
                    Submit
                </button>

                {/* need to make a state which makes the next button appear or disappear */}
                <button className = "bg-orange-500 next-button px-5 mx-5 flex-center text-lg font-bold" onClick = {() => {console.log("Next Question")}}>
                    Next Question
                </button>
            </div>
            

        </>
        

    );
};

export default QuizGame;