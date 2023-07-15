'use server';
import { prismaClient } from '@/db/prismaClient';
import { revalidatePath } from 'next/cache';

export const addNote = async (data: FormData) => {
  await prismaClient.note.create({
    data: {
      name: (data.get('name') as string) ?? '',
      text: (data.get('text') as string) ?? '',
    },
  });
  revalidatePath('/notes');
};

export const getNotes = async () => prismaClient.note.findMany();

export const getOneNote = (id: string) =>
  prismaClient.note.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

export const removeNote = async (id: string) => {
  await prismaClient.note.delete({
    where: {
      id: id,
    },
  });
  revalidatePath('/notes');
};

export const updateNote = async (id: string, data: FormData) => {
  await prismaClient.note.update({
    where: {
      id: id,
    },
    data: {
      name: (data.get('name') as string) ?? '',
      text: (data.get('text') as string) ?? '',
    },
  });
  revalidatePath('/notes');
};
