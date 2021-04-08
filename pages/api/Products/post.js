import { Products, InternalProductCount } from '../../../db/models';
async function generateProductKey(){
  const InternalObj = await InternalProductCount.findByPk(1)
  let result = InternalObj.seq;
  InternalObj.seq = InternalObj.seq+1;
  InternalObj.save()
  return String(result);
}
export default async function addProduct(req, res) {
  try {
    const { body:reqBody, method } = req;
    let body = reqBody;
    if (method != 'POST') {
      throw "Method not available"
    }
    if(!reqBody.barcode){
      body.barcode = await generateProductKey()
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