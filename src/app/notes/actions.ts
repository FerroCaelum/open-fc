'use server';
import { prismaClient } from '@/db/prismaClient';
import { extractLinks } from '@/notes/linking';
import { revalidatePath } from 'next/cache';

export const addNote = async ({ name }: { name: string }) => {
  const newNote = await prismaClient.note.create({
    data: {
      name,
      text: '',
    },
  });
  revalidatePath('/notes');
  return newNote;
};

export const getNotes = async () =>
  prismaClient.note.findMany({
    orderBy: {
      created: 'desc',
    },
  });

export const getOneNote = (id: string) =>
  prismaClient.note.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

export const getOneNoteLinks = (noteid: string) =>
  prismaClient.noteLink.findMany({
    where: {
      fromId: noteid,
    },
    include: {
      to: true,
    },
  });

export const removeNote = async (id: string) => {
  await prismaClient.$transaction(async (prisma) => {
    await prisma.noteLink.deleteMany({
      where: {
        OR: [
          {
            fromId: id,
          },
          {
            toId: id,
          },
        ],
      },
    });
    await prisma.note.delete({
      where: {
        id: id,
      },
    });
  });

  revalidatePath('/notes');
};

export const updateNote = async (id: string, data: FormData) => {
  const noteLinks = extractLinks(data.get('text') as string);

  await prismaClient.$transaction(async (prisma) => {
    await prisma.noteLink.deleteMany({
      where: {
        fromId: id,
      },
    });

    // for now, delete all links in Note and regenarate
    const existingNotes = await prisma.note.findMany({
      where: {
        id: {
          in: noteLinks,
        },
      },
      select: {
        id: true,
      },
    });

    await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        name: (data.get('name') as string) ?? '',
        text: (data.get('text') as string) ?? '',
      },
    });

    await prisma.noteLink.createMany({
      data: existingNotes.map((note) => ({
        fromId: id,
        toId: note.id,
        description: '',
      })),
    });
  });

  revalidatePath('/notes');
};
