import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { addNote, getNotes } from '@/app/notes/actions';
import { redirect } from 'next/navigation';

export default withPageAuthRequired(async function Note() {
  const notes = await getNotes();
  if (notes.length == 0) {
    const newNote = await addNote({ name: 'New note' });
    notes.push(newNote);
  }
  const [firstNote] = notes;
  redirect(`/notes/${firstNote.id}`);

  return <main>Create or choose a Note from the sidebar</main>;
});
