import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { getNotes } from '@/app/notes/actions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default withPageAuthRequired(async function Note() {
  const notes = await getNotes();
  const [firstNote] = notes;
  revalidatePath('/notes');
  redirect(`/notes/${firstNote.id}`);

  return <main>Create or choose a Note from the sidebar</main>;
});
