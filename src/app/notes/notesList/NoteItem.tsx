'use client';
import React from 'react';
import { Note } from '@prisma/client';
import Link from 'next/link';
import { Trash2 } from 'react-feather';
import { toast } from 'react-toastify';
import { removeNote } from '@/app/notes/actions';
import { Button } from 'react-daisyui';

export const NoteItem = ({ note }: { note: Note }) => {
  return (
    <li className="hover:bg-accent/20 p-2 group">
      <Link href={`/notes/${note.id}`} className="flex gap-5 justify-between">
        <span className="overflow-hidden overflow-ellipsis ">{note.name}</span>
        <Button
          shape="square"
          size="sm"
          color="error"
          className="opacity-0 group-hover:opacity-100 bg-error/30"
          onClick={(e) => {
            e.preventDefault();
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
        </Button>
      </Link>
    </li>
  );
};
