import { Button } from "../Components/Button"
import { ButtonFile } from "../Components/ButtonFile"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal.js";
import { useState } from "react";

import "../Css/Modal.css"


const Filters = ["Item id","Item Name","Origin","Owner Name","Status"]
const Titles =[ {heading: 'Serial', value:"serial"},{heading: 'Item Name', value:"name"},{heading: 'Origin' , value:"origin"},{heading: 'Owner Name' , value:"owner"},{heading: 'Status' , value:"state"}];
export function Inventory(){
    const [isModalActive, setModalState] = useState(false);
    const [items, setItems] = useState([]);

    const [IName, setIName] = useState("");
    const [ISerial, setISerial] = useState("");
    const [IOrigin, setIOrigin] = useState("");
    const [IOwner, setIOwner] = useState("");

    const toggle = () => {
        setModalState(!isModalActive)
    }

    const getItems = () => {
        fetch('http://localhost:5000/product/', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(json => {
            if (json.success) return json.data;
            return [];
        })
        .then(data => {
            setItems(data);
            return data;
        });
    }

    const save = () => {
        const data = JSON.stringify({
            product: {
                name: IName,
                serial: ISerial,
                state: "Recibido",
                origin: IOrigin,
                owner: IOwner,
            }
        });

        fetch('http://localhost:5000/product/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        })
        .then(() => getItems())
        .then(() => toggle());
    }

    const getName = e => {setIName(e.target.value)}
    const getSerial = e => {setISerial(e.target.value)}
    const getOrigin = e => {setIOrigin(e.target.value)}
    const getOwner = e => {setIOwner(e.target.value)}

    getItems();

    return (
    <div className="Employees"> 
        <div className="Title">
            
            <h1><i>Inventory</i></h1>
            <div className="right">
                <Filter data={Filters}/>
                <Button className="Button" Text ="Search" onClick ={getItems}/>
                <Button className="Button" Text ="Add Item" onClick ={toggle}/>
            </div>
        </div>
        <Modal State = {isModalActive} ChangeState = {toggle} Title = "Add Item">
            <div className="ModalBody">
                <div className="ModalRight">
                    <label for="IName">Item Name:</label><br/>
                    <input id="IName" type="text" onChange={getName}/><br/>

                    <label for="ISerial">Item Serial:</label><br/>
                    <input id="ISerial" type="text" onChange={getSerial}/><br/>

                    <label for="IOrigin">Item Origin:</label><br/>
                    <input id="IOrigin" type="text" onChange={getOrigin}/><br/>

                    <label for="IOwner">Item Owner:</label><br/>
                    <input id="IOwner" type="text" onChange={getOwner}/><br/>
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
                <Button className='Button' Text='Add Item' onClick={save}></Button>
                <Button className='Button' Text='Cancel' onClick={toggle}></Button>
            </div>
        </Modal>
        <Table data={items} column={Titles}/>
        
        
    </div>);
}