'use client';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { GameEntity } from '@prisma/client';
import Link from 'next/link';
import { Trash2 } from 'react-feather';
import { removeGameEntity } from '@/app/entities/entitiesActions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const EntityItem = ({ entity }: { entity: GameEntity }) => {
  const router = useRouter();

  const [error, setError] = useState('');

  return (
    <li>
      {error}
      <Link href={`/entities/${entity.id}`}>
        {entity.name} @ {format(entity.created, 'yyyy-MM-dd')}
      </Link>
      <button
        onClick={() => {
          removeGameEntity(entity.id)
            .catch((error) => {
              toast(error.message, {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'error',
                position: 'bottom-left',
              });
            })
            .finally(() => {
              router.push('/entities');
            });
        }}
      >
        <Trash2 />
      </button>
    </li>
  );
};

