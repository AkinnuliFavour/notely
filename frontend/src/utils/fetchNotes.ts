import axios from "axios";

const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
const userId = currentUser ? currentUser?.user?.id : 0;

export const fetchNotes = async () => {
  const response = await axios.get(`http://localhost:3500/notes?userId=${userId}`);
  return response.data;
};
