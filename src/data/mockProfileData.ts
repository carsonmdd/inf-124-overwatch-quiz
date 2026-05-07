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

const baseAchievements: Achievement[] = [
	{
		achievementName: 'Just Getting Started!',
		achievementDescription:
			'Earn a total of 1000 lifetime points in Overwatch Quiz Game.',
		isAchieved: false,
		badgeIcon: '/hat.png',
	},
	{
		achievementName: 'Hat Trick',
		achievementDescription: 'Get 3 questions correct in a row.',
		isAchieved: true,
		badgeIcon: '/hat.png',
	},
	{
		achievementName: 'My First Quiz!',
		achievementDescription: 'Complete your very first overwatch quiz!',
		isAchieved: true,
		badgeIcon: '/hat.png',
	},
	{
		achievementName: 'Quite Poor Performance',
		achievementDescription:
			'Earn a 10% score or less in a single Overwatch Quiz.',
		isAchieved: false,
		badgeIcon: '/hat.png',
	},
];

export const CURRENT_USER_ID = 'user_tracer';

export const mockUsers: ProfileUser[] = [
	{
		id: 'user_tracer',
		username: 'TracerMain99',
		avatarUrl: '/hat.png',
		joinDate: '2025-08-14',
		lifetimePoints: 8420,
		longestStreak: 17,
		numQuizzesPlayed: 64,
		numQuizzesCompleted: 58,
		globalRank: 142,
		achievements: baseAchievements,
		personalBests: [
			{ difficulty: 'easy', bestScore: 100, bestStreak: 12 },
			{ difficulty: 'medium', bestScore: 92, bestStreak: 9 },
			{ difficulty: 'hard', bestScore: 78, bestStreak: 6 },
		],
		createdQuizzes: [
			{
				id: 'quiz_1',
				name: 'Tank Hero Trivia',
				difficulty: 'medium',
				questionCount: 15,
				playCount: 312,
			},
			{
				id: 'quiz_2',
				name: 'Map Knowledge Master',
				difficulty: 'hard',
				questionCount: 20,
				playCount: 87,
			},
		],
		quizHistory: [
			{
				id: 'attempt_1',
				quizName: 'Hero Abilities',
				difficulty: 'medium',
				score: 8,
				totalQuestions: 10,
				playedAt: '2026-05-06',
			},
			{
				id: 'attempt_2',
				quizName: 'Lore Lookup',
				difficulty: 'hard',
				score: 6,
				totalQuestions: 10,
				playedAt: '2026-05-05',
			},
			{
				id: 'attempt_3',
				quizName: 'Map Knowledge',
				difficulty: 'easy',
				score: 10,
				totalQuestions: 10,
				playedAt: '2026-05-03',
			},
			{
				id: 'attempt_4',
				quizName: 'Ultimate Voice Lines',
				difficulty: 'medium',
				score: 7,
				totalQuestions: 10,
				playedAt: '2026-05-01',
			},
		],
	},
	{
		id: 'user_reinhardt',
		username: 'HammerDownReinhardt',
		avatarUrl: '/hat.png',
		joinDate: '2024-11-02',
		lifetimePoints: 24910,
		longestStreak: 31,
		numQuizzesPlayed: 187,
		numQuizzesCompleted: 174,
		globalRank: 12,
		achievements: baseAchievements.map((a) => ({ ...a, isAchieved: true })),
		personalBests: [
			{ difficulty: 'easy', bestScore: 100, bestStreak: 20 },
			{ difficulty: 'medium', bestScore: 100, bestStreak: 18 },
			{ difficulty: 'hard', bestScore: 95, bestStreak: 14 },
		],
		createdQuizzes: [
			{
				id: 'quiz_3',
				name: 'Crusader Lore Deep Dive',
				difficulty: 'hard',
				questionCount: 25,
				playCount: 1024,
			},
		],
		quizHistory: [],
	},
];

export function getUserById(userId: string): ProfileUser | undefined {
	return mockUsers.find((u) => u.id === userId);
}

export function getCurrentMockUser(): ProfileUser {
	return mockUsers.find((u) => u.id === CURRENT_USER_ID) ?? mockUsers[0];
}
