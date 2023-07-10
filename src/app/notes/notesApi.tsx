'use server'

import {prismaClient} from "@/db/prismaClient";
import {revalidatePath} from "next/cache";

export const addNote = async (data: FormData) => {
    await prismaClient.note.create({
        data: {
            title: data.get('title') as string ?? '',
            text: data.get('text') as string ?? ''
        }
    })
    revalidatePath('/notes/[id]')
}

export const getNotes = async () => prismaClient.note.findMany();

export const getOneNote = (id: string) =>
    prismaClient.note.findUnique({
        where: {
            id: id
        }
    })
