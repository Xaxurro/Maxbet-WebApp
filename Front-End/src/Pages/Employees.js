import React,{ useState } from "react";
import { Button } from "../Components/Button"
import { Legend } from "../Components/Legend"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal";

import "../Css/Employees.css"

const Filters = ["Id Employee","Employee Name","Task","Employee Status"]
const Titles =[{heading: 'Id Employee'},{heading: 'Employee Name'},{heading: 'Task'},{heading: 'Employee Status'}];

export function Employees(){
    const [State, changeState] = useState(true);

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
                <Button State={State} ChangeState={changeState} className="Button" Text ="Add Employee" onClick ={ toggle}/>
                {/* <button  className="Button" onclick ={() => changeState(!State)}>addemploye</button> */}
                    {/* // <Modal State = {modalState}  changeState= {changeState}>
                    //     <input type="submit" placeholder="Hola Mundo"/>
                    // </Modal>}/> */}
            </div>
        </div>
        <Modal State = {State}  ChangeState= {toggle}>
            <div>

                {/* <h1>{State}</h1> */}
                <input type="text" placeholder="Hola Mundo"/>
            </div>
        </Modal>
        
        <Legend/>
        <Table column={Titles}/>
        
    </div>
    );
}