import { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { AiFillMinusCircle } from 'react-icons/ai'
import Barcode from 'react-barcode';
class TableComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Columns = [], Values = [], removeFunc = null, Total = null } = this.props;
    return (
      <Table>
        <thead>
          <tr>
            {Columns.map(column => (<th key={column.key}>{column.label}</th>))}
          </tr>
        </thead>
        <tbody>
          {Values.map((row, index) => (
            <tr key={`row-${index}`}>
              {
                Columns.map((column) => {
                  switch(column.key){
                    case 'action':
                      return null;
                    case 'barcode':
                      return (<td key={`row-value-${column.key}`}><Barcode value={row[column.key]}/></td>)
                    default:
                      return (<td key={`row-value-${column.key}`}>{row[column.key]}</td>)
                  }
                })
              }
              {removeFunc ? (<td>
                <Button color='danger' onClick={() => removeFunc(index)}>
                  <AiFillMinusCircle />
                </Button>
              </td>) : null
              }
            </tr>
          ))}
        </tbody>
        {Total ? (
          <tfoot>
            <tr>
              <td colSpan={Columns.length - 2}></td>
              <th className="bg-success text-white text-center">Total ${Total.toFixed(2)}</th>
            </tr>
          </tfoot>
        ) : null}

      </Table>
    )
  }
}

export default TableComponent;