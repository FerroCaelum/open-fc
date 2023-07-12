import { GameEntity } from '@prisma/client';

export const GameEntityBox = ({ gameEntity }: { gameEntity: GameEntity }) => (
  <article>
    <h1>{gameEntity.name}</h1>
    <section>
      {gameEntity.tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </section>
    <section>
      <h2>Description</h2>
      <div>{gameEntity.text}</div>
    </section>
  </article>
);