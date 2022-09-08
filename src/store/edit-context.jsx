import React, { createContext, useState } from "react";

const EditContext = createContext({
  showEditModal: false,
  bookValues: {},
  items: [],
  setItems: () => {},
  showEditModalHandler: () => {},
  hideEditModalHandler: () => {},
  updateBookHandler: (id) => {},
});

export const EditProvider = ({ children }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookValues, setBookValues] = useState({});
  const [items, setItems] = useState([]);

  const showEditModalHandler = () => {
    setShowEditModal(true);
  };
  const hideEditModalHandler = () => {
    setShowEditModal(false);
  };
  const updateBookHandler = async (id, values) => {
    const response = await fetch(
      `https://book-project-168e4-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();

    setItems((prevState) =>
      prevState.map((item) => (item.id === id ? { id, ...data } : item))
    );

    setTimeout(() => {
      setShowEditModal(false);
    }, 500);
  };
  return (
    <EditContext.Provider
      value={{
        showEditModal,
        bookValues,
        items,
        setBookValues,
        setItems,
        showEditModalHandler,
        hideEditModalHandler,
        updateBookHandler,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};
export default EditContext;
