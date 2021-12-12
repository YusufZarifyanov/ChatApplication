import React from 'react'
import "../styles/Modal.scss"

const Modal = ({active, setActive, content}) => {
    console.log(content)
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h1>Ошбика</h1>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Modal