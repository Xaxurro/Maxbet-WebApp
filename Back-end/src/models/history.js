const mongoose = require('mongoose');

// Estructura del documento inicial en Mongo, para más info:
// https://mongoosejs.com/docs/schematypes.html
const HistorySchema = mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    history: {
        type: [String],
        uppercase: true,
    },
    change: String,
    comment: {
        type: String,
    },
},
// Metodos Estaticos
{
    statics: {
        addCreation(productInfo) {
            // Si no existe el campo en el req.body, arrojara un Error
            if(!productInfo.serial) throw new Error('serial is required');
            if(!productInfo.state) throw new Error('state is required');
            if(!productInfo.origin) throw new Error('origin is required');
        
            const model = this;

            return this.findOne({serial: productInfo.serial})
                .then(async (product) => {
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
                        const parentProduct = await model.findOne({serial: productInfo.parent}).then(parent => parent);
                        if (!parentProduct) throw new Error("Parent doesn't exists");
                        newProduct["parent"] = parentProduct._id;
                    }
        
        
                    // Envia el doc a la DB
                    return model.create(newProduct);
                })
                // Retorna el producto cerado
                .then(productCreated => productCreated)
        },
        update(serial, productInfo) {
            // Si no existe el campo en el req.body, arrojara un Error
            if(!serial) throw new Error('old serial is required');
            if(!productInfo.serial) throw new Error('new serial is required');
            if(!productInfo.state) throw new Error('state is required');
            if(!productInfo.origin) throw new Error('origin is required');
            
            const model = this;

            return this.findOne({serial: serial})
            .then(async product => {
                // Si encuentra un producto con el mismo serial arroja un Error
                if(!product) throw new Error('product doesnt exists');
                
                // Crea el documento
                const newProduct = {
                    serial: productInfo.serial,
                    state: productInfo.state,
                    origin: productInfo.origin
                };
                
                // Busca el padre del objeto (si es que tiene), si lo encuentra lo agrega al doc, si no arroja un Error
                if (productInfo.parent) {
                    const parentProduct = await model.findOne({serial: productInfo.parent}).then(parent => parent);
                    if (!parentProduct) throw new Error("Parent doesn't exists");
                    newProduct["parent"] = parentProduct._id;
                }
                
                
                // Envia el doc a la DB
                return model.updateOne({serial:{$eq: serial}}, newProduct);
            })
            // Retorna el producto cerado
            .then(productUpdated => productUpdated)
        },
        getOne(serial) {
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
        },
        getAll() {
            // Busca los docs que pasen por el filtro de la funcion find (como no hay filtro los busca todos)
            // Despues envia los datos
            return this.find();
        },
        unRegister(serial) {
            // Si no existe el serial, arrojara un Error
            if(!serial) throw new Error('serial is required');
        
            const model = this;

            // Busca el id del padre
            this.findOne({serial: serial}).then(async parent => {
                // Quita la referencia de los hijos
                await model.updateMany({parent: parent._id}, {$unset: {parent: ""}});
            })
        
            // Elimina al padre
            return this.deleteOne({serial: serial});
        },
    }
})

// Creacion del modelo 'product', que usa el Schema 'ProductSchema', y cuya colleccion es llamada 'products'
// Se exporta como modulo a productController.js
module.exports = ProductModel = mongoose.model('product', ProductSchema, 'products');