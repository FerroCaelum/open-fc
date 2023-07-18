'use client';
import React from 'react';
import { format } from 'date-fns';
import { Note } from '@prisma/client';
import Link from 'next/link';
import { Trash2 } from 'react-feather';
import { toast } from 'react-toastify';
import { removeNote } from '@/app/notes/notesActions';

export const NoteItem = ({ note }: { note: Note }) => {
  return (
    <li>
      <Link href={`/notes/${note.id}`}>
        {note.name} @ {format(note.created, 'yyyy-MM-dd')}
      </Link>
      <button
        onClick={() => {
          removeNote(note.id).catch((error) => {
            toast(error.message, {
              hideProgressBar: true,
              autoClose: 2000,
              type: 'error',
              position: 'bottom-left',
            });
          });
        }}
      >
        <Trash2 />
      </button>
    </li>
  );
};
