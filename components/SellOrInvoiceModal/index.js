import axios from 'axios';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class SellOrInvoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleModal: false,
      toggleRegisterModal: false,
      legal_name: '',
      email: '',
      rfc: '',
    }
    this.toggleModalFunc = this.toggleModalFunc.bind(this);
    this.toggleRegisterModalFunc = this.toggleRegisterModalFunc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearFiscalValues = this.clearFiscalValues.bind(this);
  }
  toggleModalFunc() {
    this.setState({ toggleModal: !this.state.toggleModal })
  }
  toggleRegisterModalFunc() {
    this.setState({ toggleRegisterModal: !this.state.toggleRegisterModal })
  }
  handleChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  clearFiscalValues(){
    this.setState({
      legal_name: '',
      email: '',
      rfc: ''
    })

  }
  async createSale(requireInvoice){
    const {Values, clearBasket} = this.props;
    try{
      if(Values.length > 0){
        let body = {
          products: Values,
          invoiceData: null
        }
        if(requireInvoice){
          body.invoiceData = {
            legal_name: this.state.legal_name,
            email: this.state.email,
            tax_id: this.state.rfc,
          }
        }
        const {data} = await axios.post('/api/Sales/sell',body);
        alert(data.message);
      } else {
        alert("No hay productos para vender")
      }
    } catch (err){
      alert(err.response.data.message)
    } finally {
      clearBasket()
      this.clearFiscalValues()
      if(!requireInvoice){
        this.toggleModalFunc();
      } else {
        this.toggleRegisterModalFunc();
        this.toggleModalFunc();
      }

    }
      
  }
  render() {
    const { 
      toggleModal, 
      toggleRegisterModal,
      legal_name,
      email,
      rfc 
    } = this.state
    return (
      <div>
        <Button color="info" onClick={this.toggleModalFunc}>Realizar Venta</Button>
        {!toggleRegisterModal ? (
          <Modal isOpen={toggleModal} toggle={this.toggleModalFunc} >
            <ModalHeader toggle={this.toggleModalFunc}>Facturación</ModalHeader>
            <ModalBody>
              ¿Desea realizar la factura de la siguiente venta?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggleRegisterModalFunc}>Registro de datos fiscales</Button>{' '}
              <Button color="secondary" onClick={()=>this.createSale(false)}>Realizar venta sin factura</Button>
            </ModalFooter>
          </Modal>
        ) : (
          <Modal isOpen={toggleRegisterModal} toggle={this.toggleRegisterModalFunc} >
            <ModalHeader toggle={this.toggleRegisterModalFunc}>Facturación</ModalHeader>
            <ModalBody>
              <Form className="mt-4">
                <FormGroup >
                  <Label>Nombre fiscal:</Label>
                  <Input name="legal_name" value={legal_name} onChange={this.handleChange} autoComplete={'off'} />
                </FormGroup>
                <FormGroup >
                  <Label>Correo Eléctronico:</Label>
                  <Input name="email" value={email} onChange={this.handleChange} autoComplete={'off'} />
                </FormGroup>
                <FormGroup >
                  <Label>RFC:</Label>
                  <Input name="rfc" value={rfc} onChange={this.handleChange} autoComplete={'off'} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary"  onClick={()=>this.createSale(true)}>Realizar venta con factura</Button>{' '}
            </ModalFooter>
          </Modal>
        )}
      </div>
    );
  }
}

export default SellOrInvoiceModal;