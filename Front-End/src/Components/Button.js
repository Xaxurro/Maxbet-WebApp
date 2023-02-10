import "../Css/Button.css"
// import { Modal } from "./Modal";
// import { useState } from "react";


export function Button(props){
    // const [State, changeState] = useState(false);

    return(
        <button className={props.className} onClick={props.onClick} >{props.Text}</button>
    );
}