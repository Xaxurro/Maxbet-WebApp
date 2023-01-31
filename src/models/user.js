const mongoose = require('mongoose');
// Permite encriptar las contraseñas
const bcrypt = require('bcrypt');
const { isValidEmail } = require('../helpers');

// Estructura del documento inicial en Mongo, para más info:
// https://mongoosejs.com/docs/schematypes.html
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
        trim: true,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
})

// Define una funcion estatica llamada 'signup'
UserSchema.statics.signup = signup;

// Creacion del modelo 'user', que usa el Schema 'UserSchema', y cuya colleccion es llamada 'users'
mongoose.model('user', UserSchema, 'users');

//Funcion signup
function signup(userInfo) {
    // Si no existe el campo en el req.body, arrojara un Error
    if(!userInfo.email || !isValidEmail(userInfo.email)) throw new Error('email is invalid');
    if(!userInfo.password) throw new Error('password is required');
    if(!userInfo.firstName) throw new Error('firstName is required');
    if(!userInfo.lastName) throw new Error('lastName is required');

    // Busca un usuario con el mismo email
    return this.findOne({email: userInfo.email})
        .then(user => {
            // Si encuentra un usuario arroja un Error
            if(user) throw new Error('user already exists');

            // Crea el documento
            const newUser = {
                email: userInfo.email,
                password: bcrypt.hashSync(userInfo.password, 9),
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
            };

            // Lo encia a la DB
            return this.create(newUser);
        })
        .then(userCreated => userCreated)
}