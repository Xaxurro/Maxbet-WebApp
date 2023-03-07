import React, { useState, useEffect } from "react";
import { Button } from "../Components/Button"
import { Legend } from "../Components/Legend"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
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
    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [direction, setDirection] = useState("");
    const [state, setState] = useState("");


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
        setName(Data[index].name);
        setRut(Data[index].rut);
        setEmail(Data[index].email);
        setDirection(Data[index].direction);
        setPhone(Data[index].phone);
        setState(Data[index].status);
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

    const save = () => {
        const data = {
            employee: {
                name: name,
                rut: rut,
                email: email,
                password: email,
                direction: direction,
                phone: phone,
                status: "idle"
            }
        };

        sendRequest(URL, data, 'POST', getEmployees);
    }

    const update = () => {
        const data = {
            id: ID,
            employee: {
                name: name,
                rut: rut,
                email: email,
                password: email,
                direction: direction,
                phone: phone,
                status: state
            }
        };

        sendRequest(URL, data, 'PATCH', getEmployees).then(() => toggleUpdateModal());
    }
    
    const remove = ID => {
        const item = {
            id: ID
        };

        sendRequest(URL, item, 'DELETE', getEmployees).then(() => {toggleConfirmDeleteModal(); toggleUpdateModal();});
    }

    const getName = e => setName(e.target.value);
    const getRut = e => setRut(e.target.value);
    const getEmail = e => setEmail(e.target.value);
    const getPassword = e => setPassword(e.target.value);
    const getDirection = e => setDirection(e.target.value);
    const getPhone = e => setPhone(e.target.value);
    const getState = e => setState(e.target.value);

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
                <Button className="Button" text="Search" />
                <Button className="Button" text="Add Employee" onClick={toggleAddModal} />
            </div>
        </div>



        <Modal State={isUpdateModalActive} ChangeState={toggleUpdateModal} Title="Update Employee">
            <div className="ModalBody">
                <div className="ModalRight">
                    <TextInput id="name" text="Employee Name" onChange={getName} value={name}/>
                    <TextInput id="rut" text="Employee Rut" onChange={getRut} value={rut}/>
                    <TextInput id="email" text="Employee Mail" onChange={getEmail} value={email}/>
                    <TextInput id="direction" text="Employee Direction" onChange={getDirection} value={direction}/>
                    <TextInput id="phone" text="Employee Phone" onChange={getPhone} value={phone}/>
                    <SelectionInput id="status" text="Employee Status" options={States} onChange={getState} selected={state}/>
                    <ButtonFile id="file" text="File" accept="image/png, image/jpg, image/gif, image/jpeg" />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Button text='Update Item' onClick={update}/>
                <Button text='Delete Item' onClick={toggleConfirmDeleteModal}/>
                <Modal State={isConfirmDeleteModalActive} ChangeState={toggleConfirmDeleteModal} Title="Confirm?">
                    <Button text='Delete Item' onClick={() => remove(ID)}/>
                    <Button text='Cancel' onClick={toggleConfirmDeleteModal}/>
                </Modal>
                <Button text='Cancel' onClick={toggleUpdateModal}/>
            </div> 
        </Modal>



        <Modal State={isAddModalActive} ChangeState={toggleAddModal} Title="Add Employee">
            <div className="ModalBody">
                <div className="ModalRight">
                    <TextInput id="name" text="Employee Name" onChange={getName}/>
                    <TextInput id="rut" text="Employee Rut" onChange={getRut}/>
                    <TextInput id="email" text="Employee Mail" onChange={getEmail}/>
                    <TextInput id="direction" text="Employee Direction" onChange={getDirection}/>
                    <TextInput id="phone" text="Employee Phone" onChange={getPhone}/>
                    <ButtonFile id="ChooseFile" accept="image/png, image/jpg, image/gif, image/jpeg" />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Button text='Add Other Employee' onClick={save}/>
                <Button text='Add Employee' onClick={() => {save(); toggleAddModal();}}/>
                <Button text='Cancel' onClick={toggleAddModal}/>
            </div>
        </Modal>

        
        <Legend/>
        <Table data={Data} column={Titles} setModalData={setUpdateModalData}/>
        
    </div>
    );
}