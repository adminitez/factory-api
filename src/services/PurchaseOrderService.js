const request = require("request");

const OMIE_APP_KEY = '852287147712';
const OMIE_APP_SECRET = '71ca51b47c3936ad4fe2c15c7dfbd81d';

const OmieService = require("../integrations/OmieService")

function mapProduct(item) {
  return {
      code: item.produto.ean,
      description: item.produto.descricao,
      quantity: item.produto.quantidade
  };
}

module.exports = {
  async listPurchaseOrdersPaged(page, size){
    const purchaseOrdersResponse = await OmieService.listPurchaseOrdersPaged(page, size)
    const purchaseOrders = purchaseOrdersResponse.pedido_venda_produto.filter((purchaseOrder) => {
      return purchaseOrder.cabecalho.etapa === '20'})

    const promises = purchaseOrders.map(async purchaseOrder => {

      const clientCode = purchaseOrder.cabecalho.codigo_cliente
      const client = await OmieService.getClientByCode(clientCode)

      const products = purchaseOrder.det.map(mapProduct)
      
      finalPurchaseOrder = {
        clientName: client.nome_fantasia,
        purchaseOrderId: purchaseOrder.cabecalho.codigo_pedido,
        products: products
      }

      return finalPurchaseOrder
    });

    const finalPurchaseOrderList = await Promise.all(promises)

    return {
      page:purchaseOrdersResponse.pagina,
      totalPages:purchaseOrdersResponse.total_de_paginas,
      totalRecords:purchaseOrdersResponse.registros,
      purchaseOrders: finalPurchaseOrderList
    }
  }
}


