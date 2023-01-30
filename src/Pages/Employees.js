import React, { Component } from "react"
import styled from "styled-components"
import Layout from "../Components/Layout"
import Filtros from "../Components/Filtros"
import { useTable } from 'react-table'
import FormEmpleados from "../Components/FormularioEmpleados"
import Modal from "../Components/Modal"
import Button from "../Components/Button"


/**
const data = React.useMemo(()=> [
    {
        ID: '0001',
        name: 'Gabriel Tapia',
        task:'podium',
        status:'🛠️'
    },
],
[]
)

const columns = React.useMemo(()=>[
    {
        Header:'ID Employee',
        acessor:'id',
    },
    {
        Header:'Employee Name',
        acessor:'name',
    },
    {
        Header:'Task',
        acessor:'task',
    },
    {
        Header:'Status',
        acessor:'status',
    },
],
[]
)

const {getTableProps, getTalbeBodyProps, headerGroups,rows,prepareRow} = useTable({columns})
 */
const H2 = styled.h2`
    color: black;
`

const Control = styled.div`
    display: flex;    
`

const BotonAdd = styled.button`
    color:black;
    background:orange;
    border:none;
    border-radius: 8px;
`
const Leyenda = styled.div`
    background:white;
    border-radius:8px;
    display:flex;
    justify-content:space-between;
    font-size:110%;
    padding: 1% 2%;
`

const Tabla = styled.table`
    background:orange;
    color:black;
    border-radius:8px;
    display:flex;
    padding: 1% 2%;
    justify-content:space-between;
`

class Employees extends Component {

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
                    <FormEmpleados />
                </Modal>
                <Control>
                    <H2>Employees</H2>
                    <Filtros />
                    <Button type="button" onClick={this.showModal}>Add Employee</Button>
                </Control>
                <br />
                <Leyenda>
                    <span>🛠️ Working on it!</span>
                    <span>⌚ Idle</span>
                    <span>🌅 On Vacations</span>
                    <span>😵 Fired Up!</span>
                </Leyenda>
                <br />
                <table style={{ width: "100%", backgroundColor: "white" }}>
                    <thead>
                        <tr style={{ background: "orange" }}>
                            <th>ID Employee</th>
                            <th>Employee Name</th>
                            <th>Task</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0001</td>
                            <td>Gabriel Tapia</td>
                            <td>Podium</td>
                            <td>🛠️</td>

                        </tr>
                        <tr>
                            <td>0002</td>
                            <td>Technician 2</td>
                            <td>IVIEW 3</td>
                            <td>⌚</td>
                        </tr>
                        <tr>
                            <td>0003</td>
                            <td>Technician 3</td>
                            <td>IVIEW 3</td>
                            <td>🌅</td>
                        </tr>
                        <tr>
                            <td>0004</td>
                            <td>Technician 4</td>
                            <td>IVIEW 3</td>
                            <td>😵</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </Layout>
        )

    }
}

export default Employees