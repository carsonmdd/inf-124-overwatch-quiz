// script that reads from src/data/ and inserts new questions into the DB
// safe to run many times (old questions are skipped, new questions are added)

// run w/ npx prisma db seed

import { PrismaClient } from '@prisma/client'; // create prisma session
import { questions } from '../src/data/questions';
import { achievements } from '../src/data/achievements';
// add other imports here for future data files

const prisma = new PrismaClient();

async function main() {
    // right now, just validates Question and Answer
    let inserted = 0;
    let skipped = 0;
    let failed = 0;
    // ensure question doesn't already exist in DB
    for (const q of questions) {
        const exists = await prisma.question.findFirst({
            where: { questionText: q.questionText },
        });
        if (exists) {
            ++skipped;
            continue;
        }

        // ensure Answer fits proper params
        if (q.answers.length !== 4) {
            // consider adding additional validation checks here
            ++failed;
            // consider logging WHICH question failed
            continue;
        }

        // insert
        await prisma.question.create({
            data: {
                questionText:       q.questionText,
                questionContext:    q.questionContext   ?? null,
                category:           q.category,
                difficulty:         q.difficulty,
                subjectName:        q.subjectName       ?? null,
                overfastKey:        q.overfastKey       ?? null,
                imageUrl:           q.imageUrl          ?? null,

                answers: {
                    create: q.answers.map((answer, index) => ({
                        answerText:      answer.answerText,
                        isCorrect:      answer.isCorrect,
                        displayOrder:   index + 1,
                    })),
                },
            },
        });
        ++inserted;
    }
    logDBInsertion(questions.length, inserted, skipped, failed);
}

function logDBInsertion(questions: number, inserted: number, skipped: number, failed: number): void {
    console.log(`Found ${questions} questions in data file.\n`);
    console.log(`Inserted: ${inserted}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Failed: ${failed}`);
}

main().catch((error) => {
    console.error('Seeding DB failed:', error);
    process.exit(1);
}).finally(async() => {
    await prisma.$disconnect();
})