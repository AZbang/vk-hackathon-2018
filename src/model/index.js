import * as tf from '@tensorflow/tfjs';
import logreg from './logreg.json';
let model;

export function load() {
  return tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
    .then((mobilenet) => {
      // Return a model that outputs an internal activation.
      const layer = mobilenet.getLayer('global_average_pooling2d_1');
      model = tf.model({inputs: mobilenet.inputs, outputs: layer.output});
      model.predict(tf.zeros([1, 224, 224, 3])).dispose();
      return model;
    });
}

export function predict(img) {
  let vectors = model.predict(img);
  let map = vectors.dataSync();
  let arr = [];
  for(let i = 0; i < 256; i++) {
    arr.push(map[i]);
  }
  return getPredictImageId(arr);
}


export function getPredictImageId(arr) {
  let pred = new Array(logreg.length).fill(0);

  for(let i = 0; i < logreg.length; i++) {
    for(let j = 0; j < logreg[0].length; j++) {
      pred[i] += arr[j]*logreg[i][j];
    }
  }
  let sumExp = 0;
  for(let i = 0; i < pred.length; i++) {
    sumExp += Math.exp(pred[i]);
  }
  for(let i = 0; i < pred.length; i++) {
    pred[i] = Math.exp(pred[i])/sumExp;
  }

  let max = pred[0];
  let maxi = 0;
  for(let i = 0; i < pred.length; i++) {
    if(pred[i] > max) {
      max = pred[i];
      maxi = i;
    }
  }
  return max > .5 ? maxi : -1;
}
