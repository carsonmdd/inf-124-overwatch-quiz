// Define Prisma singleton here so as to not exhaust Supabase tokens
// between hot reloads during development.
// Files that need to call the database correctly will import from @/lib/db
// rather than calling new PrismaClient() every time
