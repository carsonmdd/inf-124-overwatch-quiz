//shared types for achievements
//future achievement files will import from here

import type { Category } from '@prisma/client';

//both type def
export type QuizResult = {
    userId: string;
    attempt:{
        id:string;
        score:number;
        completedAt:Date;
    };
    attemptAnswers:{
        questionId:number;
        isCorrect:boolean;
    }[];
    //for map/hero specific questions
    questions: {
    id: number;
    overfastKey: string | null;
    category: Category;
    }[];
    allAttempts: {
        id: string;
    }[];
    //for more advanced questions(such as getting a question about x hero right x amount of times)
    allCorrectAnswers: {
        questionId: number;
        question: {
        overfastKey: string | null;
        category: Category;
        };
    }[];
};

//Checks if user earned specific achievement
export type AchievementRule = {
    achievementId:number;
    check: (ctx: QuizResult) => boolean;
};