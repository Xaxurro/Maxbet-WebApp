import { Button } from "../Components/Button"
import { ButtonFile } from "../Components/ButtonFile"
import { Table } from "../Components/Table";
// import { Filter } from "../Components/Filter";
import { Modal } from "../Components/Modal";
import { useState, useEffect } from "react";
import { TextInput } from "../Components/TextInput";
import { SelectionInput } from "../Components/SelectionInput";
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

    // const update = () => {
    //     const data = {
    //         serial: OldSerial,
    //         product: {
    //             name: IName,
    //             serial: ISerial,
    //             state: "Recibido",
    //             origin: IOrigin,
    //             owner: IOwner,
    //         }
    //     };

    //     sendRequest(URL, data, 'PATCH', getItems).then(() => toggleUpdateModal());
    // }

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


function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // // You can pass formData as a fetch body directly:

    // // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    // console.log(formData);
    console.log(formJson);
    console.log(formJson.IName);
    Object.keys(formJson).map((values, i) => console.log(formJson[values]));
    toggleSearchmodal()
}

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

                <form method="post" onSubmit={handleSubmit}>
                    
                <TextInput id="ISerial" text="Item Serial" />
                    
                <TextInput id="IName" text="Item Name" />
                <TextInput id="IOrigin" text="Item Origin" />
                <TextInput id="IOwner" text="Item Owner" />
                <Button text="submit" type="submit" onClick/>
                </form>

                

            </Modal>
            <Modal State={isUpdateModalActive} ChangeState={toggleUpdateModal} Title="Update Item">
                <div className="ModalBody">
                    <Form URL={URL} method={"PATCH"} name="product" getData={getItems}>
                        <div className="ModalRight">
                            <TextInput id="serial" text="Item Serial" value={ISerial}/>
                            <TextInput id="name" text="Item Name" value={IName}/>
                            <TextInput id="origin" text="Item Origin" value={IOrigin}/>
                            <TextInput id="owner" text="Item Owner" value={IOwner}/>
                            <SelectionInput id="state" text="Item Status" values={States} selected={IState}/>
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
                        <Button text='Update Item' type='submit'/>
                        <Button text='Delete Item' onClick={toggleConfirmDeleteModal}/>
                        <Modal State={isConfirmDeleteModalActive} ChangeState={toggleConfirmDeleteModal} Title="Confirm?">
                            <Button text='Delete Item' onClick={() => deleteItem(OldSerial)}/>
                            <Button text='Cancel' onClick={toggleConfirmDeleteModal}/>
                        </Modal>
                        <Button text='Cancel' onClick={toggleUpdateModal}/>
                    </Form>
                </div>
            </Modal>
            <Modal State={isAddModalActive} ChangeState={toggleAddModal} Title="Add Item">
                <div className="ModalBody">
                    <Form URL={URL} method={"POST"} name="product" getData={getItems}>
                        <div className="ModalRight">
                            <input type="hidden" id="state" name="state" value={"Recibido"}/>
                            <TextInput id="serial" text="Item Serial"/>
                            <TextInput id="name" text="Item Name"/>
                            <TextInput id="origin" text="Item Origin"/>
                            <TextInput id="owner" text="Item Owner"/>
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
                        <Button text='Add Another Item' type='submit'/>
                        <Button text='Add Item' type='submit' onClick={() => toggleAddModal()}/>
                        <Button text='Cancel' onClick={toggleAddModal}/>
                    </Form>
                </div>
            </Modal>
            <Table data={items} column={Titles} setModalData={setUpdateModalData} />


        </div>
    );
}