import "../../Css/Employees.css";
import React, { useState, useEffect } from "react";

import { Button } from "../../Components/Button";
import { ButtonFile } from "../../Components/ButtonFile";
import { TextInput } from "../../Components/TextInput";
import { SelectionInput } from "../../Components/SelectionInput";
import { Modal } from "../../Components/Modal";
import { Form } from "../../Components/Form";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

const UpdateEmployeeModal = (isModalActive, toggleModal, URL, data, States, getEmployees) => {

    if(data) return (<Modal State={isModalActive} ChangeState={toggleModal} Title="Update Employee">
        <Form URL={URL} method={"PATCH"} name="employee" id={data.ID} changeState={toggleModal} getData={getEmployees}>
            <div className="ModalRight">
                <input type="hidden" id="id" name="id" value={data.ID}/>
                <TextInput id="name" text="Employee Name" value={data.EName}/>
                <TextInput id="rut" text="Employee Rut" value={data.ERut}/>
                <TextInput id="email" text="Employee Mail" value={data.EMail}/>
                <TextInput id="direction" text="Employee Direction" value={data.EDirection}/>
                <TextInput id="phone" text="Employee Phone" value={data.EPhone}/>
                <SelectionInput id="status" text="Employee Status" values={States} selected={data.EState}/>
            </div>


            <div className="Left">
            <label htmlFor="ChooseFile">
                <ButtonFile id="ChooseFile" accept="image/png, image/jpg, image/gif, image/jpeg" />
            </label>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Button text='Update Item' type='submit'/>
            {/* <Button text='Delete Item' onClick={toggleConfirmDeleteModal}/> */}
            <ConfirmDeleteModal/>
            <Button text='Cancel' onClick={toggleModal}/>
        </Form>
    </Modal>);
}
export {UpdateEmployeeModal};