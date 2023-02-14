const mongoose = require('mongoose');
// Permite encriptar las contraseñas
const bcrypt = require('bcrypt');
const isValidEmail = require('../helpers/isValidEmail');
const isValidRut = require('../helpers/isValidRut');

// Estructura del documento inicial en Mongo, para más info:
// https://mongoosejs.com/docs/schematypes.html
const UserSchema = mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        require: true,
        uppercase: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        validate: {
            validator: isValidEmail,
            message: props => `${props.value} is not a valid email!`
        },
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
    status: String,
    direction: {
        type: String,
        require: true
    },
    rut: {
        type: String,
        uppercase: true,
        validate: {
            validator: isValidRut,
            message: props => `${props.value} is not a valid Rut!`
        },
        required: [true, 'Rut is required'],
    },
    phone: {
        type: String,
        trim: true,
        require: true
    },
},
// Metodos Estaticos
{
    statics:{
        signup(userInfo) {
            // Si no existe el campo en el req.body, arrojara un Error
            if(!userInfo.email) throw new Error('email is invalid');
            if(!userInfo.password) throw new Error('password is required');
        
            const model = this;
            
            // Busca un usuario con el mismo email
            return this.findOne({email: userInfo.email})
            .then(user => {
                // Si encuentra un usuario arroja un Error
                if(user) throw new Error('user already exists');
                // SELECT *
                
                model.findOne().sort({_id:-1}).then(RESULT => {
                        let maxID;
                        if (RESULT === null) {
                            maxID = 0;
                        } else {
                            maxID = RESULT._id;
                        }

                        // Crea el documento
                        const newUser = {
                            _id: maxID + 1,
                            name: userInfo.name,
                            email: userInfo.email,
                            password: bcrypt.hashSync(userInfo.password, 9),
                            direction: userInfo.direction,
                            rut: userInfo.rut,
                            phone: userInfo.phone,
                        };
                         
                        // Lo encia a la DB
                        return this.create(newUser);
                    });
                })
                .then(userCreated => userCreated)
        }
    }
});

// Creacion del modelo 'user', que usa el Schema 'UserSchema', y cuya colleccion es llamada 'users'
module.exports = UserModel = mongoose.model('user', UserSchema, 'users');