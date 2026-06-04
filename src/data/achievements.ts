// staging area for QUESTIONS & ANSWERS to be inserted into the DB
// NOT TO BE IMPORTED BY COMPONENTS. DON'T DELETE OLD INSERTS. just append

// Basically, add new DB shaped objects here, 
// run ' npx prisma db seed ',
// & the script will auto insert all new questions while skipping old ones

import type Achievement from "@prisma/client";

interface AchievementSeed {
  name:        string;
  description: string;
  badgeIcon:   string;
}

export const achievements: AchievementSeed[] = [
    // TODO: translate data from seed.prisma to AchievementSeed objects
];
