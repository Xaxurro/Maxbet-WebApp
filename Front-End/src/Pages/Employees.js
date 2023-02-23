import React,{ useState } from "react";
import { Button } from "../Components/Button"
import { Legend } from "../Components/Legend"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal";
import { ButtonFile } from "../Components/ButtonFile";

import "../Css/Employees.css"
import { sendRequest } from "../Helpers/sendRequest";

const Filters = ["Id Employee","Employee Name","Task","Employee Status"]
const Titles =[{heading: 'Id Employee', value: "_id"},{heading: 'Employee Name', value: "name"},{heading: 'Task', value: "task"},{heading: 'Employee Status', value: "status"}];

const URL = "http://localhost:5000/employee/";

export function Employees(){
    const [State, changeState] = useState(false);

    const [Data, setEmployees] = useState([]);
    // const [IName, setIName] = useState("");
    // const [ISerial, setISerial] = useState("");
    // const [IOrigin, setIOrigin] = useState("");
    // const [IOwner, setIOwner] = useState("");

    const toggle = () => {
        changeState(!State)
    }

    const getEmployees = () => {
        sendRequest(URL)
        .then(response => response.json())
        .then(json => {
            if (json.success) return json.data;
            return [];
        })
        .then(data => {
            setEmployees(data);
            return data;
        });
    }

    // const save = () => {
    //     const data = JSON.stringify({
    //         product: {
    //             name: IName,
    //             serial: ISerial,
    //             state: "Recibido",
    //             origin: IOrigin,
    //             owner: IOwner,
    //         }
    //     });

    //     fetch('http://localhost:5000/product/', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: data
    //     })
    //     .then(() => toggle());
    // }

    // const deleteItem = serial => {
    //     const item = JSON.stringify({
    //         serial: serial
    //     });
    
    //     fetch('http://localhost:5000/product/', {
    //         headers:{          
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },          
    //         method: 'DELETE',
    //         body: item
    //     })
    //     .then(res => res.text())
    //     .then(json => console.log(json))
    // }

    // const getName = e => {setIName(e.target.value)}
    // const getSerial = e => {setISerial(e.target.value)}
    // const getOrigin = e => {setIOrigin(e.target.value)}
    // const getOwner = e => {setIOwner(e.target.value)}

    getEmployees();

    return (
    <div className="Employees"> 
        <div className="Title">
            
            <h1><i>Employees</i></h1>
            <div className="right">
                <Filter data={Filters}/>
                <Button className="Button" type="submit" Text ="Search"/>
                <Button className="Button" Text ="Add Employee" onClick ={toggle}/>
                {/* <button  className="Button" onclick ={() => changeState(!State)}>addemploye</button> */}
                    {/* // <Modal State = {modalState}  changeState= {changeState}>
                    //     <input type="submit" placeholder="Hola Mundo"/>
                    // </Modal>}/> */}
            </div>
        </div>
        <Modal State = {State}  ChangeState= {toggle} Tittle = "Add Employee">
            <div className="ModalBody">
                <div className="ModalRight">
                    <label for="EName">Employee Name:</label>
                    <input id="EName"type="text"/>

                    <label for="ERut">Employee Rut:</label>
                    <input id="ERut"type="text"/>

                    <label for="EMail">Employee Mail:</label>
                    <input id="EMail"type="text"/>

                    <label for="EDirection">Employee Direcction:</label>
                    <input id="EDirection"type="text"/>

                    <label for="EPhone">Employee Phone:</label>
                    <input id="EPhone"type="text"/>
                </div>


                <div className="Left">
                <label for="ChooseFile">
                    <ButtonFile id="ChooseFile" className="ButtonFile" type="file" accept="image/png, image/jpg, image/gif, image/jpeg"/>
                </label>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Button className='Button' Text='Add Employee'></Button>
                <Button className='Button' Text='Cancel' onClick={toggle}></Button>
            </div>
        </Modal>
        
        <Legend/>
        <Table data={Data}column={Titles}/>
        
    </div>
    );
}