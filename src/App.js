import React, { useState, useEffect, useCallback, useContext } from "react";
import "./App.css";
import FormContainer from "./components/FormContainer";
import TableContainer from "./components/table/TableContainer";
import BoxModal from "./components/UI/BoxModal";
import EditBookModal from "./components/UI/EditBookModal";
import EditContext from "./store/edit-context";
import DeleteContext from "./store/delete-context";

function App() {
  const [books, setBooks] = useState([]);
  const [errorHandler, setErrorHandler] = useState();
  const editCtx = useContext(EditContext);
  const deleteCtx = useContext(DeleteContext);

  const fetchBooksHandler = useCallback(async () => {
    const response = await fetch(
      "https://book-project-168e4-default-rtdb.europe-west1.firebasedatabase.app/books.json"
    );
    try {
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      const loadedBooks = [];

      for (const key in data) {
        loadedBooks.push({
          id: key,
          author: data[key].author,
          title: data[key].title,
          date: data[key].date,
          rating: data[key].rating,
        });
      }
      setBooks(loadedBooks);
      editCtx.setItems(loadedBooks);
      deleteCtx.setItems(loadedBooks);
    } catch (error) {
      setErrorHandler(error.message);
    }
  }, []);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);

  const updateBooks = useCallback(() => {
    setBooks(editCtx.items);
  }, [editCtx.items]);

  const deleteBook = useCallback(() => {
    setBooks(deleteCtx.items);
  }, [deleteCtx.items]);

  useEffect(() => {
    deleteBook();
  }, [deleteCtx.items]);

  useEffect(() => {
    updateBooks();
  }, [editCtx.items]);

  const addBookHandler = async (values) => {
    const response = await fetch(
      "https://book-project-168e4-default-rtdb.europe-west1.firebasedatabase.app/books.json",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application.json",
        },
      }
    );
    const data = await response.json();
  };

  return (
    <div className="App">
      <h1>Private Library App</h1>
      <p>Keep Track Of Your Readings.</p>

      <FormContainer
        onAddBook={addBookHandler}
        onFetchBooks={fetchBooksHandler}
      />
      {errorHandler && <p>{errorHandler.message}</p>}
      <TableContainer items={books} onFetchBooks={fetchBooksHandler} />
      {editCtx.showEditModal && <EditBookModal />}
      {deleteCtx.showDeleteModal && <BoxModal />}
    </div>
  );
}

export default App;
