

const PurchaseOrderQueryService = require("../services/PurchaseOrderQueryService")
const PurchaseOrderCommandService = require("../services/PurchaseOrderCommandService")

module.exports = {
    async listPurchaseOrdersPaged(req, res){
        const page = req.query.page
        const size = req.query.size

        const resp = await PurchaseOrderQueryService.listPurchaseOrdersPaged(page, size)
        return res.json(resp)
    },

    async getPurchaseOrderById(req, res){
        const id = req.params.purchaseOrderId

        const resp = await PurchaseOrderQueryService.getPurchaseOrderById(id)
        return res.json(resp)
    },
    async updatePurchaseOrderProducts(req, res){
        const id = req.params.purchaseOrderId
        console.log(req.body)
        await PurchaseOrderCommandService.updatePurchaseOrderProducts(id, req.body)
        res.status(204)
    }
}