import { Products, Sales } from '../../../db/models';
import createInvoice from '../Invoices/create';
async function reduceStock(productBarcode, selledQuantity) {
  const product = await Products.findOne({ where: { barcode: productBarcode } });
  if (product !== null) {
    product.quantity = product.quantity - selledQuantity;
    await product.save()
  }
  return product;
}

export default async function sell(req, res) {
  try {
    const { body } = req;
    const { products = [], invoiceData = null } = body;
    // reduce from stock
    const productsList = await Promise.all(
      products.map(async ({ barcode, quantity, total }) => {
        let updatedProduct = await reduceStock(barcode, quantity);
        const { id, price, name } = updatedProduct.dataValues;
        return {
          quantity,
          total,
          price,
          productId: id,
          product_key: barcode,
          description: name
        };
      })
    );
    productsList.forEach(async (product) => {
      await Sales.create(product)
    })

    if (invoiceData !== null) {
      // logic for invoice
      await createInvoice(invoiceData, productsList);
    }
    res.status(200).json({ message: "Venta concretada" });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ message: "Server error" });
  }
}
