import React, { useContext } from "react";
import classes from "./Backdrop.module.css";
import EditContext from "../../store/edit-context";

const Backdrop = (props) => {
  const editCtx = useContext(EditContext);

  return (
    <div className={classes.backdrop} onClick={editCtx.hideEditModalHandler} />
  );
};

export default Backdrop;
