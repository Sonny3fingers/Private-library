import React, { useEffect, useState, useContext } from "react";
import FormInput from "./FormInput";
import BoxModal from "./UI/BoxModal";
import Ratings from "./Ratings";
import EditContext from "../store/edit-context";

const FormContainer = (props) => {
  const inputs = [
    {
      id: 1,
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter Book Title",
    },
    {
      id: 2,
      name: "author",
      label: "Author",
      type: "text",
      placeholder: "Enter Book Author",
    },
    {
      id: 3,
      name: "date",
      label: "End Date",
      type: "date",
      placeholder: "",
    },
  ];

  const editCtx = useContext(EditContext);
  let bookValues = editCtx.bookValues;
  let showEditModal = editCtx.showEditModal;
  const [rating, setRating] = useState(1);

  const [values, setValues] = useState({
    title: "",
    author: "",
    date: "",
    rating: "",
  });

  useEffect(() => {
    if (showEditModal) {
      setValues({
        title: bookValues.title,
        author: bookValues.author,
        date: bookValues.date,
        rating: bookValues.rating,
        id: bookValues.id,
      });
      setRating(bookValues.rating);
    } else {
      setValues({
        title: "",
        author: "",
        date: "",
        rating: 1,
      });
      setRating(1);
    }
  }, [showEditModal]);

  const [error, setError] = useState();

  const onChange = (e) => {
    setValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setValues((prevState) => {
      return {
        ...prevState,
        rating,
      };
    });
  }, [rating]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Validate
    if (
      values.author.trim().length === 0 ||
      values.title.trim().length === 0 ||
      values.date.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please fill in all the fields.",
        btnText: "Close",
      });
      return;
    }
    if (showEditModal) {
      editCtx.updateBookHandler(bookValues.id, values);
    } else {
      props.onAddBook(values);
      setTimeout(() => {
        props.onFetchBooks();
      }, 1000);
    }

    // RESET VALUES TO NOTHING
    setValues({
      title: "",
      author: "",
      date: "",
      rating: 1,
    });
    setRating(1);
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      {error && (
        <BoxModal
          title={error.title}
          message={error.message}
          btnText={error.btnText}
          onConfirm={errorHandler}
        />
      )}
      <form className="form" onSubmit={submitHandler}>
        <h2>Add book</h2>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            onChange={onChange}
            value={values[input.name]}
          />
        ))}
        <Ratings select={setRating} selected={rating} />
        <button onClick={props.onFetchBooks}>Submit</button>
      </form>
    </>
  );
};

export default FormContainer;
