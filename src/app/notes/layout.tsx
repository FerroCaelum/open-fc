import React from 'react';
import { NotesList } from '@/app/notes/notesList/NotesList';

const NotesLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-screen flex">
      <aside className="h-screen max-h-screen w-[20rem] sticky">
        <NotesList />
      </aside>
      {children}
    </div>
  );
};

export default NotesLayout;
