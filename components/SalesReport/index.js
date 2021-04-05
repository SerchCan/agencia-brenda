import axios from 'axios';
import { Component } from 'react';
import {Container} from 'reactstrap';
import Table from '../Table'
class Invoices extends Component {
  state= {
    endpointInfo:[]
  }
  async componentDidMount(){
    const {data} = await axios.get("/api/Sales/getAll")
    this.setState({endpointInfo:data.result});
  }
  render(){
     const tableColumns = [
      {key:'productId',label:'Id Producto'},
      {key:'quantity',label:'Cantidad'},
      {key:'total',label:'Total'},
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