import { Component } from 'react';
import { Table,Button } from 'reactstrap';
import {AiFillMinusCircle} from 'react-icons/ai'
class TableComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Columns = [], Values=[],removeFunc } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            {Columns.map(column => (<th key={column.key}>{column.label}</th>))}
          </tr>
        </thead>
        <tbody>
          {Values.map((row,index)=>(
            <tr key={`row-${index}`}>
              {Columns.map(column => column.key!='action' ?(<td key={`row-value-${column.key}`}>{row[column.key]}</td>):null)}
              <td>
                <Button color='danger' onClick={()=>removeFunc(index)}>
                  <AiFillMinusCircle/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default TableComponent;