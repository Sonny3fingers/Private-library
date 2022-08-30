import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TableBody = (props) => {
  const { id, title, author, date, rating, onFetchBooks } = props;
  const deleteBookHandler = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await fetch(
        `https://book-project-168e4-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
        { method: "DELETE" }
      );
      setTimeout(onFetchBooks, 1000);
    }
  };
  return (
    <tbody>
      <tr>
        <td>{title}</td>
        <td>{author}</td>
        <td>{date}</td>
        <td>{rating}</td>
        <td>
          <button className="deleteBtn" onClick={deleteBookHandler}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;
