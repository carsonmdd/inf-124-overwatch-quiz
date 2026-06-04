// staging area for QUESTIONS & ANSWERS to be inserted into the DB
// NOT TO BE IMPORTED BY COMPONENTS. DON'T DELETE OLD INSERTS. just append

// Basically, add new DB shaped objects here, 
// run ' npx prisma db seed ',
// & the script will auto insert all new questions while skipping old ones
import type { Category, Difficulty } from '@prisma/client';

interface QuestionSeed {
    questionText:       string;
    questionContext?:   string;
    category:           Category;
    difficulty:         Difficulty;
    subjectName?:       string;
    overfastKey?:       string;
    imageUrl?:          string;
    answers:            AnswerSeed[];
    // id auto generated
}

interface AnswerSeed {
    answerText:     string;
    isCorrect:      boolean;
    // displayOrder is derived from array position in nested create stmt
    // questionId inferenced by nested create stmt
}

export const questions: QuestionSeed[] = [
    // just a list of json objects we want to add to the db. pure TS
    {
        questionText:   "What hero is this?",
        category:       "HERO_IDENTIFICATION",
        difficulty:     "EASY",
        subjectName:    "Bastion",
        overfastKey:    "bastion",
        imageUrl:       "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4ede795c2a681aaccfa72d0c901cba0cb8a2c292fd6a97b2ba9faed161c2d184.png",
        answers: [
            { answerText: "Bastion", isCorrect: true },
            { answerText: "Zenyatta", isCorrect: false },
            { answerText: "Ramattra", isCorrect: false },
            { answerText: "Orisa", isCorrect: false },
        ]
    },
    {
        questionText:   "How much health does this hero have?",
        category:       "HERO_HEALTH",
        difficulty:     "EASY",
        subjectName:    "Mei",
        overfastKey:    "mei",
        imageUrl:       "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4a55ced3bd597fb08e0fde9dc007f8543ac616ba98ca3db9b0e4d871a8ae17f8.png",
        answers: [
            { answerText: "250", isCorrect: false },
            { answerText: "300", isCorrect: true },
            { answerText: "275", isCorrect: false },
            { answerText: "350", isCorrect: false }, // generate these.
        ]
    },
    {
        questionText:   "What map is this?",
        category:       "MAP_IDENTIFICATION",
        difficulty:     "EASY",
        subjectName:    "Rialto",
        overfastKey:    "rialto",
        imageUrl:       "https://overfast-api.tekrop.fr/static/maps/malevento.jpg",
        answers: [
            { answerText: "Venice", isCorrect: false },
            { answerText: "Esperança", isCorrect: false },
            { answerText: "Malevento", isCorrect: true },
            { answerText: "Rialto", isCorrect: false },
        ]
    },
    {
        questionText:   "How many Push maps are there?",
        category:       "MAP_TYPE",
        difficulty:     "MEDIUM",
        subjectName:    "Push",
        overfastKey:    "push",
        imageUrl:       "https://overfast-api.tekrop.fr/static/maps/new-queen-street.jpg",
        answers: [
            { answerText: "1", isCorrect: false },
            { answerText: "2", isCorrect: false },
            { answerText: "3", isCorrect: false },
            { answerText: "4", isCorrect: true },
        ]
    },
    {
        questionText:   "What is the name of Emre's minor perk with this description:",
        questionContext: "Siphon Blaster's movement speed bonus is increased by 20% while not firing.",
        category:       "MINOR_PERK",
        difficulty:     "MEDIUM",
        subjectName:    "Emre",
        overfastKey:    "emre",
        imageUrl:       "https://d15f34w2p8l1cc.cloudfront.net/overwatch/c51e2f698138861c0e3b6cfab3c3ca9d67fd709be175e7c397aa6f2649712a30.png",
        answers: [
            { answerText: "Movement Protocol", isCorrect: false },
            { answerText: "Enhanced Agility", isCorrect: true },
            { answerText: "Unburdened", isCorrect: false },
            { answerText: "Quick On Your Feet", isCorrect: false },
        ]
    },
    {
        questionText:   "What is the name of Ashe's major perk with this description:",
        questionContext: "Hitting 2 consecutive scoped shots on a target deals 25 extra damage and reloads 1 ammo.",
        category:       "MAJOR_PERK",
        difficulty:     "MEDIUM",
        subjectName:    "Ashe",
        overfastKey:    "ashe",
        imageUrl:       "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4076bbaa2eb52a0bfe612434071e56e7702d5454473dbbea2f9e392a9d997a94.png",
        answers: [
            { answerText: "Toxic Bullets", isCorrect: false },
            { answerText: "Scrappy", isCorrect: false },
            { answerText: "Bullet Dance", isCorrect: false },
            { answerText: "Viper's Sting", isCorrect: true },
        ]
    },
    {
        questionText:       "What is the name of Cassidy's ability with this description:",
        questionContext:    "Roll in the direction you're moving and reload.",
        category:           "HERO_ABILITY",
        difficulty:         "MEDIUM",
        subjectName:        "Cassidy",
        overfastKey:        "cassidy",
        imageUrl:           "https://d15f34w2p8l1cc.cloudfront.net/overwatch/6cfb48b5597b657c2eafb1277dc5eef4a07eae90c265fcd37ed798189619f0a5.png",
        answers: [
            { answerText: 'Tumble',             isCorrect: false },
            { answerText: 'Spurs',              isCorrect: false },
            { answerText: 'Combat Roll',        isCorrect: true },
            { answerText: "Get Out Of Dodge",   isCorrect: false }
        ]
        // for an explanation on how Prisma knows to insert into Answer based
        // on this nested array, see seed.ts
    },
    {
        questionText:   "What is Kiriko's subrole?",
        category:       "HERO_SUBROLE",
        difficulty:     "MEDIUM",
        subjectName:    "Kiriko",
        overfastKey:    "kiriko",
        imageUrl:       "https://d15f34w2p8l1cc.cloudfront.net/overwatch/408603fe037e8576078eaac5eab2fb251489ced4003b11f5f522776d43d0b83d.png",
        answers: [
            { answerText: "Medic", isCorrect: true },
            { answerText: "Survivor", isCorrect: false },
            { answerText: "Tactician", isCorrect: false },
            { answerText: "Specialist", isCorrect: false },
        ]
    },
    {
        questionText:   "What is the location of this map?",
        category:       "MAP_LOCATION",
        difficulty:     "HARD",
        subjectName:    "Aatlis",
        overfastKey:    "aatlis",
        imageUrl:       "https://overfast-api.tekrop.fr/static/maps/aatlis.jpg",
        answers: [
            { answerText: "Cordoba", isCorrect: false },
            { answerText: "Morocco", isCorrect: true },
            { answerText: "Andalusia", isCorrect: false },
            { answerText: "Gibraltar", isCorrect: false },
        ]
    },
    {
        questionText:   "Where is Doomfist from?",
        category:       "HERO_LOCATION",
        difficulty:     "HARD",
        subjectName:    "Doomfist",
        overfastKey:    "doomfist",
        imageUrl:       "https://d15f34w2p8l1cc.cloudfront.net/overwatch/ff5c54f43ad253c7faeda9c4ed31d42582ea6b19205d197866f3dd0c0aa14c16.png",
        answers: [
            { answerText: "Sekondi-Takoradi, Ghana", isCorrect: false },
            { answerText: "Lagos, Nigeria", isCorrect: false },
            { answerText: "Numbani, Nigeria", isCorrect: false },
            { answerText: "Oyo, Nigeria", isCorrect: true },
        ]
    },
];
