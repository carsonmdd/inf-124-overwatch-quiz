// Define Prisma singleton to not exhaust Prisma tokens across hot reloads
// during development

// import {db} from "@/lib/db";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const db = 
    globalForPrisma.prisma // will reuse client if it's already been created
    ?? new PrismaClient({
        log: ["query", "error"] // will log errors & queries
    });

// store prisma client so it survives hot reloads
// only necessary in production
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}
