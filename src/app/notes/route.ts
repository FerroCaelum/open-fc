import { NextResponse } from 'next/server';
import { addNote, getNotes } from '@/app/notes/actions';

export async function GET(request: Request) {
  const notes = await getNotes();

  if (notes.length === 0) {
    const newNote = await addNote({ name: 'New note' });
    notes.push(newNote);
  }
  const [firstNote] = notes;
  const loginUrl = new URL(`notes/${firstNote.id}`, request.url);

  return NextResponse.redirect(loginUrl);
}
