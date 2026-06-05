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
    {
      name: "First Quiz",
      description: "Complete your first quiz.",
      badgeIcon: "/checkMark-svgrepo.svg",
  },
  {
      name: "Getting the Hang of It",
      description: "Get 90% or higher on a quiz",
      badgeIcon: "/top500.png",
  },
  {
      name: "Sharpshooter",
      description: "Get five questions in a row correct",
      badgeIcon: "/target-svgrepo-com.svg",
  },
  {
      name: "Getting out of Bronze?",
      description: "Complete ten quizzes",
      badgeIcon: "/history-svgrepo-com.svg",
  },
  {
      name: "The Fan Favorite Map",
      description: "Answer a question about King's Row correctly.",
      badgeIcon: "/uk-flag-svgrepo.svg",
  },
];
