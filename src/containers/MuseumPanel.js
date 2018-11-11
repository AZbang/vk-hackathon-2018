import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Panel, HeaderButton, PanelHeader,Search, Group, List, Footer} from '@vkontakte/vkui';
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

  getRoomPreviewsList = () => {
    let list = [];
    for(let key in this.props.rooms) {
      list.push(<RoomPreview key={key} onClick={() => this.openPlayground(key)} data={this.props.rooms[key]}/>);
    }
    return list;
  }
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader noShadow left={<HeaderButton onClick={this.openMuseums}>{<Icon24Back/>}</HeaderButton>}>{this.props.museum.name}</PanelHeader>
        <Search placeholder="Например, зал 343"/>
        <Group title="Выберите зал для прогулки:">
          <List style={{paddingBottom: '5px'}}>
            {this.getRoomPreviewsList()}
          </List>
        </Group>
        <Footer>Доступно {this.props.rooms.length} зала</Footer>
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
