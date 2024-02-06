import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Note from "../components/Note";
import DeleteModal from "../components/DeleteModal";
import { fetchNotes } from "../utils/fetchNotes";
import { Notes } from "../types";

const All = () => {

  const [isOpened, setIsOpened] = useState(false);

  const {
    data: notes,
    error,
    isLoading,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes });

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <>
      {notes?.map((note) => (
        <Note
          key={note.id}
          category={note.category}
          title={note.title}
          description={note.description}
          date={note.date}
          completed={note.completed}
          setIsOpened={setIsOpened}
        />
      ))}
      {isOpened && <DeleteModal setIsOpened={setIsOpened}/>}
    </>
  );
};

export default All;
