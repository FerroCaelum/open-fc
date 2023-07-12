import { getOneGameEntity } from '@/app/entities/entitiesClient/entitiesClient';
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

// /shop/clothes/[...note_id]/

///shop/clothes/tops/t-shirts
