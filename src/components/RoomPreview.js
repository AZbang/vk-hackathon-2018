import React from 'react';
import {Cell} from '@vkontakte/vkui';
import './RoomPreview.css';

class RoomPreview extends React.Component {
  render() {
    return (
      <Cell expandable onClick={() => this.props.onClick()}>{this.props.room.track}</Cell>
    )
  }
}

export default RoomPreview;
