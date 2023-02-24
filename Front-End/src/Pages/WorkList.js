import { Button } from "../Components/Button"
import { ButtonFile } from "../Components/ButtonFile"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal.js";
import { useState } from "react";

import "../Css/Modal.css"


const Filters = ["Name","Responsible","Status","Deadline"]
const Titles =[ {heading: 'ID', value:"ID"},{heading: 'Name', value:"name"},{heading: 'Responsible' , value:"responsible"},{heading: 'Status' , value:"state"},{heading: 'Deadline' , value:"deadline"}];
export function WorkLists(){
    const [isModalActive, setModalState] = useState(false);
    const [lists, setLists] = useState([]);

    const [IName, setIName] = useState("");
    const [IResponsible, setIResponsible] = useState("");
    const [IStatus, setIStatus] = useState("");
    const [IDeadline, setIDeadline] = useState("");
    

    const toggle = () => {
        setModalState(!isModalActive)
    }

    const getLists = () => {
        fetch('http://localhost:5000/worklist/', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(json => {
            if (json.success) return json.data;
            return [];
        })
        .then(data => {
            setLists(data);
            return data;
        });
    }

    const save = () => {
        const data = JSON.stringify({
            product: {
                name: IName,
                responsible: IResponsible,                
                status: "Pendiente",                
                deadline: IDeadline,                
                
            }
        });

        fetch('http://localhost:5000/worklist/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(() => getLists())
        .then(() => toggle());
    }

    const getName = e => {setIName(e.target.value)}
    const getResponsible = e => {setIResponsible(e.target.value)}
    const getDeadline = e => {setIDeadline(e.target.value)}

    getLists();

    return (
    <div className="WorkLists"> 
        <div className="Title">
            
            <h1><i>Work Lists</i></h1>
            <div className="right">
                <Filter data={Filters}/>
                <Button className="Button" Text ="Search" onClick ={getLists}/>
                <Button className="Button" Text ="Add WorkList" onClick ={toggle}/>
            </div>
        </div>
        <Modal State = {isModalActive} ChangeState = {toggle} Title = "Add WorkList">
            <div className="ModalBody">
                <div className="ModalRight">
                    <label htmlFor="IName">WorkList Name:</label><br/>
                    <input id="IName" type="text" onChange={getName}/><br/>

                    <label htmlFor="IResponsible">WorkList Responsible:</label><br/>
                    <input id="IResponsible" type="text" onChange={getResponsible}/><br/>

                    <label htmlFor="IDeadline">WorkList Deadline:</label><br/>
                    <input id="IDeadline" type="text" onChange={getDeadline}/><br/>

                    
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Button className='Button' Text='Add WorkList' onClick={save}></Button>
                <Button className='Button' Text='Cancel' onClick={toggle}></Button>
            </div>
        </Modal>
        <Table data={lists} column={Titles}/>
        
        
    </div>);
}