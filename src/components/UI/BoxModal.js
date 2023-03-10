import React, { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import DeleteContext from "../../store/delete-context";
import EditContext from "../../store/edit-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classes from "./BoxModal.module.css";

const BoxModal = (props) => {
  const Modal = (props) => {
    const editCtx = useContext(EditContext);
    const [bookData, setBookData] = useState({
      id: editCtx.bookValues.id,
      title: editCtx.bookValues.title,
      author: editCtx.bookValues.author,
      date: editCtx.bookValues.date,
      rating: +editCtx.bookValues.rating,
    });
    const deleteCtx = useContext(DeleteContext);
    const [isNotValidate, setIsNotValidate] = useState(false);

    const onChangeHandler = (e) => {
      setBookData((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
      if (e.target.value.trim().length === 0) {
        setIsNotValidate(true);
        // return;
      } else {
        setIsNotValidate(false);
      }
    };

    const onChangeRatingHandler = (e) => {
      setBookData((prevState) => {
        return {
          ...prevState,
          rating: +e.target.value,
        };
      });
    };

    const formSubmitHandler = (e) => {
      e.preventDefault();
      if (props.isEditing) {
        editCtx.updateBookHandler(bookData.id, bookData);
        setTimeout(() => {
          props.onCloseBoxModalHandler();
        }, 500);
      }
    };
    return (
      <div className={classes.modal}>
        <div className={classes.headerBoxModal}>
          <span>
            <FontAwesomeIcon
              icon={faXmark}
              size="2xl"
              onClick={
                props.isUpdateBook
                  ? props.onCloseBoxModalHandler
                  : props.onConfirm
              }
            />
          </span>
          <h2>
            {props.isUpdateBook && !props.isDeleting && !props.isEditing
              ? `${props.title}`
              : props.isDeleting
              ? `${deleteCtx.deleteModalValues.title}`
              : props.isEditing && "Edit Book"}
            {props.isNotValidate ? `${props.title}` : ""}
          </h2>
        </div>
        <div className={classes.content}>
          {props.isUpdateBook && !props.isDeleting && !props.isEditing ? (
            <p>{props.message}</p>
          ) : props.isDeleting ? (
            <p>{deleteCtx.deleteModalValues.message}</p>
          ) : (
            props.isEditing &&
            !props.isDeleting && (
              <form onSubmit={formSubmitHandler}>
                <input
                  type="text"
                  name="title"
                  value={bookData.title}
                  onChange={onChangeHandler}
                />
                <input
                  type="text"
                  name="author"
                  value={bookData.author}
                  onChange={onChangeHandler}
                />
                <input
                  type="date"
                  name="date"
                  value={bookData.date}
                  onChange={onChangeHandler}
                />
                <label htmlFor="rating">Ratings:</label>
                <select
                  name="rating"
                  value={bookData.rating}
                  onChange={onChangeRatingHandler}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>

                {!isNotValidate ? (
                  <button type="submit">Submit</button>
                ) : (
                  <button type="submit" disabled>
                    Submit
                  </button>
                )}
                {isNotValidate && <p>PLEASE FIELD IN ALL THE FIELDS</p>}
              </form>
            )
          )}
          {props.isNotValidate && <p>{props.message}</p>}
        </div>
        <footer className={classes.actions}>
          {props.isNotValidate && (
            <button onClick={props.onConfirm}>CLOSE</button>
          )}
          {props.isDeleting && (
            <>
              <button onClick={deleteCtx.deleteBookRequestHandler}>
                DELETE
              </button>
              <button onClick={props.cancelDeleteHandler}>CANCEL</button>
            </>
          )}
          {props.isUpdateBook && !props.isEditing && !props.isDeleting && (
            <>
              <button onClick={props.isEditingHandler}>EDIT</button>
              <button onClick={props.isDeletingHandler}>DELETE</button>
            </>
          )}
          {props.isUpdateBook && props.isEditing && !props.isDeleting && (
            <>
              <button onClick={props.cancelEditHandler}>CANCEL</button>
            </>
          )}
        </footer>
      </div>
    );
  };
  return (
    <div>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal
          title={props.title}
          message={props.message}
          btnText={props.btnText}
          onConfirm={props.onConfirm}
          isUpdateBook={props.isUpdateBook}
          id={props.id}
          bookTitle={props.bookTitle}
          bookAuthor={props.bookAuthor}
          bookDate={props.bookDate}
          bookRating={props.bookRating}
          isNotValidate={props.isNotValidate}
          onCloseBoxModalHandler={props.onCloseBoxModalHandler}
          isEditingHandler={props.isEditingHandler}
          isEditing={props.isEditing}
          isDeletingHandler={props.isDeletingHandler}
          isDeleting={props.isDeleting}
          cancelDeleteHandler={props.cancelDeleteHandler}
          cancelEditHandler={props.cancelEditHandler}
        />,
        document.getElementById("modal-root")
      )}
    </div>
  );
};

export default BoxModal;
