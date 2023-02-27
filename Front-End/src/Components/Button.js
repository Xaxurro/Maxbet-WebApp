import "../Css/Button.css"
// import { Modal } from "./Modal";
// import { useState } from "react";


const Button = ({className='Button', type='button', text, onClick}) => {
    return(
        <button type={type} className={className} onClick={onClick} >{text}</button>
    );
}

export {Button}