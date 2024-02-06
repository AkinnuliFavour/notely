import { useQuery } from "@tanstack/react-query";
import Note from "../../components/Note";
import { fetchNotes } from "../../utils/fetchNotes";
import { Notes } from "../../types";
import { useState } from "react";
import DeleteNote from "../../components/DeleteNote";

const Personal = () => {
  const [isOpened, setIsOpened] = useState(false);
  const {
    data: notes,
    error,
    isLoading,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes });

  const personalNotes = notes?.filter((note) => note.category === "Personal");
  console.log(personalNotes);

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <>
      {personalNotes?.map((note) => (
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
      {isOpened && <DeleteNote setIsOpened={setIsOpened}/>}
    </>
  );
};

export default Personal;