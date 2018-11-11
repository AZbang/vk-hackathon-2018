import React from 'react';
import {Div} from '@vkontakte/vkui';

import * as data from '../store/actions';
import './MuseumPreview.css';

class MuseumPreview extends React.Component {
  render() {
    let bg = 'linear-gradient(-45deg, #fff0, #5181b8), url(' + data.getMuseumImg(this.props.data.image) + ")";

    return (
      <Div onClick={this.props.onClick} className="museum-preview" style={{backgroundImage: bg}}>
        <h1 className="museum-preview__label">{this.props.data.name}</h1>
      </Div>
    )
  }
}

export default MuseumPreview;
