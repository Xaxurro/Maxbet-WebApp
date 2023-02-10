import "../Css/Button.css"
// import { Modal } from "./Modal";
// import { useState } from "react";


export function ButtonFile(props){
    // const [State, changeState] = useState(false);

    return(
        <input className={props.className} type={props.type} accept={props.accept}>{props.Text}</input>
    );
}