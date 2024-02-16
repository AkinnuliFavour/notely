import { useQuery } from "@tanstack/react-query";
import { Notes } from "../../types";
import { fetchNotes } from "../../utils/fetchNotes";
import Note from "../../components/Note";

const CompletedNote = () => {

    const {
        data: notes,
        error,
        isLoading,
      } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes });
    
      const completedNotes = notes?.filter((note) => note.completed === true);
      console.log(completedNotes);
    
      if (isLoading) return <h1>Loading...</h1>;
    
      if (error) return <h1>Error: {error.message}</h1>;

  return (
    <>
    {completedNotes?.map((note) => (
      <Note
        key={note._id}
        id={note._id}
        category={note.category}
        title={note.title}
        description={note.description}
        date={note.date}
        completed={note.completed}
      />
    ))}
  </>
  );
}

export default CompletedNote;