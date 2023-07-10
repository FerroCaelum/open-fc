import React from 'react'
import {NotesList} from "@/app/notes/NotesList";

const NotesLayout = (
    {
        children, // will be a page or nested layout
    }: {
        children: React.ReactNode
    }) => {
    return <div className="h-screen bg-slate-300 flex">
        <aside className="h-screen bg-slate-500 sticky min-w-[10rem] overflow-y-scroll">
            <NotesList/>
        </aside>
        {children}
    </div>
}

export default NotesLayout