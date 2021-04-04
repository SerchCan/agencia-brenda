import { Sales } from '../../../db/models';
export default async function getAllSales(req, res) {
  try {
    const sales = await Sales.findAll()
    return res.status(200).json({ result: sales })
  } catch (ex) {
    console.log(ex)
    return res.status(500).json({ message: "Server error" });
  }
}
