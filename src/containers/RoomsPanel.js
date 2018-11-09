import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, PanelHeader} from '@vkontakte/vkui';

class RoomsPanel extends Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>VinGo.Комнаты</PanelHeader>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    rooms: state.data.activeRooms
  }
}

export default connect(mapStateToProps)(RoomsPanel);
