const mongoose = require('mongoose');

// Estructura del documento inicial en Mongo, para más info:
// https://mongoosejs.com/docs/schematypes.html
const WorkListsSchema = mongoose.Schema(
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
    deadline: {
        type: String,
        required: true,
        trim: true,
    },
    responsible: String,
    content: {
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
WorkListsSchema.statics.register = function (workListInfo) {
    // Si no existe el campo en el req.body, arrojara un Error
    if(!workListInfo.name) throw new Error('name is required');
    if(!workListInfo.deadline) throw new Error('serial is required');
    if(!workListInfo.state) throw new Error('state is required');
    if(!workListInfo.responsible) throw new Error('owner is required');

    const model = this;

    return this.findOne({serial: workListInfo.serial}).then(async (list) => {
            // Si encuentra un producto con el mismo serial arroja un Error
            if(list) throw new Error('product already exists');
            
            // Crea el documento
            const newWorkList = {
                name: workListInfo.name,
                state: workListInfo.state,
                deadline: workListInfo.deadline,
                responsible: workListInfo.responsible,
                content:[],
                history: []
            };
            
            for (const key in newWorkList) {
                if (Object.hasOwnProperty.call(newWorkList, key) && key != "history" && newWorkList[key] != undefined) {
                    newWorkList.history.push({change: "CREADO", comment: `${key}: ${newWorkList[key]}`});
                }
            }
            
            // Busca el padre del objeto (si es que tiene), si lo encuentra lo agrega al doc, si no arroja un Error
            if (workListInfo.parent) {
                model.findOne({serial: workListInfo.parent}).then(parent => {
                    if (!parent) throw new Error("Parent doesn't exists");
                    newWorkList["parent"] = parent._id;
                });
            }

            // Envia el doc a la DB
            return model.create(newWorkList);
        })
        // Retorna el producto cerado
        .then(productCreated => productCreated)
};

WorkListsSchema.statics.update = function (serial, workListInfo) {
    // Si no existe el campo en el req.body, arrojara un Error
    if(!id) throw new Error('old serial is required');
    
    const model = this;

    return this.findOne({id: id})
    .then(async list => {
        // Si encuentra un producto con el mismo serial arroja un Error
        if(!list) throw new Error('product doesnt exists');
        
        // Crea el documento
        const newWorkList = {
            id: workListInfo.id,
            name: workListInfo.name,
            state: workListInfo.state,
            deadline: workListInfo.deadline,
            responsible: workListInfo.responsible,
            history: list.history,
            content: list.content
        };

        for (const key in newWorkList) {
            if (Object.hasOwnProperty.call(newWorkList, key) && key != "history" && newWorkList[key] != undefined) {
                newWorkList.history.push({change: "MODIFICADO", comment: `${key}: ${newWorkList[key]}`});
            }
        }
        
        // Busca el padre del objeto (si es que tiene), si lo encuentra lo agrega al doc, si no arroja un Error
        if (workListInfo.parent) {
            model.findOne({serial: workListInfo.parent}).then(parent => {
                if (!parent) throw new Error("Parent doesn't exists");
                newWorkList["parent"] = parent._id;
            });
        }
        
        
        // Envia el doc a la DB
        return model.updateOne({id:{$eq: id}}, newWorkList);
    })
    // Retorna el producto cerado
    .then(workListUpdated => workListUpdated)
};

WorkListsSchema.statics.getOne = function (id) {
    if(!id) throw new Error('id is required');
    // Busca el doc que pase por el filtro de la funcion find
    // Despues envia los datos
    const model = this;

    return this.findOne({serial: id}).then(async data => {
        if (!data) throw new Error("Work List doesn't exists");

        const list = {
            product: data
        }
        
        let children = await model.find({parent: data._id}).then(children => children);
        if(children) list["children"] = children;
        
        return list;
    });
};

WorkListsSchema.statics.getAll = function () {
    // Busca los docs que pasen por el filtro de la funcion find
    // Despues envia los datos
    return this.find();
};

WorkListsSchema.statics.unRegister = function (serial) {
    // Si no existe el serial, arrojara un Error
    if(!serial) throw new Error('serial is required');

    const model = this;

    // Busca el id del padre
    this.findOne({id: id}).then(async parent => {
        if(!parent) throw new Error("Product doesn't exists");
        // Quita la referencia de los hijos
        await model.updateMany({parent: parent._id}, {$unset: {parent: ""}});
    })

    // Elimina al padre
    return this.deleteOne({id: id});
};


// Creacion del modelo 'worklist', que usa el Schema 'WorkListSchema', y cuya colleccion es llamada 'worklists'
// Se exporta como modulo a productController.js
module.exports = WorkListsModel = mongoose.model('worklist', WorkListsSchema, 'worklists');