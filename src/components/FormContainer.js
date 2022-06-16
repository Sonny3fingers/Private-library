import React, { useState } from "react";
import FormInput from "./FormInput";
import ErrorModal from "./UI/ErrorModal";

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
      name: "isbn",
      label: "ISBN#",
      type: "number",
      placeholder: "Enter Book ISBN#",
    },
  ];

  const [values, setValues] = useState({
    title: "",
    author: "",
    isbn: "",
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

  const submitHandler = (e) => {
    e.preventDefault();
    // Validate
    if (
      values.author.trim().length === 0 ||
      values.title.trim().length === 0 ||
      values.isbn.trim().length === 0
    ) {
      console.log("error");
      setError({
        title: "Invalid input",
        message: "Please fill in all the fields.",
      });
      return;
    }
    props.onAddBook(values);

    // RESET VALUES TO NOTHING
    setValues({
      title: "",
      author: "",
      isbn: "",
    });
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
        <button onClick={props.onFetchBooks}>Submit</button>
      </form>
    </>
  );
};

export default FormContainer;
