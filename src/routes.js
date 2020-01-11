const express = require('express');
const routes = express.Router();

const PurchaseOrderController = require('./controllers/PurchaseOrderController');

routes.get("/purchase-orders", PurchaseOrderController.listPurchaseOrdersPaged);

module.exports = routes