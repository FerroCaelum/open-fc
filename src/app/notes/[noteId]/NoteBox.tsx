import { Note } from '@prisma/client';

export const NoteBox = ({ note }: { note: Note }) => (
  <form>
    <h1>
      <input
        id="name"
        type="text"
        className="m-3 text-[22px] bg-transparent w-full"
        defaultValue={note.name}
      />
    </h1>
    <section>
      {note.tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </section>
    <section>
      <h2>Description</h2>
      <input
        id="text"
        type="text"
        className="m-3 bg-transparent w-full"
        defaultValue={note.text}
      />
    </section>
  </form>
);
