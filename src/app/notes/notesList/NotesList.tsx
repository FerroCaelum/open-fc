import React from 'react';
import { getNotes } from '@/app/notes/notesActions';
import { CreateNewNote } from '@/app/notes/notesList/CreateNewNote';
import { NoteItem } from '@/app/notes/notesList/NoteItem';

export const NotesList: React.FunctionComponent = async () => {
  const notes = await getNotes();

  return (
    <div>
      <h2>Notes</h2>
      <CreateNewNote />
      <ul>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};
