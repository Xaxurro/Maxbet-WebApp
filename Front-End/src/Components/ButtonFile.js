import "../Css/Button.css"
// import { Modal } from "./Modal";
// import { useState } from "react";


export function ButtonFile(id, accept, text){
    // const [State, changeState] = useState(false);

    return(
        <>
            <br/>
            <label htmlFor={id}>{text}
                <input id={id} className="ButtonFile" type="file" accept={accept}/>
            </label>
        </>
    );
}