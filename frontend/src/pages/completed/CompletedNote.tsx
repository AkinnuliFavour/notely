import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Notes } from "../../types";
import Note from "../../components/Note";
import Logout from "../../components/Logout";
import { useUserContext } from "../../utils/useUserContext";

const CompletedNote = () => {

  const { user } = useUserContext();

  const fetchNotes = async () => {
    const response = await axios.get(
      `https://notely-orcin.vercel.app/notes?userId=${user}`,
    );
    return response.data; // Assuming API returns requested data
  };

  const {
    data: notes,
    error,
    isLoading,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes });

  const completedNotes = notes?.filter((note) => note.completed === true);
  console.log(completedNotes);

  if (isLoading) return <img src="/infinite-spinner.svg" alt="" className="w-2/5 absolute top-[50%] left-[25%]" />;

  // if (error) return <h1>Error: {error.message}</h1>;

  return (
    <>
      {!error ? 
        completedNotes?.map((note) => (
          <Note
            key={note._id}
            id={note._id}
            category={note.category}
            title={note.title}
            description={note.description}
            date={note.date}
            completed={note.completed}
          />
        ))
        :
        <div className="flex items-center justify-center">
          <p> There  are notes to display.</p>
        </div>
      }

      <Logout />
    </>
  );
}

export default CompletedNote;