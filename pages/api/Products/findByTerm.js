import { Products } from '../../../db/models';
import {Op} from 'sequelize'
export default async function getAllProducts(req, res) {
  try {
    const { query } = req;
    console.log(query.q);
    const products = await Products.findAll({
      where:{
        name: {
          [Op.like]: `%${query.q}%`
        }
      }
    })
    return res.status(200).json({ result: products })
  } catch (ex) {
    console.log(ex)
    return res.status(500).json({ message: "Server error" });
  }
}
