import axios from "axios";
import type { NewNoteData, Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN as string | undefined;

axios.defaults.headers.common.Authorization = TOKEN ? `Bearer ${TOKEN}` : "";
axios.defaults.headers.common.accept = "application/json";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  items: Note[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export const fetchNotes  = async ({page = 1, perPage = 12, search ="", tag}: FetchNotesParams = {}) => {
  const res = await axios.get<FetchNotesResponse>("/notes", {
    params: { 
       page,
      perPage,
      ...(search ? { search: search.trim() } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  
  return res.data;
};


export const createNote = async (noteData: NewNoteData) => {
  const res = await axios.post<Note>("/notes", noteData)
  return res.data;
}

export const deleteNote = async (noteId: string) => {
  const res = await axios.delete(`/notes/${noteId}`)
  return res.data;
}

