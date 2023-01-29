import styled from "styled-components"
import { Component } from "react"

const Contenedor = styled.div`
    margin: 2% 5%;
`


class Layout extends Component {
    render(){
        return(
                <Contenedor>
                    {this.props.children}
                </Contenedor>
        )
    }
}
export default Layout