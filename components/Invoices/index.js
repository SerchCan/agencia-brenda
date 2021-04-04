import axios from 'axios';
import { Component } from 'react';
import {Container} from 'reactstrap';
import Table from '../Table'
class Invoices extends Component {
  state= {
    endpointInfo:[]
  }
  async componentDidMount(){
    const {data} = await axios.get("/api/Invoices/getAll")
    this.setState({endpointInfo:data.result});
  }
  render(){
     const tableColumns = [
      {key:'legalName',label:'Nombre'},
      {key:'email',label:'Correo'},
      {key:'rfc',label:'RFC'},
      {key:'invoiceId',label:'Id Facturapi'},
      {key:'createdAt',label:'Fecha de creación'},
    ]
    const {endpointInfo} = this.state;
    return(
      <Container fluid className="m-4 p-4 bg-white rounded border">
        <Table Columns={tableColumns} Values={endpointInfo} />
      </Container>
    )
  }
}

export default Invoices;