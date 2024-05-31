import { Field, Form, Formik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { AiOutlineSearch } from "react-icons/ai";
import css from './SearchBar.module.css';

const SearchBar=({ onSubmit })=> {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          if (values.query.trim() === '') {
            toast.error('Please enter a keyword of search!');
            return;
          }
          onSubmit(values.query);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></Field>
          <button className={css.btn} type="submit">
          <AiOutlineSearch size='25' />
         </button>
          <Toaster position="top-right" reverseOrder={false} />
        </Form>
      </Formik>
    </header>
  );
}

export default SearchBar;