import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Notes } from "../types";
import { fetchNotes } from "../utils/fetchNotes";
import axios from "axios";

// import React from "react"
const DeleteModal = ({setIsOpened, id}:  {setIsOpened: React.Dispatch<React.SetStateAction<boolean>>, id: number}) => {
  const queryClient = useQueryClient()

  const {
    data: notes,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes
 });

  const note = notes?.find(note => note._id === id)

  const deleteData = async (noteId: number) => {
    const response = await axios.delete(`https://notely-orcin.vercel.app/notes/`, { data: noteId });
    return response.data; // Assuming your API returns updated data
  };

  const mutation = useMutation({mutationFn: deleteData});

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault()
    // Assuming newData is the data you want to update
    mutation.mutate(Number(note?._id));
  };


  if (mutation.isSuccess) {
    setIsOpened(false);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    console.log("Success");
  }

  return (
    <main className="w-full h-full backdrop top-0 left-0">
      <section className="delete-modal">
        <p className="heading">Delete Note</p>
        <p className="">Are you sure you want to delete this note?</p>
        <div className="button-container">
          <button className="cancel-button" onClick={()=> setIsOpened(false)}>Cancel</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </section>
    </main>
  )
}

export default DeleteModal
