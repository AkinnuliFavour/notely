import axios from "axios";

export const fetchNotes = async () => {
  const response = await axios.get("https://notely-orcin.vercel.app/notes");
  return response.data;
};
