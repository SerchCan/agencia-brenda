import { Products, Sales } from '../../../db/models';
import createInvoice from '../Invoices/create';
async function reduceStock(productId, selledQuantity) {
  const product = await Products.findByPk(productId);
  if (product !== null) {
    product.quantity = product.quantity - selledQuantity;
    await product.save()
  }
}

export default async function sell(req, res) {
  try {
    const { body } = req;
    const { products = [], invoiceData = null } = body;
    // reduce from stock
    const productsList = await products.map(({ id, quantity, total }) => {
      updatedProduct = await reduceStock(id, quantity);
      const { price, barcode, name } = updatedProduct
      return {
        quantity, 
        total,
        price, 
        productId: id, 
        product_key: barcode,
        description: name
      };
    })
    // add products to saless table
    await productsList.forEach(product => await Sales.create(product))
    if (invoiceData !== null) {
      // logic for invoice
      await createInvoice(invoiceData,productsList);
    }
    res.status(200).json({ message: "Venta concretada" });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ message: "Server error" });
  }
}
