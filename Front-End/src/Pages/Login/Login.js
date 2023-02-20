import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { auth, logInWithEmailAndPassword } from '../../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import styled from 'styled-components';

//////////////////////////////////////////////////////////////
/**
 * Simplemente un div que centra el panel de login y un h1 de color negro
 */
const ContenedorLogin = styled.div`
    margin:auto;
    width:50%;
    border: 1px solid;
    padding:10px;
    text-Align: center;
    color: black;    
`
const H1 = styled.h1`
    color: black;
`
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
/**
 * Componente funcional para logearse al sistema
 * 
 * Primero se declaran los hooks para mantener los estados de los campos (useState) y navegacion (useNavigate)
 * y para el contexto del usuario conectado actualmente (si se ha logeado, deslogeado o algun estado intermedio)
 * 
 * @method onLogin : Impide cualquier comportamiento por defecto y llama al metodo "logInWithEmailAndPassword",
 * donde le pasa por parametro el email y contraseña ingresado, junto con la referencia "navigate" del hook "useNavigate"
 * para redireccionar a la pagina por defecto (Dashboard), luego de logearse correctamente. 
 * Este ultimo hook no puede ser instanciado dentro del metodo "logInWithEmailAndPassword", porque el archivo
 * firebase.js no es un script de React.
 * 
 * @method useEffect : Aplica un efecto secundario al comportamiento normal del script. Cuando el hook "useAuthState" 
 * emite un estado de loading (cuando el usuario se mueve de una pagina a otra) no hace nada, cuando el usuario
 * no está logeado, este es redireccionado al login, si está logeado lo envía al dashboard.
 * @returns Layout que aplica un pequeño margen a los lados, un contenedor que centra el panel de login y finalmente el panel mismo
 * junto con un enlace para registrarse
 */
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);

    const onLogin = (e) => {
        e.preventDefault();
        logInWithEmailAndPassword(email, password, navigate)
    }

    useEffect(() => {
        if (loading) return
        else if (!user || null) return navigate("/login")
        else navigate("/DashBoard");
    }, [user, loading]);

    return (
        <>
            <div>
                <ContenedorLogin>
                    <H1> Maxbet login</H1>
                    <form>
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <span>   </span>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <span>   </span>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <button onClick={onLogin}>
                                Login
                            </button>
                        </div>
                    </form>
                    <p>
                        No account yet? {' '}
                        <NavLink to="/signup">
                            Sign up
                        </NavLink>
                    </p>
                </ContenedorLogin>

            </div>
        </>
    )
}
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

export default Login