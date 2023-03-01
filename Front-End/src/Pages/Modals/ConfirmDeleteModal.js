import "../../Css/Employees.css";
import React, { useState } from "react";

import { Button } from "../../Components/Button";
import { Modal } from "../../Components/Modal";

const ConfirmDeleteModal = () => {
    const [isModalActive, setModalState] = useState(false);

    const toggleModal = () =>{
        setModalState(!isModalActive);
    }

    return (<Modal State={isModalActive} ChangeState={toggleModal} Title="Confirm?">
        {/* <Button text='Delete Item' onClick={() => deleteItem(ID)}/> */}
        <Button text='Cancel' onClick={toggleModal}/>
    </Modal>);}

export {ConfirmDeleteModal};