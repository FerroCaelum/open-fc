'use client';
import { toast } from 'react-toastify';
import React from 'react';
import { addNote } from '@/app/notes/actions';
import { Button, Input } from 'react-daisyui';
import { Plus } from 'react-feather';
import { useRouter } from 'next/navigation';

export const CreateNewNote = () => {
  const router = useRouter();
  const addNewNote = async (form: FormData, formElement: HTMLFormElement) => {
    const name = form.get('name');
    try {
      const newNote = await addNote({ name: name as string });
      formElement.reset();
      router.push(`/notes/${newNote.id}`);
      // router.refresh();
    } catch (error: any) {
      toast(error.message);
    }
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        addNewNote(formData, event.currentTarget);
      }}
      className="pr-2"
    >
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
