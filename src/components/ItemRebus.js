import React from 'react';
import './ItemRebus.css';

class ItemRebus extends React.Component {
  render() {
    return (
      <div className="item-rebus">
        <p className="item-rebus__emoji">{this.props.item.rebus}</p>
        <p className="item-rebus__room" id="debugger"></p>
      </div>
    )
  }
}

export default ItemRebus;
