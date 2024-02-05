import { useQuery } from "@tanstack/react-query";
import Note from "../components/Note";
import { fetchNotes } from "../utils/fetchNotes";

type Notes = {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}[];

const All = () => {
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
        />
      ))}
    </>
  );
};

export default All;
