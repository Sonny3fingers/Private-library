import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import FormContainer from "./components/FormContainer";
import TableContainer from "./components/table/TableContainer";

function App() {
  const [books, setBooks] = useState([]);
  const [errorHandler, setErrorHandler] = useState();

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
    } catch (error) {
      setErrorHandler(error.message);
    }
  }, []);

  useEffect(() => {
    fetchBooksHandler();
  }, [fetchBooksHandler]);

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
    </div>
  );
}

export default App;
