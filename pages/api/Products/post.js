import { Products } from '../../../models';

export default async function addProduct(req, res) {
  try {
    const { body } = req;
    // find product
    const product = await Products.findOne({
      where: {
        barcode: body.barcode
      }
    })
    // if product exists
    if (product !== null) {
      // update instance
      product.quantity = product.quantity + body.quantity
      const response = await product.save();
      return res.status(200).json({ result: response })
    }
    // create new product
    const result = await Products.create(body);
    return res.status(200).json({ result: result });
  } catch (ex) {
    console.log(ex)
    return res.status(500).json({ message: "Server error" });
  }
}