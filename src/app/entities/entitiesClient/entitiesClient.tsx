'use server';
import { prismaClient } from '@/db/prismaClient';
import { revalidatePath } from 'next/cache';

export const addGameEntity = async (data: FormData) => {
  await prismaClient.gameEntity.create({
    data: {
      name: (data.get('name') as string) ?? '',
      text: (data.get('text') as string) ?? '',
    },
  });
  revalidatePath('/entities');
};

export const getGameEntity = async () => prismaClient.gameEntity.findMany();

export const getOneGameEntity = (id: string) =>
  prismaClient.gameEntity.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
