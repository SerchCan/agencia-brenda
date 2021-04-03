import { Component } from 'react';
import Sidebar from '../Sidebar';
class Layout extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar/>
        <div id="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout;