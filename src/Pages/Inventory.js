import Layout from "../Components/Layout";
import { useMatch, Route, NavLink, Routes, useParams } from 'react-router-dom';
import { Component } from "react";
import Modal from '../Components/Modal';
import Button from "../Components/Button";
import FormInventario from "../Components/FormularioInventario";


class Inventory extends Component {

    constructor() {
        super();
        this.state = {
            show: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });

    };


    render() {
        return (
            <Layout>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <FormInventario/>      
                </Modal>

                <Button type="button" onClick={this.showModal}>Add Item</Button>

                <table style={{ width: "100%", backgroundColor: "white" }}>
                    <thead>
                        <tr style={{ background: "orange" }}>
                            <th>ID Item</th>
                            <th>Item Name</th>
                            <th>Origin</th>
                            <th>Owner Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0001</td>
                            <td>Podium</td>
                            <td>Antofagasta</td>
                            <td>Jose Roberto</td>
                            <td>🛠️</td>
                        </tr>
                        <tr>
                            <td>0002</td>
                            <td>IVIEW 3</td>
                            <td>Coquimbo</td>
                            <td>Juan Carlos</td>
                            <td>🛠️</td>
                        </tr>
                        <tr>
                            <td>0003</td>
                            <td>IVIEW 3</td>
                            <td>San Antonio</td>
                            <td>Alguien</td>
                            <td>🛠️</td>
                        </tr>
                        <tr>
                            <td>0005</td>
                            <td>IVIEW 3</td>
                            <td>Santiago</td>
                            <td>Otra persona</td>
                            <td>🛠️</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </Layout>
        )
    }
}

export default Inventory