import { Component } from "react";
import styled from "styled-components";

const BotonSearch = styled.button`
    color:black;
    background:orange;
    border:none;
    border-radius: 8px;
    min-height:10px;    
`
const ContenedorFiltro = styled.div`    
    display: flex;
    align-items: stretch;
    justify-content: flex-end;
    width: 95%;
    padding:2%;  
`


class Filtros extends Component {
    render() {
        return (
            <ContenedorFiltro>
                <input type="text"></input>
                <BotonSearch type="submit">Search</BotonSearch>
            </ContenedorFiltro>
        )
    }
}

export default Filtros