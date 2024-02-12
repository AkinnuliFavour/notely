// import React from "react"
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { fetchNotes } from "../utils/fetchNotes";
import { Notes } from "../types";
import { FormData } from "../types";

const EditModal = ({setEditOpened, id}:  {setEditOpened: React.Dispatch<React.SetStateAction<boolean>>, id: number}) => {

  const queryClient = useQueryClient()

  const {
    data: notes,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes });

  const note = notes?.find(note => note._id === id)

  // const [formData, setFormData] = useState({
  //   id,
  //   title: "",
  //   category: "",
  //   description: ""
  // })

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Personal")
  const [description, setDescription] = useState("")

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

  // const apiUrl = `https://notely-orcin.vercel.app/notes`

  // const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setFormData({...formData, category: e.target.value})
  // }

const mutation = useMutation({mutationFn: updateData});

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Assuming newData is the data you want to update
    mutation.mutate({
      id, 
      title, 
      category, 
      description,  
      completed: note ? note.completed : false
    });
  };


  if (mutation.isSuccess) {
    setEditOpened(false);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    console.log("Success");
  }

    return (
      <main className="w-full h-full backdrop top-0 left-0">
        <section className="modal">
          <p className="heading">Edit Note</p>
          <form action="" className="modal-form">
            <div className="input-container">
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
            <div className="input-container">
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
            <div className="input-cotainer description-container flex flex-col">
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
            <div className="button-container">
              <button type="submit" className="cancel-button" onClick={() => setEditOpened(false)}>Cancel</button>
              <button 
                type="button" 
                className="add-button px-6"
                onClick={handleUpdate}
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
  