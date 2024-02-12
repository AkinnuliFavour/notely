// import React from "react"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Notes } from "../types";
import { fetchNotes } from "../utils/fetchNotes";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormData } from "../types";

const AddModal = ({ setIsOpened, id }:  { setIsOpened: React.Dispatch<React.SetStateAction<boolean>>, id: number }) => {
  const queryClient = useQueryClient()

  const {
    data: notes,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes
 });

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

const createData = async (data: FormData) => {
  const response = await axios.post("https://notely-orcin.vercel.app/notes/", data);
  return response.data; // Assuming your API returns updated data
};

const mutation = useMutation({mutationFn: createData});

  const handlePost = (e: React.FormEvent) => {
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
    setIsOpened(false);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    console.log("Success");
  }
    return (
      <main className="w-full h-full backdrop top-0 left-0">
        <section className="modal">
          <p className="heading">Add Note</p>
          <form action="" className="modal-form" onSubmit={handlePost}>
            <div className="input-container">
              <label htmlFor="title">Title</label>
              <input
               type="text" 
               id="title" 
               name="title" 
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="title-input"
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
                <option value="personal">Personal</option>
                <option value="home">Home</option>
                <option value="business">Business</option>
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description-input" 
              >

              </textarea>
            </div>
            <div className="button-container">
              <button type="submit" className="cancel-button" onClick={() => setIsOpened(false)}>Cancel</button>
              <button type="button" className="add-button px-6" onClick={handlePost}>Add</button>
            </div>
          </form>
        </section>
      </main>
    )
  }
  
  export default AddModal
  