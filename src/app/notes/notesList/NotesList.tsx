import React from 'react';
import { getNotes } from '@/app/notes/actions';
import { CreateNewNote } from '@/app/notes/notesList/CreateNewNote';
import { NoteItem } from '@/app/notes/notesList/NoteItem';

export const NotesList: React.FunctionComponent = async () => {
  const notes = await getNotes();

  return (
    <div className="p-2 space-y-4 bg-secondary min-h-full max-h-full flex flex-col">
      <h2 className="text-center text-xl font-bold py-2">Notes</h2>
      <CreateNewNote />
      <ul className="divide-y overflow-y-scroll">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};
