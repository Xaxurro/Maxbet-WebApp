const mongoose = require('mongoose');
// Permite encriptar las contraseñas
const bcrypt = require('bcrypt');
const { isValidEmail } = require('../helpers');

// Estructura del documento inicial en Mongo, para más info:
// https://mongoosejs.com/docs/schematypes.html
const UserSchema = mongoose.Schema({
    _id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
        uppercase: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        // validate: {
        //     validator: isValidEmail(userInfo.email),
        //     message: props => `${props.value} is not a valid email!`
        // },
        required: [true, 'email is required'],
    },
    password: {
        type: String,
        require: true,
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    status: {
        type: String,
        require: true,
    },
    direction: {
        type: String,
        trim: true,
        require: true
    },
    rut: {
        type: String,
        trim: true,
        require: true
    },
    phone: {
        type: String,
        trim: true,
        require: true
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
},
{
    statics:{
        signup(userInfo) {
            // Si no existe el campo en el req.body, arrojara un Error
            if(!userInfo.email) throw new Error('email is invalid');
            if(!userInfo.password) throw new Error('password is required');
        
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
    }
});

// Creacion del modelo 'user', que usa el Schema 'UserSchema', y cuya colleccion es llamada 'users'
mongoose.model('user', UserSchema, 'users');