import React from 'react';
import * as data from '../store/actions';
import './StoryItem.css';

class StoryItem extends React.Component {
  render() {
    return (
      <div onClick={this.props.onStoryItemEnded} className="story-item__bg" style={{backgroundImage: 'url(' + data.getItemImg(this.props.item.image) + ')', display: this.props.show ? 'block' : 'none'}}>
        <p className="story-item__name">{this.props.item.name}</p>
      </div>
    )
  }
}

export default StoryItem;
