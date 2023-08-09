'use client';
import React, { useState } from 'react';
import { getCaretPosition } from '@/common/getTextAreaPos';
import { Note } from '@prisma/client';

export const useMentions = (
  existingNotes: Note[],
  setNewValue: (value: string) => unknown,
  createNote: (argument: { name: string }) => Promise<Note>,
) => {
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
  const editorTextAreaRef = React.useRef<HTMLTextAreaElement>();

  console.log(suggestionsPosition);

  const filteredNotes = React.useMemo(() => {
    return existingNotes.filter((note) =>
      note.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [existingNotes, search]);

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

  const onNoteMDKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'ArrowDown') {
      if (suggestionsVisible) {
        e.preventDefault();
        setSuggestionSelected(
          (current) => (current + 1) % existingNotes.length,
        );
      }
    }
    if (e.key === 'ArrowUp') {
      if (suggestionsVisible) {
        e.preventDefault();
        setSuggestionSelected((current) =>
          current - 1 < 0
            ? existingNotes.length - 1
            : (current - 1) % existingNotes.length,
        );
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
        if (filteredNotes.length === 0) {
          createNote({ name: search }).then((note) => {
            onSuggestionsFetchRequested(`[${note.name}](${note.id})`);
          });
        } else {
          const selectedNote = filteredNotes.at(suggestionSelected);
          onSuggestionsFetchRequested(
            selectedNote ? `[${selectedNote.name}](${selectedNote.id})` : '',
          );
        }
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
    if (editorTextAreaRef.current) {
      const current = editorTextAreaRef.current.value;
      const prevText = current.slice(0, suggestionCarret - 1);
      const afterText = current.slice(suggestionCarret + search.length);
      setNewValue(prevText + value + afterText);
      setNewCarretPosition({ position: suggestionCarret + value.length });
    }
    setSuggestionVisible(false);
  };

  return {
    onTextAreaKeyDown: onNoteMDKeydown,
    onTextAreaKeyup: onNoteMDKeyup,
    suggestionsVisible,
    suggestionsPosition,
    onSuggestion: onSuggestionsFetchRequested,
    search,
    selectedSuggestion: suggestionSelected,
    filteredNotes,
  };
};
