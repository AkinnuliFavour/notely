import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { FormData, NoteProps } from "../types";
import axios from "axios";

const Note = ({ id, category, title, description, date, completed }: NoteProps) => {

  const [isOpened, setIsOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [completedState, setCompletedState] = useState(completed);

  const queryClient = useQueryClient();

  const updateData = async (data: FormData) => {
    const response = await axios.put(`https://notely-orcin.vercel.app/notes/`, data);
    return response.data; // Assuming your API returns updated data
  };

  const mutation = useMutation({mutationFn: updateData});

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    // Assuming newData is the data you want to update
    mutation.mutate({
      id, 
      title, 
      category, 
      description,  
      completed: completedState
    });
  };


  if (mutation.isSuccess) {
    setEditOpened(false);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    console.log("Success");
  }

  console.log(id)

  return (
    <section className="custom-card">
      <div className="flex justify-between">
        <h3 className="category-badge ${completed ? 'color' : null}">
          {category}
        </h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => {
              setCompletedState(e.target.checked)
              handleUpdate(e)
            }}
            name=""
            id=""
            className="checkbox-input"
          />
          <button 
            className="edit-button ${completed ? 'color' : null}"
            onClick={() => setEditOpened(true)}
          >
            <img src="/pencil.svg" alt="" />
          </button>
          <button
           className="delete-bin ${completed ? 'color' : null}"
           onClick={() => setIsOpened(true)}
          >
            <img src="/bin.svg" alt="" />
          </button>
        </div>
      </div>
      <p className={`task-title ${completed ? "line-through" : null}`}>
        {title}
      </p>
      <p className={`task-description ${completed ? "line-through" : null}`}>
        {description}
      </p>
      <p className={`task-date ${completed ? "line-through" : null}`}>{date}</p>
      {isOpened && <DeleteModal setIsOpened={setIsOpened} id={id}/>}
      {editOpened && <EditModal setEditOpened={setEditOpened} id={id} />}
    </section>
  );
};

export default Note;
