import {Route, NavLink, Routes} from 'react-router-dom';
import styled from "styled-components";
import Employees from './Pages/Employees';
import Dashboard from './Pages/Dashboard';
import WorkLists from './Pages/WorkLists';
import Inventory from './Pages/Inventory';
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import { auth, logout } from './firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ProtectedRoute } from './Components/Routes/ProtectedRoute';
import { SpecialRoute } from './Components/Routes/SpecialRoute';

/////////////////////////////////////
/**
 * Componentes de estilo
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
/////////////////////////////////////
/////////////////////////////////////



/////////////////////////////////////
/**
 * Primero se declaran los hooks para mantener los estados sobre si hay algun usuario logeado o no, o si el componente aun está cargando.
 * 
 * Cuando un usuario está logeado se setea el estado "logged" como true, y se setea falso cuando se desconecta.
 * 
 * La constante Nav contiene los elementos que muestran la navBar, esta barra solo se muestra si hay algun usuario logeado
 * 
 * @returns rutas de navegacion y navbar cuando corresponde. Cada ruta primero pasa por un componente (ProtectedRoutes) que comprueba si hay algun usuario conectado para dejarlo pasar a su componente interno,
 * si no lo hay, lo redirige al login. Para el login y registro ocurre a la inversa, el componente (SpecialRoute) solo deja pasar si no está logeado, sino lo redirige al Dashboard
 */
function App() {

  const [logged, setLogged] = useState(false);  
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
      if (loading) return
      else if (!user || null) return setLogged(false)
      else setLogged(true)
  }, [user, loading]);
  
  const Nav = (
    <nav>
        <UL>
          <LI>
            Maxbet Logo
          </LI>
          <LI>
            <NavLink to="/dashboard"> Dashboard</NavLink>
          </LI>
          <LI>
            <NavLink to="/workLists"> WorkLists</NavLink>
          </LI>
          <LI>
            <NavLink to="/employees"> Employees</NavLink>
          </LI>
          <LI>
            <NavLink to="/inventory"> Inventory</NavLink>
          </LI>
          <LI>
            <button onClick={logout}>Log out</button>
          </LI>
        </UL>
      </nav>
  )

  return (    
    <div>    
    {logged ? Nav: null}
    <section>
        <Routes>          
          <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<Dashboard/>}/>
          </Route>

          <Route element={<ProtectedRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/inventory' element={<Inventory/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/worklists' element={<WorkLists/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/employees' element={<Employees/>}/>
          </Route>
          
          <Route element={<SpecialRoute/>}>
            <Route path='/login' element={<Login/>}/>
          </Route>
          <Route element={<SpecialRoute/>}>
            <Route path='/signup' element={<Signup/>}/>
          </Route>          

          <Route element={<ProtectedRoute/>}>
            <Route path='*' element={<Dashboard/>}/>
          </Route>

        </Routes>
      </section>
    </div>
  )
}
/////////////////////////////////////
/////////////////////////////////////
export default App;
