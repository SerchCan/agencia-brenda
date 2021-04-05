import axios from 'axios';
import { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Table from '../Table';
class Storage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: '',
      name: '',
      quantity: 1,
      newQuantity: 0,
      price: '',
      newPrice: '',
      found: false,
      allProducts: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.findProduct = this.findProduct.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/Products/getAll');
    this.setState({ allProducts: data.result });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async findProduct(e) {
    try {
      e.preventDefault();
      const { data } = await axios.get(`/api/Products/${this.state.barcode}`);
      console.log(data.result)
      const result = {
        ...data.result,
        newQuantity: 0,
        newPrice: data.result.price,
        found: true
      }
      this.setState(result);

    } catch (err) {
      // not found
      this.setState({
        name: '',
        quantity: 1,
        price: '',
        found: false
      })
    }
  }

  async submitForm(found) {
    const {
      barcode,
      name,
      quantity,
      price,
      newQuantity,
      newPrice,
    } = this.state;

    if (!found) {
      const body = {
        barcode,
        name,
        quantity: Number(quantity),
        price: Number(price)
      }
      const { data } = await axios.post('/api/Products/post', body)
      alert("Inserted Correctly: " + data.result.id)
    } else {
      const body = {
        barcode,
        name,
        quantity: Number(newQuantity),
        price: Number(newPrice)
      }
      const { data } = await axios.put('/api/Products/put', body)
      alert("Updated Correctly: " + data.result.id)
    }
  }
  render() {
    const {
      barcode,
      name,
      quantity,
      price,
      newQuantity,
      newPrice,
      found,
      allProducts
    } = this.state;

    const Columns = [
      { key: 'id', label: "ID" },
      { key: 'barcode', label: "Codigo Barras" },
      { key: 'name', label: "Producto" },
      { key: 'quantity', label: "Cantidad" },
      { key: 'price', label: "Precio" },
    ]
    return (
      <Container fluid className="m-4 p-4 bg-white rounded border">
        <h4 className="pt-2 pb-2 text-center bg-success text-white">Agregar / Actualizar productos</h4>
        <Form className="mt-4" onSubmit={this.findProduct}>
          <FormGroup >
            <Label>Código de barras:</Label>
            <Input name="barcode" value={barcode} onChange={this.handleChange} autoComplete={'off'} />
          </FormGroup>
        </Form>
        <Form className="mt-4">
          <FormGroup >
            <Label>Nombre de producto:</Label>
            <Input name="name" value={name} onChange={this.handleChange} autoComplete={'off'} disabled={found} />
          </FormGroup>
          <FormGroup >
            <Label>Cantidad Actual:</Label>
            <Input name="quantity" type="number" value={quantity} onChange={this.handleChange} autoComplete={'off'} disabled={found} />
          </FormGroup>
          <FormGroup >
            <Label>Precio:</Label>
            <Input name="price" value={price} onChange={this.handleChange} autoComplete={'off'} disabled={found} />
          </FormGroup>
          {found ? (
            <>
              <FormGroup >
                <Label>Agregar Stock:</Label>
                <Input name="newQuantity" type="number" value={newQuantity} onChange={this.handleChange} autoComplete={'off'} />
              </FormGroup>
              <FormGroup >
                <Label>Nuevo Precio:</Label>
                <Input name="newPrice" type="number" value={newPrice} onChange={this.handleChange} autoComplete={'off'} />
              </FormGroup>
              <FormGroup >
                <Button color="info" onClick={() => this.submitForm(true)}>Actualizar</Button>
              </FormGroup>
            </>
          ) : (
            <FormGroup >
              <Button color="success" disabled={barcode == ''} onClick={() => this.submitForm(false)}>Guardar</Button>
            </FormGroup>
          )}
        </Form>

        <h4 className="pt-2 pb-2 text-center bg-dark text-white">Listado de productos</h4>
        <Table Columns={Columns} Values={allProducts} />
      </Container>
    )
  }
}
export default Storage;