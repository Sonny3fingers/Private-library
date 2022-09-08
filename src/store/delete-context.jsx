import React, { createContext, useState } from "react";

const DeleteContext = createContext({
  showDeleteModal: null,
  deleteModalValues: {},
  items: [],
  setDeleteModalValues: () => {},
  showDeleteModalHandler: () => {},
  hideDeleteModalHandler: () => {},
  deleteBookRequestHandler: () => {},
  setItems: () => {},
});

export const DeleteProvider = ({ children }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalValues, setDeleteModalValues] = useState({});
  const [items, setItems] = useState([]);

  const showDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };

  const hideDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const deleteBookRequestHandler = async () => {
    await fetch(
      `https://book-project-168e4-default-rtdb.europe-west1.firebasedatabase.app/books/${deleteModalValues.id}.json`,
      { method: "DELETE" }
    );
    setItems(items.filter((item) => item.id !== deleteModalValues.id));
    setTimeout(() => {
      setShowDeleteModal(false);
    }, 500);
  };

  return (
    <DeleteContext.Provider
      value={{
        showDeleteModal,
        deleteModalValues,
        items,
        setDeleteModalValues,
        showDeleteModalHandler,
        hideDeleteModalHandler,
        deleteBookRequestHandler,
        setItems,
      }}
    >
      {children}
    </DeleteContext.Provider>
  );
};

export default DeleteContext;
