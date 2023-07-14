'use client';
import { addGameEntity } from '@/app/entities/entitiesActions';
import { toast } from 'react-toastify';
import React from 'react';

export const CreateNewEntity = () => {
  const addNewEntity = async (form: FormData) => {
    try {
      await addGameEntity(form);
    } catch (error: any) {
      toast(error.message);
    }
  };
  return (
    <form action={(form) => addNewEntity(form)}>
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
