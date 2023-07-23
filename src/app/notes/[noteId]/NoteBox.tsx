'use client';
import { Note } from '@prisma/client';
import { toast } from 'react-toastify';
import { updateNote } from '@/app/notes/actions';
import { Button, Input } from 'react-daisyui';
import React, { TextareaHTMLAttributes, useCallback, useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { markdownToDraft } from 'markdown-draft-js';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const NoteBox = ({ note }: { note: Note }) => {
  const [name, setName] = useState(note.name);
  const [nameEditing, setNameEditing] = useState(false);
  const [noteMD, setNoteMD] = useState<string | undefined>(note.text);
  // const rawaObject = markdownToDraft(markdownString);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [secondEditorState, setSecondEditorState] = useState(
    EditorState.createEmpty(),
  );

  const handleEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const saveNote = async (name: string, text: string | undefined) => {
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
    <div className="w-full h-full">
      <form action={() => saveNote(name, noteMD)} className="prose p-8">
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
          <h1 onClick={() => setNameEditing(true)}>{name}</h1>
        )}
        <section>
          {note.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </section>
        <div className="bg-white text-black">
          <Editor
            className="bg-white"
            editorState={editorState}
            toolbarClassName="editor-toolbar"
            wrapperClassName="editor-wrapper"
            editorClassName="editor"
            onEditorStateChange={setEditorState}
            mention={{
              separator: ' ',
              trigger: '@',
              suggestions: [
                { text: 'APPLE', value: 'apple', url: 'apple' },
                { text: 'BANANA', value: 'banana', url: 'banana' },
                { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                { text: 'DURIAN', value: 'durian', url: 'durian' },
                { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                { text: 'FIG', value: 'fig', url: 'fig' },
                { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
              ],
            }}
            spellCheck
          />

          <Editor
            className="bg-white"
            editorState={secondEditorState}
            toolbarClassName="editor-toolbar"
            wrapperClassName="editor-wrapper"
            editorClassName="editor"
            onEditorStateChange={setSecondEditorState}
            mention={{
              separator: ' ',
              trigger: '@',
              suggestions: [
                { text: 'APPLE', value: 'apple', url: 'apple' },
                { text: 'BANANA', value: 'banana', url: 'banana' },
                { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                { text: 'DURIAN', value: 'durian', url: 'durian' },
                { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                { text: 'FIG', value: 'fig', url: 'fig' },
                { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
              ],
            }}
            spellCheck
          />
        </div>

        <pre>
          {JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
            null,
            2,
          )}
        </pre>

        <Button className="p-2" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const NoteInputs = React.forwardRef((props: any, ref: any) => {
  return (
    <div>
      <MentionsInput {...props} ref={ref}>
        <Mention
          trigger="@"
          data={[
            { id: 1, display: 'John Doe' },
            { id: 2, display: 'Jane Doe' },
          ]}
        />
      </MentionsInput>
    </div>
  );
});
