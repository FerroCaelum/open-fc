'use client';
import { toast } from 'react-toastify';
import React from 'react';
import { addNote } from '@/app/notes/notesActions';

export const CreateNewNote = () => {
  const addNewNote = async (form: FormData) => {
    try {
      await addNote(form);
    } catch (error: any) {
      toast(error.message);
    }
  };
  return (
    <form action={(form) => addNewNote(form)}>
      <fieldset>
        <legend>Name</legend>
        <input name="name" />
      </fieldset>
      <button type="submit" className="rounded bg-amber-200 p-2">
        Save
      </button>
    </form>
  );
};
