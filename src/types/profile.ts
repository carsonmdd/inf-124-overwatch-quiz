export interface Achievement {
	achievementName: string;
	achievementDescription: string;
	isAchieved: boolean;
	badgeIcon: string;
}

export interface PersonalBest {
	difficulty: 'easy' | 'medium' | 'hard';
	bestScore: number;
	bestStreak: number;
}

export interface QuizAttempt {
	id: string;
	quizName: string;
	difficulty: 'easy' | 'medium' | 'hard';
	score: number;
	totalQuestions: number;
	playedAt: string;
}

export interface CreatedQuiz {
	id: string;
	name: string;
	difficulty: 'easy' | 'medium' | 'hard';
	questionCount: number;
	playCount: number;
}

export interface ProfileUser {
	id: string;
	username: string;
	avatarUrl: string;
	joinDate: string;
	lifetimePoints: number;
	longestStreak: number;
	numQuizzesPlayed: number;
	numQuizzesCompleted: number;
	globalRank: number;
	achievements: Achievement[];
	personalBests: PersonalBest[];
	createdQuizzes: CreatedQuiz[];
	quizHistory: QuizAttempt[];
}