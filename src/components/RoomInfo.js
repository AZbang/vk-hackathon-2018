import React from 'react';
import './RoomInfo.css';

class RoomInfo extends React.Component {
  render() {
    return (
      <div className="room-info">
        <div className="room-info__track" style={{background: this.props.color}}>
          ЗАЛ №{this.props.room.track}
        </div>
        <div className="room-info__items" style={{background: this.props.color}}>
          {this.props.itemCount+1 + ' / ' + this.props.room.items.length}
        </div>
      </div>
    )
  }
}

export default RoomInfo;
