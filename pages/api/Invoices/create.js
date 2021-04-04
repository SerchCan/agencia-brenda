import Facturapi from 'facturapi';
import { Invoices } from '../../../db/models';

const facturapi = new Facturapi(process.env.FACTURAPI_KEY)

async function createInvoice(customer, products) {
  try {
    let invoiceObject = {
      customer:customer,
      items: [],
      payment_form: Facturapi.PaymentForm.EFECTIVO,
      currency: 'mxn'
    }

    products.forEach(product => {
      invoiceObject.items.push({
        quantity: product.quantity,
        discount: 0,
        product: {
          description: product.description,
          product_key: '50202306', //refrescos
          price: product.price,
          discount: 0,
          tax_included: false
        }
      })
    });
    // create invoice
    const facturapiInvoice = await facturapi.invoices.create(invoiceObject)
    
    // save to database
    const invoice = await Invoices.create({
      legalName: customer.legal_name,
      email: customer.email,
      rfc: customer.tax_id,
      salesIds: await products.map(product => product.id),
      invoiceId: facturapiInvoice.id,

    })
    // send by email
    await facturapi.invoices.sendByEmail(invoice.invoiceId)

    return true;
  } catch (ex) {
    console.log(ex);
    return false;
  }

}
export default createInvoice;