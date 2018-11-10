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
    return this.props.items[this.state.shuffleItems[this.state.currentItemId] || 0];
  }

  onStoryItemEnded = () => {
    if(this.state.currentItemId+1 >= this.props.room.items.length) {
      return this.props.dispatch(push('/museum'));
    }

    this.setState({
      showStoryItem: false,
      currentItemId: this.state.currentItemId+1
    });
  }

  onSnapshot = (img) => {
    this.props.dispatch(data.predict(img));
  }

  checkItem = (img) => {
    this.setState({showStoryItem: true});

    // let id = mobilenet.predict(img);
    // if(this.props.items[this.currentItemId] === id) this.showStory();
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <RoomInfo room={this.props.room} itemCount={this.state.currentItemId} style={{display: this.state.showStoryItem ? 'none' : 'block'}}></RoomInfo>
        <Camera onSnapshot={this.onSnapshot} onStream={(img) => this.checkItem(img)} onClick={() => this.checkItem()} style={{display: this.state.showStoryItem ? 'none' : 'block'}} facingMode="environment"/>
        <ItemRebus room={this.props.room} item={this.getCurrentItem()}></ItemRebus>

        <StoryItem show={this.state.showStoryItem} onEnd={this.onStoryItemEnded} room={this.props.room} item={this.getCurrentItem()}></StoryItem>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    room: state.data.activeRoom,
    items: state.data.items
  }
}

export default connect(mapStateToProps)(PlaygroundPanel);
