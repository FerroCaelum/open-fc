'use server';
import { prismaClient } from '@/db/prismaClient';
import { revalidatePath } from 'next/cache';


export const addGameEntity = async (data: FormData) => {
  await prismaClient.gameEntity.create({
    data: {
      name: (data.get('name') as string) ?? '',
      text: '',
    },
  });
  revalidatePath('/entities');
};

export const getGameEntity = () => prismaClient.gameEntity.findMany();

export const getOneGameEntity = (id: string) =>
  prismaClient.gameEntity.findUniqueOrThrow({
    where: {
      id: id,
    },
  });


export const removeGameEntity = async (id: string) => {
  await prismaClient.gameEntity.delete({
    where: {
      id: id,
    },
  });
  revalidatePath('/entities');
}