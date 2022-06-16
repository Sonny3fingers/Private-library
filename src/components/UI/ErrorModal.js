import React from 'react'
import ReactDOM from 'react-dom'
import classes from './ErrorModal.module.css'

const ErrorModal = (props) => {

    const Backdrop = (props) => {
        return <div className={classes.backdrop} onClick={props.onConfirm}/>
    }

    const Modal = (props) => {
        return  <div className={classes.modal}>
        <header className={classes.header}>
            <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
            <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
            <button onClick={props.onConfirm} >okay</button>
        </footer>
    </div>
    }
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))} 
            {ReactDOM.createPortal(<Modal title={props.title} message={props.message} onConfirm={props.onConfirm} />, document.getElementById('modal-root'))}
        </>
    )
}

export default ErrorModal


