import axios from 'axios';
import { Component } from 'react';
import { Container, Row, Col, Label, Input, Form, FormGroup, FormText } from 'reactstrap';
import Table from '../Table';
class BarcodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scannedBarcode: '',
      productsBasket: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.onScannedBarcodeSubmit = this.onScannedBarcodeSubmit.bind(this)
    this.addProductToBasket = this.addProductToBasket.bind(this);
    this.removeProductFromBasket=this.removeProductFromBasket.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addProductToBasket(product) {
    const { productsBasket } = this.state
    let basketCopy = productsBasket;
    const index = basketCopy.findIndex(product => product.barcode = product.barcode);
    if (index == -1) {
      const productFormat = {
        barcode: product.barcode,
        name: product.name,
        quantity: 1,
        price: product.price,
        total: product.price
      }
      basketCopy.push(productFormat)
    } else {
      basketCopy[index].quantity += 1
      basketCopy[index].total = basketCopy[index].quantity * basketCopy[index].price;
    }
    return basketCopy;
  }

  removeProductFromBasket(index){
    const { productsBasket } = this.state
    let basketCopy = productsBasket;

    if(basketCopy[index].quantity <= 1){
      basketCopy.splice(index,1);
    } else {
      basketCopy[index].quantity-=1;
      basketCopy[index].total = basketCopy[index].quantity * basketCopy[index].price
    }
    this.setState({productBasket: basketCopy})
  }
  async onScannedBarcodeSubmit(e) {
    e.preventDefault();
    const { scannedBarcode, productsBasket } = this.state
    let basketCopy = productsBasket;
    try {
      if (scannedBarcode !== '') {
        const { data: { result } } = await axios.get(`/api/Products/${scannedBarcode}`);
        basketCopy = this.addProductToBasket(result);
      }
    } catch (err) {
      alert(err.response.data.message)
    } finally {
      this.setState({ scannedBarcode: '', productsBasket: basketCopy })
    }
  }
  render() {
    const { scannedBarcode,productsBasket } = this.state
    const tableColumns = [
      {key:'barcode',label:'Código de barras'},
      {key:'name',label:'Producto'},
      {key:'quantity',label:'Cantidad'},
      {key:'price',label:'Precio unitario'},
      {key:'total',label:'Total'},
      {key:'action',label:'Acción'},
    ]
    return (
      <Container fluid className="m-4 p-4 bg-white rounded border">
        <h2>Crear venta</h2>
        <Form className="mt-4" onSubmit={this.onScannedBarcodeSubmit}>
          <FormGroup >
            <Row>
              <Col xs={12} md={2}>
                <Label>Código de barras:</Label>
              </Col>
              <Col xs={12} md={9}>
                <Input name="scannedBarcode" value={scannedBarcode} onChange={this.handleChange} autoComplete={'off'} />
                <FormText color="muted">
                  Presiona <kbd>enter ↵</kbd> o escanea con el lector el producto.
                </FormText>
              </Col>
            </Row>
          </FormGroup>
        </Form>
        <Table Columns={tableColumns} Values={productsBasket} removeFunc={this.removeProductFromBasket}/>
      </Container>
    )
  }
}

export default BarcodeScanner;