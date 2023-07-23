import { PrismaClient } from '@prisma/client';

if (!global.prisma) {
  global.prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env['DATABASE_URL'],
      },
    },
  });
}

export const prismaClient = global.prisma;
