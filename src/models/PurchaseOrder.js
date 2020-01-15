const mogoose = require('mongoose')

const ProductSchema = new mogoose.Schema({
    code: {
        require: true,
        type: String
    },
    description: {
        require: true,
        type: String
    },
    quantity: {
        require: true,
        type: String
    }, 
    totalVerified: {
        require: true,
        type: Number,
        default: 0
    }

})


const PurchaseOrderSchema = new mogoose.Schema({
    _id: {
        require: true,
        type: String
    },
    number: {
        require: true,
        type: String
    },
    clientId: {
        require: true,
        type: String
    },
    clientName: {
        require: true,
        type: String
    },
    products: {
        require: true,
        type: [ProductSchema]
    }
});



mogoose.model('PurchaseOrder', PurchaseOrderSchema)