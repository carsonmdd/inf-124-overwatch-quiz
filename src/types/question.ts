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

export interface GuestAnswer {
    text: string;
    isCorrect: boolean;
}

export interface GuestQuestion {
    id: number;
    text: string;
    category: string;
    imageUrl: string | null;
    answers: GuestAnswer[];
}
