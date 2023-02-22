// import logo from './logo.svg';
import '../Css/App.css';
import {Navbar} from "../Components/Navbar";
import {Route, Routes} from "react-router-dom"
import { WorkLists } from "./WorkList";
import { DashBoard } from "./DashBoard";
import { Employees } from "./Employees";
import { Inventory } from "./Inventory";

import styled from "styled-components";
import Login from './Login/Login';
import Signup from './Login/Signup';
import { auth, logout } from '../firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ProtectedRoute } from '../Components/ProtectedRoute';
import { SpecialRoute } from '../Components//SpecialRoute';
import Delivered from './Delivered';
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

function App() {

  const [logged, setLogged] = useState(false);  
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {      
      if (loading) return
      else if (!user || null) return setLogged(false)
      else setLogged(true)
  }, [user, loading]);

  return (
    <>
      {logged ? <Navbar/> : null}
      

      <div className="Container">
        <Routes>
          <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<DashBoard/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/DashBoard' element={<DashBoard/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/Inventory' element={<Inventory/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/Worklist' element={<WorkLists/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/Employees' element={<Employees/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='/Delivered' element={<Delivered/>}/>
          </Route>
          
          <Route element={<SpecialRoute/>}>
            <Route path='/Login' element={<Login/>}/>
          </Route>
          <Route element={<SpecialRoute/>}>
            <Route path='/Signup' element={<Signup/>}/>
          </Route>          

          <Route element={<ProtectedRoute/>}>
            <Route path='*' element={<DashBoard/>}/>
          </Route>
        </Routes>
      </div>
    </>
    
    
  );
}

export { App};
