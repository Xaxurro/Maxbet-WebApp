import React, { useState, useEffect } from "react";
import { Button } from "../Components/Button"
import { Table } from "../Components/Table";
import { Modal } from "../Components/Modal";


import "../Css/Employees.css"
import { sendRequest } from "../Helpers/sendRequest";

export default function Delivered() {
    const [items, setItems] = useState([]);
    const URL = "http://localhost:5000/product/";
    const UPDATETIME = 60000;
    const [initDatos, setInitDatos] = useState(false)
    const Titles = [{ heading: 'Serial', value: "serial" }, { heading: 'Item Name', value: "name" }, { heading: 'Origin', value: "origin" }, { heading: 'Owner Name', value: "owner" }, { heading: 'Status', value: "state" }];


    const TitlesHistory = [{ heading: 'date', value: "date" }, { heading: 'change', value: "change" }, { heading: 'comment', value: "comment" }];
    
    
    const [isConfirmDeleteModalActive, setConfirmDeleteModalState] = useState(false);
    const [isUpdateModalActive, setUpdateModalState] = useState(false);

    const toggleUpdateModal = () => {
        setUpdateModalState(!isUpdateModalActive);
    }
    const toggleConfirmDeleteModal = () =>{
        setConfirmDeleteModalState(!isConfirmDeleteModalActive);
    }

    
    const getItems = () => {
    
    const filter = {state: "delivered"}
    sendRequest(URL, filter, "PUT")
        .then(response => response.json())
        .then(json => {
            if (json.success) return json.data;
            return [];
        })
        .then(data => setItems([...data]));
        }


    if (!initDatos) {
        getItems();
        setInitDatos(true)
    }
    useEffect(() => {
        setInterval(() => {
            getItems();
        }, UPDATETIME);
    }, []);
    
    const [OldSerial, setOldSerial] = useState("");
    const [IName, setIName] = useState("");
    const [ISerial, setISerial] = useState("");
    const [IOrigin, setIOrigin] = useState("");
    const [IOwner, setIOwner] = useState("");
    const [IState, setIState] = useState("");
    const [Ihistory , setIhistory] = useState([])
    
    const setUpdateModalData = (index) => {
        setISerial(items[index].serial);
        setIName(items[index].name);
        setIOrigin(items[index].origin);
        setIOwner(items[index].owner);
        setOldSerial(items[index].serial);
        setIhistory(items[index].history);
        toggleUpdateModal();
    }
    const deleteItem = ID => {
        console.log(ID);
        const item = {
            serial: ID
        };

        sendRequest(URL, item, 'DELETE', getItems).then(() => {toggleConfirmDeleteModal(); toggleUpdateModal();});
    }

  return (
    <div className="Employees"> 
        <div className="Title">
            
            <h1><i>Delivered</i></h1>
            <div className="right">
                <Button className="Button" text="Search" />
                <Button className="Button" text="Add Employee"  />
            </div>
        </div>
        <Modal State={isUpdateModalActive} ChangeState={toggleUpdateModal} Title="History">

            <br />
            <br />
            <Table data = {Ihistory} column={TitlesHistory} />
            <br />
            <br />
            <br />
            <Button text='Update Item' type='submit'/>
            <Button text='Delete Item' onClick={toggleConfirmDeleteModal}/>
            <Modal State={isConfirmDeleteModalActive} ChangeState={toggleConfirmDeleteModal} Title="Confirm?">
                <Button text='Delete Item' onClick={() => deleteItem(ISerial)}/>
                <Button text='Cancel' onClick={toggleConfirmDeleteModal}/>
            <Button text='Cancel' onClick={toggleUpdateModal}/>
            </Modal>

        </Modal>
        <Table data={items} column={Titles} setModalData={setUpdateModalData} />
        
    </div>
  )
}
