import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNoteData, NoteTag, Note } from "../../types/note";
import { createNote } from "../../services/noteService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

const schema = Yup.object({
  title: Yup.string().min(3, "Min 3").max(50, "Max 50").required("Required"),
  content: Yup.string().max(500, "Max 500"),
  tag: Yup.mixed<NoteTag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Required"),
});

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function NoteForm({ onCancel, onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Note, Error, NewNoteData>({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess();
    },
  });

  return (
    <Formik<NewNoteData>
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={schema}
      validateOnMount
      onSubmit={(values) => mutate(values)}
    >
      {({ isValid }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={!isValid || isPending}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
