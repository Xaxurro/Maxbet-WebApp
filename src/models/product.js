const mongoose = require('mongoose');
// Permite encriptar las contraseñas
const bcrypt = require('bcrypt');

// Estructura del documento inicial en Mongo, para más info:
// https://mongoosejs.com/docs/schematypes.html
const ProductSchema = mongoose.Schema({
    serial: {
        type: String,
        require: true,
        uppercase: true,
        unique: true,
    },
    state: {
        type: String,
        require: true,
    },
    origin: {
        type: String,
        require: true,
        trim: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
})

// Define una funcion estatica llamada 'register' y otra llamada 'getAll'
ProductSchema.statics.register = register;
ProductSchema.statics.getAll = getAll;

// Creacion del modelo 'product', que usa el Schema 'ProductSchema', y cuya colleccion es llamada 'products'
// Se exporta como modulo a productController.js
module.exports = ProductModel = mongoose.model('product', ProductSchema, 'products');


//Methods
function register(productInfo, model) {
    // Si no existe el campo en el req.body, arrojara un Error
    if(!productInfo.serial) throw new Error('serial is required');
    if(!productInfo.state) throw new Error('state is required');
    if(!productInfo.origin) throw new Error('origin is required');

    console.log("\x1b[41mConstructor:\x1b[0m " + this.constructor.name);

    return model.findOne({serial: productInfo.serial})
        .then(async product => {
            // Si encuentra un producto con el mismo serial arroja un Error
            if(product) throw new Error('product already exists');
            
            // Crea el documento
            const newProduct = {
                serial: productInfo.serial,
                state: productInfo.state,
                origin: productInfo.origin
            };
            
            // Busca el padre del objeto (si es que tiene), si lo encuentra lo agrega al doc, si no arroja un Error
            if (productInfo.parent) {
                let parentProduct = await model.findOne({serial: productInfo.parent}).then(parent => parent);
                if (!parentProduct) throw new Error("Parent doesn't exists");
                newProduct["parent"] = parentProduct._id;
            }


            // Envia el doc a la DB
            return model.create(newProduct);
        })
        // Retorna el producto cerado
        .then(productCreated => productCreated)
}

// function exists(productInfo) {

// }

function getAll() {
    // Busca los docs que pasen por el filtro de la funcion find (como no hay filtro los busca todos)
    // Despues envia los datos
    return this.find().then(data => data);
}