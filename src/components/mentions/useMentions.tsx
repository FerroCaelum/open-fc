'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getCaretPosition } from '@/common/getTextAreaPos';
import { Note } from '@prisma/client';

export const useMentions = (
  triggerCharacter: string,
  existingNotes: Note[],
  setNewValue: (value: string) => unknown,
  createNote: (argument: { name: string }) => Promise<Note>,
) => {
  const [suggestionsVisible, setSuggestionVisible] = useState(false);
  const [suggestionsPosition, setSuggestionsPosition] = useState({
    x: 0,
    y: 0,
  });
  const [suggestionCaret, setSuggestionCaret] = useState(0);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);

  const [search, setSearch] = useState('');
  const [newCaretPosition, setNewCaretPosition] = useState({
    position: -1,
  });
  const editorTextAreaRef = useRef<HTMLTextAreaElement>();

  const options = useMemo(() => {
    return existingNotes.filter((note) =>
      note.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [existingNotes, search]);

  useEffect(() => {
    const editorTextArea = editorTextAreaRef.current;
    if (editorTextArea && newCaretPosition.position > -1) {
      editorTextArea.focus();
      editorTextArea.setSelectionRange(
        newCaretPosition.position - 1,
        newCaretPosition.position - 1,
      );
      setNewCaretPosition({ position: -1 });
    }
  }, [newCaretPosition, setNewCaretPosition]);

  const onSuggestion = (value: string) => {
    if (editorTextAreaRef.current) {
      const current = editorTextAreaRef.current.value;
      const prevText = current.slice(0, suggestionCaret - 1);
      const afterText = current.slice(suggestionCaret + search.length);

      setNewValue(prevText + value + afterText);
      setNewCaretPosition({ position: suggestionCaret + value.length });
    }
    setSuggestionVisible(false);
  };

  const createNoteFromSearch = async (): Promise<void> => {
    const note = await createNote({ name: search });
    onSuggestion(`[${note.name}](${note.id})`);
  };

  const onTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!suggestionsVisible) {
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestion((current) => (current + 1) % existingNotes.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestion((current) =>
        current - 1 < 0
          ? existingNotes.length - 1
          : (current - 1) % existingNotes.length,
      );
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setSuggestionVisible(false);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (options.length === 0) {
        void createNoteFromSearch();
      } else {
        const selectedNote = options.at(selectedSuggestion);
        onSuggestion(
          selectedNote ? `[${selectedNote.name}](${selectedNote.id})` : '',
        );
      }
    }
  };

  const onTextAreaKeyup = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === triggerCharacter) {
      setSearch('');
      setSuggestionVisible(true);
      setSelectedSuggestion(0);
      setSuggestionCaret(e.currentTarget.selectionStart);
      setSuggestionsPosition(getCaretPosition(e.currentTarget));
      editorTextAreaRef.current = e.currentTarget;
    }
    if (suggestionsVisible) {
      const currentPosition = e.currentTarget.selectionStart;
      if (currentPosition < suggestionCaret) {
        setSuggestionVisible(false);
        return;
      }
      const currSearch = e.currentTarget.value.slice(
        suggestionCaret,
        currentPosition,
      );
      setSearch(currSearch);
    }
  };

  return {
    onTextAreaKeyDown,
    onTextAreaKeyup,
    mentionsProps: {
      suggestionsVisible,
      suggestionsPosition,
      onSuggestion,
      search,
      selectedSuggestion,
      options,
      createNoteFromSearch,
    },
  };
};
