import React from 'react';
import {Div, Button} from '@vkontakte/vkui';
import Icon24Camera from '@vkontakte/icons/dist/24/camera';
import './Camera.css';

class Camera extends React.Component {
  cameraStream = null;
  snapShotCanvas = document.createElement('canvas');

  takeSnapshot = () => {
    let video = document.getElementById('stream-camera');
    this.snapShotCanvas.height = video.height;
    this.snapShotCanvas.width = video.width;

    let ctx = this.snapShotCanvas.getContext('2d');
    ctx.drawImage(video, 0, 0, this.snapShotCanvas.width, this.snapShotCanvas.height);

    let img = new Image();
    img.src = this.snapShotCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    this.props.onSnapshot && this.props.onSnapshot(img);
    return img;
  }

  componentDidMount() {
    const video = document.getElementById('stream-camera');
    video.width = window.innerWidth;

    navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: this.props.facingMode}})
      .then(stream => {
        this.cameraStream = stream.getTracks()[0];
        video.srcObject = stream;
      })
      .catch(error => {
        console.log('getUserMedia() error', error);
      })
  }
  componentWillUnmount() {
    this.cameraStream && this.cameraStream.stop();
  }

  render = () => (
    <div>
      <video autoPlay id="stream-camera"></video>
      <Button onClick={this.takeSnapshot} className="camera-snapshot" before={<Icon24Camera/>} size="l">Take a photo</Button>
    </div>
  )
}

export default Camera;
