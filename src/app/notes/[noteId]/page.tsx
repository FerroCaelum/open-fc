import {
  getOneNote,
  getNotes,
  getOneNoteLinks,
  addNote,
} from '@/app/notes/actions';
import { NoteBox } from '@/app/notes/[noteId]/NoteBox';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Note = async ({ params }: { params: { noteId: string } }) => {
  const notes = await getNotes();
  const note = await getOneNote(params.noteId);
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
