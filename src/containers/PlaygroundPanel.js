import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from '@vkontakte/vkui';
import {push} from 'react-router-redux';

import * as data from '../store/actions';
import Camera from '../components/Camera';
import RoomInfo from '../components/RoomInfo';
import ItemRebus from '../components/ItemRebus';
import StoryItem from '../components/StoryItem';

class PlaygroundPanel extends Component {
  state = {
    currentItemId: 0,
    showStoryItem: false,
    shuffleItems: [].concat(this.props.room.items).sort(() => Math.random() - .5)
  }

  getCurrentItem = () => {
    if(!this.state.shuffleItems.length) return {};
    return this.props.items[this.state.shuffleItems[this.state.currentItemId]];
  }

  onStoryItemEnded = () => {
    console.log('dfsd')
    if(this.state.currentItemId+1 >= this.props.room.items.length) {
      return this.props.dispatch(push('/museum'));
    }
    this.setState({
      currentItemId: this.state.currentItemId+1
    });
  }

  showStoryItem() {
    if(this.state.shuffleItems[this.state.currentItemId] == null || this.props.predictionItemId == null) return false;
    return this.state.shuffleItems[this.state.currentItemId] == this.props.predictionItemId;
  }


  checkItem = (img) => {
    if(this.showStoryItem()) return;
    this.props.dispatch(data.predict(img));
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <RoomInfo room={this.props.room} itemCount={this.state.currentItemId} style={{display: this.showStoryItem() ? 'none' : 'block'}}></RoomInfo>
        <Camera onStream={(img) => this.checkItem(img)} style={{display: this.showStoryItem() ? 'none' : 'block'}}/>
        <ItemRebus room={this.props.room} item={this.getCurrentItem()}></ItemRebus>

        <StoryItem show={this.showStoryItem()} onEnd={this.onStoryItemEnded} room={this.props.room} item={this.getCurrentItem()}></StoryItem>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    room: state.data.activeRoom,
    items: state.data.items,
    predictionItemId: state.data.predictionItemId
  }
}

export default connect(mapStateToProps)(PlaygroundPanel);
