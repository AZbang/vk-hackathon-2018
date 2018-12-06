import React from 'react';
import Icon24Share from '@vkontakte/icons/dist/24/share';

import * as data from '../store/actions';
import getDominantColor from '../utils/getDominantColor';
import './StoryItem.css';

class StoryItem extends React.Component {
  state = {
    dominantColor: 'rgb(39, 43, 54)'
  }

  componentDidMount() {
    getDominantColor(data.getItemImg(this.props.item.image), (rgb) => {
      this.setState({dominantColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`});
    });
  }

  render() {
    return (
      <div onClick={this.props.onClick} className="story-item__bg" style={{
          backgroundImage: 'url(' + data.getItemImg(this.props.item.image) + ')',
          boxShadow: `0 0 0 50px ${this.state.dominantColor}`
        }}>

        <div className="story-item__gradient-top"></div>
        <div className="story-item__gradient-bottom"></div>
        <Icon24Share fill="#fff" className="story-item__share"/>
        <p className="story-item__name">{this.props.story || this.props.item.name}</p>
      </div>
    )
  }
}

export default StoryItem;
