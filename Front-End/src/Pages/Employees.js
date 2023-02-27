import React, { useState, useEffect } from "react";
import { Button } from "../Components/Button"
import { Legend } from "../Components/Legend"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Form } from "../Components/Form";
import { Modal } from "../Components/Modal";
import { ButtonFile } from "../Components/ButtonFile";
import { TextInput } from "../Components/TextInput";
import { SelectionInput } from "../Components/SelectionInput";

import "../Css/Employees.css"
import { sendRequest } from "../Helpers/sendRequest";

const Filters = ["Id Employee","Employee Name","Task","Employee Status"];
const Titles =[{heading: 'Id Employee', value: "_id"},{heading: 'Employee Name', value: "name"},{heading: 'Employee Status', value: "status"}];
const States = [{name: "Working", id:"working"}, {name: "Idle", id:"idle"}, {name: "Vacations", id:"vacations"}, {name: "Fired Up", id:"fired"}];

const URL = "http://localhost:5000/employee/";
const UPDATETIME = 60000;

export function Employees(){
    const [isAddModalActive, setAddModalState] = useState(false);
    const [isConfirmDeleteModalActive, setConfirmDeleteModalState] = useState(false);
    const [isUpdateModalActive, setUpdateModalState] = useState(false);
    const [initDatos, setInitDatos] = useState(false);
    const [Data, setEmployees] = useState([]);

    const [ID, setID] = useState("");
    const [ERut, setERut] = useState("");
    const [EName, setEName] = useState("");
    const [EMail, setEMail] = useState("");
    const [EPhone, setEPhone] = useState("");
    const [EDirection, setEDirection] = useState("");


    const toggleConfirmDeleteModal = () =>{
        setConfirmDeleteModalState(!isConfirmDeleteModalActive);
    }
    const toggleAddModal = () => {
        setAddModalState(!isAddModalActive);
    }

    const toggleUpdateModal = () => {
        setUpdateModalState(!isUpdateModalActive);
    }

    const setUpdateModalData = (index) => {
        setID(Data[index]._id);
        setEName(Data[index].name);
        setERut(Data[index].rut);
        setEMail(Data[index].email);
        setEDirection(Data[index].direction);
        setEPhone(Data[index].phone);
        toggleUpdateModal();
    }

    const getEmployees = () => {
        sendRequest(URL)
        .then(response => response.json())
        .then(json => {
            if (json.success) return json.data;
            return [];
        })
        .then(data => setEmployees([...data]));
    }

    const saveOne = () => {
        const data = {
            employee: {
                name: EName,
                rut: ERut,
                email: EMail,
                password: EMail,
                direction: EDirection,
                phone: EPhone,
                status: "idle"
            }
        };

        sendRequest(URL, data, 'POST', getEmployees).then(() => toggleAddModal());
    }

    const saveMore = () => {
        const data = {
            employee: {
                name: EName,
                rut: ERut,
                email: EMail,
                password: EMail,
                direction: EDirection,
                phone: EPhone,
                status: "idle"
            }
        };

        sendRequest(URL, data, 'POST', getEmployees);
    }

    const update = () => {
        const data = {
            id: ID,
            employee: {
                name: EName,
                rut: ERut,
                email: EMail,
                direction: EDirection,
                phone: EPhone
                // status: EStatus
            }
        };

        sendRequest(URL, data, 'PATCH', getEmployees).then(() => toggleUpdateModal());
    }

    const deleteItem = ID => {
        console.log(ID);
        const item = {
            id: ID
        };

        sendRequest(URL, item, 'DELETE', getEmployees).then(() => {toggleConfirmDeleteModal(); toggleUpdateModal();});
    }

    const getName = e => { setEName(e.target.value) };
    const getRut = e => { setERut(e.target.value) };
    const getMail = e => { setEMail(e.target.value) };
    const getDirection = e => { setEDirection(e.target.value) };
    const getPhone = e => { setEPhone(e.target.value) };

    if (!initDatos) {
        getEmployees();
        setInitDatos(true)
    }
    useEffect(() => {
        setInterval(() => {
            getEmployees();
        }, UPDATETIME);
    }, []);

    return (
    <div className="Employees"> 
        <div className="Title">
            
            <h1><i>Employees</i></h1>
            <div className="right">
                <Filter data={Filters}/>
                <Button className="Button" Text="Search" />
                <Button className="Button" Text="Add Employee" onClick={toggleAddModal} />
            </div>
        </div>
        <Modal State={isUpdateModalActive} ChangeState={toggleUpdateModal} Title="Update Employee">
            <div className="ModalBody">
                <Form URL={URL} method={"PATCH"} name="employee" id={ID}>
                    <div className="ModalRight">
                        <input type="hidden" id="id" name="id" value={ID}/>
                        <TextInput id="name" text="Employee Name" onChange={getName} value={EName}/>
                        <TextInput id="rut" text="Employee Rut" onChange={getRut} value={ERut}/>
                        <TextInput id="email" text="Employee Mail" onChange={getMail} value={EMail}/>
                        <TextInput id="direction" text="Employee Direction" onChange={getDirection} value={EDirection}/>
                        <TextInput id="phone" text="Employee Phone" onChange={getPhone} value={EPhone}/>
                        <SelectionInput id="status" text="Employee Status" values={States}/>
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
                    <Button text='Delete Item' onClick={toggleConfirmDeleteModal}/>
                        <Modal State={isConfirmDeleteModalActive} ChangeState={toggleConfirmDeleteModal} Title="Confirm?">
                            <Button text='Delete Item' onClick={() => deleteItem(ID)}/>
                            <Button text='Cancel' onClick={toggleConfirmDeleteModal}/>
                        </Modal>
                    <Button text='Cancel' onClick={toggleUpdateModal}/>
                </Form>
            </div>
        </Modal>
        <Modal State={isAddModalActive} ChangeState={toggleAddModal} Title="Add Employee">
            <div className="ModalBody">
                <div className="ModalRight">
                    <TextInput id="EName" text="Employee Name" onChange={getName}/>
                    <TextInput id="ERut" text="Employee Rut" onChange={getRut}/>
                    <TextInput id="EMail" text="Employee Mail" onChange={getMail}/>
                    <TextInput id="EDirection" text="Employee Direction" onChange={getDirection}/>
                    <TextInput id="EPhone" text="Employee Phone" onChange={getPhone}/>
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
                <Button text='Add Other Employee' onClick={saveMore}/>
                <Button text='Add Employee' onClick={saveOne}/>
                <Button text='Cancel' onClick={toggleAddModal}/>
            </div>
        </Modal>

        
        <Legend/>
        <Table data={Data} column={Titles} setModalData={setUpdateModalData}/>
        
    </div>
    );
}