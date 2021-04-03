import { Products } from '../../../db/models';
export default async function getProduct(req, res) {
  try {
    const { query } = req;
    const product = await Products.findOne({
      where: {
        barcode: query.barcode
      }
    })
    if (product !== null) {
      return res.status(200).json({ result: product })
    }
    return res.status(404).json({ message: 'Producto no encontrado en la base de datos' })
  } catch (ex) {
    console.log({ ex })
    return res.status(500).json({ message: "Server error" });
  }
}
