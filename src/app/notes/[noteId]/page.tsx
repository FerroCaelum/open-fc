import {
  addNote,
  getNotes,
  getOneNote,
  getOneNoteLinks,
} from '@/app/notes/actions';
import { Note as NoteEntity } from '@prisma/client';
import { NoteBox } from '@/app/notes/[noteId]/NoteBox';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

const Note = async ({ params }: { params: { noteId: string } }) => {
  const notes = await getNotes();
  let note: NoteEntity | null = null;
  try {
    note = await getOneNote(params.noteId);
  } catch (error) {
    console.log(error);
  }
  if (note == null) {
    redirect('/notes');
  }
  const otherNotes = notes.filter((note_) => note_.id !== note.id);
  const links = await getOneNoteLinks(params.noteId);

  return (
    <NoteBox
      note={note}
      noteLinks={links}
      otherNotes={otherNotes}
      createNote={addNote}
    />
  );
};
// @ts-ignore
export default withPageAuthRequired(Note);
