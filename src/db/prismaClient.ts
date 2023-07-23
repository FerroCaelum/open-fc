import { PrismaClient } from '@prisma/client';

// @ts-ignore
if (!global.prisma) {
  // @ts-ignore
  global.prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env['DATABASE_URL'],
      },
    },
  });
}

// @ts-ignore
export const prismaClient = global.prisma;
