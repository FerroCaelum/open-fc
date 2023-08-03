import clsx from 'clsx';
import { Menu } from 'react-daisyui';

export const MentionsMenu: React.FC<{
  suggestionsPosition: { x: number; y: number };
  suggestionChosenHandler: (value: string) => unknown;
  search: string;
  suggestionSelected: number;
}> = ({
  suggestionsPosition,
  suggestionChosenHandler,
  search,
  suggestionSelected,
}) => {
  return (
    <Menu
      className="absolute bg-secondary translate-x-5 translate-y-full"
      style={{
        left: `${suggestionsPosition.x}px`,
        top: `${suggestionsPosition.y}px`,
      }}
    >
      <Menu.Item>
        <a>{search}</a>
      </Menu.Item>
      <Menu.Item>
        <button
          onClick={() => suggestionChosenHandler('[Notatka1](note1)')}
          className={clsx({ 'bg-accent': suggestionSelected === 0 })}
        >
          Notatka 1
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          onClick={() => suggestionChosenHandler('[Notatka2](note2)')}
          className={clsx({ 'bg-accent': suggestionSelected === 1 })}
        >
          Notatka 2
        </button>
      </Menu.Item>
    </Menu>
  );
};
