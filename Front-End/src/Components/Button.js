import "../Css/Button.css"
// import { Modal } from "./Modal";
// import { useState } from "react";


const Button = ({className='Button', type, Text, onClick}) => {
    return(
        <button type={type} className={className} onClick={onClick} >{Text}</button>
    );
}

export {Button}