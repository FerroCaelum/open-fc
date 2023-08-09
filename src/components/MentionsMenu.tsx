import { Note } from '@prisma/client';
import clsx from 'clsx';
import { Menu } from 'react-daisyui';

export const MentionsMenu: React.FC<{
  suggestionsPosition: { x: number; y: number };
  suggestionChosenHandler: (value: string) => unknown;
  search: string;
  suggestionSelected: number;
  options: { id: string; name: string }[];
  createNote: (argument: { name: string }) => Promise<Note>;
}> = ({
  suggestionsPosition,
  suggestionChosenHandler,
  search,
  suggestionSelected,
  options,
  createNote,
}) => {
  return (
    <Menu
      className="absolute bg-secondary translate-x-5 translate-y-32"
      style={{
        left: `${suggestionsPosition.x}px`,
        top: `${suggestionsPosition.y}px`,
      }}
    >
      {options.map((option, index) => (
        <Menu.Item key={option.id}>
          <button
            onClick={() =>
              suggestionChosenHandler(`[${option.name}](${option.id})`)
            }
            className={clsx({ 'bg-accent': suggestionSelected === index })}
          >
            {option.name}
          </button>
        </Menu.Item>
      ))}
      {options.length === 0 && (
        <Menu.Item>
          <button
            onClick={() => {
              createNote({ name: search }).then((note) => {
                suggestionChosenHandler(`[${note.name}](${note.id})`);
              });
            }}
            className="bg-accent"
          >
            Not found; press enter to create &quot;{search}&quot;
          </button>
        </Menu.Item>
      )}
    </Menu>
  );
};
