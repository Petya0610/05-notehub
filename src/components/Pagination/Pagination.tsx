import ReactPaginate from "react-paginate"
import css from "./Pagination.module.css"

interface Prop {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({page, totalPages, onChange}: Prop) {
  if (totalPages <= 1) return null;
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={page - 1}                
      onPageChange={(e) => onChange(e.selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.prev}
      nextClassName={css.next}
      disabledClassName={css.disabled}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
    />
  )
}
