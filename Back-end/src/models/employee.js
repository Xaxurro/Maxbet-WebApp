const mongoose = require('mongoose');
// Permite encriptar las contraseñas
const bcrypt = require('bcrypt');
const isValidEmail = require('../helpers/isValidEmail');
const isValidRut = require('../helpers/isValidRut');

// Estructura del documento inicial en Mongo, para más info:
// https://mongoosejs.com/docs/schematypes.html
const EmployeeSchema = mongoose.Schema({
    _id: String,
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
});


// Metodos Estaticos
EmployeeSchema.statics.signup = function (employeeInfo) {
    // Si no existe el campo en el req.body, arrojara un Error
    if(!employeeInfo.email) throw new Error('email is invalid');
    
    const model = this;
    
    // Busca un usuario con el mismo email
    return this.findOne({email: employeeInfo.email})
    .then(employee => {
        // Si encuentra un usuario arroja un Error
        if(employee) throw new Error('employee already exists');
        // SELECT *
        
        model.findOne().sort({_id:-1}).then(RESULT => {
            let maxID = 0;
            if (RESULT != null) maxID = parseInt(RESULT._id);
            
            // Crea el documento
            const newEmployee = {
                _id: (maxID + 1).toString(),
                name: employeeInfo.name,
                email: employeeInfo.email,
                password: bcrypt.hashSync(employeeInfo.email, 9),
                direction: employeeInfo.direction,
                rut: employeeInfo.rut,
                phone: employeeInfo.phone,
                task: employeeInfo.task,
                status: employeeInfo.status
            };
            
            // Lo encia a la DB
            return this.create(newEmployee);
        });
    })
    .then(employeeCreated => employeeCreated);
};

EmployeeSchema.statics.update = function (id, employeeInfo) {
    // Si no existe el campo en el req.body, arrojara un Error
    if(!id) throw new Error('id is required');

    const model = this;
    
    return this.findOne({_id: id})
    .then(async employee => {
        // Si encuentra un employee con el mismo id arroja un Error
        if(!employee) throw new Error('employee doesnt exists');
        
        // Crea el documento
        const newEmployee = {
            name: employeeInfo.name,
            email: employeeInfo.email,
            password: employeeInfo.password,
            direction: employeeInfo.direction,
            rut: employeeInfo.rut,
            phone: employeeInfo.phone,
            task: employeeInfo.task,
            status: employeeInfo.status
        };
        
        // Envia el doc a la DB
        return model.updateOne({_id:{$eq: id}}, newEmployee);
    })
    // Retorna el employeeo cerado
    .then(employeeUpdated => employeeUpdated);
};

EmployeeSchema.statics.getAll = function () {
    // Busca los docs que pasen por el filtro de la funcion find
    // Despues envia los datos
    return this.find().sort('_id');
};

EmployeeSchema.statics.getFilter = function (filter) {
    // Busca los docs que pasen por el filtro de la funcion find
    // Despues envia los datos
    const query = {};

    if (filter.email) query.email = { $regex: filter.email, $options: "i" };
    if (filter.name) query.name = { $regex: filter.name, $options: "i" };
    if (filter.direction) query.direction = { $regex: filter.direction, $options: "i" };
    if (filter.rut) query.rut = { $regex: filter.rut, $options: "i" };
    if (filter.phone) query.phone = { $regex: filter.phone, $options: "i" };
    if (filter.id) query._id = { $regex: filter.id };
    console.log(query);

    return this.find(query).sort('_id');
};

EmployeeSchema.statics.deleteAccount = function (id) {
    // Si no existe el id, arrojara un Error
    if(!id) throw new Error('id is required');

    const model = this;

    // Elimina al padre
    return this.deleteOne({_id: id});
};

// Creacion del modelo 'employee', que usa el Schema 'employeeSchema', y cuya colleccion es llamada 'employees'
module.exports = EmployeeModel = mongoose.model('employee', EmployeeSchema, 'employees');