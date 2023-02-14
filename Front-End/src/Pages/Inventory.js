import { Button } from "../Components/Button"
import { ButtonFile } from "../Components/ButtonFile"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal.js";
import { useEffect, useState } from "react";

import "../Css/Modal.css"


const Filters = ["Item id","Item Name","Origin","Owner Name","Status"]
const Titles =[{heading: 'Item id'},{heading: 'Item Name'},{heading: 'Origin'},{heading: 'Owner Name'},{heading: 'Status'}];
export function Inventory(){
    const [isModalActive, setModalState] = useState(false);
    const [items, setItems] = useState([]);

    

    const toggle = () => {
        setModalState(!isModalActive)
    }

    const getItems = () => {
        setItems(fetch('http://localhost:5000/product/', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(json => {
            if (json.success) return json.data;
            return [];
        })
        .then(data => {
            console.log("data JSON");
            console.log(data);
            return data;
        }));
    }



    return (
    <div className="Employees"> 
        <div className="Title">
            
            <h1><i>Inventory</i></h1>
            <div className="right">
                <Filter data={Filters}/>
                <Button className="Button" type="submit" Text ="Search" onClick={getItems}/>
                <Button className="Button" Text ="Add Item" onClick ={toggle}/>
            </div>
        </div>
        <Modal State = {isModalActive} ChangeState = {toggle} Title = "Add Item">
            <div className="ModalBody">
                <div className="ModalRight">
                    <label for="IName">Item Name:</label><br/>
                    <input id="IName"type="text"/><br/>

                    <label for="IRut">Item Rut:</label><br/>
                    <input id="IRut"type="text"/><br/>

                    <label for="IMail">Item Mail:</label><br/>
                    <input id="IMail"type="text"/><br/>

                    <label for="IDirection">Item Direcction:</label><br/>
                    <input id="IDirection"type="text"/><br/>

                    <label for="IPhone">Item Phone:</label><br/>
                    <input id="IPhone"type="text"/><br/>
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
                <Button className='Button' Text='Add Item'></Button>
                <Button className='Button' Text='Cancel' onClick={toggle}></Button>
            </div>
        </Modal>
        <Table data={items} column={Titles}/>
        
        
    </div>);
}