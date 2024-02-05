import Note from "../components/Note";
import { useFetch } from "../hooks/useFetch";

const All = () => {
  const { notes } = useFetch();

  return (
    <>
      {notes.map((note) => (
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
