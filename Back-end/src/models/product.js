const mongoose = require('mongoose');

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
            
            // Agrega al historial del producto los datos iniciales
            for (const key in newProduct) {
                if (Object.hasOwnProperty.call(newProduct, key) && key != "history" && newProduct[key] != undefined) {
                    newProduct.history.push({change: "CREADO", comment: `${key}: ${newProduct[key]}`});
                }
            }
            
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
    .then(async product => {
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

        // Agrega al historial del producto los cambios realizados
        for (const key in newProduct) {
            if (Object.hasOwnProperty.call(newProduct, key) && key != "history" && newProduct[key] != undefined) {
                newProduct.history.push({change: "MODIFICADO", comment: `${key}: ${newProduct[key]}`});
            }
        }
        
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

ProductSchema.statics.getOne = function (serial) {
    if(!serial) throw new Error('serial is required');
    // Busca el doc que pase por el filtro de la funcion find
    // Despues envia los datos
    const model = this;

    return this.findOne({serial: serial}).then(async data => {
        if (!data) throw new Error("Product doesn't exists");

        const product = {
            product: data
        }
        
        let children = await model.find({parent: data._id}).then(children => children);
        if(children) product["children"] = children;
        
        return product;
    });
};

ProductSchema.statics.getAll = function () {
    // Busca los docs que pasen por el filtro de la funcion find
    // Despues envia los datos
    return this.find();
};

ProductSchema.statics.unRegister = function (serial) {
    // Si no existe el serial, arrojara un Error
    if(!serial) throw new Error('serial is required');

    const model = this;

    // Busca el id del padre
    this.findOne({serial: serial}).then(async parent => {
        if(!parent) throw new Error("Product doesn't exists");
        // Quita la referencia de los hijos
        await model.updateMany({parent: parent._id}, {$unset: {parent: ""}});
    })

    // Elimina al padre
    return this.deleteOne({serial: serial});
};


// Creacion del modelo 'product', que usa el Schema 'ProductSchema', y cuya colleccion es llamada 'products'
// Se exporta como modulo a productController.js
module.exports = ProductModel = mongoose.model('product', ProductSchema, 'products');