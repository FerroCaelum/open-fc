import React from 'react';
import { Note } from '@prisma/client';
import { addNote, getNotes } from '@/app/notes/notesClient/notesApi';
import Link from 'next/link';

export const NotesList: React.FunctionComponent = async () => {
  const notes = await getNotes();

  return (
    <div>
      <h2>notes list:</h2>
      <div>
        <CreateNewNote />
      </div>
      <ul>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

const NoteItem = ({ note }: { note: Note }) => {
  return (
    <li>
      <Link href={`/notes/${note.id}`}>{note.title}</Link>
    </li>
  );
};

const CreateNewNote = () => {
  'use client';

  return (
    <form method="POST" action={addNote}>
      <fieldset>
        <legend>Title</legend>
        <input name="title" />
      </fieldset>
      <fieldset>
        <legend>Text</legend>
        <input name="text" />
      </fieldset>
      <button type="submit" className="rounded bg-amber-200 p-2">
        Save
      </button>
    </form>
  );
};
