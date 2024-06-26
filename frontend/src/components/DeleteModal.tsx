/**
 * This file contains the DeleteModal component.
 * 
 * @module DeleteModal
 * @filepath /workspaces/notely/client/frontend/src/components/DeleteModal.tsx
 * @description This component provides a modal for deleting items.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const mutation = useMutation({
    mutationFn: deleteNote,
    // if the mutation is successful, invalidate the notes query
    onSuccess: () => {
      successNotify();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  });

  const handleDelete = (e: React.FormEvent) => {
    // prevent the default form submission
    e.preventDefault()

    // close the modal
    handleCloseDeleteModal();
    
    // call the mutation function
    mutation.mutate();
  };

  const successNotify = () => toast.success('Note has been deleted successfully!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  return (
    <main className="w-full h-full backdrop top-0 left-0 p-2 md:p-0">
      <form action="" className="delete-modal w-full md:w-1/2" onSubmit={handleDelete}>
        <p className="heading">Delete Note</p>
        <p className="">Are you sure you want to delete this note?</p>
        <div className="button-container self-end">
          <button className="cancel-button" onClick={handleCloseDeleteModal}>Cancel</button>
          <button className="delete-button">Delete</button>
        </div>
      </form>
    </main>
  )
}

export default DeleteModal
