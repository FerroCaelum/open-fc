import React from 'react';
import {EntitiesList} from "@/app/entities/entitiesList/EntitiesList";

const NotesLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-screen bg-slate-300 flex">
      <aside className="h-screen bg-slate-500 sticky min-w-[10rem] overflow-y-scroll">
        <EntitiesList />
      </aside>
      {children}
    </div>
  );
};

export default NotesLayout;
