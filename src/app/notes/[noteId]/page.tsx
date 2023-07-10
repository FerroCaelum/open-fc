import {getOneNote} from "@/app/notes/notesApi";


const Note = async ({params}:{params:{noteId: string}}) => {
    const note = await getOneNote(params.noteId)

    return <div>
        {JSON.stringify(note)}
    </div>
}

export default Note

// /shop/clothes/[...note_id]/

///shop/clothes/tops/t-shirts