import { getOneNote } from '@/app/notes/actions';
import { NoteBox } from '@/app/notes/[noteId]/NoteBox';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Note = async ({ params }: { params: { noteId: string } }) => {
  const note = await getOneNote(params.noteId);

  return <NoteBox note={note} />;
};

export default withPageAuthRequired(Note);
