import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Note from "../../components/Note";
import { Notes } from "../../types";
import Logout from "../../components/Logout";

const Home = () => {

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(currentUser.user.id);
  const userId = currentUser.user.id;

  const fetchNotes = async () => {
    const response = await axios.get(
      `http://localhost:3500/notes?userId=${userId}`,
    );
    return response.data; // Assuming API returns requested data
  };

  const {
    data: notes,
    error,
    isLoading,
  } = useQuery<Notes>({ queryKey: ["notes"], queryFn: fetchNotes });
  const homeNotes = notes?.filter((note) => note.category === "Home");

  if (isLoading) return <img src="/infinite-spinner.svg" alt="" className="w-2/5 absolute top-[50%] left-[25%]" />;

  // if (error) return <h1>Error: {error.message}</h1>;

  return (
    <>
      {!error ?
        homeNotes?.map((note) => (
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
};

export default Home;
