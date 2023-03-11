import React, { useState, useEffect } from "react";
import { Button } from "../Components/Button";
import { ButtonCleanFilters } from "../Components/ButtonCleanFilters";
import { Table } from "../Components/Table";
import { Modal } from "../Components/Modal";
import { TextInput } from "../Components/TextInput";

import { sendRequest } from "../Helpers/sendRequest";
import { cleanStates } from "../Helpers/cleanStates";
import { filter } from "../Helpers/filter";

import "../Css/Employees.css"

const Titles = [{ heading: 'Serial', value: "serial" }, { heading: 'Item Name', value: "name" }, { heading: 'Origin', value: "origin" }, { heading: 'Owner Name', value: "owner" }, { heading: 'Status', value: "state" }];
const TitlesHistory = [{ heading: 'Date', value: "date" }, { heading: 'Change', value: "change" }, { heading: 'Key', value: "key" }, { heading: 'Value', value: "value" }];
const UPDATETIME = 60000;
const URL = "http://localhost:5000/product/";


export default function Delivered() {
    // States
    const [isConfirmDeleteModalActive, setConfirmDeleteModalState] = useState(false);
    const [isUpdateModalActive, setUpdateModalState] = useState(false);
    const [isSearchModalActive, setSearchModalState] = useState(false);
    
    const [initDatos, setInitDatos] = useState(false)
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({state: "delivered"});
    
    const [serial, setSerial] = useState("");
    const [name, setName] = useState("");
    const [origin, setOrigin] = useState("");
    const [owner, setOwner] = useState("");
    const [history , setHistory] = useState([]);

    const states = [
        {name: "serial", value: serial, set: setSerial},
        {name: "name", value: name, set: setName},
        {name: "origin", value: origin, set: setOrigin},
        {name: "owner", value: owner, set: setOwner},
        {name: "history", value: history, set: setHistory},
    ];

    // Toggle Modals
    const toggleSearchModal = () =>{
        setSearchModalState(!isSearchModalActive);
    }

    const toggleUpdateModal = () => {
        setUpdateModalState(!isUpdateModalActive);
    }

    const toggleConfirmDeleteModal = () =>{
        setConfirmDeleteModalState(!isConfirmDeleteModalActive);
    }

    // Set Data
    const setUpdateModalData = (index) => {
        setSerial(items[index].serial);
        setHistory(items[index].history);
        toggleUpdateModal();
    }
    
    // Metodos HTTP
    const getItems = () => {
        sendRequest(URL, filters, "PUT")
            .then(response => response.json())
            .then(json => {
                if (json.success) return json.data;
                return [];
            })
            .then(data => setItems([...data]));
    }

    const recoverItem = () => {
        const data = {
            serial: serial,
            product: {
                state: "received",
            }
        };

        sendRequest(URL, data, 'PATCH', getItems);
    }

    const deleteItem = ID => {
        const item = {
            serial: ID
        };
        
        sendRequest(URL, item, 'DELETE', getItems).then(() => {toggleConfirmDeleteModal(); toggleUpdateModal();});
    }
    
    // InitDatos
    if (!initDatos) {
        getItems();
        setInitDatos(true)
    }
    useEffect(() => {
        setInterval(() => {
            getItems();
        }, UPDATETIME);
    }, []);

  return (
    <div className="Employees"> 
        <div className="Title">
            
            <h1><i>Delivered</i></h1>
            <div className="right">
                <ButtonCleanFilters filters={filters} states={states} get={getItems} blacklist={["state"]}/>
                <Button className="Button" text="Search" onClick={() => {cleanStates(states); toggleSearchModal();}} />
            </div>
        </div>


        <Modal State={isSearchModalActive} ChangeState={toggleSearchModal} Title="Search">
            <div className="ModalBody">
                <TextInput id="serial" text="Item Serial" setValue={setSerial} value={serial}/>
                <TextInput id="name" text="Item Name" setValue={setName} value={name}/>
                <TextInput id="origin" text="Item Origin" setValue={setOrigin} value={origin}/>
                <TextInput id="owner" text="Item Owner" setValue={setOwner} value={owner}/>
                <Button text="Search" onClick = {() => {filter(filters, states, getItems); toggleSearchModal();}}/>
            </div>
        </Modal>


        <Modal State={isUpdateModalActive} ChangeState={toggleUpdateModal} Title="History">
            <Button text='Recover Item' onClick={() => {recoverItem(); toggleUpdateModal()}}/>
            <Button text='Delete Item' onClick={toggleConfirmDeleteModal}/>
            <br />
            <br />
            <Table data = {history} column={TitlesHistory} />
            <br />
            <br />
            <br />
            <Modal State={isConfirmDeleteModalActive} ChangeState={toggleConfirmDeleteModal} Title="Confirm?">
                <Button text='Delete Item' onClick={() => deleteItem(serial)}/>
                <Button text='Cancel' onClick={toggleConfirmDeleteModal}/>
            <Button text='Cancel' onClick={toggleUpdateModal}/>
            </Modal>

        </Modal>
        <Table data={items} column={Titles} setModalData={setUpdateModalData} />
        
    </div>
  )
}
