import { useQuery } from "@tanstack/react-query";
import Note from "../../components/Note";
import { Notes } from "../../types";
import { fetchNotes } from "../../utils/fetchNotes";
import { useState } from "react";
import DeleteModal from "../../components/DeleteModal";

const Business = () => {
  const [isOpened, setIsOpened] = useState(false);
  const {
    data: notes,
    error,
    isLoading,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes });
  const businessNotes = notes?.filter((note) => note.category === "Business");

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <>
      {businessNotes?.map((note) => (
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

export default Business;
