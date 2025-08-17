import { useQuery } from '@tanstack/react-query'
import NoteList from '../NoteList/NoteList'
import css from './App.module.css'
import { noteService } from '../../services/noteService'

export default function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: noteService,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <NoteList />
		{/* Компонент SearchBox */}
		{/* Пагінація */}
		{/* Кнопка створення нотатки */}
  </header>
</div>
  )
}

