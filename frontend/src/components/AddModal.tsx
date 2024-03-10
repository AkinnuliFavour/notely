// import React from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

export interface FormType {
  userId: string;
  title: string;
  category: string;
  description: string;
  completed: boolean;
};

interface userObject {
  id: string
}

const AddModal = ({ setIsOpened }: { setIsOpened: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const queryClient = useQueryClient()

  const currentUser : userObject = JSON.parse(localStorage.getItem("currentUser") || "{}");
  console.log(typeof(currentUser.id));

  // const [formData, setFormData] = useState({
  //   id,
  //   title: "",
  //   category: "",
  //   description: ""
  // })

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Personal")
  const [description, setDescription] = useState("")

  const createData = async (data: FormType) => {
    console.log(data)
    const response = await axios.post("http://localhost:3500/notes/", data);
    return response.data; // Assuming your API returns updated data
  };

  const mutation = useMutation({ mutationFn: createData });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault()
    // Assuming newData is the data you want to update
    mutation.mutate({
      userId: currentUser.id,
      title,
      category,
      description,
      completed: false
    });
  };


  if (mutation.isSuccess) {
    setIsOpened(prev => !prev);
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
