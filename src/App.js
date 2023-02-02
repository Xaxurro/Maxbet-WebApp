import { Component } from "react";
import { useMatch, Route, NavLink, Routes, useParams } from 'react-router-dom';
import styled from "styled-components";
import Employees from './Pages/Employees';
import Dashboard from './Pages/Dashboard';
import WorkLists from './Pages/WorkLists';
import Inventory from './Pages/Inventory';
import Layout from "./Components/Layout";




/**
class App extends Component{ los componentes basados en clase permiten tener estados y hooks de ciclo de vida, los componentes funcionales no
  render(){
    return(
      <div>
        <Index/>
      </div>
    )
  }
}
 */

const UL = styled.ul`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 95%;
  background:white;  
  padding:2%;  
  border-radius: 20px;  
`
const LI = styled.li`
  display: block;
  color:black;
  flex: 0 1 auto;
  list-style-type: none;
`

/**
 Al estar dentro de un componente como inventario, con hartos elementos dentro,cada uno con su propia url 
 es mejor usar la propiedad match.url para obtener el link, match es el nombre de referencia para el hook useMatch
 <Link to= {`${match.url}/item-1`} item 1 </Link>> o algo asi para los links y 
 <Route path = {`${match.path}/:item_id`}> para los path o rutas (no url)
  */

 // En vez de usar Link, es mejor usar el componente NavLink, porque es dinamico y entrega un feedback al usuario sobre cual es el link activo (aumentar tamanio, negrita, etc)
 // la propiedad activeClassName = "cualquiernombre" permite cambiarle el nombre por defecto "active" a la clase (para css) cuando se usa NavLink
function App() {
  return (
    <div>
      <nav>
        <UL>          
          <LI>
            Maxbet Logo
          </LI>
          <LI>
            <NavLink  to="/Dashboard"> Dashboard</NavLink>
          </LI>
          <LI>
            <NavLink  to="/WorkLists"> WorkLists</NavLink>
          </LI>
          <LI>
            <NavLink  to="/Employees"> Employees</NavLink>
          </LI>
          <LI>
            <NavLink  to="/Inventory"> Inventory</NavLink>
          </LI>
          <LI>
            <div>Perfil</div>
          </LI>
        </UL>
      </nav>
      <section>
            
        <Routes> {/*Switch fue reemplazado por Routes */}
          <Route path='/WorkLists' element={<WorkLists/>}/>             
          <Route path='/Employees' element={<Employees/>}/>             
          <Route path='/Inventory' element={<Inventory/>}/> 
          <Route exact path='/Dashboard' element={<Dashboard/>}/>{/*La ruta de inicio debe estar al final, la declaracion exact se suele usar solo en la raiz*/}          
        </Routes>

      </section>
    </div>
  )
}

export default App;
