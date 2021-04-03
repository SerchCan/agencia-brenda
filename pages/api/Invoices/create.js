import Facturapi from 'facturapi';
import { Invoice } from '../../../models';


const facturapi = new Facturapi(process.env.FACTURAPI_KEY)

async function createInvoice(invoiceData, products) {
  try {
    const {
      customer,
    } = invoiceData

    let InvoiceObject = {
      ...customer,
      items: [],
      payment_form: Facturapi.PaymentForm.EFECTIVO,
      currency: 'mxn'
    }

    await products.forEach(product => {
      InvoiceObject.items.push({
        quantity: product.quantity,
        discount: 0,
        product: {
          description: product.description,
          product_key: product.product_key,
          price: product.price,
          discount: 0,
          tax_included: false
        }
      })
    });
    // create invoice
    const facturapiInvoice = await facturapi.invoice.create(InvoiceObject)
    // save to database
    const invoice = await Invoice.create({
      legalName: customer.legal_name,
      email: customer.email,
      rfc: customer.rfc,
      salesIds: await products.map(product => product.id),
      invoiceId: facturapiInvoice.id,

    })
    // send by email
    await facturapi.invoices.sendByEmail(invoice.id)

    return true;
  } catch (ex) {
    console.log(ex);
    return false;
  }

}
export default createInvoice;