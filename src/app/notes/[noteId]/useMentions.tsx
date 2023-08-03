'use client';
import React, { useState } from 'react';
import { getCaretPosition } from '@/common/getTextAreaPos';

export const useMentions = (setNewValue: (value: string) => unknown) => {
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
  };
};
