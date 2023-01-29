import Layout from "../Components/Layout";
import { useMatch, Route, NavLink, Routes, useParams } from 'react-router-dom';
import styled from "styled-components";
import { Component } from "react";





const BotonAdd = styled.button`
    color:black;
    background:orange;
    border:none;
    border-radius: 8px;
    float:right;
    size:120%;
`



class Inventory extends Component{    
    render(){
    return(
        <Layout>            
                <BotonAdd>Add item</BotonAdd>
                <br/>
                <table style={{width:"100%",backgroundColor:"white"}}>
                    <thead>
                    <tr style={{background:"orange"}}>
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
    )}
}

export default Inventory