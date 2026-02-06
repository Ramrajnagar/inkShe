// @ts-nocheck

// import { PrismaClient } from "@prisma/client";

declare global {
    // var prisma: PrismaClient | undefined;
    var prisma: any;
}

// export const db = globalThis.prisma || new PrismaClient();
export const db = {} as any;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
