'use client';
import { Note, NoteLink } from '@prisma/client';
import { toast } from 'react-toastify';
import { updateNote } from '@/app/notes/actions';
import { Badge, Button, Input, Tooltip } from 'react-daisyui';
import React, { useState } from 'react';
import { Edit, Save } from 'react-feather';
import MDEditor from '@uiw/react-md-editor';
import Markdown from 'react-markdown';
import { useMentions } from '@/components/mentions/useMentions';
import { MentionsMenu } from '@/components/mentions/MentionsMenu';

export const NoteBox = ({
  note,
  noteLinks,
  otherNotes,
  createNote,
}: {
  note: Note;
  noteLinks: (NoteLink & { to: Note })[];
  otherNotes: Note[];
  createNote: (argument: { name: string }) => Promise<Note>;
}) => {
  const [name, setName] = useState(note.name);
  const [noteMD, setNoteMD] = useState<string | undefined>(note.text);
  const [nameEditing, setNameEditing] = useState(false);
  const [descriptionEditing, setDescriptionEditing] = useState(false);

  const {
    onTextAreaKeyDown: onNoteMDKeydown,
    onTextAreaKeyup: onNoteMDKeyup,
    mentionsProps,
  } = useMentions('[', otherNotes, setNoteMD, createNote);

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
              <MentionsMenu {...mentionsProps} />
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
