import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import css from "./App.module.css";

const PER_PAGE = 12;

export default function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => { setPage(1); }, [debouncedSearch]);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const items = data?.notes?? [];
  const totalPages = data?.totalPages ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={search} onSearch={setSearch} />
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <div>Loading ...</div>}
      {isError && <div style={{ color: "red" }}>{(error as Error)?.message ?? "Error"}</div>}

      {!isLoading && !isError && items.length > 0 && <NoteList notes={items} />}
      {!isLoading && !isError && items.length === 0 && (
        <div>{debouncedSearch ? "Нічого не знайдено" : "Поки що немає нотаток"}</div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {isFetching && !isLoading && <div style={{ opacity: 0.6 }}>Updating…</div>}
    </div>
  );
}
