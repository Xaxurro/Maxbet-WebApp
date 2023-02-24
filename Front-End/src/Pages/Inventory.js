import { Button } from "../Components/Button"
import { ButtonFile } from "../Components/ButtonFile"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal";
import { useState, useEffect } from "react";
import { TextInput } from "../Components/TextInput";
import { sendRequest } from "../Helpers/sendRequest";

import "../Css/Modal.css"


const Filters = ["Item id", "Item Name", "Origin", "Owner Name", "Status"]
const Titles = [{ heading: 'Serial', value: "serial" }, { heading: 'Item Name', value: "name" }, { heading: 'Origin', value: "origin" }, { heading: 'Owner Name', value: "owner" }, { heading: 'Status', value: "state" }];
const UPDATETIME = 60000;
const URL = "http://localhost:5000/product/";

export function Inventory() {
    const [isAddModalActive, setAddModalState] = useState(false);
    const [isModalActive, setModalState] = useState(false);
    const [isUpdateModalActive, setUpdateModalState] = useState(false);
    const [initDatos, setInitDatos] = useState(false);
    const [items, setItems] = useState([]);

    const [OldSerial, setOldSerial] = useState("");
    const [IName, setIName] = useState("");
    const [ISerial, setISerial] = useState("");
    const [IOrigin, setIOrigin] = useState("");
    const [IOwner, setIOwner] = useState("");


    const toggleModal = () =>{
        setModalState(!isModalActive);
    }
    const toggleAddModal = () => {
        setAddModalState(!isAddModalActive);
    }

    const toggleUpdateModal = () => {
        setUpdateModalState(!isUpdateModalActive);
    }

    const setUpdateModalData = (index) => {
        setISerial(items[index].serial);
        setIName(items[index].name);
        setIOrigin(items[index].origin);
        setIOwner(items[index].owner);
        setOldSerial(items[index].serial);
        toggleUpdateModal();
    }

    const getItems = () => {
        sendRequest(URL)
            .then(response => response.json())
            .then(json => {
                if (json.success) return json.data;
                return [];
            })
            .then(data => setItems([...data]));
    }

    const saveOne = () => {
        const data = {
            product: {
                name: IName,
                serial: ISerial,
                state: "Recibido",
                origin: IOrigin,
                owner: IOwner,
            }
        };

        sendRequest(URL, data, 'POST').then(() => toggleAddModal());
    }

    const saveMore = () => {
        const data = {
            product: {
                name: IName,
                serial: ISerial,
                state: "Recibido",
                origin: IOrigin,
                owner: IOwner,
            }
        };

        sendRequest(URL, data, 'POST').then(setISerial(""));
    }

    const update = () => {
        const data = {
            serial: OldSerial,
            product: {
                name: IName,
                serial: ISerial,
                state: "Recibido",
                origin: IOrigin,
                owner: IOwner,
            }
        };

        sendRequest(URL, data, 'POST').then(() => toggleUpdateModal());
    }

    const deleteItem = serial => {
        const item = {
            serial: serial
        };

        sendRequest(URL, item, 'DELETE').then(() =>toggleModal()).then(toggleUpdateModal());
    }

    const getName = e => { setIName(e.target.value) }
    const getSerial = e => { setISerial(e.target.value) }
    const getOrigin = e => { setIOrigin(e.target.value) }
    const getOwner = e => { setIOwner(e.target.value) }

    /**
     * En la linea 17 se crea un hook que mantiene el estado de la inicializacion de los datos,
     * que por defecto esta en false, esto es para que los datos se carguen inmediatamente al iniciar la app
     * sino, habria que esperar la cantidad de milisegundos del UPDATETIME (60000ms | 1s).
     * Los datos se continuan actualizando cada este intervalo mediante useEffect() para evitar
     * que los datos se dupliquen exponencialmente (causa inicial del lag). Esto es porque el 
     * arreglo vacio ([]) que se le pasa como segundo parametro a useEffect() le indica a esta 
     * funcion que solo se ejecute una vez y no en cada renderizado
     *  
     */
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

                <h1><i>Inventory</i></h1>
                <div className="right">
                    <Filter data={Filters} />
                    <Button className="Button" Text="Search" onClick={getItems} />
                    <Button className="Button" Text="Add Item" onClick={toggleAddModal} />
                </div>
            </div>
            <Modal State={isUpdateModalActive} ChangeState={toggleUpdateModal} Title="Update Item">
                <div className="ModalBody">
                    <div className="ModalRight">
                        <TextInput id="ISerial" text="Item Serial" onChange={getSerial} value={ISerial}/>
                        <TextInput id="IName" text="Item Name" onChange={getName} value={IName}/>
                        <TextInput id="IOrigin" text="Item Origin" onChange={getOrigin} value={IName}/>
                        <TextInput id="IOwner" text="Item Owner" onChange={getOwner} value={IOwner}/>
                    </div>


                    <div className="Left">
                        <label htmlFor="ChooseFile">
                            <ButtonFile id="ChooseFile" accept="image/png, image/jpg, image/gif, image/jpeg"/>
                        </label>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button Text='Update Item' onClick={update}/>
                    <Button Text='Delete Item' onClick={toggleModal}/>
                    <Modal State={isModalActive} ChangeState={toggleModal} Title="Confirm?">
                        <Button Text='Delete Item' onClick={() => deleteItem(OldSerial)}/>
                        <Button Text='Cancel' onClick={toggleModal}/>

                    </Modal>
                    <Button Text='Cancel' onClick={toggleUpdateModal}/>
                </div>
            </Modal>
            <Modal State={isAddModalActive} ChangeState={toggleAddModal} Title="Add Item">
                <div className="ModalBody">
                    <div className="ModalRight">
                        <TextInput id="ISerial" text="Item Serial" onChange={getSerial}/>
                        <TextInput id="IName" text="Item Name" onChange={getName}/>
                        <TextInput id="IOrigin" text="Item Origin" onChange={getOrigin}/>
                        <TextInput id="IOwner" text="Item Owner" onChange={getOwner}/>
                    </div>


                    <div className="Left">
                        <label htmlFor="ChooseFile">
                            <ButtonFile id="ChooseFile" accept="image/png, image/jpg, image/gif, image/jpeg" />
                        </label>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button Text='Add OtherItem' onClick={saveMore}/>
                    <Button Text='Add Item' onClick={saveOne}/>
                    <Button Text='Cancel' onClick={toggleAddModal}/>
                </div>
            </Modal>
            <Table data={items} column={Titles} setModalData={setUpdateModalData} />


        </div>
    );
}