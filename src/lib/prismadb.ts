import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
};

// Prevent multiple instances of Prisma Client in development by attaching the Prisma Client instance to the global object
const prismadb = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb

export default prismadb