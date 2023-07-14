import React from 'react';
import {
  addGameEntity,
  getGameEntity,
} from '@/app/entities/entitiesActions';
import { EntityItem } from './EntityItem';
import {CreateNewEntity} from "@/app/entities/entitiesList/CreateNewEntity";

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
