import React from 'react';
import {connect} from 'react-redux';
import {Panel} from '@vkontakte/vkui';
import {push} from 'react-router-redux';

import * as model from '../model';
import * as data from '../store/actions';

import Camera from '../components/Camera';
import RoomInfo from '../components/RoomInfo';
import ItemRebus from '../components/ItemRebus';

class PlaygroundPanel extends React.Component {

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
    img.src = data.getItemImg(this.getCurrentItem().image);
  }

  getCurrentItem = () => {
    return this.props.items[this.props.gameItemsIds[this.props.currentItemId]];
  }

  checkItem = (img) => {
    let id = model.predict(img);
    if(this.props.gameItemsIds[this.props.currentItemId] === parseInt(id, 10)) {
      this.props.dispatch(push('/story'));
    }
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <RoomInfo color={this.state.dominantColor} room={this.props.room} itemCount={this.props.currentItemId}></RoomInfo>
        <Camera onStream={this.checkItem}/>
        <ItemRebus color={this.state.dominantColor} room={this.props.room} item={this.getCurrentItem()}></ItemRebus>
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
