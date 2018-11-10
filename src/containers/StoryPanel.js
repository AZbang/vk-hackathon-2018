import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Panel} from '@vkontakte/vkui';

import * as data from '../store/actions';
import StoryItem from '../components/StoryItem';

class StoryPanel extends React.Component {
  state = {
    currentStory: -1
  }

  getCurrentItem = () => {
    if(!this.props.gameItemsIds.length) return {story: []};
    return this.props.items[this.props.gameItemsIds[this.props.currentItemId]];
  }

  nextStory = () => {
    if(this.state.currentStory+1 >= this.getCurrentItem().story.length) {
      if(this.props.currentItemId+1 >= this.props.gameItemsIds.length) {
        return this.props.dispatch(push('/museum'));
      }
      this.props.dispatch(data.nextItemId());
      this.props.dispatch(push('/playground'));
    } else {
      this.setState({currentStory: this.state.currentStory+1})
    }
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <StoryItem onClick={this.nextStory} item={this.getCurrentItem()} story={this.state.currentStory !== -1 ? this.getCurrentItem().story[this.state.currentStory] : null}/>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.data.items,
    gameItemsIds: state.data.gameItemsIds,
    currentItemId: state.data.currentItemId
  }
}

export default connect(mapStateToProps)(StoryPanel);
