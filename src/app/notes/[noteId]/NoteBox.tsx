'use client';
import { Note } from '@prisma/client';
import { toast } from 'react-toastify';
import { updateNote } from '@/app/notes/notesActions';

export const NoteBox = ({ note }: { note: Note }) => {
  const saveNote = async (form: FormData) => {
    try {
      await updateNote(note.id, form);
    } catch (error: any) {
      toast(error.message);
    }
  };
  return (
    <form action={saveNote}>
      <h1>
        <input
          id="name"
          name="name"
          type="text"
          className="m-3 text-[22px] bg-transparent w-full"
          defaultValue={note.name}
        />
      </h1>
      <section>
        {note.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </section>
      <section>
        <h2>Description</h2>
        <input
          id="text"
          name="text"
          type="text"
          className="m-3 bg-transparent w-full"
          defaultValue={note.text}
        />
      </section>
      <button className="rounded bg-amber-200 p-2" type="submit">
        Save
      </button>
    </form>
  );
};
