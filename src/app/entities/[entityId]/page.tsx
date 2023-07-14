import { getOneGameEntity } from '@/app/entities/entitiesActions';
import { GameEntityBox } from '@/app/entities/[entityId]/GameEntityBox';

const GameEntityView = async ({ params }: { params: { entityId: string } }) => {
  const entity = await getOneGameEntity(params.entityId);

  return (
    <div>
      <GameEntityBox gameEntity={entity} />
    </div>
  );
};

export default GameEntityView;
