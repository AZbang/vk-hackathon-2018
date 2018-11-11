import React from 'react';
import { Emojione } from 'react-emoji-render';

import './ItemRebus.css';

class ItemRebus extends React.Component {
  render() {
    return (
      <div className="item-rebus">
        <p className="item-rebus__emoji">
          <Emojione text={this.props.item.rebus} />
        </p>
        <p className="item-rebus__room">Угадайте экспонат. {this.props.room.label}. Этаж {this.props.room.floor}</p>
      </div>
    )
  }
}

export default ItemRebus;
