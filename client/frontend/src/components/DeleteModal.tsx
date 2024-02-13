import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Notes } from "../types";
import { fetchNotes } from "../utils/fetchNotes";
import axios from "axios";

// import React from "react"
const DeleteModal = ({setIsOpened, id}:  {setIsOpened: React.Dispatch<React.SetStateAction<boolean>>, id: number}) => {

  console.log(id)

  const queryClient = useQueryClient()

  const {
    data: notes,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes
 });

  const note = notes?.find(note => note._id === id)
  console.log(note)

  const deleteNote = async () => {
    const response = await axios.delete(`https://notely-orcin.vercel.app/notes`, {data: {id}});
    return response.data;
  };

  const mutation = useMutation({mutationFn: deleteNote});

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault()
    // Assuming newData is the data you want to update
    mutation.mutate();
  };


  if (mutation.isSuccess) {
    setIsOpened(false);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    console.log("Success");
  }

  return (
    <main className="w-full h-full backdrop top-0 left-0">
      <form action="" className="delete-modal" onSubmit={handleDelete}>
        <p className="heading">Delete Note</p>
        <p className="">Are you sure you want to delete this note?</p>
        <div className="button-container">
          <button className="cancel-button" onClick={()=> setIsOpened(false)}>Cancel</button>
          <button className="delete-button">Delete</button>
        </div>
      </form>
    </main>
  )
}

export default DeleteModal
