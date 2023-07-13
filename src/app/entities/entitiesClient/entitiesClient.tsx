'use server';
import { prismaClient } from '@/db/prismaClient';
import { revalidatePath } from 'next/cache';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const addGameEntity = async (data: FormData) => {
  console.log(data);
  throw new Error('test');
  // await wait(10000);
  return { status: 200, data: { id: '123' } };
  // await prismaClient.gameEntity.create({
  //   data: {
  //     name: (data.get('name') as string) ?? '',
  //     text: '',
  //   },
  // });
  // revalidatePath('/entities');
};

export const getGameEntity = async () => prismaClient.gameEntity.findMany();

export const getOneGameEntity = (id: string) =>
  prismaClient.gameEntity.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
