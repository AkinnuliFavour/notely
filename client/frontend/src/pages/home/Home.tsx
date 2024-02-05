import Note from "../../components/Note";
import { useFetch } from "../../hooks/useFetch";

const Home = () => {
  const { notes } = useFetch();
  const homeNotes = notes.filter((note) => note.category === "Home");
  console.log(homeNotes);
  return (
    <>
      {homeNotes.map((note) => (
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

export default Home;
