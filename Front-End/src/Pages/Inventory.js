import { Button } from "../Components/Button"
import { ButtonFile } from "../Components/ButtonFile"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal.js";
import { useState, useEffect } from "react";

import "../Css/Modal.css"


const Filters = ["Item id", "Item Name", "Origin", "Owner Name", "Status"]
const Titles = [{ heading: 'Serial', value: "serial" }, { heading: 'Item Name', value: "name" }, { heading: 'Origin', value: "origin" }, { heading: 'Owner Name', value: "owner" }, { heading: 'Status', value: "state" }];
const UPDATETIME = 60000;

export function Inventory() {
    const [isAddModalActive, setAddModalState] = useState(false);
    const [initDatos, setInitDatos] = useState(false);
    const [isUpdateModalActive, setUpdateModalState] = useState(false);
    const [items, setItems] = useState([]);

    const [OldSerial, setOldSerial] = useState("");
    const [IName, setIName] = useState("");
    const [ISerial, setISerial] = useState("");
    const [IOrigin, setIOrigin] = useState("");
    const [IOwner, setIOwner] = useState("");

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
        fetch('http://localhost:5000/product/', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) return json.data;
                return [];
            })
            .then(data => {
                console.log(data);
                setItems([...data]);

            });
    }

    const saveOne = () => {
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
            .then(() => toggleAddModal());
    }

    const saveMore = () => {
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
            .then(setISerial(""));
    }

    const update = () => {
        const data = JSON.stringify({
            serial: OldSerial,
            product: {
                name: IName,
                serial: ISerial,
                state: "Recibido",
                origin: IOrigin,
                owner: IOwner,
            }
        });

        console.log(data);

        fetch('http://localhost:5000/product/', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        })
            .then(() => toggleUpdateModal());
    }

    const deleteItem = serial => {
        const item = JSON.stringify({
            serial: serial
        });

        fetch('http://localhost:5000/product/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: item
        })
            .then(() => toggleUpdateModal());
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
                        <label for="ISerial">Item Serial:</label><br />
                        <input id="ISerial" type="text" onChange={getSerial} value={ISerial} /><br />

                        <label for="IName">Item Name:</label><br />
                        <input id="IName" type="text" onChange={getName} value={IName} /><br />

                        <label for="IOrigin">Item Origin:</label><br />
                        <input id="IOrigin" type="text" onChange={getOrigin} value={IOrigin} /><br />

                        <label for="IOwner">Item Owner:</label><br />
                        <input id="IOwner" type="text" onChange={getOwner} value={IOwner} /><br />
                    </div>


                    <div className="Left">
                        <label for="ChooseFile">
                            <ButtonFile id="ChooseFile" className="ButtonFile" type="file" accept="image/png, image/jpg, image/gif, image/jpeg" />
                        </label>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button className='Button' Text='Update Item' onClick={update}></Button>
                    <Button className='Button' Text='Delete Item' onClick={() => deleteItem(OldSerial)} />
                    <Button className='Button' Text='Cancel' onClick={toggleUpdateModal}></Button>
                </div>
            </Modal>
            <Modal State={isAddModalActive} ChangeState={toggleAddModal} Title="Add Item">
                <div className="ModalBody">
                    <div className="ModalRight">
                        <label for="ISerial">Item Serial:</label><br />
                        <input id="ISerial" type="text" onChange={getSerial} /><br />

                        <label for="IName">Item Name:</label><br />
                        <input id="IName" type="text" onChange={getName} /><br />

                        <label for="IOrigin">Item Origin:</label><br />
                        <input id="IOrigin" type="text" onChange={getOrigin} /><br />

                        <label for="IOwner">Item Owner:</label><br />
                        <input id="IOwner" type="text" onChange={getOwner} /><br />
                    </div>


                    <div className="Left">
                        <label for="ChooseFile">
                            <ButtonFile id="ChooseFile" className="ButtonFile" type="file" accept="image/png, image/jpg, image/gif, image/jpeg" />
                        </label>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button className='Button' Text='Add OtherItem' onClick={saveMore}></Button>
                    <Button className='Button' Text='Add Item' onClick={saveOne}></Button>
                    <Button className='Button' Text='Cancel' onClick={toggleAddModal}></Button>
                </div>
            </Modal>
            <Table data={items} column={Titles} setModalData={setUpdateModalData} />


        </div>);
}