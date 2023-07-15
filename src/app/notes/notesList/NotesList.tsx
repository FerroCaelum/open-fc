import React from 'react';
import { Note } from '@prisma/client';
import { addNote, getNotes } from '@/app/notes/notesActions';
import Link from 'next/link';
import { CreateNewNote } from '@/app/notes/notesList/CreateNewNote';
import { NoteItem } from '@/app/notes/notesList/NoteItem';

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
