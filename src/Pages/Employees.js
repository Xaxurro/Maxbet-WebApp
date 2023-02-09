import React, { useState } from "react"
import Layout from "../Components/Layout"
import FormEmpleados from "../Components/FormularioEmpleados"

import Modal from "antd/es/modal/Modal";
import Button from "../Components/Button"
import TableData from "../Components/TableData";


//////////////////////////////////////////////////////////////
/**
 * Este componente funcional para ver y administrar los empleados
 * 
 * Primero se declara un hook de useState para controlar la visibilidad del modal,
 * luego se declaran las funciones que manejan el comportamiento de este (mostrar, aceptar, cancelar)
 * 
 * @returns Layout contenedor, modal con el formulario para agregar otro empleado.
 * Tambien muestra una tabla con datos dummy obtenidos mediante una API.
 */
function Employees() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);        
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Layout>
            <Modal
                title="Add Item"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <FormEmpleados />
            </Modal>

            <Button type="button" onClick={showModal}>Add Employee</Button>
            <br />
            <br />

            <TableData header={"Employees"} />
        </Layout>
    )
}
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
export default Employees