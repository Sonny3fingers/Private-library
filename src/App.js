import React, { useState, useEffect, useCallback, useContext } from "react";
import "./App.css";
import FormContainer from "./components/FormContainer";
import TableContainer from "./components/table/TableContainer";
import TotalBooksSection from "./components/TotalBooksSection";
// import BoxModal from "./components/UI/BoxModal";
// import EditBookModal from "./components/UI/EditBookModal";
import SortTable from "./components/UI/SortTable";
import EditContext from "./store/edit-context";
import DeleteContext from "./store/delete-context";
import BarChart from "./components/BarChart";
import HeaderTableSection from "./components/UI/HeaderTableSection";
import Header from "./components/Header";

function App() {
  const [books, setBooks] = useState([]);
  const [errorHandler, setErrorHandler] = useState();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [sortByDate, setSortByDate] = useState(true);
  const editCtx = useContext(EditContext);
  const deleteCtx = useContext(DeleteContext);
  const [readingBooksByYearsData, setReadingBooksByYearsData] = useState([]);
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
      setBooks(
        loadedBooks.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        })
      );
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

  useEffect(() => {
    if (books.length > 0) {
      const readingYears = [];
      books.forEach((book) => {
        let readingYear = new Date(book.date).getFullYear();
        if (!readingYears.includes(readingYear)) {
          readingYears.push(readingYear);
        }
      });

      const tempData = [];
      readingYears.forEach((readingYear) => {
        const data = [];
        const year = readingYear;
        for (let i = 0; i < 12; i++) {
          const month = i < 9 ? "0" + (i + 1) : i + 1;
          const readByMonth = books.filter(
            (book) =>
              new Date(book.date).getFullYear() === year &&
              new Date(book.date).getMonth() === i
          );
          data.push(readByMonth.length);
        }
        tempData.push({
          chartData: {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: `Monthly read books by ${year}`,
                data: data,
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                borderWidth: 1,
                borderColor: "rgba(255, 206, 86, 1)",
              },
            ],
          },
        });
      });
      setReadingBooksByYearsData(tempData);
    }
  }, [books]);

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
  };

  return (
    <div className="main">
      <Header />
      <FormContainer
        onAddBook={addBookHandler}
        onFetchBooks={fetchBooksHandler}
      />
      {errorHandler && <p>{errorHandler.message}</p>}
      <HeaderTableSection />
      <SortTable
        sortByDate={sortByDate}
        onSortByDate={setSortByDate}
        setSortBooksHandler={setBooks}
      />
      <TableContainer items={books} onFetchBooks={fetchBooksHandler} />
      <TotalBooksSection items={books} />
      {!readingBooksByYearsData
        ? ""
        : readingBooksByYearsData.map((item) => (
            <BarChart chartData={item.chartData} key={crypto.randomUUID()} />
          ))}
    </div>
  );
}

export default App;
