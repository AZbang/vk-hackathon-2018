import React from 'react';
import * as tf from '@tensorflow/tfjs';
import './Camera.css';

class Camera extends React.Component {
  cameraStream = null;
  snapShotCanvas = document.createElement('canvas');
  aspectRatio = null;
  tickerId = null;

  /**
   * Captures a frame from the webcam and normalizes it between -1 and 1.
   * Returns a batched image (1-element batch) of shape [1, w, h, c].
   */
  capture() {
    const video = document.getElementById('stream-camera');
    if(!video) return;

    return tf.tidy(() => {
      // Reads the image as a Tensor from the webcam <video> element.
      const webcamImage = tf.fromPixels(video);

      // Crop the image so we're using the center square of the rectangular
      // webcam.
      const croppedImage = this.cropImage(webcamImage);

      // Expand the outer most dimension so we have a batch size of 1.
      const batchedImage = croppedImage.expandDims(0);

      // Normalize the image between -1 and 1. The image comes in between 0-255,
      // so we divide by 127 and subtract 1.
      let res =  batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
      this.props.onStream && this.props.onStream(res);
    });
  }

  /**
   * Crops an image tensor so we get a square image with no white space.
   * @param {Tensor4D} img An input image Tensor to crop.
   */
  cropImage(img) {
    const size = Math.min(img.shape[0], img.shape[1]);
    const centerHeight = img.shape[0] / 2;
    const beginHeight = centerHeight - (size / 2);
    const centerWidth = img.shape[1] / 2;
    const beginWidth = centerWidth - (size / 2);
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
  }

  /**
   * Adjusts the video size so we can make a centered square crop without
   * including whitespace.
   * @param {number} width The real width of the video element.
   * @param {number} height The real height of the video element.
   */
  adjustVideoSize(width, height) {
    const video = document.getElementById('stream-camera');

    const aspectRatio = width / height;
    if (width >= height) {
      video.width = aspectRatio * video.height;
    } else if (width < height) {
      video.height = video.width / aspectRatio;
    }
  }
  componentDidMount() {
    const video = document.getElementById('stream-camera');

    const navigatorAny = navigator;
    navigator.getUserMedia = navigator.getUserMedia ||
        navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
        navigatorAny.msGetUserMedia;

    if(navigator.getUserMedia) {
      navigator.getUserMedia({video: true}, stream => {
        video.srcObject = stream;
        this.cameraStream = stream.getTracks()[0];
        video.width = 224;
        video.height = 224;
        setTimeout(() => {
          this.tickerId = setInterval(() => this.capture(), 500);
        }, 1000)
      }, error => {
        throw error;
      });
    }
  }
  componentWillUnmount() {
    this.tickerId && clearInterval(this.tickerId);
    this.cameraStream && this.cameraStream.stop();
  }

  render = () => (
    <div onClick={() => this.capture()} style={{position: 'absolute', top: 0}}>
      <video style={{width: '100vw', height: '100vh'}} autoPlay id="stream-camera"></video>
    </div>
  )
}

export default Camera;
