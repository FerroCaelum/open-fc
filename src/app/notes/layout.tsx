import React from 'react';
import { NotesList } from '@/app/notes/notesList/NotesList';

const NotesLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-scree flex">
      <aside className="h-screen bg-secondary sticky min-w-[10rem] overflow-y-scroll">
        <NotesList />
      </aside>
      {children}
    </div>
  );
};

export default NotesLayout;
