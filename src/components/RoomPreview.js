import React from 'react';
import * as data from '../store/actions';
import './RoomPreview.css';

class RoomPreview extends React.Component {
  render() {
    let bg = 'linear-gradient(-45deg, #fff0, #5181b8), url(' + data.getRoomImg(this.props.data.image) + ")";

    return (
      <div className="room-preview"  style={{backgroundImage: bg}} onClick={() => this.props.onClick()}>
        <h1 className="room-preview__label">{this.props.data.label}</h1>
        <div className="room-preview__info">
          <span className="room-preview__info__track">Зал №{this.props.data.track}</span>
          <span className="room-preview__info__floor">{this.props.data.floor} Этаж</span>
        </div>
      </div>
    )
  }
}

export default RoomPreview;
