import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { FormData, NoteProps } from "../types";
import axios from "axios";
import { useUserContext } from "../utils/useUserContext";

const Note = ({ id, category, title, description, date, completed }: NoteProps) => {

  const [deleteOpened, setDeleteOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [completedStatus, setCompletedStatus] = useState(completed);

  const { user } = useUserContext();

  const handleCloseEditModal = () => {
    setEditOpened(prev => !prev);
  }

  const handleCloseDeleteModal = () => {
    setDeleteOpened(prev => !prev);
  }

  const queryClient = useQueryClient();

  const updateData = async (data: FormData) => {
    const response = await axios.put(`https://notely-orcin.vercel.app/notes/`, data);
    return response.data; // Assuming your API returns updated data
  };

  const mutation = useMutation({mutationFn: updateData});

  const handleUpdate = () => {
    setCompletedStatus(prev => !prev);
    // Assuming newData is the data you want to update
    if(user){
      mutation.mutate({
        id, 
        userId: user,
        title, 
        category, 
        description,  
        completed: !completed
      });
    }
  };


  if (mutation.isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  }

  return (
    <section className="custom-card w-full md:w-[45%] lg:w-[30%]">
      <div className="flex justify-between">
        <h3 className={`category-badge ${completed && 'color'} px-4`}>
          {category}
        </h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={completedStatus}
            onChange={handleUpdate}
            name=""
            id=""
            className="checkbox-input"
          />
          <button 
            className="edit-button ${completedStatus ? 'color' : null}"
            onClick={() => setEditOpened(true)}
          >
            <img src="/pencil.svg" alt="" />
          </button>
          <button
           className="delete-bin ${completedStatus ? 'color' : null}"
           onClick={() => setDeleteOpened(true)}
          >
            <img src="/bin.svg" alt="" />
          </button>
        </div>
      </div>
      <p className={`task-title ${completedStatus ? "line-through" : null}`}>
        {title}
      </p>
      <p className={`task-description ${completedStatus ? "line-through" : null}`}>
        {description}
      </p>
      <p className={`task-date ${completedStatus ? "line-through" : null}`}>{date}</p>
      {deleteOpened && <DeleteModal handleCloseDeleteModal={handleCloseDeleteModal} id={id}/>}
      {editOpened && <EditModal handleCloseEditModal={handleCloseEditModal} id={id} />}
    </section>
  );
};

export default Note;
