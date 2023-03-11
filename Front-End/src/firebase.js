import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtwbyiSBYLTCLqRvq5zhFN1NrHUHnYrU0",
  authDomain: "nosqldb-c19e2.firebaseapp.com",
  databaseURL: "https://nosqldb-c19e2-default-rtdb.firebaseio.com",
  projectId: "nosqldb-c19e2",
  storageBucket: "nosqldb-c19e2.appspot.com",
  messagingSenderId: "665165550767",
  appId: "1:665165550767:web:9d89033c3aeee6a697f05a",
  measurementId: "G-WTK0CV1SSF"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//////////////////////////////////////////////////////////////
/**
 * Método para logearse con un email y contraseña ya registrados.
 * Impide que una cuenta no verificada pueda logearse.
 * Cuando el usuario se logea satisfactoriamente es redirigido al Dashboard
 * 
 * @param {*} email : Correo del usuario
 * @param {*} password : Contraseña del usuario
 * @param {*} navigate : Hook de navegacion.
 */
const logInWithEmailAndPassword = (email, password, navigate) => {  
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    if (!user.emailVerified) {
      console.log("Email not verified");
    } else {
      navigate("/Dashboard")
    }
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
}
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////
// /**
//  * Método para registrarse. 
//  * Cuando el usuario se registra se le envia un correo para verificar la nueva cuenta.
//  * El usuario es redirigido al login.
//  * 
//  * @param {*} email : Correo del usuario
//  * @param {*} password : Contraseña del usuario
//  * @param {*} navigate : Hook de navegacion.
//  */
// const registerWithEmailAndPassword = (email, password,navigate) => {

//   createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
//     // Signed in            
//     const user = userCredential.user;
//     sendEmailVerification(user);
//     navigate("/login")
//     // ...
//   })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//       // ..
//     });;
// };
// //////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
/**
 * Metodo para solicitar un reset de contraseña.
 * El boton que llama esta funcion aun no ha sido implementado
 */
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////
/**
 * Método para deslogearse
 */
const logout = () => {
  signOut(auth);  
};
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

export {
  app,
  auth,
  logInWithEmailAndPassword,
  // registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};