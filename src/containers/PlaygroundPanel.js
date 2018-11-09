import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from '@vkontakte/vkui';
import {push} from 'react-router-redux';

import Camera from '../components/Camera';
import RoomInfo from '../components/RoomInfo';
import ItemRebus from '../components/ItemRebus';

class PlaygroundPanel extends Component {
  state = {
    itemCount: 0,
    shuffleItems: this.props.room.items.slice()
  }

  getCurrentItem = () =>
    this.props.room.items[this.props.itemCount];

  // shuffleItems(a) {
  //   console.log(a)
  //   for(let i = a.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [a[i], a[j]] = [a[j], a[i]];
  //   }
  //   return a;
  // }
  //
  nextItem = () => {
    if(this.state.itemCount+1 >= this.props.room.items.length) {
      this.props.dispatch(push('/museum'));
    }

    this.setState((state, props) => {
      return {itemCount: state.itemCount+1};
    });
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <RoomInfo room={this.props.room} itemCount={this.state.itemCount}></RoomInfo>
        <Camera onClick={() => this.nextItem()}  facingMode="environment"/>
        <ItemRebus item={this.getCurrentItem()}></ItemRebus>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    room: state.data.activeRoom
  }
}

export default connect(mapStateToProps)(PlaygroundPanel);
