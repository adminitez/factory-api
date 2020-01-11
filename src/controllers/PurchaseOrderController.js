

const PurchaseOrderService = require("../services/PurchaseOrderService")

module.exports = {
    async listPurchaseOrdersPaged(req, res){
        const page = req.query.page
        const size = req.query.size

        const resp = await PurchaseOrderService.listPurchaseOrdersPaged(page, size)
        return res.json(resp)
    }
}