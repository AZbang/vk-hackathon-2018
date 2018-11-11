import React from 'react';
import Icon24Share from '@vkontakte/icons/dist/24/share';
import * as data from '../store/actions';
import './StoryItem.css';

class StoryItem extends React.Component {
  state = {
    dominantColor: 'rgb(39, 43, 54)'
  }

  getAverageRGB(imgEl) {
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),

        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

  }

  componentDidMount() {
    let img = new Image;
    img.onload = () => {
      let rgb = this.getAverageRGB(img);
      console.log(rgb)
      this.setState({dominantColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`});
    }
    img.crossOrigin = "Anonymous";
    img.src = data.getItemImg(this.props.item.image);
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
