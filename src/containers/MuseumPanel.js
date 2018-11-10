import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Panel, HeaderButton, PanelHeader,Search, Group} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import * as data from '../store/actions';
import RoomPreview from '../components/RoomPreview';



class MuseumPanel extends React.Component {
  openPlayground = (id) => {
    this.props.dispatch(data.setRoom(id))
    this.props.dispatch(push('/playground'));
  }

  openMuseums = () => {
    this.props.dispatch(push('/museums'));
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
        <PanelHeader noShadow left={<HeaderButton onClick={this.openMuseums}>{<Icon24Back/>}</HeaderButton>}>{this.props.museum.name}</PanelHeader>
        <Search/>
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
