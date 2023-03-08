const mongoose = require('mongoose');
const registryChanges = require('../helpers/registryChanges');
const registryNewObject = require('../helpers/registryNewObject');

// Estructura del documento inicial en Mongo, para más info:
// https://mongoosejs.com/docs/schematypes.html
const ProductSchema = mongoose.Schema(
{
    serial: {
        type: String,
        required: true,
        uppercase: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        uppercase: true,
    },
    state: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
        trim: true,
    },
    owner: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    history: [{
        date: {
            type: Date,
            default: Date.now(),
        },
        change: {
            type: String,
            uppercase: true,
            required: [true, "Change is required"],
        },
        comment: {
            type: String,
            uppercase: true,
        },
    }],
},)

// Metodos Estaticos
ProductSchema.statics.register = function (productInfo) {
    // Si no existe el campo en el req.body, arrojara un Error
    if(!productInfo.name) throw new Error('name is required');
    if(!productInfo.serial) throw new Error('serial is required');
    if(!productInfo.state) throw new Error('state is required');
    if(!productInfo.owner) throw new Error('owner is required');
    if(!productInfo.origin) throw new Error('origin is required');

    const model = this;

    return this.findOne({serial: productInfo.serial}).then(async (product) => {
            // Si encuentra un producto con el mismo serial arroja un Error
            if(product) throw new Error('product already exists');
            
            // Crea el documento
            const newProduct = {
                serial: productInfo.serial,
                name: productInfo.name,
                state: productInfo.state,
                origin: productInfo.origin,
                owner: productInfo.owner,
                history: []
            };
            
            registryNewObject(newProduct);
            
            // Busca el padre del objeto (si es que tiene), si lo encuentra lo agrega al doc, si no arroja un Error
            if (productInfo.parent) {
                model.findOne({serial: productInfo.parent}).then(parent => {
                    if (!parent) throw new Error("Parent doesn't exists");
                    newProduct["parent"] = parent._id;
                });
            }

            // Envia el doc a la DB
            return model.create(newProduct);
        })
        // Retorna el producto cerado
        .then(productCreated => productCreated)
};

ProductSchema.statics.update = function (serial, productInfo) {
    // Si no existe el campo en el req.body, arrojara un Error
    if(!serial) throw new Error('old serial is required');
    
    const model = this;

    return this.findOne({serial: serial})
    .then(product => {
        // Si encuentra un producto con el mismo serial arroja un Error
        if(!product) throw new Error('product doesnt exists');
        
        // Crea el documento
        const newProduct = {
            serial: productInfo.serial,
            name: productInfo.name,
            state: productInfo.state,
            origin: productInfo.origin,
            owner: productInfo.owner,
            history: product.history
        };

        registryChanges(product, newProduct)
        
        // Busca el padre del objeto (si es que tiene), si lo encuentra lo agrega al doc, si no arroja un Error
        if (productInfo.parent) {
            model.findOne({serial: productInfo.parent}).then(parent => {
                if (!parent) throw new Error("Parent doesn't exists");
                newProduct["parent"] = parent._id;
            });
        }
        
        
        // Envia el doc a la DB
        return model.updateOne({serial:{$eq: serial}}, newProduct);
    })
    // Retorna el producto cerado
    .then(productUpdated => productUpdated)
};

ProductSchema.statics.getAll = function () {
    // Busca los docs que pasen por el filtro de la funcion find
    // Despues envia los datos

    return this.find({}).sort('serial');
};

ProductSchema.statics.getFilter = function (filter) {
    // Busca los docs que pasen por el filtro de la funcion find
    // Despues envia los datos
    const query = {};

    if (filter.serial) query.serial = { $regex: filter.serial, $options: "i" };
    if (filter.name) query.name = { $regex: filter.name, $options: "i" };
    if (filter.origin) query.origin = { $regex: filter.origin, $options: "i" };
    if (filter.owner) query.owner = { $regex: filter.owner, $options: "i" };
    if (filter.state) query.state = { $eq: filter.state };

    return this.find(query).sort('serial');
};

ProductSchema.statics.unRegister = function (serial) {
    // Si no existe el serial, arrojara un Error
    if(!serial) throw new Error('serial is required');

    const model = this;

    // Busca el id del padre
    this.findOne({serial: serial}).then(parent => {
        if(!parent) throw new Error("Product doesn't exists");
        // Quita la referencia de los hijos
        model.updateMany({parent: parent._id}, {$unset: {parent: ""}});
    })

    // Elimina al padre
    return this.deleteOne({serial: serial});
};


// Creacion del modelo 'product', que usa el Schema 'ProductSchema', y cuya colleccion es llamada 'products'
// Se exporta como modulo a productController.js
module.exports = ProductModel = mongoose.model('product', ProductSchema, 'products');