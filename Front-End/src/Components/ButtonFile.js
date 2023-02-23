import "../Css/Button.css"
// import { Modal } from "./Modal";
// import { useState } from "react";


export function ButtonFile(props){
    // const [State, changeState] = useState(false);

    return(
        <>
        <br/>
        <input className="ButtonFile" type="file" accept={props.accept}>{props.Text}</input>
        </>
    );
}