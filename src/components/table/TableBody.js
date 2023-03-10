import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import EditContext from "../../store/edit-context";
import DeleteContext from "../../store/delete-context";
import BoxModal from "../UI/BoxModal";

const TableBody = (props) => {
  const { id, title, author, date, rating } = props;
  const editCtx = useContext(EditContext);
  const deleteCtx = useContext(DeleteContext);
  const [isUpdateBook, setIsUpdateBook] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const showUpdateBookHandler = (e) => {
    if (id === e.target.parentElement.parentElement.id) {
      setIsUpdateBook(true);
      editCtx.setBookValues({
        id: props.id,
        author: props.author,
        title: props.title,
        date: props.date,
        rating: props.rating,
      });
    }
  };

  const onCloseBoxModalHandler = () => {
    setIsUpdateBook(false);
    setIsEditing(false);
    setIsDeleting(false);
  };

  const isEditingHandler = () => {
    setIsEditing(true);
  };

  const isDeletingHandler = () => {
    setIsDeleting(true);
    deleteCtx.setDeleteModalValues({
      title: "Delete Book",
      message: "Are you sure you want to delete this book?",
      id: props.id,
      bookTitle: props.title,
    });
  };

  const cancelDeleteHandler = () => {
    setIsDeleting(false);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  return (
    <tbody>
      <tr id={id}>
        <td>{title}</td>
        <td>{author}</td>
        <td>{date}</td>
        <td>{rating}</td>
        <td>
          <span className="dropdownBtn" onClick={showUpdateBookHandler}>
            <FontAwesomeIcon className="icon" icon={faEllipsis} />
            {isUpdateBook && (
              <BoxModal
                title={"Update Book"}
                message={"Edit or Delete Book?"}
                isUpdateBook={isUpdateBook}
                id={id}
                bookTitle={title}
                bookAuthor={author}
                bookDate={date}
                bookRating={rating}
                onCloseBoxModalHandler={onCloseBoxModalHandler}
                isEditingHandler={isEditingHandler}
                isEditing={isEditing}
                isDeletingHandler={isDeletingHandler}
                isDeleting={isDeleting}
                cancelDeleteHandler={cancelDeleteHandler}
                cancelEditHandler={cancelEditHandler}
              ></BoxModal>
            )}
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;
