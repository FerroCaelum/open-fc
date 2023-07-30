import { getOneNote, getOneNoteLinks } from '@/app/notes/actions';
import { NoteBox } from '@/app/notes/[noteId]/NoteBox';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Note = async ({ params }: { params: { noteId: string } }) => {
  const note = await getOneNote(params.noteId);
  const links = await getOneNoteLinks(params.noteId);

  return <NoteBox note={note} noteLinks={links} />;
};
// @ts-ignore
export default withPageAuthRequired(Note);
