import { Products } from '../../../db/models';
export default async function getAllProducts(req, res) {
  try {
    const products = await Products.findAll()
    return res.status(200).json({ result: products })
  } catch (ex) {
    console.log(ex)
    return res.status(500).json({ message: "Server error" });
  }
}
