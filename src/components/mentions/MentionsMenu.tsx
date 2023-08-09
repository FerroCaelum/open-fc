import clsx from 'clsx';
import { Menu } from 'react-daisyui';
import { FC } from 'react';

export const MentionsMenu: FC<{
  suggestionsPosition: {
    x: number;
    y: number;
  };
  onSuggestion: (value: string) => unknown;
  search: string;
  selectedSuggestion: number;
  options: {
    id: string;
    name: string;
  }[];
  createNoteFromSearch: () => Promise<void>;
  suggestionsVisible: boolean;
}> = ({
  suggestionsPosition,
  onSuggestion,
  search,
  selectedSuggestion,
  options,
  createNoteFromSearch,
  suggestionsVisible,
}) => {
  if (!suggestionsVisible) return null;

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
            onClick={() => onSuggestion(`[${option.name}](${option.id})`)}
            className={clsx({ 'bg-accent': selectedSuggestion === index })}
          >
            {option.name}
          </button>
        </Menu.Item>
      ))}
      {options.length === 0 && (
        <Menu.Item>
          <button onClick={createNoteFromSearch} className="bg-accent">
            Not found; press enter to create &quot;{search}&quot;
          </button>
        </Menu.Item>
      )}
    </Menu>
  );
};
