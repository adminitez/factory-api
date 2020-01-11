const express = require('express');
const routes = express.Router();

const PurchaseOrderController = require('./controllers/PurchaseOrderController');

routes.get("/purchase-orders", PurchaseOrderController.listPurchaseOrdersPaged);
routes.get("/", (req, res) =>{
    res.send("Hello World!")
})

module.exports = routes