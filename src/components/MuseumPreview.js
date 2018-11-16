import React from 'react';
import {Div} from '@vkontakte/vkui';

import * as data from '../store/actions';
import './MuseumPreview.css';

class MuseumPreview extends React.Component {
  className = () =>
    'museum-preview ' + (!this.props.data.locked ? 'museum-preview--enable' : 'museum-preview--disable');

  render() {
    let gradient = !this.props.data.locked ? 'linear-gradient(-45deg, #fff0, #5181b8)' : 'linear-gradient(-45deg, #fff0, #aaaaaa)';
    let bg = gradient + ', url(' + data.getMuseumImg(this.props.data.image) + ')';

    return (
      <Div onClick={() => !this.props.data.locked && this.props.onClick()} className={this.className()} style={{backgroundImage: bg}}>
        <h1 className="museum-preview__label">{this.props.data.name}</h1>
      </Div>
    )
  }
}

export default MuseumPreview;
