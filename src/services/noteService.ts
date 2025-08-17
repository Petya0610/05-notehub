import axios from "axios";
import type { Note } from "../types/note";



const API_URL = "https://notehub-public.goit.study/notes";
const VITE_NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;


export const noteService = async () => {
 if (!VITE_NOTEHUB_TOKEN) throw new Error("TMDB API token is missing");
  const response = await axios.get<Note[]>(API_URL, {
    params: { },
    headers: {
      Authorization: `Bearer ${VITE_NOTEHUB_TOKEN}`,
      accept: "application/json",
    },
  });
  
  return response.data;
};
