import React, { useContext } from "react";
import Backdrop from "./Backdrop";
import FormContainer from "../FormContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import classes from "./EditBookModal.module.css";
import EditContext from "../../store/edit-context";

const EditBookModal = () => {
  const editCtx = useContext(EditContext);

  return (
    <div>
      <Backdrop />
      <div className={classes.editBookContainer}>
        <span className="closeIcon" onClick={editCtx.hideEditModalHandler}>
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </span>
        <FormContainer />
      </div>
    </div>
  );
};

export default EditBookModal;
