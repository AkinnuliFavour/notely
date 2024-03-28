/**
 * This file contains the DeleteModal component.
 * 
 * @module DeleteModal
 * @filepath /workspaces/notely/client/frontend/src/components/DeleteModal.tsx
 * @description This component provides a modal for deleting items.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const DeleteModal = ({handleCloseDeleteModal, id}:  {handleCloseDeleteModal: () => void, id: number}) => {

  console.log(id)

  const queryClient = useQueryClient()

  //fetch the notes
//   const {
//     data: notes,
//   } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes
//  });

  //find the note with the id
  // const note = notes?.find(note => note._id === id)
  // console.log(note)

  // function to delete a note
  const deleteNote = async () => {
    const response = await axios.delete(`https://notely-orcin.vercel.app/notes`, {data: {id}});
    return response.data;
  };

  //useMutation hook
  const mutation = useMutation({mutationFn: deleteNote});

  const handleDelete = (e: React.FormEvent) => {
    //prevent the default form submission
    e.preventDefault()
    // call the mutation function
    mutation.mutate();
  };

  //if the mutation is successful, close the modal and invalidate the notes query
  if (mutation.isSuccess) {
    handleCloseDeleteModal();
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    console.log("Success");
  }

  return (
    <main className="w-full h-full backdrop top-0 left-0">
      <form action="" className="delete-modal" onSubmit={handleDelete}>
        <p className="heading">Delete Note</p>
        <p className="">Are you sure you want to delete this note?</p>
        <div className="button-container">
          <button className="cancel-button" onClick={handleCloseDeleteModal}>Cancel</button>
          <button className="delete-button">Delete</button>
        </div>
      </form>
    </main>
  )
}

export default DeleteModal
