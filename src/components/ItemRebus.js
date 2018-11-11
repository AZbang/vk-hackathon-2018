import React from 'react';
import './ItemRebus.css';

class ItemRebus extends React.Component {
  render() {
    return (
      <div className="item-rebus" style={{background: this.props.color}}>
        <p className="item-rebus__emoji">
          {this.props.item.rebus}
        </p>
        <p className="item-rebus__room">Угадайте экспонат. {this.props.room.label}. Этаж {this.props.room.floor}</p>
      </div>
    )
  }
}

export default ItemRebus;
