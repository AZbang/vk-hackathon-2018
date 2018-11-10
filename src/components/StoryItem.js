import React from 'react';
import Icon24Share from '@vkontakte/icons/dist/24/share';
import * as data from '../store/actions';
import './StoryItem.css';

class StoryItem extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} className="story-item__bg" style={{backgroundImage: 'url(' + data.getItemImg(this.props.item.image) + ')'}}>
        <div className="story-item__gradient-top"></div>
        <div className="story-item__gradient-bottom"></div>
        <Icon24Share fill="#fff" className="story-item__share"/>
        <p className="story-item__name">{this.props.story || this.props.item.name}</p>
      </div>
    )
  }
}

export default StoryItem;
