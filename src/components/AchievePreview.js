import React from 'react';
import './AchievePreview.css';

class AchievePreview extends React.Component {
  render() {
    return (
      <div className="achive-preview">
        <div className="achive-preview__icon">{this.props.data.icon}</div>
        <div className="achive-preview__info">
          <h1 className="achive-preview__info__name">{this.props.data.name}</h1>
          <p className="achive-preview__info__description">{this.props.data.description}</p>
        </div>
      </div>
    )
  }
}

export default AchievePreview;
