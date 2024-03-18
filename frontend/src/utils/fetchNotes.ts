import axios from "axios";

const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
console.log(currentUser.user.id);
const userId = currentUser.user.id;

export const fetchNotes = async () => {
  const response = await axios.get(`http://localhost:3500/notes?userId=${userId}`);
  return response.data;
};
