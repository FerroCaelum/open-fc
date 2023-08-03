'use client';
import { Note, NoteLink } from '@prisma/client';
import { toast } from 'react-toastify';
import { updateNote } from '@/app/notes/actions';
import { Badge, Button, Input, Tooltip, Menu } from 'react-daisyui';
import React, { KeyboardEventHandler, useState } from 'react';
import { Edit, Save } from 'react-feather';
import MDEditor from '@uiw/react-md-editor';
import Markdown from 'react-markdown';
import { set } from 'date-fns';
import clsx from 'clsx';
import { getCaretPosition } from '@/common/getTextAreaPos';

export const NoteBox = ({
  note,
  noteLinks,
}: {
  note: Note;
  noteLinks: (NoteLink & { to: Note })[];
}) => {
  const [name, setName] = useState(note.name);
  const [noteMD, setNoteMD] = useState<string | undefined>(note.text);
  const [nameEditing, setNameEditing] = useState(false);
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const [suggestionsVisible, setSuggestionVisible] = useState(false);
  const [suggestionsPosition, setSuggestionsPosition] = useState({
    x: 0,
    y: 0,
  });
  const [suggestionCarret, setSuggestionCarret] = useState(0);
  const [suggestionSelected, setSuggestionSelected] = useState(0);

  const [search, setSearch] = React.useState('');
  const [newCarretPosition, setNewCarretPosition] = React.useState({
    position: -1,
  });

  React.useEffect(() => {
    const editorTextArea = editorTextAreaRef.current;
    if (editorTextArea && newCarretPosition.position > -1) {
      editorTextArea.focus();
      editorTextArea.setSelectionRange(
        newCarretPosition.position - 1,
        newCarretPosition.position - 1,
      );
      setNewCarretPosition({ position: -1 });
    }
  }, [newCarretPosition, setNewCarretPosition]);

  const editorTextAreaRef = React.useRef<HTMLTextAreaElement>();

  const tags =
    note.tags.length !== 0 ? (
      note.tags.map((tag) => (
        <Badge color="primary" key={tag}>
          {tag}
        </Badge>
      ))
    ) : (
      <Badge color="primary">No tags</Badge>
    );

  const links = noteLinks.length ? (
    noteLinks.map((link) => <p key={link.id}>Links to: {link.to.name}</p>)
  ) : (
    <p> No links yet </p>
  );

  const onNoteMDKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'ArrowDown') {
      if (suggestionsVisible) {
        e.preventDefault();
        setSuggestionSelected((current) => (current + 1) % 2);
      }
    }
    if (e.key === 'ArrowUp') {
      if (suggestionsVisible) {
        e.preventDefault();
        setSuggestionSelected((current) => (current + 1) % 2);
      }
    }
    if (e.key === 'Escape') {
      if (suggestionsVisible) {
        e.preventDefault();
        setSuggestionVisible(false);
      }
    }
    if (e.key === 'Enter') {
      if (suggestionsVisible) {
        e.preventDefault();
        onSuggestionsFetchRequested(
          suggestionSelected === 0 ? '[Notatka1](note1)' : '[Notatka2](note2)',
        );
      }
    }
  };

  const onNoteMDKeyup = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '[') {
      setSearch('');
      setSuggestionVisible(true);
      setSuggestionSelected(0);
      editorTextAreaRef.current = e.currentTarget;
      const cursorPosition = e.currentTarget.selectionStart;
      setSuggestionCarret(cursorPosition);
      const { x, y } = getCaretPosition(e.currentTarget);
      setSuggestionsPosition({ x, y });
    }
    if (suggestionsVisible) {
      const currentPosition = e.currentTarget.selectionStart;
      if (currentPosition < suggestionCarret) {
        setSuggestionVisible(false);
        return;
      }
      const currSearch = e.currentTarget.value.slice(
        suggestionCarret,
        currentPosition,
      );
      setSearch(currSearch);
    }
  };

  const onSuggestionsFetchRequested = (value: string) => {
    setNoteMD((current) => {
      const prevText = current?.slice(0, suggestionCarret - 1);
      const afterText = current?.slice(suggestionCarret + search.length);
      return prevText + value + afterText;
    });
    if (editorTextAreaRef.current) {
      setNewCarretPosition({ position: suggestionCarret + value.length });
    }
    setSuggestionVisible(false);
  };

  const PopupMenu = (
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
          onClick={() => onSuggestionsFetchRequested('[Notatka1](note1)')}
          className={clsx({ 'bg-accent': suggestionSelected === 0 })}
        >
          Notatka 1
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          onClick={() => onSuggestionsFetchRequested('[Notatka2](note2)')}
          className={clsx({ 'bg-accent': suggestionSelected === 1 })}
        >
          Notatka 2
        </button>
      </Menu.Item>
    </Menu>
  );

  const saveNote = async (name: string, text: string | undefined) => {
    setDescriptionEditing(false);
    setNameEditing(false);
    const fd = new FormData();
    fd.append('name', name);
    fd.append('text', text || '');
    try {
      await updateNote(note.id, fd);
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <form
      action={() => saveNote(name, noteMD)}
      className="p-8 w-full space-y-10 flex flex-col overflow-y-scroll"
    >
      <section className="flex justify-between">
        {nameEditing ? (
          <Input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onBlur={() => setNameEditing(false)}
            autoFocus
          />
        ) : (
          <Tooltip message="Click to edit!" position="bottom">
            <button
              className="text-3xl cursor-pointer inline"
              onClick={() => setNameEditing(true)}
            >
              {name}
            </button>
          </Tooltip>
        )}
        <Button color="primary" className="p-2" type="submit">
          <Save />
        </Button>
      </section>

      <section>{tags}</section>
      <section>{links}</section>

      <section className="flex flex-col flex-1 space-y-5">
        <div className="flex items-center gap-5">
          <h4 className="text-xl">Description</h4>
          <Button
            size="sm"
            color="accent"
            type="button"
            onClick={() => setDescriptionEditing((e) => !e)}
          >
            <Edit />
          </Button>
        </div>
        <div className="relative flex-1">
          {descriptionEditing ? (
            <div data-color-mode="dark" className="h-full relative">
              <MDEditor
                value={noteMD}
                onChange={setNoteMD}
                height="30rem"
                textareaProps={{
                  onKeyDown: onNoteMDKeydown,
                  onKeyUp: onNoteMDKeyup,
                }}
              />
              {suggestionsVisible && PopupMenu}
            </div>
          ) : (
            <Markdown className="h-full my-2 p-4 prose max-w-none bg-base-200 border-t border-b border-secondary">
              {noteMD || ''}
            </Markdown>
          )}
        </div>
      </section>
    </form>
  );
};
