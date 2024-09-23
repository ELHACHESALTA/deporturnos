import React from 'react'
import "./Modal.module.css";
import style from "./Modal.module.css";

const Modal = ({children, isOpen, closeModal}) => {

    const handleModalClick = (e) => {
        e.stopPropagation();
    }

  return (
    <article className={`${style.modal} ${ isOpen && style.isOpen}`} onClick={closeModal}>
        <div className={style.modalContainer} onClick={handleModalClick}>
            <button className={style.modalClose} onClick={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
            {children}
        </div>
    </article>
  )
}

export default Modal