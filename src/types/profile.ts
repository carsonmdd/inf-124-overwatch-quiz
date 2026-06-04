export interface Achievement {
	name: string;
	description: string;
	isAchieved: boolean;
	badgeIcon: string;
}

export interface QuizAttempt {
	id: string;
	score: number;
	completedAt: string;
}

export interface ProfileUser {
	id: string;
	username: string;
	avatarUrl: string;
	joinDate: string;
	lifetimePoints: number;
	numQuizzesPlayed: number;
	bestScore: number;
	globalRank: number;
	achievements: Achievement[];
	quizHistory: QuizAttempt[];
}
