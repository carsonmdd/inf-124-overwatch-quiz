export interface AnswerChoice {
    choiceID: Number;
    answerText: string;
    isCorrect: boolean;
}

export interface Question {
    questionID: Number;
    questionTitle: string;
    answerChoices: AnswerChoice[];
}
