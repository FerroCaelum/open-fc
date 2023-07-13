'use server';
import React from 'react';
import { format } from 'date-fns';
import { GameEntity } from '@prisma/client';
import Link from 'next/link';
import {
  addGameEntity,
  getGameEntity,
} from '@/app/entities/entitiesClient/entitiesClient';
import { FormInfo } from '@/app/entities/CreateNewNote';

export const EntitiesList: React.FunctionComponent = async () => {
  const gameEntities = await getGameEntity();

  return (
    <div>
      <h2>Entities</h2>
      <div>
        <CreateNewEntity />
      </div>
      <ul>
        {gameEntities.map((entity) => (
          <EntityItem key={entity.id} entity={entity} />
        ))}
      </ul>
    </div>
  );
};

const CreateNewEntity = () => {
  'use client';
  return (
    <form action={addGameEntity}>
      <FormInfo />
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

const EntityItem = ({ entity }: { entity: GameEntity }) => {
  return (
    <li>
      <Link href={`/entities/${entity.id}`}>
        {entity.name} @ {format(entity.created, 'yyyy-MM-dd')}
      </Link>
    </li>
  );
};
