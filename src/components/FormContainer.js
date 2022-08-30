import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import ErrorModal from "./UI/ErrorModal";
import Ratings from "./Ratings";

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
  const [rating, setRating] = useState(1);
  const [values, setValues] = useState({
    title: "",
    author: "",
    date: "",
    rating: "",
  });

  const [error, setError] = useState();

  const onChange = (e) => {
    // setValues({...values,
    //     [e.target.name] : e.target.value,
    // });
    setValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
        id: Math.floor(Math.random() * 10000) + 1,
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
      });
      return;
    }
    props.onAddBook(values);
    setTimeout(() => {
      props.onFetchBooks();
    }, 1000);

    // RESET VALUES TO NOTHING
    setValues({
      title: "",
      author: "",
      date: "",
    });
    setRating(1);
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
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
