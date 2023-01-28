const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isValidEmail } = require('../helpers');

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

UserSchema.statics.signup = signup;

mongoose.model('user', UserSchema, 'users');

function signup(userInfo) {
    if(!userInfo.email || !isValidEmail(userInfo.email)) throw new Error('email is invalid');
    if(!userInfo.password) throw new Error('password is required');
    if(!userInfo.firstName) throw new Error('firstName is required');
    if(!userInfo.lastName) throw new Error('lastName is required');

    return this.findOne({email: userInfo.email})
        .then(user => {
            if(user) throw new Error('user already exists');

            const newUser = {
                email: userInfo.email,
                password: bcrypt.hashSync(userInfo.password, 9),
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
            };

            return this.create(newUser);
        })
        .then(userCreated => userCreated)
}