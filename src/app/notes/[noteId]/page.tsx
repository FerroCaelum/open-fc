import { getOneNote, updateNote } from '@/app/notes/notesClient/notesApi';

const Note = async ({ params }: { params: { noteId: string } }) => {
  const note = await getOneNote(params.noteId);

  return (
    <form name="id">
      <input name="id" className="hidden" defaultValue={note.id} />
      <input
        name="title"
        type="text"
        className="m-3 text-[22px] bg-transparent w-full"
        defaultValue={note.title}
        onBlur={updateNote}
      />
      <input
        name="text"
        type="text"
        className="m-3 bg-transparent w-full"
        defaultValue={note.text}
        onBlur={updateNote}
      />
    </form>
  );
};

export default Note;
