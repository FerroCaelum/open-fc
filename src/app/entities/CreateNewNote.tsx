'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import React from 'react';
import { addGameEntity } from '@/app/entities/entitiesClient/entitiesClient';

export const FormInfo = () => {
  const status = useFormStatus();

  return (
    <div>
      <button
        onClick={() => {
          const formData = new FormData();
          formData.set('name', 'test');
          return addGameEntity({name: 'test'} as any);
        }}
      type="button">Clikkk</button>
      <h2>Pending: {JSON.stringify(status)}</h2>
      <h2>Pending: {JSON.stringify(status.data?.get('name'))}</h2>
    </div>
  );
};
