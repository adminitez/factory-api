const request = require("request");
const mongoose = require('mongoose');
const OmieService = require("../integrations/OmieService");

const OMIE_APP_KEY = '852287147712';
const OMIE_APP_SECRET = '71ca51b47c3936ad4fe2c15c7dfbd81d';


const PurchaseOrder = mongoose.model('PurchaseOrder');

function mapProduct(item) {
  return {
      code: item.produto.ean,
      description: item.produto.descricao,
      quantity: item.produto.quantidade,
      totalVerified: 0
  };
}

module.exports = {
  async listPurchaseOrdersPaged(page, size){
    const purchaseOrdersResponse = await OmieService.listPurchaseOrdersPaged(page, size, "20")
    const purchaseOrders = purchaseOrdersResponse.pedido_venda_produto
    
    const promises = purchaseOrders.map(async purchaseOrder => {

      const clientCode = purchaseOrder.cabecalho.codigo_cliente
      const client = await OmieService.getClientByCode(clientCode)

      const products = purchaseOrder.det.map(mapProduct)

      finalPurchaseOrder = {
        clientName: client.razao_social,
        purchaseOrderId: purchaseOrder.cabecalho.codigo_pedido,
        products: products,
        purchaseOrderNumber: purchaseOrder.cabecalho.numero_pedido,
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
  },
  
  async getPurchaseOrderById(id){
    
    const purchaseOrderDB = await PurchaseOrder.findById(id)

    if(purchaseOrderDB === null){
      const purchaseOrderResponse = await OmieService.getPurchaseOrderById(id)
      const purchaseOrder = purchaseOrderResponse.pedido_venda_produto
      const client =  await OmieService.getClientByCode(purchaseOrder.cabecalho.codigo_cliente)
      const products = purchaseOrder.det.map(mapProduct)

      await PurchaseOrder.create({
        _id: purchaseOrder.cabecalho.codigo_pedido,
        number: purchaseOrder.cabecalho.numero_pedido,
        clientId: purchaseOrder.cabecalho.codigo_cliente,
        clientName: client.nome_fantasia,
        products: products
      })

      return {
        clientName: client.nome_fantasia,
        purchaseOrderId: purchaseOrder.cabecalho.codigo_pedido,
        purchaseOrderNumber: purchaseOrder.cabecalho.numero_pedido,
        products: products
      }
    }
    
    return {
      clientName: purchaseOrderDB.clientName,
      purchaseOrderId: purchaseOrderDB._id,
      purchaseOrderNumber: purchaseOrderDB.number,
      products: purchaseOrderDB.products
    }


  }
}


