import {getOneNote} from "@/app/notes/notesApi";


const Note = async ({params}: { params: { noteId: string } }) => {
    const note = await getOneNote(params.noteId)

    return <form>
        <input id="title" type="text"
               className="m-3 text-[22px] bg-transparent w-full"
               defaultValue={note.title}/>
        <input id="text" type="text"
               className="m-3 bg-transparent w-full"
               defaultValue={note.text}/>
    </form>
}

export default Note