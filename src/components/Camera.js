import React from 'react';
import './Camera.css';

class Camera extends React.Component {
  cameraStream = null;
  snapShotCanvas = document.createElement('canvas');
  aspectRatio = null;
  VIDEO_PIXELS = 224;


  setupVideoDimensions(width, height) {
    let video = document.getElementById('stream-camera');
    this.aspectRatio = width / height;

    if(width >= height) {
      video.height = this.VIDEO_PIXELS;
      video.width = this.aspectRatio * this.VIDEO_PIXELS;
    } else {
      video.width = this.VIDEO_PIXELS;
      video.height = this.VIDEO_PIXELS / this.aspectRatio;
    }
  }

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
    <div onClick={() => this.props.onClick()} style={{position: 'absolute', top: 0}}>
      <video autoPlay id="stream-camera"></video>
    </div>
  )
}

export default Camera;
