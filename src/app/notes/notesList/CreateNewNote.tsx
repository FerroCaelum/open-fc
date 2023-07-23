'use client';
import { toast } from 'react-toastify';
import React from 'react';
import { addNote } from '@/app/notes/actions';
import { Button, Input } from 'react-daisyui';

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
        <Input name="name" />
      </fieldset>
      <Button type="submit">Save</Button>
    </form>
  );
};
