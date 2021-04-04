import { Invoices } from '../../../db/models';
export default async function getAllInvoices(req, res) {
  try {
    const invoices = await Invoices.findAll()
    return res.status(200).json({ result: invoices })
  } catch (ex) {
    console.log(ex)
    return res.status(500).json({ message: "Server error" });
  }
}
