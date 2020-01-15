const mongoose = require('mongoose');

const PurchaseOrder = mongoose.model('PurchaseOrder');

module.exports = {
    async updatePurchaseOrderProducts(purchaseOrderId, products){
        await PurchaseOrder.updateOne({_id: purchaseOrderId}, { $set: {products: products}})
    }
}