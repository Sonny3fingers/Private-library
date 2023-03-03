import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditContext from "../../store/edit-context";
import DeleteContext from "../../store/delete-context";

const TableBody = (props) => {
  const { id, title, author, date, rating } = props;
  const editCtx = useContext(EditContext);
  const deleteCtx = useContext(DeleteContext);
  const [dropdownId, setDropdownId] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const deleteBookHandler = () => {
    deleteCtx.showDeleteModalHandler();
    deleteCtx.setDeleteModalValues({
      title: "Delete Book",
      message: "Are you sure you want to delete this book?",
      btnText: "Delete",
      id: id,
      bookTitle: title,
    });
  };

  const editBookHandler = () => {
    editCtx.showEditModalHandler();
    const bookValues = { id, title, author, date, rating };
    editCtx.setBookValues(bookValues);
  };

  const showDropdownHandler = (e) => {
    if (id === e.target.parentElement.parentElement.id) {
      setDropdownId(id);
      setShowDropdown((prevState) => !prevState);
    } else {
      setDropdownId("");
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (id === dropdownId) {
      editCtx.showEditModal
        ? setShowDropdown(editCtx.showEditModal)
        : setShowDropdown(deleteCtx.showDeleteModal);
    }
  }, [editCtx.showEditModal, deleteCtx.showDeleteModal]);

  return (
    <tbody>
      <tr id={id}>
        <td>{title}</td>
        <td>{author}</td>
        <td>{date}</td>
        <td>{rating}</td>
        <td>
          <span className="dropdownBtn" onClick={showDropdownHandler}>
            <FontAwesomeIcon className="icon" icon={faEllipsis} />
            {showDropdown && (
              <ul>
                <li onClick={editBookHandler}>
                  <FontAwesomeIcon className="icon" icon={faPencil} />
                </li>
                <li onClick={deleteBookHandler}>
                  <FontAwesomeIcon className="icon" icon={faTrashCan} />
                </li>
              </ul>
            )}
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;
