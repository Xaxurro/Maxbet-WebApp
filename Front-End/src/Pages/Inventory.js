import { Button } from "../Components/Button"
import { ButtonFile } from "../Components/ButtonFile"
import { ButtonCleanFilters } from "../Components/ButtonCleanFilters";
import { Table } from "../Components/Table";
import { Modal } from "../Components/Modal";
import { useState, useEffect } from "react";
import { TextInput } from "../Components/TextInput";
import { SelectionInput } from "../Components/SelectionInput";

import { sendRequest } from "../Helpers/sendRequest";
import { cleanStates } from "../Helpers/cleanStates";
import { filter } from "../Helpers/filter";

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
    const [filters, setFilters] = useState({state: "received"});

    const [oldSerial, setOldSerial] = useState("");
    const [name, setName] = useState("");
    const [serial, setSerial] = useState("");
    const [origin, setOrigin] = useState("");
    const [owner, setOwner] = useState("");
    const [state, setState] = useState("");

    const states = [
        {name: "oldSerial", value: oldSerial, set: setOldSerial},
        {name: "serial", value: serial, set: setSerial},
        {name: "name", value: name, set: setName},
        {name: "origin", value: origin, set: setOrigin},
        {name: "owner", value: owner, set: setOwner},
        {name: "state", value: state, set: setState},
    ];


    const toggleSearchModal = () =>{
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
        setSerial(items[index].serial);
        setName(items[index].name);
        setOrigin(items[index].origin);
        setOwner(items[index].owner);
        setState(items[index].state);
        toggleUpdateModal();
    }

    const getItems = () => {
        sendRequest(URL, filters, "PUT")
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
                name: name,
                serial: serial,
                origin: origin,
                owner: owner,
                state: "received",
            }
        }

        sendRequest(URL, data, 'POST', getItems);
    }

    const update = () => {
        const data = {
            serial: oldSerial,
            product: {
                name: name,
                serial: serial,
                origin: origin,
                owner: owner,
                state: state,
            }
        };

        sendRequest(URL, data, 'PATCH', getItems).then(() => toggleUpdateModal());
    }

    const remove = serial => {
        const item = {
            serial: serial
        };

        sendRequest(URL, item, 'DELETE', getItems).then(() => {toggleConfirmDeleteModal(); toggleUpdateModal();});
    }


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
                    <ButtonCleanFilters filters={filters} states={states} get={getItems}/>
                    <Button className="Button" text="Search" onClick={() => {cleanStates(states); toggleSearchModal();}} />
                    <Button className="Button" text="Add Item" onClick={() => {cleanStates(states); toggleAddModal();}} />
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



            <Modal State={isUpdateModalActive} ChangeState={toggleUpdateModal} Title="Update Item">
                <div className="ModalBody">
                    <div className="ModalRight">
                        <TextInput id="serial" text="Item Serial" setValue={setSerial} value={serial}/>
                        <TextInput id="name" text="Item Name" setValue={setName} value={name}/>
                        <TextInput id="origin" text="Item Origin" setValue={setOrigin} value={origin}/>
                        <TextInput id="owner" text="Item Owner" setValue={setOwner} value={owner}/>
                        <ButtonFile id="ChooseFile" accept="image/png, image/jpg, image/gif, image/jpeg" text="Item File"/>
                        <SelectionInput id="state" text="Item State" options={States} setValue={setState} value={state}/>
                    </div>
                    <br />
                    <br />
                    <Button text='Update Item' onClick={update}/>
                    <Button text='Delete Item' onClick={toggleConfirmDeleteModal}/>
                    <Button text='Cancel' onClick={toggleUpdateModal}/>
                    <Modal State={isConfirmDeleteModalActive} ChangeState={toggleConfirmDeleteModal} Title="Confirm?">
                        <Button text='Delete Item' onClick={() => remove(oldSerial)}/>
                        <Button text='Cancel' onClick={toggleConfirmDeleteModal}/>
                    </Modal>
                </div>
            </Modal>



            <Modal State={isAddModalActive} ChangeState={toggleAddModal} Title="Add Item">
                <div className="ModalBody">
                    <div className="ModalRight">
                        <TextInput id="serial" text="Item Serial" setValue={setSerial} value={serial}/>
                        <TextInput id="name" text="Item Name" setValue={setName} value={name}/>
                        <TextInput id="origin" text="Item Origin" setValue={setOrigin} value={origin}/>
                        <TextInput id="owner" text="Item Owner" setValue={setOwner} value={owner}/>
                        <ButtonFile id="ChooseFile" text="Item File" accept="image/png, image/jpg, image/gif, image/jpeg"/>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button text='Add Another Item' onClick={() => {save(); cleanStates(states);}}/>
                    <Button text='Add Item' onClick={() => {save(); toggleAddModal();}}/>
                    <Button text='Cancel' onClick={toggleAddModal}/>
                </div>
            </Modal>
            <Table data={items} column={Titles} setModalData={setUpdateModalData} />
        </div>
    );
}