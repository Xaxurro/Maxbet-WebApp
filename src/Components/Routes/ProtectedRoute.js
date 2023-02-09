
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import Login from '../../Pages/Login/Login';


/////////////////////////////////////
/**
 * Componente guard que impide que un usuario ya logeado pueda acceder a rutas que requieren autenticacion.
 * Si el usuario lo intenta, es redirigido al Login.
 * Para evitar mostrar el componente interno (Outlet(children)) por una fraccion de segundo cuando se llama
 * este guard (problema recurrente en React) se usa el estado de "loading" que muestra una pantalla intermedia que solo 
 * contiene un titulo "Loading".
 * @returns logica interna para el funcionamiento. * 
 */
export const ProtectedRoute = () => {
    const [user, loading, error] = useAuthState(auth);
  return loading ? (
    <h1 style={{color:"black"}}>Loading.....</h1>
  ) : user ? (
    <Outlet />
  ) : (
    <Login />
  );
};