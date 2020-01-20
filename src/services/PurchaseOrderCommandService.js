const mongoose = require('mongoose');
const OmieService = require("../integrations/OmieService");
const PurchaseOrder = mongoose.model('PurchaseOrder');

module.exports = {
    async updatePurchaseOrderProducts(purchaseOrderId, products){
        await PurchaseOrder.updateOne({_id: purchaseOrderId}, { $set: {products: products}})
    },

    async updatePurchaseOrderFreight(purchaseOrderId, quantityBoxes, grossWeight){
        await OmieService.updatePurchaseOrderFreight(purchaseOrderId, quantityBoxes, grossWeight)
    }
}