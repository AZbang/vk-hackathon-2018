import React from 'react';
import './RoomInfo.css';

class RoomInfo extends React.Component {
  render() {
    return (
      <div className="room-info">
        <div className="room-info__track">
          ЗАЛ №{this.props.room.track}
        </div>
        <div className="room-info__items">
          {this.props.itemCount+1 + ' / ' + this.props.room.items.length}
        </div>
      </div>
    )
  }
}

export default RoomInfo;
