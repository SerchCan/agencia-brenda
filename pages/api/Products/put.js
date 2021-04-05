import { Products } from '../../../db/models';

export default async function updateProduct(req, res) {
  try {
    const { body, method } = req;
    if (method != 'PUT') {
      throw "Method not available"
    }
    // find product
    const product = await Products.findOne({
      where: {
        barcode: body.barcode
      }
    })
    // if product exists
    if (product !== null) {
      // update instance
      product.quantity = product.quantity + body.quantity;
      product.price = body.price;
      const response = await product.save();
      return res.status(200).json({ result: response })
    }
    return res.status(404).json({ message: "Cannot update product not found" });
  } catch (ex) {
    console.log(ex)
    return res.status(500).json({ message: "Server error" });
  }
}