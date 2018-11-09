import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Panel, PanelHeader, Group} from '@vkontakte/vkui';

import * as data from '../store/actions';
import RoomPreview from '../components/RoomPreview';

class MuseumPanel extends React.Component {
  openPlayground = (id) => {
    this.props.dispatch(data.setRoom(id))
    this.props.dispatch(push('/playground'));
  }

  getRoomPreviewsList = () =>
    this.props.museum.rooms.map((id) =>
      <RoomPreview
        key={id}
        onClick={() => this.openPlayground(id)}
        room={this.props.rooms[id]}/>
    )

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>{this.props.museum.name}</PanelHeader>
        <Group>
          {this.getRoomPreviewsList()}
        </Group>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    museum: state.data.activeMuseum,
    rooms: state.data.rooms
  }
}

export default connect(mapStateToProps)(MuseumPanel);
