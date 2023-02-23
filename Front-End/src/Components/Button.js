import "../Css/Button.css"
// import { Modal } from "./Modal";
// import { useState } from "react";


export function Button(props){
    // const [State, changeState] = useState(false);

    return(
        <button type= {props.type} className='Button' onClick={props.onClick} >{props.Text}</button>
    );
}