'use client';
import React from 'react';
import { Note } from '@prisma/client';
import { Trash2 } from 'react-feather';
import { toast } from 'react-toastify';
import { removeNote } from '@/app/notes/actions';
import { Button } from 'react-daisyui';
import { usePathname, useRouter } from 'next/navigation';
import { ActiveLink } from '@/components/ActiveLink';

export const NoteItem = ({ note }: { note: Note }) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <li className="hover:bg-accent/20 group">
      <ActiveLink
        href={`/notes/${note.id}`}
        activeClassname="bg-accent"
        className="flex p-2 gap-5 justify-between"
      >
        <span className="overflow-hidden overflow-ellipsis ">{note.name}</span>
        <Button
          shape="square"
          size="sm"
          color="error"
          className="opacity-0 group-hover:opacity-100 bg-error/30"
          onClick={(e) => {
            e.preventDefault();
            removeNote(note.id)
              .then(() => {
                if (path === `/notes/${note.id}`) {
                  router.push('/notes');
                  // router.refresh();
                }
              })
              .catch((error) => {
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
      </ActiveLink>
    </li>
  );
};
