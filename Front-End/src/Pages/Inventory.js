import { Button } from "../Components/Button"
import { ButtonFile } from "../Components/ButtonFile"
import { Table } from "../Components/Table";
// import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal";
import { useState, useEffect } from "react";
import { TextInput } from "../Components/TextInput";
// import { SelectionInput } from "../Components/SelectionInput";
import { sendRequest } from "../Helpers/sendRequest";
import { Form } from "../Components/Form";

import "../Css/Modal.css"


// const Filters = ["Item id", "Item Name", "Origin", "Owner Name", "Status"]
const Titles = [{ heading: 'Serial', value: "serial" }, { heading: 'Item Name', value: "name" }, { heading: 'Origin', value: "origin" }, { heading: 'Owner Name', value: "owner" }, { heading: 'Status', value: "state" }];
const States = [{name: "Recibido", id:"received"}, {name: "Entregado", id:"delivered"}];
const UPDATETIME = 60000;
const URL = "http://localhost:5000/product/";

export function Inventory() {
    const [isAddModalActive, setAddModalState] = useState(false);
    const [isConfirmDeleteModalActive, setConfirmDeleteModalState] = useState(false);
    const [isUpdateModalActive, setUpdateModalState] = useState(false);

    const [isSearchModalActive, setSearchModalState] = useState(false);
    
    const [initDatos, setInitDatos] = useState(false);
    const [items, setItems] = useState([]);

    const [OldSerial, setOldSerial] = useState("");
    const [IName, setIName] = useState("");
    const [ISerial, setISerial] = useState("");
    const [IOrigin, setIOrigin] = useState("");
    const [IOwner, setIOwner] = useState("");
    const [IState, setIState] = useState("");


    const toggleSearchmodal = () =>{
        setSearchModalState(!isSearchModalActive);
    }
    const toggleConfirmDeleteModal = () =>{
        setConfirmDeleteModalState(!isConfirmDeleteModalActive);
    }
    const toggleAddModal = () => {
        setAddModalState(!isAddModalActive);
    }

    const toggleUpdateModal = () => {
        setUpdateModalState(!isUpdateModalActive);
    }

    const setUpdateModalData = (index) => {
        setOldSerial(items[index].serial);
        setISerial(items[index].serial);
        setIName(items[index].name);
        setIOrigin(items[index].origin);
        setIOwner(items[index].owner);
        setIState(items[index].state);
        toggleUpdateModal();
    }

    const getItems = () => {
        const filter = {state: "received"}
        sendRequest(URL, filter, "PUT")
            .then(response => response.json())
            .then(json => {
                if (json.success) return json.data;
                return [];
            })
            .then(data => setItems([...data]));
    }

    const save = () => {
        const data = {
            product: {
                name: IName,
                serial: ISerial,
                state: "received",
                origin: IOrigin,
                owner: IOwner,
            }
        }

        sendRequest(URL, data, 'POST', getItems);
    }

    const update = () => {
        const data = {
            serial: OldSerial,
            product: {
                name: IName,
                serial: ISerial,
                state: IState,
                origin: IOrigin,
                owner: IOwner,
            }
        };

        console.log("data");
        console.log(data);

        sendRequest(URL, data, 'PATCH', getItems).then(() => toggleUpdateModal());
    }

    const deleteItem = serial => {
        const item = {
            serial: serial
        };

        sendRequest(URL, item, 'DELETE', getItems).then(() => {toggleConfirmDeleteModal(); toggleUpdateModal();});
    }

    const getName = e => { setIName(e.target.value) }
    const getSerial = e => { setISerial(e.target.value) }
    const getOrigin = e => { setIOrigin(e.target.value) }
    const getOwner = e => { setIOwner(e.target.value) }
    const getState = e => { setIState(e.target.value) }


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

    // console.log(items[1].name);

    return (
        <div className="Employees">
            <div className="Title">

                <h1><i>Inventory</i></h1>
                <div className="right">
                    
                    <Button className="Button" text="Search" onClick={toggleSearchmodal} />
                    <Button className="Button" text="Add Item" onClick={toggleAddModal} />
                </div>
            </div>

            <Modal State={isSearchModalActive} ChangeState={toggleSearchmodal} Title="Search Modal">
                <TextInput id="ISerial" text="Item Serial" />
                <TextInput id="IName" text="Item Name" />
                <TextInput id="IOrigin" text="Item Origin" />
                <TextInput id="IOwner" text="Item Owner" />
                <Button text="submit" type="submit" onClick/>
            </Modal>



            <Modal State={isUpdateModalActive} ChangeState={toggleUpdateModal} Title="Update Item">
                <div className="ModalBody">
                    <div className="ModalRight">
                        <TextInput id="serial" text="Item Serial" onChange={getSerial} value={ISerial}/>
                        <TextInput id="name" text="Item Name" onChange={getName} value={IName}/>
                        <TextInput id="origin" text="Item Origin" onChange={getOrigin} value={IOrigin}/>
                        <TextInput id="owner" text="Item Owner" onChange={getOwner} value={IOwner}/>
                        <br />
                        <label>Item Status: 
                            <select value={IState} onChange={getState}>
                                <option value="received">Received</option>
                                <option value="delivered">Delivered</option>
                            </select>
                        </label>
                        <ButtonFile id="ChooseFile" text="File:" accept="image/png, image/jpg, image/gif, image/jpeg"/>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button text='Update Item' onClick={update}/>
                    <Button text='Delete Item' onClick={toggleConfirmDeleteModal}/>
                    <Modal State={isConfirmDeleteModalActive} ChangeState={toggleConfirmDeleteModal} Title="Confirm?">
                        <Button text='Delete Item' onClick={() => deleteItem(OldSerial)}/>
                        <Button text='Cancel' onClick={toggleConfirmDeleteModal}/>
                    </Modal>
                    <Button text='Cancel' onClick={toggleUpdateModal}/>
                </div>
            </Modal>



            <Modal State={isAddModalActive} ChangeState={toggleAddModal} Title="Add Item">
                <div className="ModalBody">
                    <div className="ModalRight">
                        <input type="hidden" id="state" name="state" value={"Recibido"}/>
                        <TextInput id="serial" text="Item Serial" onChange={getSerial}/>
                        <TextInput id="name" text="Item Name" onChange={getName}/>
                        <TextInput id="origin" text="Item Origin" onChange={getOrigin}/>
                        <TextInput id="owner" text="Item Owner" onChange={getOwner}/>
                        <label htmlFor="ChooseFile">
                            <ButtonFile id="ChooseFile" accept="image/png, image/jpg, image/gif, image/jpeg" />
                        </label>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button text='Add Another Item' onClick={save}/>
                    <Button text='Add Item' onClick={() => {save(); toggleAddModal();}}/>
                    <Button text='Cancel' onClick={toggleAddModal}/>
                </div>
            </Modal>
            <Table data={items} column={Titles} setModalData={setUpdateModalData} />
        </div>
    );
}