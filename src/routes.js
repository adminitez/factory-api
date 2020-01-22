const express = require('express');
const routes = express.Router();

const PurchaseOrderController = require('./controllers/PurchaseOrderController');

routes.get("/purchase-orders", PurchaseOrderController.listPurchaseOrdersPaged);
routes.get("/purchase-orders/:purchaseOrderId", PurchaseOrderController.getPurchaseOrderById)
routes.patch("/purchase-orders/:purchaseOrderId/products", PurchaseOrderController.updatePurchaseOrderProducts)
routes.patch("/purchase-orders/:purchaseOrderId/freight", PurchaseOrderController.updatePurchaseOrderFreight)
routes.get("/", (req, res) =>{
    res.send("Hello World!")
})

module.exports = routes 