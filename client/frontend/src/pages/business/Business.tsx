import Note from "../../components/Note";
import { useFetch } from "../../hooks/useFetch";

const Business = () => {
  const { notes } = useFetch();
  const businessNotes = notes.filter((note) => note.category === "Business");
  console.log(businessNotes);
  return (
    <>
      {businessNotes.map((note) => (
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

export default Business;
