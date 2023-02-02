import Layout from "../Components/Layout";
import Modal from "antd/es/modal/Modal";
import Button from "../Components/Button";
import FormInventario from "../Components/FormularioInventario";
import TableData from "../Components/TableData";
import { useState } from "react";

function Inventory() {

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
                <FormInventario />
            </Modal>

            <Button type="button" onClick={showModal}>Add Item</Button>
            <br />
            <br />

            <TableData />
        </Layout>
    )

}

export default Inventory