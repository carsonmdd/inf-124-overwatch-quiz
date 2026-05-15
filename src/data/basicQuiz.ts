import { Question } from "@/types/question";

export const BasicQuiz: Question[] = [
    {
        questionID: 1,
        questionTitle: "Which hero is known a sharpshooper in Overwatch?",
        answerChoices: [
            {
                choiceID: 1,
                answerText: "Tracer",
                isCorrect: false
            },
            {
                choiceID: 2,
                answerText: "Cassidy",
                isCorrect: true
            },
            {
                choiceID: 3,
                answerText: "Fighter",
                isCorrect: false
            }
        ]
    }, 
    {
        questionID: 2,
        questionTitle: "What type of weapon is the Peacekeeper?",
        answerChoices: [
            {
                choiceID: 1,
                answerText: "Revolver",
                isCorrect: true
            },
            {
                choiceID: 2,
                answerText: "Sniper",
                isCorrect: false
            },
            {
                choiceID: 3,
                answerText: "Rocket Launcher",
                isCorrect: false
            }
        ],
    }, 
    {
        questionID: 3,
        questionTitle: "Which sub-role is under the tank class?",
        answerChoices: [
            {
                choiceID: 1,
                answerText: "Medic",
                isCorrect: false
            },
            {
                choiceID: 2,
                answerText: "Recon",
                isCorrect: false
            },
            {
                choiceID: 3,
                answerText: "Initiator",
                isCorrect: true
            }
        ]
    }, 
    {
        questionID: 4,
        questionTitle: "What is Genji's special ability?",
        answerChoices: [
            {
                choiceID: 1,
                answerText: "Wall jumping and double jumping",
                isCorrect: true
            },
            {
                choiceID: 2,
                answerText: "Quick adrenaline heal",
                isCorrect: false
            },
            {
                choiceID: 3,
                answerText: "150% defense boost for 8 seconds",
                isCorrect: false
            }
        ]
    }
]

//https://overwatch.fandom.com/wiki/Cassidy