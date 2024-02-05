import Note from "../../components/Note";
import { useFetch } from "../../hooks/useFetch";

const Personal = () => {
  const { notes } = useFetch();
  const personalNotes = notes.filter((note) => note.category === "Personal");
  console.log(personalNotes);
  return (
    <>
      {personalNotes.map((note) => (
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

export default Personal;
