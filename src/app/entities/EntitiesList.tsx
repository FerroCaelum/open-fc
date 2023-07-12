import React from 'react';
import { format } from 'date-fns';
import { GameEntity } from '@prisma/client';
import Link from 'next/link';
import {
  addGameEntity,
  getGameEntity,
} from '@/app/entities/entitiesClient/entitiesClient';

export const EntitiesList: React.FunctionComponent = async () => {
  const gameEntities = await getGameEntity();

  return (
    <div>
      <h2>Entities</h2>
      <div>
        <CreateNewNote />
      </div>
      <ul>
        {gameEntities.map((entity) => (
          <EntityItem key={entity.id} entity={entity} />
        ))}
      </ul>
    </div>
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

const CreateNewNote = () => {
  return (
    <form method="POST" action={addGameEntity}>
      <fieldset>
        <legend>Name</legend>
        <input name="name" />
      </fieldset>
      <fieldset>
        <legend>Text</legend>
        <input name="text" />
      </fieldset>
      <button type="submit" className="rounded bg-amber-200 p-2">
        Save
      </button>
    </form>
  );
};
