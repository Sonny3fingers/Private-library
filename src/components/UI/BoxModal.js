import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import DeleteContext from "../../store/delete-context";
import classes from "./BoxModal.module.css";

const BoxModal = (props) => {
  const Modal = (props) => {
    const deleteCtx = useContext(DeleteContext);

    return (
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>
            {!deleteCtx.showDeleteModal
              ? `${props.title}`
              : `${deleteCtx.deleteModalValues.title}`}
          </h2>
        </header>
        <div className={classes.content}>
          <p>
            {!deleteCtx.showDeleteModal
              ? `${props.message}`
              : `${deleteCtx.deleteModalValues.message}`}
          </p>
        </div>
        <footer className={classes.actions}>
          <button
            onClick={
              !deleteCtx.showDeleteModal
                ? props.onConfirm
                : deleteCtx.deleteBookRequestHandler
            }
          >
            {!deleteCtx.showDeleteModal
              ? `${props.btnText}`
              : `${deleteCtx.deleteModalValues.btnText}`}
          </button>
          {deleteCtx.showDeleteModal && (
            <button onClick={deleteCtx.hideDeleteModalHandler}>Cancel</button>
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
        />,
        document.getElementById("modal-root")
      )}
    </div>
  );
};

export default BoxModal;
