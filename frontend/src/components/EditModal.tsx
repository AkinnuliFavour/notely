// import React from "react"
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { Notes } from "../types";
import { FormData } from "../types";
import { useUserContext } from "../utils/useUserContext";

const EditModal = ({handleCloseEditModal, id}:  {handleCloseEditModal: () => void, id: number}) => {

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Personal")
  const [description, setDescription] = useState("")

  const { user } = useUserContext();
  console.log(user)

  const queryClient = useQueryClient()

  const fetchNotes = async () => {
    const response = await axios.get(`https://notely-orcin.vercel.app/notes?userId=${user}`);
    return response.data;
  };

  const {
    data: notes,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes });

  const note = notes?.find(note => note._id === id)

useEffect(() => {
  if(note) {
    setTitle(note.title)
    setCategory(note.category)
    setDescription(note.description)
  }
}
, [note])

const updateData = async (data: FormData) => {
  const response = await axios.put(`https://notely-orcin.vercel.app/notes/`, data);
  return response.data; // Assuming your API returns updated data
};

const mutation = useMutation({
  mutationFn: updateData,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  }
});

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Assuming newData is the data you want to update

    if(user){
      mutation.mutate({
        id, 
        userId: user,
        title, 
        category, 
        description,  
        completed: note ? note.completed : false
      });
    }
    
    handleCloseEditModal()
  };


  if (mutation.isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    console.log("Success");
  }

    return (
      <main className="w-full h-full backdrop top-0 left-0 p-2 md:p-4">
        <section className="modal w-full md:w-2/3 min-h-max">
          <p className="heading">Edit Note</p>
          <form action="" className="modal-form md:flex-col" onSubmit={handleUpdate}>
            <div className="input-container w-full">
              <label htmlFor="title">Title</label>
              <input
               type="text" 
               id="title" 
               name="title" 
               className="title-input"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="input-container w-full">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category" 
                className="category-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="Home">Home</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="input-cotainer description-container flex flex-col w-full">
              <label htmlFor="content">Description(optional)</label>
              <textarea 
                name="content" 
                id="content" 
                maxLength={180} 
                cols={30} 
                rows={10}
                placeholder="Add a description... (Max 180 characters)"
                className="description-input" 
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              >

              </textarea>
            </div>
            <div className="button-container md:self-start md:mt-4 pb-3">
              <button type="button" className="cancel-button" onClick={() => handleCloseEditModal()}>Cancel</button>
              <button 
                type="submit" 
                className="add-button px-6"
               
              >
                Edit
              </button>
            </div>
          </form>
        </section>
      </main>
    )
  }
  
  export default EditModal
  