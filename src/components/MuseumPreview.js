import React from 'react';
import {Div} from '@vkontakte/vkui';

import * as data from '../store/actions';
import './MuseumPreview.css';

class MuseumPreview extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} className="museum-preview" style={{backgroundImage: 'url(' + data.getMuseumImg(this.props.data.image) + ')'}}>
        <div className="museum-preview__gradient"></div>
        <h1 className="museum-preview__label">{this.props.data.name}</h1>
      </div>
    )
  }
}

export default MuseumPreview;
