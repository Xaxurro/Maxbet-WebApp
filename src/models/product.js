const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    children: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'products',
    },
})

ProductSchema.statics.register = register;

mongoose.model('product', ProductSchema, 'children');

//Methods

function register(productInfo) {
    if(!productInfo.serial) throw new Error('serial is required');
    if(!productInfo.state) throw new Error('state is required');
    if(!productInfo.origin) throw new Error('origin is required');

    return this.findOne({serial: productInfo.serial})
        .then(product => {
            if(product) throw new Error('product already exists');
            if(productInfo.children) {
                productInfo.children.forEach(productChild => {
                    register(productChild);
                });
            }

            const newProduct = {
                serial: productInfo.serial,
                state: productInfo.state,
                origin: productInfo.origin,
                children: productInfo.children,
            };

            return this.create(newProduct);
        })
        .then(productCreated => productCreated)
}