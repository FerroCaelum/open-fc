'use client';
import { toast } from 'react-toastify';
import React from 'react';
import { addNote } from '@/app/notes/actions';
import { Button, Input } from 'react-daisyui';
import { Plus } from 'react-feather';

export const CreateNewNote = () => {
  const addNewNote = async (form: FormData) => {
    try {
      await addNote(form);
    } catch (error: any) {
      toast(error.message);
    }
  };
  return (
    <form action={(form) => addNewNote(form)} className="pr-2">
      <div className="flex box-content gap-1">
        <Input
          className="flex-1 min-w-0"
          name="name"
          size="sm"
          placeholder="Note Title..."
        />
        <Button shape="square" type="submit" size="sm">
          <Plus />
        </Button>
      </div>
    </form>
  );
};
