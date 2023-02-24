import React, { useState, useEffect } from "react";
import { Button } from "../Components/Button"
import { Legend } from "../Components/Legend"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal";
import { ButtonFile } from "../Components/ButtonFile";
import { TextInput } from "../Components/TextInput";

import "../Css/Employees.css"
import { sendRequest } from "../Helpers/sendRequest";

const Filters = ["Id Employee","Employee Name","Task","Employee Status"]
const Titles =[{heading: 'Id Employee', value: "_id"},{heading: 'Employee Name', value: "name"},{heading: 'Employee Status', value: "status"}];

const URL = "http://localhost:5000/employee/";
const UPDATETIME = 60000;

export function Employees(){
    const [isAddModalActive, setAddModalState] = useState(false);
    const [isUpdateModalActive, setUpdateModalState] = useState(false);
    const [initDatos, setInitDatos] = useState(false);
    const [Data, setEmployees] = useState([]);

    const [ID, setID] = useState("");
    const [ERut, setERut] = useState("");
    const [EName, setEName] = useState("");
    const [EMail, setEMail] = useState("");
    const [EPhone, setEPhone] = useState("");
    const [EDirection, setEDirection] = useState("");

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

        sendRequest(URL, data, 'POST').then(res => console.log(res.json()))
        .then(() => toggleAddModal()).then(() => getEmployees());
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

        sendRequest(URL, data, 'POST').then(() => getEmployees());
    }

    const update = () => {
        const data = {
            _id: ID,
            employee: {
                name: EName,
                rut: ERut,
                email: EMail,
                direction: EDirection,
                phone: EPhone,
                status: "idle"
            }
        };

        sendRequest(URL, data, 'POST').then(() => toggleUpdateModal()).then(() => getEmployees());
    }

    const deleteItem = ID => {
        console.log(ID);
        const item = {
            id: ID
        };

        sendRequest(URL, item, 'DELETE').then(() => toggleUpdateModal()).then(() => getEmployees());
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
                <Button className="Button" Text="Search" onClick={getEmployees} />
                <Button className="Button" Text="Add Employee" onClick={toggleAddModal} />
            </div>
        </div>
        <Modal State={isUpdateModalActive} ChangeState={toggleUpdateModal} Title="Update Employee">
            <div className="ModalBody">
                <div className="ModalRight">
                    <TextInput id="EName" text="Employee Name" onChange={getName} value={EName}/>
                    <TextInput id="ERut" text="Employee Rut" onChange={getRut} value={ERut}/>
                    <TextInput id="EMail" text="Employee Mail" onChange={getMail} value={EMail}/>
                    <TextInput id="EDirection" text="Employee Direction" onChange={getDirection} value={EDirection}/>
                    <TextInput id="EPhone" text="Employee Phone" onChange={getPhone} value={EPhone}/>
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
                <Button Text='Update Item' onClick={update}/>
                <Button Text='Delete Item' onClick={() => deleteItem(ID)}/>
                <Button Text='Cancel' onClick={toggleUpdateModal}/>
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
                <Button Text='Add Other Employee' onClick={saveMore}/>
                <Button Text='Add Employee' onClick={saveOne}/>
                <Button Text='Cancel' onClick={toggleAddModal}/>
            </div>
        </Modal>
        
        <Legend/>
        <Table data={Data} column={Titles} setModalData={setUpdateModalData}/>
        
    </div>
    );
}