import React from 'react';
import {connect} from 'react-redux';
import {Panel} from '@vkontakte/vkui';
import {push} from 'react-router-redux';

import * as model from '../model';

import Camera from '../components/Camera';
import RoomInfo from '../components/RoomInfo';
import ItemRebus from '../components/ItemRebus';

class PlaygroundPanel extends React.Component {

  getCurrentItem = () => {
    return this.props.items[this.props.gameItemsIds[this.props.currentItemId]];
  }

  checkItem = (img) => {
    this.props.dispatch(push('/story'));

    let id = model.predict(img);
    if(this.props.gameItemsIds[this.props.currentItemId] === parseInt(id, 10)) {
      this.props.dispatch(push('/story'));
    }
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <RoomInfo room={this.props.room} itemCount={this.props.currentItemId}></RoomInfo>
        <Camera onStream={this.checkItem}/>
        <ItemRebus room={this.props.room} item={this.getCurrentItem()}></ItemRebus>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.data.items,
    room: state.data.activeRoom,
    gameItemsIds: state.data.gameItemsIds,
    currentItemId: state.data.currentItemId
  }
}

export default connect(mapStateToProps)(PlaygroundPanel);
