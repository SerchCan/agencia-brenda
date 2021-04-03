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
              <Button color="secondary" onClick={this.toggleModalFunc}>Realizar venta sin factura</Button>
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
              <Button color="primary" onClick={this.toggleRegisterModalFunc}>Realizar venta con factura</Button>{' '}
            </ModalFooter>
          </Modal>
        )}
      </div>
    );
  }
}

export default SellOrInvoiceModal;