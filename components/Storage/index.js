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
      search:'',
      found: false,
      isInternal:false,
      allProducts: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.findProduct = this.findProduct.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.findProductOnStorage = this.findProductOnStorage.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/Products/getAll');
    this.setState({ allProducts: data.result });
  }

  handleChange(e) {
    if(e.target.type == "checkbox"){
      this.setState({ [e.target.name]: e.target.checked })
      return
    }
    this.setState({ [e.target.name]: e.target.value })
  }

  async findProductOnStorage(e){
    try {
      e.preventDefault();
      if(this.state.search != ''){
        const { data } = await axios.get(`/api/Products/findByTerm?q=${this.state.search}`);
        this.setState({allProducts: data.result});
      } else {
        const { data } = await axios.get('/api/Products/getAll');
        this.setState({ allProducts: data.result });
      }
    } catch (err) {
      // not found
      console.log("not found")
    }
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
      isInternal,
    } = this.state;

    if (!found) {
      let body = {
        name,
        quantity: Number(quantity),
        price: Number(price)
      }
      if(!isInternal){
        body.barcode = barcode;
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
      isInternal,
      allProducts,
      search
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
            <Input name="barcode" value={barcode} onChange={this.handleChange} autoComplete={'off'} disabled={isInternal}/>
          </FormGroup>
          <FormGroup check>
          <Label check>
            <Input type="checkbox" name="isInternal" checked={isInternal} onChange={this.handleChange}/>{' '}
            Es producto interno, se le generara su propio código de barras.
          </Label>
      </FormGroup>

        </Form>
        <Form className="mt-4">
          <FormGroup >
            <Label>Nombre de producto:</Label>
            <Input name="name" value={name} onChange={this.handleChange} autoComplete={'off'} disabled={found} />
          </FormGroup>
          <FormGroup >
            <Label>Cantidad en stock:</Label>
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
              <Button color="success" disabled={barcode == '' && !isInternal} onClick={() => this.submitForm(false)}>Guardar</Button>
            </FormGroup>
          )}
        </Form>

        <h4 className="pt-2 pb-2 text-center bg-dark text-white">Listado de productos</h4>
        <Form className="mt-4" onSubmit={this.findProductOnStorage}>
          <h5><strong>Búsqueda de artículo</strong></h5>
          <FormGroup >
            <Label>Nombre del producto:</Label>
            <Input name="search" value={search} onChange={this.handleChange} autoComplete={'off'}/>
          </FormGroup>
        </Form>
        <Table Columns={Columns} Values={allProducts} />
      </Container>
    )
  }
}
export default Storage;