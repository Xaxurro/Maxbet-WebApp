import React,{ useState } from "react";
import { Button } from "../Components/Button"
import { Legend } from "../Components/Legend"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal";
import { ButtonFile } from "../Components/ButtonFile";

import "../Css/Employees.css"

const Filters = ["Id Employee","Employee Name","Task","Employee Status"]
const Titles =[{heading: 'Id Employee'},{heading: 'Employee Name'},{heading: 'Task'},{heading: 'Employee Status'}];
const aux = 0;
export function Employees(){
    const [State, changeState] = useState(false);

    const toggle = () => {
        changeState(!State)

    }

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
        <Table data={aux}column={Titles}/>
        
    </div>
    );
}