import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../../firebase';
import Layout from '../../Components/Layout';
import styled from 'styled-components';

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

/**
 * Componente para registrarse en el sistema
 * 
 * Primero se declaran los hooks para mantener los estados de los campos (useState) y navegacion (useNavigate)
 * 
 * @method onSubmit : Impide cualquier comportamiento por defecto y llama al metodo "registerWithEmailAndPassword",
 * donde le pasa por parametro el email y contraseña ingresado, junto con la referencia "navigate" del hook "useNavigate"
 * para redireccionar a la pagina por defecto (Login), luego de registrarse correctamente. 
 * Este ultimo hook no puede ser instanciado dentro del metodo "logInWithEmailAndPassword", porque el archivo
 * firebase.js no es un script de React.
 *  
 * @returns Layout que aplica un pequeño margen a los lados, un contenedor que centra el panel de registro y finalmente el panel mismo
 * junto con un enlace para logearse
 */
const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
        registerWithEmailAndPassword(email, password, navigate)
    }


    return (
        <Layout>
            <ContenedorLogin>
                <H1> Maxbet register </H1>
                <form>
                    <div>
                        <label htmlFor="email-address">
                            Email address
                        </label>
                        <input
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            label="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={onSubmit}
                    >
                        Sign up
                    </button>

                </form>

                <p>
                    Already have an account?{' '}
                    <NavLink to="/login" >
                        Sign in
                    </NavLink>
                </p>
            </ContenedorLogin>

        </Layout>
    )
}

export default Signup