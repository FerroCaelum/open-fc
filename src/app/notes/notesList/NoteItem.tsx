'use client';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Note } from '@prisma/client';
import Link from 'next/link';
import { Trash2 } from 'react-feather';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { removeNote } from '@/app/notes/notesActions';

export const NoteItem = ({ note }: { note: Note }) => {
  const router = useRouter();

  const [error, setError] = useState('');

  return (
    <li>
      {error}
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
